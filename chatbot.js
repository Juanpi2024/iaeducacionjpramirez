// Bytecode AI Assistant - Chatbot con Gemini AI
// Asistente virtual experto en Juan Pablo Ramírez y sus servicios

const GEMINI_API_KEY = 'AIzaSyDG3_nvrb--EUz4jHIxMrJeOW9gv9awJ_4';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const CHATBOT_CONFIG = {
    name: "ByteBot",
    greeting: "¡Hola! 👋 Soy ByteBot, el asistente virtual de Juan Pablo. Estoy potenciado por Gemini AI para responder cualquier pregunta sobre sus servicios. ¿En qué puedo ayudarte?",
    placeholder: "Escribe tu pregunta...",
};

// System prompt con toda la información del experto
const SYSTEM_PROMPT = `Eres ByteBot, el asistente virtual de Juan Pablo Ramírez Yáñez. Tu rol es ayudar a potenciales clientes a conocer sus servicios y capacidades.

INFORMACIÓN DEL EXPERTO:
- Nombre: Juan Pablo Ramírez Yáñez
- Rol: Product Manager & Desarrollador de Soluciones
- Experiencia: 14+ años en gestión educativa y tecnología
- Ubicación: Chile, Región de la Araucanía
- Email: jp.ramirez.yanez@gmail.com
- GitHub: github.com/Juanpi2024
- Trabaja con IA desde: 2021 (antes del boom de ChatGPT)

FORMACIÓN:
- Técnico en Administración de Empresas
- Técnico en Contabilidad General
- Certificaciones continuas en tecnologías cloud e IA

SERVICIOS QUE OFRECE (6):
1. Automatización de Procesos - Google Apps Script, Zapier, Make, Power Automate
2. Desarrollo de Aplicaciones Web - JavaScript, TypeScript, React, Next.js
3. Chatbots Personalizados - Para cualquier propósito: atención al cliente 24/7, ventas, tutores educativos, soporte técnico. Integración con WhatsApp, Web, Telegram
4. Integración de Inteligencia Artificial - GPT-4, Gemini, Claude, Whisper, RAG, Vision AI
5. Creación de Contenido Multimedia - Videos promocionales, afiches, flyers, presentaciones, contenido para redes sociales, animaciones, motion graphics. Herramientas: Canva Pro, CapCut, DaVinci Resolve, AI Image Gen
6. Consultoría Digital y Capacitación - Diagnóstico de madurez digital, roadmap de transformación, mentoring técnico

DIFERENCIADOR CLAVE:
- Soluciones de "Costo Cero" en infraestructura: usa herramientas gratuitas (Google Workspace, Firebase, etc.) para que el cliente no pague licencias ni hosting. Solo invierte en el tiempo de desarrollo.

PROYECTOS DESTACADOS:
- Calendario Institucional Anual con sincronización cloud
- Sistema de Estadísticas y Actas automatizado
- Gestión de Riesgos Institucionales (OAT)
- Control de Ingresos y Egresos con IA
- Análisis FODA Dinámico con base de datos
- Conversor PDF a Web Normativo
- Seguimiento Académico en Tiempo Real
- Gestión Inteligente de Oficios con IA

TIEMPOS ESTIMADOS:
- Automatizaciones simples: 1-2 semanas
- Aplicaciones web: 4-8 semanas
- Chatbots: 2-4 semanas
- Dashboards: 2-3 semanas
- Contenido multimedia: 1-2 semanas

INDUSTRIAS CON EXPERIENCIA:
- Educación (especialidad principal, 14+ años)
- Corporativo
- Salud
- Retail
- Legal
- Gobierno

INSTRUCCIONES DE COMPORTAMIENTO:
1. Responde siempre en español de Chile, de forma amigable y profesional
2. Usa emojis moderadamente para hacer las respuestas más atractivas
3. Sé conciso pero informativo (máximo 3-4 párrafos)
4. Si te preguntan algo fuera del contexto de Juan Pablo, redirige amablemente hacia sus servicios
5. Siempre ofrece el email de contacto cuando sea apropiado: jp.ramirez.yanez@gmail.com
6. Destaca el diferenciador de "Costo Cero" cuando sea relevante
7. Recuerda que TÚ (ByteBot) eres un ejemplo vivo de la capacidad de Juan Pablo para crear chatbots con IA
8. No inventes información que no esté en este contexto
`;

// Historial de conversación para contexto
let conversationHistory = [];

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
                            <h4>ByteBot <span class="ai-badge">Gemini AI</span></h4>
                            <span class="bytechat-status">🟢 Online</span>
                        </div>
                    </div>
                    <button id="bytechat-close" class="bytechat-close" aria-label="Cerrar chat">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                
                <div id="bytechat-messages" class="bytechat-messages">
                    <!-- Messages will be added here -->
                </div>
                
                <div class="bytechat-input-area">
                    <input type="text" id="bytechat-input" placeholder="${CHATBOT_CONFIG.placeholder}" autocomplete="off">
                    <button id="bytechat-send" aria-label="Enviar mensaje">
                        <i class="fas fa-paper-plane"></i>
                    </button>
                </div>
                
                <div class="bytechat-footer">
                    <span>Potenciado por Gemini AI • Juan Pablo Ramírez</span>
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

    // Convertir markdown básico a HTML
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

// Llamar a Gemini API
async function callGeminiAPI(userMessage) {
    // Agregar mensaje del usuario al historial
    conversationHistory.push({
        role: "user",
        parts: [{ text: userMessage }]
    });

    // Construir el request con historial
    const requestBody = {
        contents: [
            {
                role: "user",
                parts: [{ text: SYSTEM_PROMPT }]
            },
            {
                role: "model",
                parts: [{ text: "Entendido. Soy ByteBot, el asistente virtual de Juan Pablo Ramírez. Estoy listo para ayudar a los visitantes con información sobre sus servicios profesionales. ¿En qué puedo ayudarte?" }]
            },
            ...conversationHistory
        ],
        generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 500,
        },
        safetySettings: [
            { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
            { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_MEDIUM_AND_ABOVE" }
        ]
    };

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }

        const data = await response.json();

        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const botResponse = data.candidates[0].content.parts[0].text;

            // Agregar respuesta al historial
            conversationHistory.push({
                role: "model",
                parts: [{ text: botResponse }]
            });

            // Limitar historial a últimos 10 mensajes para no exceder límites
            if (conversationHistory.length > 10) {
                conversationHistory = conversationHistory.slice(-10);
            }

            return botResponse;
        } else {
            throw new Error('Respuesta inválida de la API');
        }
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return "Lo siento, tuve un problema técnico. 😅 Pero puedes contactar directamente a Juan Pablo en: **jp.ramirez.yanez@gmail.com**";
    }
}

// Procesar mensaje del usuario
async function processUserMessage(message) {
    if (!message.trim()) return;

    addMessage(message, true);
    showTypingIndicator();

    try {
        const response = await callGeminiAPI(message);
        hideTypingIndicator();
        addMessage(response, false);
    } catch (error) {
        hideTypingIndicator();
        addMessage("Hubo un error al procesar tu mensaje. Por favor, intenta de nuevo o contacta a jp.ramirez.yanez@gmail.com", false);
    }
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

    // Toggle chat window
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

    // Close button
    closeBtn.addEventListener('click', () => {
        isOpen = false;
        chatWindow.classList.remove('open');
        toggleBtn.classList.remove('active');
    });

    // Send message
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

// Iniciar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initChatbot);
} else {
    initChatbot();
}
