// Bytecode AI Assistant - Chatbot con Gemini AI + Fallback Local
// Asistente virtual experto en Juan Pablo Ramírez y sus servicios

const GEMINI_API_KEY = 'AIzaSyDG3_nvrb--EUz4jHIxMrJeOW9gv9awJ_4';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const CHATBOT_CONFIG = {
    name: "ByteBot",
    greeting: "¡Hola! 👋 Soy ByteBot, el asistente virtual de Juan Pablo. Estoy aquí para responder tus preguntas sobre sus servicios. ¿En qué puedo ayudarte?",
    placeholder: "Escribe tu pregunta...",
};

// Base de conocimiento LOCAL para respuestas rápidas (sin API)
const LOCAL_KNOWLEDGE = [
    {
        keywords: ["hola", "buenos días", "buenas tardes", "hey", "saludos", "hi"],
        response: "¡Hola! 👋 Soy ByteBot. Juan Pablo puede ayudarte con automatización, desarrollo web, chatbots personalizados, contenido multimedia e integración de IA. ¿Qué te gustaría saber?"
    },
    {
        keywords: ["quién", "quien", "juan pablo", "sobre ti", "sobre él", "perfil"],
        response: "Juan Pablo Ramírez Yáñez es un Product Manager con **14+ años de experiencia** en gestión educativa. Desde 2021 integra IA en sus soluciones. Es Técnico en Administración y Contabilidad, especializado en crear soluciones de **Costo Cero** que optimizan procesos. 🚀"
    },
    {
        keywords: ["chatbot", "chat bot", "asistente", "bot", "conversacional"],
        response: "¡Excelente pregunta! Juan Pablo desarrolla **chatbots personalizados para cualquier propósito**:\n\n• 🤖 Atención al cliente 24/7\n• 💼 Asistentes de ventas con IA\n• 📚 Tutores educativos virtuales\n• 🔧 Soporte técnico automatizado\n• 💬 Integración con WhatsApp, Web, Telegram\n\nDe hecho, ¡yo soy un ejemplo de su trabajo! 😊"
    },
    {
        keywords: ["servicios", "qué hace", "que hace", "ofrece", "ayudar"],
        response: "Juan Pablo ofrece 6 servicios principales:\n\n1️⃣ **Automatización de Procesos** - Elimina tareas repetitivas\n2️⃣ **Desarrollo de Aplicaciones Web** - Dashboards y sistemas a medida\n3️⃣ **Chatbots Personalizados** - Para cualquier propósito empresarial\n4️⃣ **Integración de IA** - GPT-4, Gemini, Whisper\n5️⃣ **Contenido Multimedia** - Videos, afiches, promociones\n6️⃣ **Consultoría y Capacitación** - Transferencia de conocimiento\n\n¿Te interesa alguno en particular?"
    },
    {
        keywords: ["precio", "costo", "cuánto", "cuanto", "tarifa", "cobrar", "presupuesto"],
        response: "Los precios varían según el proyecto. Lo especial de Juan Pablo es que usa **tecnologías de Costo Cero** en infraestructura (no pagas servidores ni licencias). Solo inviertes en su tiempo de desarrollo.\n\n📧 Para una cotización personalizada: **jp.ramirez.yanez@gmail.com**"
    },
    {
        keywords: ["contacto", "email", "correo", "llamar", "hablar", "reunión"],
        response: "¡Conecta con Juan Pablo!\n\n📧 Email: **jp.ramirez.yanez@gmail.com**\n📍 Ubicación: Chile, Región de la Araucanía\n💻 GitHub: github.com/Juanpi2024\n\nResponde todos los mensajes en máximo 24 horas. 📝"
    },
    {
        keywords: ["proyecto", "ejemplos", "portafolio", "portfolio", "trabajos"],
        response: "Algunos proyectos destacados:\n\n📅 Calendario Institucional con sincronización cloud\n📊 Sistema de Estadísticas automatizado\n⚠️ Gestión de Riesgos (OAT)\n💰 Control Financiero con IA\n📄 Conversor PDF a Web Normativo\n🤖 Gestión de Oficios con IA\n\nTodos disponibles en GitHub: github.com/Juanpi2024"
    },
    {
        keywords: ["tecnología", "tecnologias", "herramientas", "stack", "lenguajes"],
        response: "Stack tecnológico de Juan Pablo:\n\n💻 **Frontend:** JavaScript, TypeScript, React, Next.js\n☁️ **Cloud:** Google Apps Script, Firebase, Google Cloud\n🤖 **IA:** GPT-4, Gemini, Claude, Whisper, NotebookLM\n🔧 **Tools:** Git, Figma, Looker Studio\n\n¡Todo orientado a soluciones de Costo Cero!"
    },
    {
        keywords: ["educación", "educacion", "colegio", "escuela", "institución"],
        response: "Juan Pablo tiene **14+ años** de experiencia en el sector educativo chileno. Ha desarrollado:\n\n• Sistemas de seguimiento estudiantil\n• Automatización de actas y certificados\n• Calendarios institucionales\n• Gestión de asistencia y atrasos\n• Evaluadores de velocidad lectora con IA\n\nPero sus metodologías aplican a **cualquier industria**. 🎓"
    },
    {
        keywords: ["ia", "inteligencia artificial", "gpt", "gemini", "claude", "llm"],
        response: "Juan Pablo trabaja con IA desde **2021**, antes del boom de ChatGPT. Domina:\n\n🧠 **GPT-4/ChatGPT** - Razonamiento complejo\n🔮 **Google Gemini** - Integración con Google Workspace\n💬 **Claude** - Análisis de documentos largos\n🎤 **Whisper** - Transcripción de audio\n📚 **NotebookLM** - RAG y síntesis\n\n¡Puede integrar cualquiera en tu negocio!"
    },
    {
        keywords: ["tiempo", "demora", "plazo", "rapidez", "cuánto tarda"],
        response: "Los tiempos dependen del proyecto:\n\n⚡ **Automatizaciones simples:** 1-2 semanas\n🌐 **Aplicaciones web:** 4-8 semanas\n🤖 **Chatbots:** 2-4 semanas\n📊 **Dashboards:** 2-3 semanas\n🎬 **Contenido multimedia:** 1-2 semanas\n\nJuan Pablo usa metodologías ágiles con entregas incrementales. 🚀"
    },
    {
        keywords: ["gratis", "gratuito", "sin costo", "cero"],
        response: "¡'Costo Cero' es el diferenciador de Juan Pablo! 💡\n\nSignifica que usa herramientas gratuitas (Google Workspace, Firebase, etc.) para que **no pagues licencias ni hosting**. Solo inviertes en el desarrollo.\n\nEsto hace sus soluciones accesibles para cualquier tamaño de empresa."
    },
    {
        keywords: ["video", "videos", "afiche", "flyer", "promoción", "promocion", "multimedia", "contenido", "diseño", "canva"],
        response: "¡Juan Pablo también crea **contenido multimedia** profesional! 🎬\n\n• 📹 Videos promocionales y corporativos\n• 🎨 Afiches y flyers digitales\n• 📊 Presentaciones ejecutivas impactantes\n• 📱 Contenido para redes sociales\n• ✨ Animaciones y motion graphics\n\n**Herramientas:** Canva Pro, CapCut, DaVinci Resolve, AI Image Gen\n\n¿Necesitas material visual para tu proyecto?"
    },
    {
        keywords: ["whatsapp", "telegram", "messenger", "integración"],
        response: "¡Sí! Juan Pablo puede crear chatbots integrados con:\n\n💬 WhatsApp Business API\n📱 Telegram Bot\n🌐 Chat en tu sitio web\n📧 Email automatizado\n\nTodos con IA conversacional para atención 24/7. ¿Te interesa alguna plataforma específica?"
    },
    {
        keywords: ["gracias", "genial", "excelente", "perfecto", "ok", "vale", "bueno"],
        response: "¡De nada! 😊 Si tienes más preguntas, aquí estaré. Y si quieres hablar directamente con Juan Pablo:\n\n📧 jp.ramirez.yanez@gmail.com\n\n¡Éxito con tu proyecto! 🚀"
    }
];

