/* =============================================================================
 * Ya Quedó · Asistente virtual con IA generativa
 * Provider: Groq (Llama 3.3 70B) — gratis, sin tarjeta, ~30 req/min
 *
 * SETUP (3 min):
 * 1. Ve a https://console.groq.com/keys
 * 2. Sign in (Google o GitHub)
 * 3. "Create API Key" → copia la key (empieza con "gsk_...")
 * 4. Pega la key abajo en GROQ_API_KEY
 * 5. Guarda y refresca el navegador
 *
 * PLAN B (si Groq no funciona): cambia AI_PROVIDER a "openrouter"
 *  y configura OPENROUTER_API_KEY (ver instrucciones más abajo).
 * ============================================================================= */

(function () {
    'use strict';

    // =========================================================================
    // CONFIGURACIÓN · cambia esto
    // =========================================================================

    // Opciones: "groq" (recomendado) o "openrouter"
    const AI_PROVIDER = (typeof window !== 'undefined' && window.YQ_AI_PROVIDER) || 'groq';

    // API keys leídas en este orden:
    //   1. window.YQ_GROQ_API_KEY (definido en ai-config.local.js · git-ignored)
    //   2. GitHub Actions inyecta el secret GROQ_API_KEY al desplegar a Pages
    //   3. Fallback al placeholder (bot mostrará warning)
    //
    // Para demo local: crea ai-config.local.js con:
    //   window.YQ_GROQ_API_KEY = 'gsk_tu_key_aqui';
    //
    // Para producción: añade GROQ_API_KEY como GitHub Secret y el workflow
    // .github/workflows/deploy-pages.yml lo inyecta en el deploy.
    //
    // Ver tb2/AI-ASSISTANT-DEPLOY.md para guía completa.

    const GROQ_API_KEY = (typeof window !== 'undefined' && window.YQ_GROQ_API_KEY) || 'YOUR_GROQ_API_KEY_HERE';
    const OPENROUTER_API_KEY = (typeof window !== 'undefined' && window.YQ_OPENROUTER_API_KEY) || 'YOUR_OPENROUTER_API_KEY_HERE';

    // =========================================================================
    // Endpoints (no toques)
    // =========================================================================
    const PROVIDERS = {
        groq: {
            url: 'https://api.groq.com/openai/v1/chat/completions',
            model: 'llama-3.3-70b-versatile',
            key: GROQ_API_KEY,
            extraHeaders: {}
        },
        openrouter: {
            url: 'https://openrouter.ai/api/v1/chat/completions',
            model: 'meta-llama/llama-3.3-70b-instruct:free',
            key: OPENROUTER_API_KEY,
            extraHeaders: {
                'HTTP-Referer': 'https://yagocz.github.io/YaQuedo_TetraDev/',
                'X-Title': 'YaQuedo Asistente'
            }
        }
    };

    // =========================================================================
    // System prompt · tunning del modelo con contexto completo del marketplace
    // =========================================================================
    const SYSTEM_PROMPT = `Eres "YaQuedo Bot", el asistente virtual oficial de **Ya Quedó**, un marketplace peruano que conecta personas con trabajadores técnicos verificados para servicios del hogar en Lima Metropolitana.

═══════════════════════════════════════
CONTEXTO COMPLETO DE LA PLATAFORMA
═══════════════════════════════════════

SERVICIOS DISPONIBLES (6 categorías):
1. Electricidad — instalaciones, tableros, cableado, tomas, iluminación
2. Gasfitería — caños, baños, cocinas, fugas, calentadores, desagües
3. Pintura — paredes, techos, muebles, retoques, esmaltes
4. Cerrajería — chapas, candados, copias de llaves, apertura de puertas
5. Electrodomésticos — refrigeradora, lavadora, microondas, cocina, plancha
6. Limpieza técnica — alfombras, sofás, vidrios, post-construcción

DISTRITOS DE COBERTURA (15 en Lima Metropolitana):
San Miguel, Magdalena, Pueblo Libre, Jesús María, Lince, Miraflores,
San Isidro, Surquillo, Barranco, Chorrillos, San Borja, Surco, La Molina,
Ate, San Luis.

PRECIOS REFERENCIALES (cada trabajador define el suyo, esto es solo orientación):
- Electricidad: S/40 a S/200 según complejidad
- Gasfitería: S/50 a S/250
- Pintura: S/80 a S/300 (depende del m²)
- Cerrajería: S/30 a S/150
- Electrodomésticos: S/60 a S/200
- Limpieza técnica: S/80 a S/400 según área

CÓMO FUNCIONA (paso a paso):
1. El cliente se registra con email y teléfono (verifica con OTP por correo)
2. Busca técnicos filtrando por categoría, distrito, rating mínimo y precio
3. Ve el perfil completo del trabajador: oficios que cubre, distritos donde opera,
   tarifa base, reseñas reales 1-5 estrellas, insignia "Verificado" si su DNI
   fue revisado manualmente por nuestro equipo
4. Envía solicitud describiendo su problema (texto, opcionalmente fotos)
5. El trabajador acepta y propone un monto acordado
6. El cliente agenda fecha y hora; se genera un código de confirmación de 6 chars
7. Al terminar el servicio, el cliente califica de 1 a 5 estrellas con comentario
8. La reseña actualiza el rating promedio del trabajador en su perfil público

SEGURIDAD Y CONFIANZA:
- Verificación manual de DNI por nuestro equipo de Soporte (no automática)
- Insignia "Verificado" visible en perfil
- Sistema de reseñas con cliente identificado (no anónimas)
- Máx 3 solicitudes activas por trabajador (evita saturación)
- Rate-limiting en login (3 intentos, lockout 5 min)

DIFERENCIADOR vs WhatsApp / Facebook / recomendaciones de amigos:
- Trabajadores verificados con DNI
- Reseñas reales con calificación pública
- Histórico de servicios del trabajador
- Cobertura geolocalizada por distrito
- Plataforma con políticas claras y libro de reclamaciones

REGISTRO:
- Cliente: email + teléfono + contraseña + verificación OTP por correo
- Trabajador: lo mismo + opcionalmente subir DNI (anverso, reverso y selfie)
  para obtener insignia "Verificado" después de revisión manual (48h)

CANALES DE SOPORTE:
- Correo: hola@yaquedo.com
- Sitio: botón "Centro de ayuda" en el footer

═══════════════════════════════════════
TU PERSONALIDAD Y ESTILO
═══════════════════════════════════════

- Tono cálido, conversacional, español de Perú informal pero profesional
- Trata de "tú" al usuario (no "usted")
- Usa expresiones naturales pero NO uses jergas marcadas (no "pe", no "causa")
- Respuestas concisas: 2-4 oraciones por respuesta normal, listas cortas si ayuda
- Si saludan, responde con saludo cálido y ofrece ayuda específica
- Si el usuario te cuenta su problema (ej. "tengo una fuga en el baño"),
  recomienda la categoría correcta ("Necesitarías un gasfitero")
- Sugiere distritos cercanos al que mencione el usuario:
  · San Miguel ↔ Magdalena, Pueblo Libre
  · Miraflores ↔ Barranco, San Isidro, Surquillo
  · San Isidro ↔ Lince, Miraflores, San Borja
  · Surco ↔ Surquillo, San Borja, La Molina
  · La Molina ↔ Surco, Ate
  · Chorrillos ↔ Barranco
- Si preguntan por "mejor trabajador" o "mejor servicio", explica que se filtran
  por rating de 4+ estrellas y se ven las reseñas reales en cada perfil
- Si quieren contratar, indica que se registren con el botón "Registrarse" del menú
- Para reclamos o problemas serios, redirige a hola@yaquedo.com

═══════════════════════════════════════
REGLAS ESTRICTAS
═══════════════════════════════════════

1. SOLO respondes preguntas sobre Ya Quedó (servicios, distritos, precios,
   registro, contratación, seguridad, soporte, cómo funciona).

2. Si la pregunta es OFF-TOPIC (clima, política, deportes, programación, otros
   marketplaces, recetas, etc.), responde algo como:
   "Esa pregunta está fuera de mi tema. Yo soy el asistente de Ya Quedó y solo
   te puedo ayudar con servicios técnicos del hogar, registro, búsqueda de
   trabajadores y cómo funciona la plataforma. ¿En qué te puedo ayudar de eso?"

3. NUNCA inventes nombres específicos de trabajadores ni precios fijos.
   Si preguntan "¿cuánto cobra Juan Pérez?" responde que los precios están en
   el perfil público de cada trabajador.

4. NUNCA prometas plazos de respuesta exactos del trabajador.

5. NUNCA pidas datos personales sensibles (DNI, tarjeta, contraseña).

6. Si no sabes algo concreto, di "no tengo esa información, te recomiendo
   escribir a hola@yaquedo.com".

7. Mantén respuestas en español peruano. NO uses inglés salvo nombres técnicos.

8. NO uses emojis a menos que el usuario los use primero, y entonces máximo uno.
`;

    // =========================================================================
    // DOM
    // =========================================================================
    const toggleBtn = document.getElementById('yqAiToggle');
    const panel = document.getElementById('yqAiPanel');
    const closeBtn = document.getElementById('yqAiClose');
    const form = document.getElementById('yqAiForm');
    const input = document.getElementById('yqAiInput');
    const messagesBox = document.getElementById('yqAiMessages');

    if (!toggleBtn || !panel) return;

    // =========================================================================
    // Historial multi-turn
    // =========================================================================
    const history = [];

    // =========================================================================
    // Helpers UI
    // =========================================================================
    function appendMessage(text, who) {
        const div = document.createElement('div');
        div.className = `yq-ai-msg yq-ai-msg-${who}`;
        div.innerHTML = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>')
            .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.+?)\*/g, '<em>$1</em>');
        messagesBox.appendChild(div);
        messagesBox.scrollTop = messagesBox.scrollHeight;
        return div;
    }

    function appendTyping() {
        const div = document.createElement('div');
        div.className = 'yq-ai-msg yq-ai-msg-bot yq-ai-typing';
        div.innerHTML = '<span></span><span></span><span></span>';
        messagesBox.appendChild(div);
        messagesBox.scrollTop = messagesBox.scrollHeight;
        return div;
    }

    function openPanel() {
        panel.setAttribute('aria-hidden', 'false');
        panel.classList.add('yq-ai-panel-open');
        toggleBtn.setAttribute('aria-expanded', 'true');
        setTimeout(() => input?.focus(), 150);
    }

    function closePanel() {
        panel.setAttribute('aria-hidden', 'true');
        panel.classList.remove('yq-ai-panel-open');
        toggleBtn.setAttribute('aria-expanded', 'false');
    }

    // =========================================================================
    // Llamada a la API (formato OpenAI-compatible, sirve para Groq y OpenRouter)
    // =========================================================================
    async function askAi(userMessage) {
        const config = PROVIDERS[AI_PROVIDER];
        if (!config) {
            return '⚠️ Provider IA no válido. Revisa la configuración del bot.';
        }
        if (!config.key || config.key.startsWith('YOUR_')) {
            return `⚠️ El asistente no está configurado. El administrador debe agregar una API key de ${AI_PROVIDER === 'groq' ? 'Groq' : 'OpenRouter'} en \`ai-assistant.js\`.`;
        }

        history.push({ role: 'user', content: userMessage });

        const messages = [
            { role: 'system', content: SYSTEM_PROMPT },
            ...history
        ];

        const body = {
            model: config.model,
            messages: messages,
            temperature: 0.7,
            max_tokens: 500,
            top_p: 0.9,
            stream: false
        };

        try {
            const res = await fetch(config.url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${config.key}`,
                    ...config.extraHeaders
                },
                body: JSON.stringify(body)
            });

            if (!res.ok) {
                const err = await res.json().catch(() => ({}));
                console.error(`${AI_PROVIDER} API error`, err);
                history.pop();
                if (res.status === 401) return 'La API key del asistente está mal o expirada. Avísale al administrador.';
                if (res.status === 429) return 'El asistente está saturado en este momento. Intenta en 1 minuto.';
                return 'Tuve un problema técnico para procesar tu pregunta. Intenta de nuevo en unos segundos.';
            }

            const data = await res.json();
            const answer = data?.choices?.[0]?.message?.content?.trim()
                || 'No tengo una respuesta clara para eso. ¿Puedes reformular?';

            history.push({ role: 'assistant', content: answer });

            // Limita historial a las últimas 20 interacciones para no saturar tokens
            if (history.length > 20) history.splice(0, history.length - 20);

            return answer;

        } catch (e) {
            console.error('Network error', e);
            history.pop();
            return 'No pude conectar con el asistente. Verifica tu conexión a internet.';
        }
    }

    // =========================================================================
    // Eventos
    // =========================================================================
    toggleBtn.addEventListener('click', () => {
        if (panel.classList.contains('yq-ai-panel-open')) closePanel(); else openPanel();
    });

    closeBtn?.addEventListener('click', closePanel);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && panel.classList.contains('yq-ai-panel-open')) closePanel();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        appendMessage(text, 'user');
        input.value = '';
        input.disabled = true;

        const typing = appendTyping();
        const answer = await askAi(text);
        typing.remove();
        appendMessage(answer, 'bot');

        input.disabled = false;
        input.focus();
    });

})();
