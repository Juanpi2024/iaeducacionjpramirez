// Bytecode AI Assistant - Chatbot experto en Juan Pablo Ramírez
// Este chatbot demuestra la capacidad de crear asistentes conversacionales

const CHATBOT_CONFIG = {
    name: "ByteBot",
    greeting: "¡Hola! 👋 Soy ByteBot, el asistente virtual de Juan Pablo. ¿En qué puedo ayudarte hoy?",
    placeholder: "Escribe tu pregunta...",
    // Información del experto para respuestas
    expertInfo: {
        nombre: "Juan Pablo Ramírez Yáñez",
        rol: "Product Manager & Desarrollador de Soluciones",
        experiencia: "14+ años en gestión educativa y tecnología",
        especialidad: "Educación, pero aplicable a cualquier industria",
        email: "jp.ramirez.yanez@gmail.com",
        ubicacion: "Chile, Región de la Araucanía",
        github: "https://github.com/Juanpi2024",
        servicios: [
            "Automatización de Procesos (Google Apps Script, Zapier, Make)",
            "Desarrollo de Aplicaciones Web (JavaScript, TypeScript, React)",
            "Chatbots Personalizados para cualquier propósito (GPT-4, Gemini, Claude)",
            "Integración de Inteligencia Artificial (Whisper, RAG, Vision AI)",
            "Creación de Contenido Multimedia (Videos, Afiches, Promociones)",
            "Consultoría Digital y Capacitación"
        ],
        diferenciador: "Soluciones de Costo Cero en infraestructura usando tecnologías cloud gratuitas",
        proyectos: [
            "Calendario Institucional Anual con sincronización cloud",
            "Sistema de Estadísticas y Actas automatizado",
            "Gestión de Riesgos Institucionales (OAT)",
            "Control de Ingresos y Egresos con IA",
            "Análisis FODA Dinámico con base de datos",
            "Conversor PDF a Web Normativo",
            "Seguimiento Académico en Tiempo Real",
            "Gestión Inteligente de Oficios con IA"
        ],
        tecnologias: ["JavaScript", "TypeScript", "React", "Next.js", "Google Apps Script", "GPT-4", "Gemini", "Claude", "Whisper", "Firebase", "Google Cloud"],
        iaDesde: "2021"
    }
};

// Base de conocimiento para respuestas
const KNOWLEDGE_BASE = [
    {
        keywords: ["hola", "buenos días", "buenas tardes", "hey", "saludos"],
        response: "¡Hola! 👋 Soy ByteBot. Juan Pablo puede ayudarte con automatización, desarrollo web, chatbots personalizados e integración de IA. ¿Qué te gustaría saber?"
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
        response: "¡Conecta con Juan Pablo!\n\n📧 Email: **jp.ramirez.yanez@gmail.com**\n📍 Ubicación: Chile, Región de la Araucanía\n💻 GitHub: github.com/Juanpi2024\n\nResponde todos los mensajes en máximo 24 horas. También puedes usar el formulario en la página de Contacto. 📝"
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
        response: "Los tiempos dependen del proyecto:\n\n⚡ **Automatizaciones simples:** 1-2 semanas\n🌐 **Aplicaciones web:** 4-8 semanas\n🤖 **Chatbots:** 2-4 semanas\n📊 **Dashboards:** 2-3 semanas\n\nJuan Pablo usa metodologías ágiles con entregas incrementales. 🚀"
    },
    {
        keywords: ["gratis", "gratuito", "sin costo", "cero"],
        response: "¡'Costo Cero' es el diferenciador de Juan Pablo! 💡\n\nSignifica que usa herramientas gratuitas (Google Workspace, Firebase, etc.) para que **no pagues licencias ni hosting**. Solo inviertes en el desarrollo.\n\nEsto hace sus soluciones accesibles para cualquier tamaño de empresa."
    },
    {
        keywords: ["whatsapp", "telegram", "messenger", "integración"],
        response: "¡Sí! Juan Pablo puede crear chatbots integrados con:\n\n💬 WhatsApp Business API\n📱 Telegram Bot\n🌐 Chat en tu sitio web\n📧 Email automatizado\n\nTodos con IA conversacional para atención 24/7. ¿Te interesa alguna plataforma específica?"
    },
    {
        keywords: ["gracias", "genial", "excelente", "perfecto", "ok"],
        response: "¡De nada! 😊 Si tienes más preguntas, aquí estaré. Y si quieres hablar directamente con Juan Pablo:\n\n📧 jp.ramirez.yanez@gmail.com\n\n¡Éxito con tu proyecto! 🚀"
    },
    {
        keywords: ["video", "videos", "afiche", "flyer", "promoción", "promocion", "multimedia", "contenido", "diseño", "canva"],
        response: "¡Juan Pablo también crea **contenido multimedia** profesional! 🎬\n\n• 📹 Videos promocionales y corporativos\n• 🎨 Afiches y flyers digitales\n• 📊 Presentaciones ejecutivas impactantes\n• 📱 Contenido para redes sociales\n• ✨ Animaciones y motion graphics\n\n**Herramientas:** Canva Pro, CapCut, DaVinci Resolve, AI Image Gen\n\n¿Necesitas material visual para tu proyecto?"
    }
];

// Respuesta por defecto
const DEFAULT_RESPONSE = "Interesante pregunta. Juan Pablo puede ayudarte con:\n\n• Automatización de procesos\n• Desarrollo web\n• Chatbots personalizados\n• Integración de IA\n\n¿Quieres que te cuente más sobre alguno? O puedes contactarlo en: **jp.ramirez.yanez@gmail.com** 📧";

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
                            <h4>ByteBot</h4>
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

    // Convertir markdown básico a HTML
    let formattedText = text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n/g, '<br>');

    messageDiv.innerHTML = `
        <div class="message-content">${formattedText}</div>
        <div class="message-time">${new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' })}</div>
    `;

    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Buscar respuesta en la base de conocimiento
function findResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();

    for (const item of KNOWLEDGE_BASE) {
        for (const keyword of item.keywords) {
            if (lowerMessage.includes(keyword)) {
                return item.response;
            }
        }
    }

    return DEFAULT_RESPONSE;
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

// Procesar mensaje del usuario
function processUserMessage(message) {
    if (!message.trim()) return;

    addMessage(message, true);

    // Simular tiempo de respuesta
    showTypingIndicator();

    setTimeout(() => {
        hideTypingIndicator();
        const response = findResponse(message);
        addMessage(response, false);
    }, 800 + Math.random() * 700);
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