// System prompt para Gemini (solo se usa si no hay match local)
const SYSTEM_PROMPT = `Eres ByteBot, el asistente virtual de Juan Pablo Ramírez Yáñez. Tu rol es ayudar a potenciales clientes.

INFORMACIÓN CLAVE:
- Nombre: Juan Pablo Ramírez Yáñez
- Rol: Product Manager & Desarrollador de Soluciones
- Experiencia: 14+ años en gestión educativa y tecnología
- Email: jp.ramirez.yanez@gmail.com
- GitHub: github.com/Juanpi2024
- Ubicación: Chile, Región de la Araucanía

SERVICIOS (6):
1. Automatización de Procesos
2. Desarrollo de Aplicaciones Web
3. Chatbots Personalizados
4. Integración de IA (GPT-4, Gemini, Claude, Whisper)
5. Creación de Contenido Multimedia (Videos, Afiches)
6. Consultoría Digital y Capacitación

DIFERENCIADOR: Soluciones de "Costo Cero" en infraestructura.

INSTRUCCIONES:
- Responde en español, amigable y conciso (máximo 3 párrafos)
- Usa emojis moderadamente
- Siempre ofrece el email de contacto cuando sea apropiado
- TÚ eres ejemplo de su capacidad para crear chatbots`;

// Historial de conversación
let conversationHistory = [];
let useGeminiAPI = true; // Flag para controlar si usamos API

