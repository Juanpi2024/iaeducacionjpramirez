// Dot Shader Background Effect - Vanilla Three.js
// Efecto de puntos animados con reacción al mouse

class DotShaderBackground {
    constructor(container) {
        this.container = container;
        this.mouse = { x: 0.5, y: 0.5 };
        this.mouseTrail = [];
        this.maxTrailLength = 50;

        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        // Scene setup
        this.scene = new THREE.Scene();

        // Camera (orthographic for 2D effect)
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance'
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        this.container.appendChild(this.renderer.domElement);

        // Create trail texture
        this.trailCanvas = document.createElement('canvas');
        this.trailCanvas.width = 512;
        this.trailCanvas.height = 512;
        this.trailCtx = this.trailCanvas.getContext('2d');
        this.trailTexture = new THREE.CanvasTexture(this.trailCanvas);
        this.trailTexture.minFilter = THREE.LinearFilter;
        this.trailTexture.magFilter = THREE.LinearFilter;

        // Shader material
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
                resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
                dotColor: { value: new THREE.Color('#64ffda') },
                bgColor: { value: new THREE.Color('#0a192f') },
                mouseTrail: { value: this.trailTexture },
                rotation: { value: 0.0 },
                gridSize: { value: 80.0 },
                dotOpacity: { value: 0.08 }
            },
            vertexShader: `
                void main() {
                    gl_Position = vec4(position.xy, 0.0, 1.0);
                }
            `,
            fragmentShader: `
                uniform float time;
                uniform vec2 resolution;
                uniform vec3 dotColor;
                uniform vec3 bgColor;
                uniform sampler2D mouseTrail;
                uniform float rotation;
                uniform float gridSize;
                uniform float dotOpacity;

                vec2 rotate(vec2 uv, float angle) {
                    float s = sin(angle);
                    float c = cos(angle);
                    mat2 rotationMatrix = mat2(c, -s, s, c);
                    return rotationMatrix * (uv - 0.5) + 0.5;
                }

                vec2 coverUv(vec2 uv) {
                    vec2 s = resolution.xy / max(resolution.x, resolution.y);
                    vec2 newUv = (uv - 0.5) * s + 0.5;
                    return clamp(newUv, 0.0, 1.0);
                }

                float sdfCircle(vec2 p, float r) {
                    return length(p - 0.5) - r;
                }

                void main() {
                    vec2 screenUv = gl_FragCoord.xy / resolution;
                    vec2 uv = coverUv(screenUv);

                    vec2 rotatedUv = rotate(uv, rotation);

                    // Create grid
                    vec2 gridUv = fract(rotatedUv * gridSize);
                    vec2 gridUvCenterInScreenCoords = rotate((floor(rotatedUv * gridSize) + 0.5) / gridSize, -rotation);

                    // Screen mask
                    float screenMask = smoothstep(0.0, 1.0, 1.0 - uv.y);
                    vec2 centerDisplace = vec2(0.7, 1.1);
                    float circleMaskCenter = length(uv - centerDisplace);
                    float circleMaskFromCenter = smoothstep(0.5, 1.0, circleMaskCenter);
                    
                    float combinedMask = screenMask * circleMaskFromCenter;
                    float circleAnimatedMask = sin(time * 2.0 + circleMaskCenter * 10.0);

                    // Mouse trail effect
                    float mouseInfluence = texture2D(mouseTrail, gridUvCenterInScreenCoords).r;
                    
                    float scaleInfluence = max(mouseInfluence * 0.5, circleAnimatedMask * 0.3);

                    // Dot size
                    float dotSize = min(pow(circleMaskCenter, 2.0) * 0.3, 0.3);
                    float sdfDot = sdfCircle(gridUv, dotSize * (1.0 + scaleInfluence * 0.5));
                    float smoothDot = smoothstep(0.05, 0.0, sdfDot);

                    float opacityInfluence = max(mouseInfluence * 50.0, circleAnimatedMask * 0.5);

                    // Mix colors
                    vec3 composition = mix(bgColor, dotColor, smoothDot * combinedMask * dotOpacity * (1.0 + opacityInfluence));

                    gl_FragColor = vec4(composition, 1.0);
                }
            `
        });

        // Fullscreen quad
        this.geometry = new THREE.PlaneGeometry(2, 2);
        this.mesh = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.mesh);

        this.clock = new THREE.Clock();
    }

    updateTrailTexture() {
        // Fade existing trail
        this.trailCtx.fillStyle = 'rgba(0, 0, 0, 0.03)';
        this.trailCtx.fillRect(0, 0, 512, 512);

        // Draw new trail points
        for (let i = 0; i < this.mouseTrail.length; i++) {
            const point = this.mouseTrail[i];
            const age = (Date.now() - point.time) / 400;
            if (age > 1) {
                this.mouseTrail.splice(i, 1);
                i--;
                continue;
            }

            const alpha = 1 - age;
            const radius = 30 * alpha;

            const gradient = this.trailCtx.createRadialGradient(
                point.x * 512, point.y * 512, 0,
                point.x * 512, point.y * 512, radius
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.8})`);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            this.trailCtx.fillStyle = gradient;
            this.trailCtx.beginPath();
            this.trailCtx.arc(point.x * 512, point.y * 512, radius, 0, Math.PI * 2);
            this.trailCtx.fill();
        }

        this.trailTexture.needsUpdate = true;
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.material.uniforms.time.value = this.clock.getElapsedTime();
        this.updateTrailTexture();

        this.renderer.render(this.scene, this.camera);
    }

    addEventListeners() {
        window.addEventListener('resize', () => this.onResize());
        this.container.addEventListener('mousemove', (e) => this.onMouseMove(e));
        this.container.addEventListener('touchmove', (e) => this.onTouchMove(e));
    }

    onResize() {
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.material.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
    }

    onMouseMove(e) {
        const x = e.clientX / window.innerWidth;
        const y = 1 - (e.clientY / window.innerHeight);

        this.mouseTrail.push({ x, y, time: Date.now() });
        if (this.mouseTrail.length > this.maxTrailLength) {
            this.mouseTrail.shift();
        }
    }

    onTouchMove(e) {
        if (e.touches.length > 0) {
            const touch = e.touches[0];
            const x = touch.clientX / window.innerWidth;
            const y = 1 - (touch.clientY / window.innerHeight);

            this.mouseTrail.push({ x, y, time: Date.now() });
            if (this.mouseTrail.length > this.maxTrailLength) {
                this.mouseTrail.shift();
            }
        }
    }

    destroy() {
        this.renderer.dispose();
        this.geometry.dispose();
        this.material.dispose();
        this.container.removeChild(this.renderer.domElement);
    }
}

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('dot-shader-bg');
    if (container) {
        window.dotShader = new DotShaderBackground(container);
    }
});