// Crear estructura del chatbot
function createChatbotHTML() {
    const chatbotHTML = `
        <div id="bytechat-container" class="bytechat-container">
            <button id="bytechat-toggle" class="bytechat-toggle" aria-label="Abrir chat">
                <i class="fas fa-comments"></i>
                <span class="bytechat-notification">1</span>
            </button>
            
            <div id="bytechat-window" class="bytechat-window">
                <div class="bytechat-header">
                    <div class="bytechat-header-info">
                        <div class="bytechat-avatar">
                            <i class="fas fa-robot"></i>
                        </div>
                        <div class="bytechat-header-text">
                            <h4>ByteBot <span class="ai-badge">IA</span></h4>
                            <span class="bytechat-status">🟢 Online</span>
                        </div>
                    </div>
                    <button id="bytechat-close" class="bytechat-close" aria-label="Cerrar chat">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div id="bytechat-messages" class="bytechat-messages">
                </div>
                
                <div class="bytechat-input-area">
                    <input type="text" id="bytechat-input" placeholder="${CHATBOT_CONFIG.placeholder}" autocomplete="off">
                    <button id="bytechat-send" aria-label="Enviar mensaje">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                
                <div class="bytechat-footer">
                    <span>Desarrollado por Juan Pablo Ramírez</span>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatbotHTML);
}

// Añadir mensaje al chat
function addMessage(text, isUser = false) {
    const messagesContainer = document.getElementById('bytechat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `bytechat-message ${isUser ? 'user' : 'bot'}`;

    let formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br>');

    messageDiv.innerHTML = `
        <div class="message-content">${formattedText}</div>
        <div class="message-time">${new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}</div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Mostrar indicador de escritura
function showTypingIndicator() {
    const messagesContainer = document.getElementById('bytechat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'bytechat-message bot typing-indicator';
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <span class="dot"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
    `;
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Ocultar indicador de escritura
function hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Buscar respuesta LOCAL primero
function findLocalResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    for (const item of LOCAL_KNOWLEDGE) {
        for (const keyword of item.keywords) {
            if (lowerMessage.includes(keyword)) {
                return item.response;
            }
        }
    }

    return null; // No encontró match local
}

// Llamar a Gemini API (solo si no hay respuesta local)
async function callGeminiAPI(userMessage) {
    conversationHistory.push({
        role: "user",
        parts: [{ text: userMessage }]
    });

    const requestBody = {
        contents: [
            {
                role: "user",
                parts: [{ text: SYSTEM_PROMPT }]
            },
            {
                role: "model",
                parts: [{ text: "Entendido. Soy ByteBot, listo para ayudar." }]
            },
            ...conversationHistory
        ],
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 300,
        }
    };

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            if (response.status === 429) {
                useGeminiAPI = false; // Desactivar API si hay rate limit
                console.log('Rate limit alcanzado, usando solo respuestas locales');
            }
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const botResponse = data.candidates[0].content.parts[0].text;

            conversationHistory.push({
                role: "model",
                parts: [{ text: botResponse }]
            });

            if (conversationHistory.length > 10) {
                conversationHistory = conversationHistory.slice(-10);
            }

            return botResponse;
        } else {
            throw new Error('Respuesta inválida');
        }
    } catch (error) {
        console.error('Error Gemini API:', error);
        return null;
    }
}

// Respuesta por defecto si nada funciona
const DEFAULT_RESPONSE = "¡Gracias por tu mensaje! 😊 Juan Pablo ofrece:\n\n• Automatización de procesos\n• Desarrollo web\n• Chatbots personalizados\n• Contenido multimedia\n• Integración de IA\n\n📧 Escríbele a: **jp.ramirez.yanez@gmail.com**";

// Procesar mensaje del usuario
async function processUserMessage(message) {
    if (!message.trim()) return;

    addMessage(message, true);
    showTypingIndicator();

    // PASO 1: Buscar respuesta LOCAL primero
    const localResponse = findLocalResponse(message);

    if (localResponse) {
        // Respuesta local encontrada - instantánea
        setTimeout(() => {
            hideTypingIndicator();
            addMessage(localResponse, false);
        }, 500 + Math.random() * 500);
        return;
    }

    // PASO 2: Si no hay local y API está activa, usar Gemini
    if (useGeminiAPI) {
        try {
            const geminiResponse = await callGeminiAPI(message);
            hideTypingIndicator();

            if (geminiResponse) {
                addMessage(geminiResponse, false);
                return;
            }
        } catch (error) {
            console.error('Error en Gemini:', error);
        }
    }

    // PASO 3: Fallback - respuesta por defecto
    hideTypingIndicator();
    addMessage(DEFAULT_RESPONSE, false);
}

// Inicializar chatbot
function initChatbot() {
    createChatbotHTML();

    const toggleBtn = document.getElementById('bytechat-toggle');
    const closeBtn = document.getElementById('bytechat-close');
    const chatWindow = document.getElementById('bytechat-window');
    const input = document.getElementById('bytechat-input');
    const sendBtn = document.getElementById('bytechat-send');
    const notification = document.querySelector('.bytechat-notification');

    let isOpen = false;
    let hasGreeted = false;

    toggleBtn.addEventListener('click', () => {
        isOpen = !isOpen;
        chatWindow.classList.toggle('open', isOpen);
        toggleBtn.classList.toggle('active', isOpen);
        notification.style.display = 'none';

        if (isOpen && !hasGreeted) {
            setTimeout(() => {
                addMessage(CHATBOT_CONFIG.greeting, false);
                hasGreeted = true;
            }, 500);
        }

        if (isOpen) {
            input.focus();
        }
    });

    closeBtn.addEventListener('click', () => {
        isOpen = false;
        chatWindow.classList.remove('open');
        toggleBtn.classList.remove('active');
    });

    const sendMessage = () => {
        const message = input.value.trim();
        if (message) {
            processUserMessage(message);
            input.value = '';
        }
    };

    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
}

// Iniciar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}
