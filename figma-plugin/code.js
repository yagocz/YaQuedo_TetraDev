/**
 * Ya Quedó · Generator v2 — Plugin de Figma
 *
 * Genera automáticamente:
 *   1) Design System completo (colores, gradientes, tipografía Inter, sombras)
 *   2) Componentes: Button/Primary, Button/Secondary, Navbar/Desktop
 *   3) Landing Desktop completa con las 14 secciones pobladas con contenido real
 *   4) Landing Mobile como frame espejo con secciones identificadas
 *
 * Después de correr este plugin, el usuario solo debe refinar visuales
 * (íconos específicos, ajustes finos) y aplicar el mismo esquema al Mobile.
 */

(async function main() {
    // =========================================================================
    // 1) UTILIDADES
    // =========================================================================
    function hexToRgb(hex) {
        const h = hex.replace('#', '');
        const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
        const n = parseInt(full, 16);
        return { r: ((n >> 16) & 255) / 255, g: ((n >> 8) & 255) / 255, b: (n & 255) / 255 };
    }

    function solidFill(hex, opacity) {
        return { type: 'SOLID', color: hexToRgb(hex), opacity: opacity == null ? 1 : opacity };
    }

    function linearGradient(from, to, angleDeg) {
        var a = (angleDeg || 135) * Math.PI / 180;
        var c = Math.cos(a), s = Math.sin(a);
        var fromRgb = hexToRgb(from);
        var toRgb = hexToRgb(to);
        return {
            type: 'GRADIENT_LINEAR',
            gradientTransform: [[c, -s, (1 - c + s) / 2], [s, c, (1 - s - c) / 2]],
            gradientStops: [
                { position: 0, color: { r: fromRgb.r, g: fromRgb.g, b: fromRgb.b, a: 1 } },
                { position: 1, color: { r: toRgb.r, g: toRgb.g, b: toRgb.b, a: 1 } }
            ]
        };
    }

    // =========================================================================
    // 2) CARGA DE FUENTES CON FALLBACK
    // =========================================================================
    async function tryLoad(family, style) {
        try { await figma.loadFontAsync({ family: family, style: style }); return true; }
        catch (e) { return false; }
    }

    var fontFamily = 'Inter';
    var hasInter = await tryLoad('Inter', 'Regular');
    if (!hasInter) {
        var hasRoboto = await tryLoad('Roboto', 'Regular');
        fontFamily = hasRoboto ? 'Roboto' : 'Inter';
    }

    var weightList = ['Regular', 'Medium', 'Semi Bold', 'Bold', 'Extra Bold'];
    var loadedWeight = {};
    for (var wi = 0; wi < weightList.length; wi++) {
        var ok = await tryLoad(fontFamily, weightList[wi]);
        loadedWeight[weightList[wi]] = ok ? weightList[wi] : 'Regular';
    }
    function resolveStyle(w) { return loadedWeight[w] || 'Regular'; }

    // =========================================================================
    // 3) PAINT STYLES (colores + gradientes)
    // =========================================================================
    var paintStyles = {};
    var textStyles = {};
    var effectStyles = {};

    var colorTokens = [
        ['Color/primary',        '#6366F1'],
        ['Color/primary-dark',   '#4F46E5'],
        ['Color/primary-light',  '#818CF8'],
        ['Color/secondary',      '#EC4899'],
        ['Color/accent',         '#10B981'],
        ['Color/dark',           '#1F2937'],
        ['Color/gray',           '#6B7280'],
        ['Color/light-gray',     '#F3F4F6'],
        ['Color/white',          '#FFFFFF'],
        ['Color/error',          '#EF4444'],
    ];
    var gradientTokens = [
        ['Gradient/primary', '#6366F1', '#4F46E5'],
        ['Gradient/accent',  '#EC4899', '#10B981'],
        ['Gradient/hero',    '#667EEA', '#764BA2'],
    ];

    for (var i = 0; i < colorTokens.length; i++) {
        var ct = colorTokens[i];
        var ps = figma.createPaintStyle();
        ps.name = ct[0];
        ps.paints = [solidFill(ct[1])];
        paintStyles[ct[0]] = ps;
    }
    for (var g = 0; g < gradientTokens.length; g++) {
        var gt = gradientTokens[g];
        var gs = figma.createPaintStyle();
        gs.name = gt[0];
        gs.paints = [linearGradient(gt[1], gt[2], 135)];
        paintStyles[gt[0]] = gs;
    }

    // =========================================================================
    // 4) TEXT STYLES
    // =========================================================================
    var textTokens = [
        ['Text/h1',          56, 'Bold',       120],
        ['Text/h2',          40, 'Bold',       120],
        ['Text/h3',          30, 'Bold',       120],
        ['Text/h4',          24, 'Bold',       120],
        ['Text/h5',          20, 'Bold',       120],
        ['Text/body-lg',     20, 'Regular',    160],
        ['Text/body',        16, 'Regular',    160],
        ['Text/body-sm',     14, 'Regular',    160],
        ['Text/button',      16, 'Semi Bold',  100],
        ['Text/stat-number', 48, 'Bold',       100],
        ['Text/logo',        24, 'Extra Bold', 120],
    ];
    for (var t = 0; t < textTokens.length; t++) {
        var tt = textTokens[t];
        var ts = figma.createTextStyle();
        ts.name = tt[0];
        ts.fontName = { family: fontFamily, style: resolveStyle(tt[2]) };
        ts.fontSize = tt[1];
        ts.lineHeight = { value: tt[3], unit: 'PERCENT' };
        textStyles[tt[0]] = ts;
    }

    // =========================================================================
    // 5) EFFECT STYLES (shadows)
    // =========================================================================
    var shadowTokens = [
        ['Shadow/sm', 0, 1,  2, 0,  0.05],
        ['Shadow/md', 0, 4,  6, -1, 0.10],
        ['Shadow/lg', 0, 10, 15, -3, 0.10],
        ['Shadow/xl', 0, 20, 25, -5, 0.10],
    ];
    for (var sh = 0; sh < shadowTokens.length; sh++) {
        var st = shadowTokens[sh];
        var es = figma.createEffectStyle();
        es.name = st[0];
        es.effects = [{
            type: 'DROP_SHADOW',
            color: { r: 0, g: 0, b: 0, a: st[5] },
            offset: { x: st[1], y: st[2] },
            radius: st[3], spread: st[4],
            visible: true, blendMode: 'NORMAL'
        }];
        effectStyles[st[0]] = es;
    }

    // =========================================================================
    // 6) HELPERS DE CREACIÓN
    // =========================================================================
    function makeText(parent, content, opts) {
        opts = opts || {};
        var txt = figma.createText();
        txt.fontName = { family: fontFamily, style: resolveStyle(opts.weight || 'Regular') };
        txt.fontSize = opts.size || 16;
        txt.characters = String(content == null ? '' : content);
        if (opts.color) txt.fills = [solidFill(opts.color, opts.opacity)];
        if (opts.textStyle && textStyles[opts.textStyle]) txt.textStyleId = textStyles[opts.textStyle].id;
        if (opts.lineHeight) txt.lineHeight = { value: opts.lineHeight, unit: 'PERCENT' };
        if (opts.align) txt.textAlignHorizontal = opts.align;
        if (opts.w) {
            txt.textAutoResize = 'HEIGHT';
            txt.resize(opts.w, txt.height);
        }
        if (opts.name) txt.name = opts.name;
        if (parent) parent.appendChild(txt);
        return txt;
    }

    function makeFrame(parent, opts) {
        opts = opts || {};
        var f = figma.createFrame();
        if (opts.name) f.name = opts.name;
        if (opts.w != null && opts.h != null) f.resize(opts.w, opts.h);
        else if (opts.w != null) f.resize(opts.w, f.height);
        else if (opts.h != null) f.resize(f.width, opts.h);
        if (opts.bgGradient) {
            f.fills = [linearGradient(opts.bgGradient[0], opts.bgGradient[1], opts.bgGradient[2] || 135)];
        } else if (opts.bg === null || opts.bg === 'transparent') {
            f.fills = [];
        } else if (opts.bg) {
            f.fills = [solidFill(opts.bg, opts.bgOpacity)];
        }
        if (opts.radius != null) f.cornerRadius = opts.radius;
        if (opts.stroke) {
            f.strokes = [solidFill(opts.stroke)];
            f.strokeWeight = opts.strokeWeight || 1;
        }
        if (opts.shadow && effectStyles[opts.shadow]) f.effectStyleId = effectStyles[opts.shadow].id;
        if (opts.clip === true) f.clipsContent = true;
        if (opts.dir) {
            f.layoutMode = opts.dir;
            if (opts.primaryAlign) f.primaryAxisAlignItems = opts.primaryAlign;
            if (opts.counterAlign) f.counterAxisAlignItems = opts.counterAlign;
            if (opts.gap != null) f.itemSpacing = opts.gap;
            if (opts.padding != null) {
                f.paddingTop = opts.padding; f.paddingBottom = opts.padding;
                f.paddingLeft = opts.padding; f.paddingRight = opts.padding;
            }
            if (opts.paddingH != null) { f.paddingLeft = opts.paddingH; f.paddingRight = opts.paddingH; }
            if (opts.paddingV != null) { f.paddingTop = opts.paddingV; f.paddingBottom = opts.paddingV; }
            if (opts.primarySizing) f.primaryAxisSizingMode = opts.primarySizing;
            if (opts.counterSizing) f.counterAxisSizingMode = opts.counterSizing;
        }
        if (parent) parent.appendChild(f);
        return f;
    }

    // Círculo "icono" con letra o símbolo dentro (placeholder para iconos reales)
    function iconCircle(parent, size, bgHex, label, labelColor, useGradient) {
        var c = makeFrame(parent, {
            w: size, h: size,
            bg: useGradient ? null : bgHex,
            bgGradient: useGradient || null,
            radius: size / 2,
            dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            name: 'Icon'
        });
        makeText(c, label || '●', {
            size: Math.round(size * 0.42),
            weight: 'Bold',
            color: labelColor || '#FFFFFF'
        });
        return c;
    }

    // Cuadrado "icono" con gradiente (para service cards)
    function iconSquare(parent, size, gradient, label) {
        var c = makeFrame(parent, {
            w: size, h: size,
            bgGradient: gradient,
            radius: Math.round(size * 0.21),
            dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            name: 'IconSquare'
        });
        makeText(c, label || '●', {
            size: Math.round(size * 0.42),
            weight: 'Bold',
            color: '#FFFFFF'
        });
        return c;
    }

    // Chip redondeado con texto
    function chip(parent, label, bgHex, txtColor) {
        var c = makeFrame(parent, {
            bg: bgHex,
            radius: 999,
            dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            paddingV: 6, paddingH: 12,
            gap: 4,
            primarySizing: 'AUTO', counterSizing: 'AUTO',
            name: 'Chip'
        });
        makeText(c, label, {
            size: 12, weight: 'Semi Bold',
            color: txtColor || '#FFFFFF'
        });
        return c;
    }

    // Botón stand-alone (no componente)
    function button(parent, label, variant) {
        // variant: 'primary' | 'secondary' | 'cta-primary' | 'cta-secondary'
        var bg = '#6366F1', color = '#FFFFFF', stroke = null, useGradient = null;
        if (variant === 'primary') {
            useGradient = ['#6366F1', '#4F46E5', 135];
            color = '#FFFFFF';
        } else if (variant === 'secondary') {
            bg = '#FFFFFF'; color = '#6366F1'; stroke = '#6366F1';
        } else if (variant === 'cta-primary') {
            bg = '#FFFFFF'; color = '#6366F1';
        } else if (variant === 'cta-secondary') {
            bg = 'transparent'; color = '#FFFFFF'; stroke = '#FFFFFF';
        }
        var btn = makeFrame(parent, {
            name: 'Button · ' + label,
            bg: bg === 'transparent' ? null : bg,
            bgGradient: useGradient,
            radius: 8,
            dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            paddingV: 14, paddingH: 32,
            primarySizing: 'AUTO', counterSizing: 'AUTO',
            stroke: stroke, strokeWeight: 2
        });
        if (bg === 'transparent') btn.fills = [];
        makeText(btn, label, { size: 16, weight: 'Semi Bold', color: color });
        return btn;
    }

    // Card base
    function card(parent, opts) {
        opts = opts || {};
        var c = makeFrame(parent, {
            name: opts.name || 'Card',
            bg: opts.bg || '#FFFFFF',
            radius: opts.radius != null ? opts.radius : 16,
            dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: opts.center ? 'CENTER' : 'MIN',
            padding: opts.padding != null ? opts.padding : 32,
            gap: opts.gap != null ? opts.gap : 16,
            shadow: opts.shadow || 'Shadow/md',
            primarySizing: 'AUTO', counterSizing: opts.w ? 'FIXED' : 'AUTO',
            stroke: opts.stroke, strokeWeight: opts.strokeWeight || 1,
            w: opts.w, h: opts.h
        });
        return c;
    }

    // Construye una sección full-width con container interno centrado (max 1200)
    function section(parent, opts) {
        opts = opts || {};
        var sec = makeFrame(parent, {
            name: opts.name,
            w: 1440, h: opts.h,
            bg: opts.bg || null,
            bgGradient: opts.bgGradient,
            dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            paddingV: opts.padV != null ? opts.padV : 80,
            paddingH: opts.padH != null ? opts.padH : 32,
            gap: opts.gap || 24,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            clip: true
        });
        return sec;
    }

    // Título de sección (H2 + subtítulo)
    function sectionTitle(parent, h2Text, subtitle, dark) {
        var holder = makeFrame(parent, {
            name: 'SectionTitle',
            bg: null,
            dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 12,
            primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        makeText(holder, h2Text, {
            size: 40, weight: 'Bold', color: dark ? '#FFFFFF' : '#1F2937',
            align: 'CENTER', w: 600
        });
        if (subtitle) {
            makeText(holder, subtitle, {
                size: 18, weight: 'Regular',
                color: dark ? '#FFFFFF' : '#6B7280',
                opacity: dark ? 0.9 : 1,
                align: 'CENTER', w: 600
            });
        }
        return holder;
    }

    // =========================================================================
    // 7) COMPONENTES PRINCIPALES (Button/Primary, Button/Secondary, Navbar)
    // =========================================================================
    var componentsX = 0, componentsY = -1200; // zona arriba-izquierda para los componentes

    // Button/Primary componente
    var btnPrimaryCmp = figma.createComponent();
    btnPrimaryCmp.name = 'Button/Primary';
    btnPrimaryCmp.layoutMode = 'HORIZONTAL';
    btnPrimaryCmp.primaryAxisAlignItems = 'CENTER';
    btnPrimaryCmp.counterAxisAlignItems = 'CENTER';
    btnPrimaryCmp.primaryAxisSizingMode = 'AUTO';
    btnPrimaryCmp.counterAxisSizingMode = 'AUTO';
    btnPrimaryCmp.paddingLeft = 32; btnPrimaryCmp.paddingRight = 32;
    btnPrimaryCmp.paddingTop = 14; btnPrimaryCmp.paddingBottom = 14;
    btnPrimaryCmp.cornerRadius = 8;
    if (paintStyles['Gradient/primary']) btnPrimaryCmp.fillStyleId = paintStyles['Gradient/primary'].id;
    if (effectStyles['Shadow/md']) btnPrimaryCmp.effectStyleId = effectStyles['Shadow/md'].id;
    var bpText = figma.createText();
    bpText.fontName = { family: fontFamily, style: resolveStyle('Semi Bold') };
    bpText.fontSize = 16;
    bpText.characters = 'Registrarse';
    bpText.fills = [solidFill('#FFFFFF')];
    btnPrimaryCmp.appendChild(bpText);
    btnPrimaryCmp.x = componentsX; btnPrimaryCmp.y = componentsY;

    // Button/Secondary componente
    var btnSecondaryCmp = figma.createComponent();
    btnSecondaryCmp.name = 'Button/Secondary';
    btnSecondaryCmp.layoutMode = 'HORIZONTAL';
    btnSecondaryCmp.primaryAxisAlignItems = 'CENTER';
    btnSecondaryCmp.counterAxisAlignItems = 'CENTER';
    btnSecondaryCmp.primaryAxisSizingMode = 'AUTO';
    btnSecondaryCmp.counterAxisSizingMode = 'AUTO';
    btnSecondaryCmp.paddingLeft = 32; btnSecondaryCmp.paddingRight = 32;
    btnSecondaryCmp.paddingTop = 14; btnSecondaryCmp.paddingBottom = 14;
    btnSecondaryCmp.cornerRadius = 8;
    btnSecondaryCmp.fills = [solidFill('#FFFFFF')];
    btnSecondaryCmp.strokes = [solidFill('#6366F1')];
    btnSecondaryCmp.strokeWeight = 2;
    var bsText = figma.createText();
    bsText.fontName = { family: fontFamily, style: resolveStyle('Semi Bold') };
    bsText.fontSize = 16;
    bsText.characters = 'Ofrecer mis servicios';
    bsText.fills = [solidFill('#6366F1')];
    btnSecondaryCmp.appendChild(bsText);
    btnSecondaryCmp.x = componentsX + 200; btnSecondaryCmp.y = componentsY;

    // Navbar/Desktop componente
    var navbarCmp = figma.createComponent();
    navbarCmp.name = 'Navbar/Desktop';
    navbarCmp.resize(1440, 70);
    navbarCmp.layoutMode = 'HORIZONTAL';
    navbarCmp.primaryAxisAlignItems = 'CENTER';
    navbarCmp.counterAxisAlignItems = 'CENTER';
    navbarCmp.primaryAxisSizingMode = 'FIXED';
    navbarCmp.counterAxisSizingMode = 'FIXED';
    navbarCmp.paddingLeft = 32; navbarCmp.paddingRight = 32;
    navbarCmp.fills = [solidFill('#FFFFFF', 0.95)];
    if (effectStyles['Shadow/sm']) navbarCmp.effectStyleId = effectStyles['Shadow/sm'].id;
    navbarCmp.x = componentsX + 450; navbarCmp.y = componentsY;

    var logo = figma.createText();
    logo.fontName = { family: fontFamily, style: resolveStyle('Extra Bold') };
    logo.fontSize = 24;
    logo.characters = 'Ya Quedó';
    logo.fills = [solidFill('#6366F1')];
    navbarCmp.appendChild(logo);

    // Spacer
    var spacer = figma.createFrame();
    spacer.resize(1, 1);
    spacer.fills = [];
    spacer.layoutGrow = 1;
    navbarCmp.appendChild(spacer);

    // Menú horizontal
    var menu = figma.createFrame();
    menu.layoutMode = 'HORIZONTAL';
    menu.primaryAxisAlignItems = 'CENTER';
    menu.counterAxisAlignItems = 'CENTER';
    menu.primaryAxisSizingMode = 'AUTO';
    menu.counterAxisSizingMode = 'AUTO';
    menu.itemSpacing = 24;
    menu.fills = [];
    navbarCmp.appendChild(menu);

    var navItems = ['Inicio', 'Servicios', 'Cómo funciona', 'Trabajadores', 'FAQ', 'Iniciar sesión'];
    for (var ni = 0; ni < navItems.length; ni++) {
        var link = figma.createText();
        link.fontName = { family: fontFamily, style: resolveStyle('Medium') };
        link.fontSize = 16;
        link.characters = navItems[ni];
        link.fills = [solidFill('#1F2937')];
        menu.appendChild(link);
    }

    // Botón "Registrarse" inline (no instancia para mantener control)
    var regBtn = makeFrame(menu, {
        bg: null, bgGradient: ['#6366F1', '#4F46E5', 135],
        radius: 8,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 10, paddingH: 20,
        primarySizing: 'AUTO', counterSizing: 'AUTO',
        shadow: 'Shadow/sm',
        name: 'Nav Register'
    });
    makeText(regBtn, 'Registrarse', { size: 14, weight: 'Semi Bold', color: '#FFFFFF' });

    // Language switcher
    var switcher = makeFrame(menu, {
        bg: '#F3F4F6',
        radius: 999,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 3, paddingH: 3,
        gap: 2,
        primarySizing: 'AUTO', counterSizing: 'AUTO',
        name: 'Lang Switcher'
    });
    var esBtn = makeFrame(switcher, {
        bg: '#FFFFFF', radius: 999,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 4, paddingH: 10,
        primarySizing: 'AUTO', counterSizing: 'AUTO',
        shadow: 'Shadow/sm'
    });
    makeText(esBtn, 'ES', { size: 12, weight: 'Bold', color: '#6366F1' });
    var enBtn = makeFrame(switcher, {
        bg: null, radius: 999,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 4, paddingH: 10,
        primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    enBtn.fills = [];
    makeText(enBtn, 'EN', { size: 12, weight: 'Bold', color: '#6B7280' });

    // =========================================================================
    // 8) DESKTOP LANDING — 14 SECCIONES POBLADAS
    // =========================================================================
    var landing = figma.createFrame();
    landing.name = '🖥 Desktop · Landing';
    landing.resize(1440, 10);
    landing.x = 0; landing.y = 0;
    landing.fills = [solidFill('#FFFFFF')];
    landing.layoutMode = 'VERTICAL';
    landing.primaryAxisSizingMode = 'AUTO';
    landing.counterAxisSizingMode = 'FIXED';
    landing.primaryAxisAlignItems = 'MIN';
    landing.counterAxisAlignItems = 'CENTER';
    landing.itemSpacing = 0;
    landing.clipsContent = true;

    // Insertamos instancia del navbar arriba
    var navInstance = navbarCmp.createInstance();
    landing.appendChild(navInstance);

    // -------------------------------------------------------- HERO
    var hero = section(landing, {
        name: 'Hero',
        bgGradient: ['#667EEA', '#764BA2', 135],
        h: 620, padV: 128
    });
    var heroInner = makeFrame(hero, {
        bg: null,
        dir: 'VERTICAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 24,
        primarySizing: 'AUTO', counterSizing: 'AUTO',
        w: 900
    });
    heroInner.fills = [];
    makeText(heroInner, 'Encuentra el servicio que necesitas, al instante', {
        size: 56, weight: 'Bold', color: '#FFFFFF',
        align: 'CENTER', w: 900
    });
    makeText(heroInner, 'Conectamos personas con trabajadores independientes de confianza en el Perú. Rápido, seguro y transparente.', {
        size: 20, weight: 'Regular', color: '#FFFFFF', opacity: 0.9,
        align: 'CENTER', w: 760
    });
    var heroBtns = makeFrame(heroInner, {
        bg: null,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 16,
        primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    heroBtns.fills = [];
    button(heroBtns, 'Buscar servicio', 'cta-primary');
    button(heroBtns, 'Ofrecer mis servicios', 'cta-secondary');

    // -------------------------------------------------------- PROBLEMA
    var problem = section(landing, {
        name: 'Problema', bg: '#F3F4F6', h: 560
    });
    sectionTitle(problem, 'El desafío que enfrentamos',
        'La informalidad laboral en el Perú afecta a millones de trabajadores y clientes');
    var problemGrid = makeFrame(problem, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    problemGrid.fills = [];
    var problemCards = [
        ['🔍', 'Dificultad para encontrar servicios', 'Los clientes pierden tiempo y esfuerzo buscando profesionales confiables y verificados.'],
        ['$', 'Precios poco transparentes', 'Falta de claridad en los costos y temor a estafas o trabajos mal ejecutados.'],
        ['💼', 'Informalidad laboral', 'Más del 60% de los trabajadores en el Perú no tienen acceso a beneficios laborales ni formalización.']
    ];
    for (var pc = 0; pc < problemCards.length; pc++) {
        var pcc = card(problemGrid, { w: 360 });
        iconCircle(pcc, 60, null, problemCards[pc][0], '#FFFFFF', ['#EC4899', '#10B981', 135]);
        makeText(pcc, problemCards[pc][1], { size: 22, weight: 'Bold', color: '#1F2937', w: 296 });
        makeText(pcc, problemCards[pc][2], { size: 15, weight: 'Regular', color: '#6B7280', w: 296 });
    }

    // -------------------------------------------------------- SOLUCIÓN
    var solution = section(landing, {
        name: 'Solución', bg: '#FFFFFF', h: 520, gap: 0
    });
    var solutionRow = makeFrame(solution, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 64, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    solutionRow.fills = [];
    var solLeft = makeFrame(solutionRow, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO',
        w: 568
    });
    solLeft.fills = [];
    makeText(solLeft, 'La solución: Ya Quedó', { size: 18, weight: 'Bold', color: '#6366F1' });
    makeText(solLeft, 'Transformando la forma de conectar servicios locales', {
        size: 36, weight: 'Bold', color: '#1F2937', w: 568
    });
    makeText(solLeft, 'Creamos una plataforma que revoluciona el mercado de servicios informales, ofreciendo confianza, rapidez y oportunidades de formalización para todos.', {
        size: 16, weight: 'Regular', color: '#6B7280', w: 568
    });
    var solFeatures = [
        'Verificación de identidad y habilidades',
        'Sistema de calificación transparente',
        'Pagos seguros y garantizados',
        'Capacitación y certificación interna',
        'Geolocalización precisa'
    ];
    var solList = makeFrame(solLeft, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 10, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    solList.fills = [];
    for (var sf = 0; sf < solFeatures.length; sf++) {
        var row = makeFrame(solList, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        row.fills = [];
        makeText(row, '✓', { size: 18, weight: 'Bold', color: '#10B981' });
        makeText(row, solFeatures[sf], { size: 16, weight: 'Regular', color: '#1F2937' });
    }
    var solRight = makeFrame(solutionRow, {
        bg: null, bgGradient: ['#6366F1', '#4F46E5', 135],
        radius: 16, dir: 'VERTICAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 12, padding: 40,
        primarySizing: 'FIXED', counterSizing: 'FIXED',
        w: 568, h: 320,
        shadow: 'Shadow/lg'
    });
    makeText(solRight, 'YQ', { size: 64, weight: 'Extra Bold', color: '#FFFFFF' });
    makeText(solRight, 'Tecnología para el progreso', { size: 24, weight: 'Bold', color: '#FFFFFF', align: 'CENTER' });
    makeText(solRight, 'Utilizamos IA y algoritmos avanzados para conectar a las personas correctas', {
        size: 15, weight: 'Regular', color: '#FFFFFF', opacity: 0.9, align: 'CENTER', w: 400
    });

    // -------------------------------------------------------- CÓMO FUNCIONA
    var how = section(landing, {
        name: 'Cómo funciona', bg: '#F3F4F6', h: 560
    });
    sectionTitle(how, 'Así de fácil funciona', 'En solo 4 pasos simples puedes encontrar o ofrecer servicios');
    var howGrid = makeFrame(how, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    howGrid.fills = [];
    var steps = [
        ['1', 'Regístrate gratis',    'Crea tu perfil en menos de 2 minutos. Verificamos tu identidad para mayor seguridad.'],
        ['2', 'Busca o publica',      'Encuentra profesionales cercanos o publica tu servicio. Nuestro algoritmo te conecta al instante.'],
        ['3', 'Coordina y confirma',  'Chatea directamente, acuerda detalles y confirma el servicio con pago seguro.'],
        ['4', 'Califica y repite',    'Al finalizar, califica el servicio y ayuda a construir una comunidad más confiable.']
    ];
    for (var sp = 0; sp < steps.length; sp++) {
        var sc = card(howGrid, { w: 264, center: true });
        iconCircle(sc, 50, null, steps[sp][0], '#FFFFFF', ['#6366F1', '#4F46E5', 135]);
        makeText(sc, steps[sp][1], { size: 20, weight: 'Bold', color: '#1F2937', align: 'CENTER', w: 200 });
        makeText(sc, steps[sp][2], { size: 14, weight: 'Regular', color: '#6B7280', align: 'CENTER', w: 200 });
    }

    // -------------------------------------------------------- SERVICIOS (US-03)
    var services = section(landing, {
        name: 'Servicios', bg: '#FFFFFF', h: 680
    });
    sectionTitle(services, 'Servicios disponibles', 'Más de 6 categorías iniciales para resolver lo que necesites en casa');
    var servicesGrid = makeFrame(services, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    servicesGrid.fills = [];
    var svcRows = [
        [['⚡', 'Electricidad', 'Instalación, reparación y mantenimiento eléctrico certificado.'],
         ['🔧', 'Gasfitería',   'Fugas, desatoros y reparación de tuberías con garantía.'],
         ['🎨', 'Pintura',      'Interiores y exteriores con acabados profesionales.']],
        [['🔑', 'Cerrajería',         'Emergencias 24/7, cambio de cerraduras y llaves.'],
         ['🧯', 'Electrodomésticos', 'Reparación de lavadoras, refrigeradoras, microondas y más.'],
         ['🧹', 'Limpieza técnica',  'Limpieza profunda de tanques, aires y fachadas.']]
    ];
    for (var rIdx = 0; rIdx < 2; rIdx++) {
        var rowSvc = makeFrame(servicesGrid, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 0, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        rowSvc.fills = [];
    }
    // Grid de 3 columnas × 2 filas aplanado
    var servicesFlat = [];
    for (var a = 0; a < 2; a++) for (var b = 0; b < 3; b++) servicesFlat.push(svcRows[a][b]);
    // Reconstruyo el grid como 3 columnas
    // Figma no tiene grid nativo, hago 2 filas horizontales dentro de una vertical
    servicesGrid.layoutMode = 'VERTICAL';
    servicesGrid.itemSpacing = 24;
    for (var rr = 0; rr < 2; rr++) {
        var rowF = makeFrame(servicesGrid, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'MIN',
            gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        rowF.fills = [];
        for (var cc = 0; cc < 3; cc++) {
            var svcData = svcRows[rr][cc];
            var svcCard = card(rowF, {
                w: 376, stroke: '#F3F4F6', shadow: 'Shadow/sm', padding: 28, gap: 12
            });
            iconSquare(svcCard, 56, ['#6366F1', '#4F46E5', 135], svcData[0]);
            makeText(svcCard, svcData[1], { size: 20, weight: 'Bold', color: '#1F2937' });
            makeText(svcCard, svcData[2], { size: 15, weight: 'Regular', color: '#6B7280', w: 320 });
        }
    }

    // -------------------------------------------------------- BENEFICIOS
    var benefits = section(landing, {
        name: 'Beneficios', bg: '#FFFFFF', h: 640
    });
    sectionTitle(benefits, 'Beneficios para todos', 'Diseñado pensando tanto en clientes como en trabajadores');
    var benRow = makeFrame(benefits, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 48, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    benRow.fills = [];
    var benGroups = [
        ['🎯 Para Clientes', [
            'Ahorra tiempo buscando profesionales verificados',
            'Precios transparentes y competitivos',
            'Protección con pagos seguros',
            'Acceso a calificaciones reales de otros usuarios',
            'Atención inmediata y geolocalización precisa',
            'Garantía de satisfacción en cada servicio'
        ]],
        ['💼 Para Trabajadores', [
            'Acceso a más clientes sin costo de marketing',
            'Recibe pagos de forma segura y rápida',
            'Construye tu reputación profesional',
            'Capacitación gratuita y certificaciones',
            'Flexibilidad para elegir tus horarios',
            'Camino hacia la formalización laboral'
        ]]
    ];
    for (var bg_ = 0; bg_ < benGroups.length; bg_++) {
        var benCol = makeFrame(benRow, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO',
            w: 520
        });
        benCol.fills = [];
        makeText(benCol, benGroups[bg_][0], {
            size: 24, weight: 'Bold', color: '#6366F1', align: 'CENTER', w: 520
        });
        var items = benGroups[bg_][1];
        for (var it = 0; it < items.length; it++) {
            var itmFrame = makeFrame(benCol, {
                bg: '#F3F4F6', radius: 8,
                dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                padding: 16, gap: 8,
                primarySizing: 'AUTO', counterSizing: 'FIXED',
                w: 520
            });
            // Border-left 4px primary
            itmFrame.strokes = [solidFill('#6366F1')];
            itmFrame.strokeWeight = 0;
            itmFrame.strokeLeftWeight = 4;
            itmFrame.strokeAlign = 'INSIDE';
            makeText(itmFrame, items[it], { size: 15, weight: 'Regular', color: '#1F2937' });
        }
    }

    // -------------------------------------------------------- CARACTERÍSTICAS
    var features = section(landing, {
        name: 'Características', bg: '#F3F4F6', h: 760
    });
    sectionTitle(features, 'Características que nos hacen únicos', 'Tecnología de punta al servicio de la comunidad');
    var featGrid = makeFrame(features, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    featGrid.fills = [];
    var featData = [
        ['📍', 'Geolocalización',       'Encuentra profesionales cerca de tu ubicación en tiempo real'],
        ['⭐', 'Sistema de Reputación', 'Calificaciones transparentes basadas en experiencias reales'],
        ['🔒', 'Pagos Seguros',         'Transacciones protegidas con reembolso garantizado'],
        ['✅', 'Perfiles Verificados',  'Verificación de identidad y habilidades de cada profesional'],
        ['🎓', 'Capacitación',          'Cursos gratuitos para mejorar tus habilidades y certificaciones'],
        ['💬', 'Chat Integrado',        'Comunicación directa y segura entre clientes y trabajadores']
    ];
    for (var fr = 0; fr < 2; fr++) {
        var fRow = makeFrame(featGrid, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'MIN',
            gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        fRow.fills = [];
        for (var fc = 0; fc < 3; fc++) {
            var fd = featData[fr * 3 + fc];
            var fCard = card(fRow, { w: 376, center: true, padding: 32, gap: 16 });
            iconCircle(fCard, 80, null, fd[0], '#FFFFFF', ['#EC4899', '#10B981', 135]);
            makeText(fCard, fd[1], { size: 22, weight: 'Bold', color: '#1F2937', align: 'CENTER', w: 312 });
            makeText(fCard, fd[2], { size: 15, weight: 'Regular', color: '#6B7280', align: 'CENTER', w: 312 });
        }
    }

    // -------------------------------------------------------- TRABAJADORES (US-08)
    var workers = section(landing, {
        name: 'Trabajadores', bg: '#F3F4F6', h: 560
    });
    var workRow = makeFrame(workers, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 64, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    workRow.fills = [];
    var workLeft = makeFrame(workRow, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO',
        w: 620
    });
    workLeft.fills = [];
    chip(workLeft, 'Para trabajadores independientes', '#818CF8', '#FFFFFF');
    makeText(workLeft, 'Más clientes, pagos seguros y reputación que crece contigo', {
        size: 36, weight: 'Bold', color: '#1F2937', w: 620
    });
    makeText(workLeft, 'Si eres electricista, gasfitero, pintor, cerrajero o técnico, Ya Quedó te conecta con clientes verificados de tu zona. Tú defines tus tarifas, nosotros garantizamos el cobro.', {
        size: 16, weight: 'Regular', color: '#6B7280', w: 620
    });
    var workerBenefits = [
        ['👥', 'Flujo constante de clientes en tu distrito'],
        ['🛡', 'Pago garantizado por cada servicio completado'],
        ['🏅', 'Insignias y ranking que aumentan tu visibilidad'],
        ['🎓', 'Capacitaciones gratuitas con certificación'],
        ['📱', 'Agenda y cotizaciones desde tu celular']
    ];
    var workList = makeFrame(workLeft, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 10, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    workList.fills = [];
    for (var wb = 0; wb < workerBenefits.length; wb++) {
        var wRow = makeFrame(workList, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        wRow.fills = [];
        iconCircle(wRow, 32, null, workerBenefits[wb][0], '#FFFFFF', ['#EC4899', '#10B981', 135]);
        makeText(wRow, workerBenefits[wb][1], { size: 16, weight: 'Regular', color: '#1F2937' });
    }
    button(workLeft, 'Quiero ofrecer mis servicios', 'primary');

    var workRight = makeFrame(workRow, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO',
        w: 380
    });
    workRight.fills = [];
    var stats = [
        ['+40%', 'Ingresos promedio tras 3 meses en la plataforma'],
        ['48h',  'Tiempo máximo de verificación de identidad'],
        ['0%',   'Costo de registro y uso básico de la plataforma']
    ];
    for (var sx = 0; sx < stats.length; sx++) {
        var statCard = card(workRight, {
            w: 380, padding: 24, gap: 4, shadow: 'Shadow/md'
        });
        // Border-left 4px primary
        statCard.strokes = [solidFill('#6366F1')];
        statCard.strokeWeight = 0;
        statCard.strokeLeftWeight = 4;
        statCard.strokeAlign = 'INSIDE';
        makeText(statCard, stats[sx][0], { size: 36, weight: 'Extra Bold', color: '#6366F1' });
        makeText(statCard, stats[sx][1], { size: 15, weight: 'Regular', color: '#6B7280', w: 310 });
    }

    // -------------------------------------------------------- IMPACTO
    var impact = section(landing, {
        name: 'Impacto', bgGradient: ['#6366F1', '#4F46E5', 135], h: 520, gap: 32
    });
    sectionTitle(impact, 'Impacto social real',
        'No solo somos una plataforma tecnológica, somos un movimiento para transformar la economía informal en oportunidades reales.',
        true);
    var statGrid = makeFrame(impact, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 48, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    statGrid.fills = [];
    var impactStats = [['60%+', 'Trabajadores informales en LATAM'], ['2M+', 'Servicios conectados'], ['15', 'Países en expansión'], ['98%', 'Satisfacción de usuarios']];
    for (var ist = 0; ist < impactStats.length; ist++) {
        var stItem = makeFrame(statGrid, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        stItem.fills = [];
        makeText(stItem, impactStats[ist][0], {
            size: 56, weight: 'Extra Bold', color: '#FFFFFF', align: 'CENTER'
        });
        makeText(stItem, impactStats[ist][1], {
            size: 14, weight: 'Regular', color: '#FFFFFF', opacity: 0.9, align: 'CENTER', w: 180
        });
    }

    // -------------------------------------------------------- TESTIMONIOS (US-04)
    var testimonials = section(landing, {
        name: 'Testimonios', bg: '#F3F4F6', h: 580
    });
    sectionTitle(testimonials, 'Lo que dicen nuestros usuarios', 'Historias reales de transformación y éxito');
    var testGrid = makeFrame(testimonials, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    testGrid.fills = [];
    var testData = [
        ['"Gracias a Ya Quedó pasé de tener 2 clientes por semana a más de 20. Mi ingreso se triplicó y ahora puedo darles mejor futuro a mis hijos."',
         'MC', 'María Carmen Rodríguez', 'Electricista · San Miguel, Lima'],
        ['"Encontré un gasfitero confiable en 10 minutos. El servicio fue excelente, el precio justo y la plataforma me protegió de principio a fin."',
         'JL', 'Juan López', 'Cliente · Surco, Lima'],
        ['"La capacitación que me dieron me ayudó a profesionalizar mi servicio. Ahora tengo insignia Top Rated y los clientes me prefieren por eso."',
         'RG', 'Roberto Gómez', 'Técnico · Los Olivos, Lima']
    ];
    for (var td = 0; td < testData.length; td++) {
        var tCard = card(testGrid, { w: 376, padding: 32, gap: 20 });
        makeText(tCard, '"', { size: 48, weight: 'Bold', color: '#6366F1', opacity: 0.3 });
        makeText(tCard, testData[td][0], {
            size: 15, weight: 'Regular', color: '#1F2937', w: 312
        });
        var authorRow = makeFrame(tCard, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        authorRow.fills = [];
        iconCircle(authorRow, 48, null, testData[td][1], '#FFFFFF', ['#EC4899', '#10B981', 135]);
        var authorInfo = makeFrame(authorRow, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 2, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        authorInfo.fills = [];
        makeText(authorInfo, testData[td][2], { size: 16, weight: 'Bold', color: '#1F2937' });
        makeText(authorInfo, testData[td][3], { size: 13, weight: 'Regular', color: '#6B7280' });
    }

    // -------------------------------------------------------- FAQ (US-06)
    var faq = section(landing, {
        name: 'FAQ', bg: '#FFFFFF', h: 720
    });
    sectionTitle(faq, 'Preguntas frecuentes', 'Resolvemos las dudas más comunes antes de que empieces a usar Ya Quedó');
    var faqList = makeFrame(faq, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    faqList.fills = [];
    var faqs = [
        ['¿Cómo sé que un trabajador es confiable?', 'Todos los trabajadores pasan por un proceso de verificación de DNI y selfie. Sus reseñas provienen únicamente de servicios ejecutados a través de la plataforma.'],
        ['¿Cuánto cuesta registrarme?', 'El registro es totalmente gratuito. Solo cobramos una comisión por servicio completado al trabajador.'],
        ['¿Qué medios de pago aceptan?', 'Aceptamos Yape, Plin, tarjetas de débito y crédito. El dinero se retiene hasta que confirmes que el servicio fue ejecutado correctamente.'],
        ['¿Qué pasa si el servicio sale mal?', 'Puedes reportarlo desde la app. Nuestro equipo de soporte media la disputa y, si corresponde, retenemos los fondos hasta resolver el caso.'],
        ['¿En qué zonas opera Ya Quedó?', 'Iniciamos en Lima Metropolitana con expansión a Arequipa, Trujillo y Chiclayo en las siguientes fases.'],
        ['¿Cómo obtengo la insignia Top Rated?', 'Al mantener una calificación promedio ≥ 4.8 con al menos 20 servicios completados obtienes la insignia automáticamente.']
    ];
    for (var fq = 0; fq < faqs.length; fq++) {
        var faqItem = makeFrame(faqList, {
            bg: fq === 0 ? '#FFFFFF' : '#F3F4F6',
            radius: 12,
            dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 8, padding: 20,
            primarySizing: 'AUTO', counterSizing: 'FIXED',
            w: 820,
            shadow: fq === 0 ? 'Shadow/md' : null
        });
        var qRow = makeFrame(faqItem, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 12, primarySizing: 'AUTO', counterSizing: 'FIXED',
            w: 780
        });
        qRow.fills = [];
        makeText(qRow, faqs[fq][0], { size: 17, weight: 'Semi Bold', color: '#1F2937', w: 740 });
        makeText(qRow, fq === 0 ? '−' : '+', { size: 24, weight: 'Bold', color: '#6366F1' });
        if (fq === 0) {
            makeText(faqItem, faqs[fq][1], { size: 15, weight: 'Regular', color: '#6B7280', w: 780 });
        }
    }

    // -------------------------------------------------------- PRE-REGISTRO (US-05)
    var preReg = section(landing, {
        name: 'Pre-registro', bgGradient: ['#EC4899', '#10B981', 135], h: 720
    });
    var formCard = makeFrame(preReg, {
        bg: '#FFFFFF',
        radius: 20,
        dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        padding: 40, gap: 20,
        primarySizing: 'AUTO', counterSizing: 'FIXED',
        w: 820,
        shadow: 'Shadow/xl'
    });
    var fHead = makeFrame(formCard, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        gap: 8, primarySizing: 'AUTO', counterSizing: 'FIXED',
        w: 740
    });
    fHead.fills = [];
    makeText(fHead, 'Déjanos tus datos y te avisamos cuando abramos el registro', {
        size: 28, weight: 'Bold', color: '#1F2937', align: 'CENTER', w: 740
    });
    makeText(fHead, 'Serás de los primeros en acceder y recibirás un beneficio exclusivo de lanzamiento.', {
        size: 15, weight: 'Regular', color: '#6B7280', align: 'CENTER', w: 740
    });

    // Toggle cliente / trabajador
    var toggle = makeFrame(formCard, {
        bg: '#F3F4F6', radius: 12,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        padding: 4, gap: 4,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 740
    });
    var togCli = makeFrame(toggle, {
        bg: '#FFFFFF', radius: 8,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 12, gap: 8,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 365, shadow: 'Shadow/sm'
    });
    makeText(togCli, '👤 Soy cliente', { size: 14, weight: 'Semi Bold', color: '#6366F1' });
    var togTra = makeFrame(toggle, {
        bg: null, radius: 8,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 12, gap: 8,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 365
    });
    togTra.fills = [];
    makeText(togTra, '💼 Soy trabajador', { size: 14, weight: 'Semi Bold', color: '#6B7280' });

    // Form fields (2 filas × 2 columnas)
    var fieldLabels = [
        ['Nombre completo', 'Correo electrónico'],
        ['Teléfono (WhatsApp)', 'Distrito']
    ];
    var placeholders = [
        ['', 'tu@correo.com'],
        ['+51 9XX XXX XXX', 'Selecciona tu distrito ▾']
    ];
    for (var row_ = 0; row_ < 2; row_++) {
        var fRow_ = makeFrame(formCard, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 16, primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 740
        });
        fRow_.fills = [];
        for (var col = 0; col < 2; col++) {
            var fBlock = makeFrame(fRow_, {
                bg: null, dir: 'VERTICAL',
                primaryAlign: 'MIN', counterAlign: 'MIN',
                gap: 6, primarySizing: 'AUTO', counterSizing: 'FIXED',
                w: 362
            });
            fBlock.fills = [];
            makeText(fBlock, fieldLabels[row_][col], { size: 14, weight: 'Semi Bold', color: '#1F2937' });
            var input = makeFrame(fBlock, {
                bg: '#FFFFFF',
                stroke: '#E5E7EB', strokeWeight: 1,
                radius: 8,
                dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                paddingV: 12, paddingH: 14,
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 362
            });
            makeText(input, placeholders[row_][col], { size: 15, weight: 'Regular', color: '#9CA3AF' });
        }
    }

    // Checkbox consentimiento
    var consent = makeFrame(formCard, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        gap: 8, primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 740
    });
    consent.fills = [];
    var cbox = makeFrame(consent, {
        bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1,
        radius: 4, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        primarySizing: 'FIXED', counterSizing: 'FIXED',
        w: 18, h: 18
    });
    makeText(consent, 'Acepto los Términos y la Política de privacidad.', { size: 14, weight: 'Regular', color: '#6B7280' });

    // Botón submit ancho full
    var submitBtn = makeFrame(formCard, {
        bg: null, bgGradient: ['#6366F1', '#4F46E5', 135],
        radius: 8,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 16,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 740,
        shadow: 'Shadow/md'
    });
    makeText(submitBtn, 'Quiero ser de los primeros', { size: 16, weight: 'Semi Bold', color: '#FFFFFF' });

    // -------------------------------------------------------- FOOTER
    var footer = section(landing, {
        name: 'Footer', bg: '#1F2937', h: 380, padV: 48, gap: 32
    });
    var footCols = makeFrame(footer, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 48, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    footCols.fills = [];
    var footData = [
        { title: 'Ya Quedó', items: ['Transformando el mercado de servicios locales en el Perú.', '', '🔵 f  t  in  ig'] },
        { title: 'Enlaces rápidos', items: ['Inicio', 'Cómo funciona', 'Beneficios', 'Testimonios'] },
        { title: 'Servicios', items: ['Electricistas', 'Gasfiteros', 'Cuidadores', 'Técnicos'] },
        { title: 'Contacto', items: ['hola@yaquedo.com', '+51 9XX XXX XXX', 'Centro de ayuda'] },
        { title: 'Legal', items: ['Términos y condiciones', 'Política de privacidad', 'Política de cookies', 'Libro de reclamaciones'] }
    ];
    for (var fc = 0; fc < footData.length; fc++) {
        var fCol = makeFrame(footCols, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO',
            w: 200
        });
        fCol.fills = [];
        makeText(fCol, footData[fc].title, { size: 18, weight: 'Bold', color: '#818CF8' });
        for (var fi = 0; fi < footData[fc].items.length; fi++) {
            if (!footData[fc].items[fi]) continue;
            makeText(fCol, footData[fc].items[fi], {
                size: 14, weight: 'Regular', color: '#FFFFFF', opacity: 0.8, w: 200
            });
        }
    }
    var footBottom = makeFrame(footer, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 0, primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 1376, paddingV: 16
    });
    footBottom.fills = [];
    footBottom.strokes = [solidFill('#FFFFFF', 0.1)];
    footBottom.strokeTopWeight = 1;
    footBottom.strokeWeight = 0;
    footBottom.strokeAlign = 'INSIDE';
    makeText(footBottom, '© 2026 Ya Quedó · TetraDev. Todos los derechos reservados.', {
        size: 13, weight: 'Regular', color: '#FFFFFF', opacity: 0.8, align: 'CENTER'
    });

    // =========================================================================
    // 9) COMPONENTE Navbar/Mobile (logo + switcher ES/EN + hamburger)
    // =========================================================================
    var navbarMobile = figma.createComponent();
    navbarMobile.name = 'Navbar/Mobile';
    navbarMobile.resize(375, 70);
    navbarMobile.layoutMode = 'HORIZONTAL';
    navbarMobile.primaryAxisAlignItems = 'SPACE_BETWEEN';
    navbarMobile.counterAxisAlignItems = 'CENTER';
    navbarMobile.primaryAxisSizingMode = 'FIXED';
    navbarMobile.counterAxisSizingMode = 'FIXED';
    navbarMobile.paddingLeft = 16; navbarMobile.paddingRight = 16;
    navbarMobile.fills = [solidFill('#FFFFFF', 0.95)];
    if (effectStyles['Shadow/sm']) navbarMobile.effectStyleId = effectStyles['Shadow/sm'].id;
    navbarMobile.x = componentsX + 700; navbarMobile.y = componentsY;

    var mLogo = figma.createText();
    mLogo.fontName = { family: fontFamily, style: resolveStyle('Extra Bold') };
    mLogo.fontSize = 22;
    mLogo.characters = 'Ya Quedó';
    mLogo.fills = [solidFill('#6366F1')];
    navbarMobile.appendChild(mLogo);

    var mRight = makeFrame(navbarMobile, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mRight.fills = [];

    // Switcher compacto ES/EN
    var mSwitcher = makeFrame(mRight, {
        bg: '#F3F4F6', radius: 999,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 2, paddingH: 2, gap: 1,
        primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    var mEs = makeFrame(mSwitcher, {
        bg: '#FFFFFF', radius: 999,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 3, paddingH: 8,
        primarySizing: 'AUTO', counterSizing: 'AUTO',
        shadow: 'Shadow/sm'
    });
    makeText(mEs, 'ES', { size: 11, weight: 'Bold', color: '#6366F1' });
    var mEn = makeFrame(mSwitcher, {
        bg: null, radius: 999,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 3, paddingH: 8,
        primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mEn.fills = [];
    makeText(mEn, 'EN', { size: 11, weight: 'Bold', color: '#6B7280' });

    // Hamburguesa (3 líneas)
    var mHamb = makeFrame(mRight, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        padding: 6, gap: 4,
        primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mHamb.fills = [];
    for (var hh = 0; hh < 3; hh++) {
        var bar = makeFrame(mHamb, {
            bg: '#1F2937', radius: 2,
            w: 22, h: 3,
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
    }

    // =========================================================================
    // 10) MOBILE LANDING — 14 SECCIONES POBLADAS (1 columna, 375px)
    // =========================================================================
    function sectionM(parent, opts) {
        opts = opts || {};
        return makeFrame(parent, {
            name: opts.name,
            w: 375, h: opts.h,
            bg: opts.bg || null,
            bgGradient: opts.bgGradient,
            dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            paddingV: opts.padV != null ? opts.padV : 48,
            paddingH: opts.padH != null ? opts.padH : 16,
            gap: opts.gap || 20,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            clip: true
        });
    }

    function titleM(parent, h2Text, subtitle, dark) {
        var holder = makeFrame(parent, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        holder.fills = [];
        makeText(holder, h2Text, {
            size: 28, weight: 'Bold', color: dark ? '#FFFFFF' : '#1F2937',
            align: 'CENTER', w: 343
        });
        if (subtitle) {
            makeText(holder, subtitle, {
                size: 14, weight: 'Regular',
                color: dark ? '#FFFFFF' : '#6B7280',
                opacity: dark ? 0.9 : 1,
                align: 'CENTER', w: 343
            });
        }
        return holder;
    }

    var mobile = figma.createFrame();
    mobile.name = '📱 Mobile · Landing';
    mobile.resize(375, 10);
    mobile.x = 1600; mobile.y = 0;
    mobile.fills = [solidFill('#FFFFFF')];
    mobile.layoutMode = 'VERTICAL';
    mobile.primaryAxisSizingMode = 'AUTO';
    mobile.counterAxisSizingMode = 'FIXED';
    mobile.primaryAxisAlignItems = 'MIN';
    mobile.counterAxisAlignItems = 'CENTER';
    mobile.clipsContent = true;

    // -------- Navbar mobile (instancia)
    var navMobileInst = navbarMobile.createInstance();
    mobile.appendChild(navMobileInst);

    // -------- Hero mobile
    var mHero = sectionM(mobile, {
        name: 'Hero',
        bgGradient: ['#667EEA', '#764BA2', 135],
        h: 520, padV: 72, gap: 16
    });
    makeText(mHero, 'Encuentra el servicio que necesitas, al instante', {
        size: 30, weight: 'Bold', color: '#FFFFFF',
        align: 'CENTER', w: 343
    });
    makeText(mHero, 'Conectamos personas con trabajadores independientes de confianza en el Perú.', {
        size: 15, weight: 'Regular', color: '#FFFFFF', opacity: 0.9,
        align: 'CENTER', w: 343
    });
    var mHeroBtns = makeFrame(mHero, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mHeroBtns.fills = [];
    var mBtn1 = button(mHeroBtns, 'Buscar servicio', 'cta-primary');
    mBtn1.resize(300, mBtn1.height);
    mBtn1.primaryAxisSizingMode = 'FIXED';
    var mBtn2 = button(mHeroBtns, 'Ofrecer mis servicios', 'cta-secondary');
    mBtn2.resize(300, mBtn2.height);
    mBtn2.primaryAxisSizingMode = 'FIXED';

    // -------- Problema mobile (3 cards stacked)
    var mProblem = sectionM(mobile, { name: 'Problema', bg: '#F3F4F6', h: 820 });
    titleM(mProblem, 'El desafío que enfrentamos', 'La informalidad laboral en el Perú afecta a millones');
    var mProbList = makeFrame(mProblem, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mProbList.fills = [];
    var mProbCards = [
        ['🔍', 'Dificultad para encontrar servicios', 'Los clientes pierden tiempo buscando profesionales confiables.'],
        ['$',  'Precios poco transparentes',           'Falta de claridad en costos y temor a estafas.'],
        ['💼', 'Informalidad laboral',                 'Más del 60% de los trabajadores no tienen beneficios.']
    ];
    for (var mp = 0; mp < mProbCards.length; mp++) {
        var mpc = card(mProbList, { w: 343, padding: 20, gap: 10 });
        iconCircle(mpc, 48, null, mProbCards[mp][0], '#FFFFFF', ['#EC4899', '#10B981', 135]);
        makeText(mpc, mProbCards[mp][1], { size: 18, weight: 'Bold', color: '#1F2937', w: 303 });
        makeText(mpc, mProbCards[mp][2], { size: 14, weight: 'Regular', color: '#6B7280', w: 303 });
    }

    // -------- Solución mobile (stack: texto + card visual)
    var mSolution = sectionM(mobile, { name: 'Solución', bg: '#FFFFFF', h: 800 });
    var mSolText = makeFrame(mSolution, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mSolText.fills = [];
    makeText(mSolText, 'La solución: Ya Quedó', { size: 16, weight: 'Bold', color: '#6366F1' });
    makeText(mSolText, 'Transformando la forma de conectar servicios locales', {
        size: 26, weight: 'Bold', color: '#1F2937', w: 343
    });
    makeText(mSolText, 'Plataforma que revoluciona el mercado de servicios informales con confianza, rapidez y formalización.', {
        size: 14, weight: 'Regular', color: '#6B7280', w: 343
    });
    var mSolFeat = ['Verificación de identidad', 'Sistema de calificación', 'Pagos seguros', 'Capacitación', 'Geolocalización'];
    var mSolList = makeFrame(mSolText, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mSolList.fills = [];
    for (var msf = 0; msf < mSolFeat.length; msf++) {
        var mRowSol = makeFrame(mSolList, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        mRowSol.fills = [];
        makeText(mRowSol, '✓', { size: 16, weight: 'Bold', color: '#10B981' });
        makeText(mRowSol, mSolFeat[msf], { size: 14, weight: 'Regular', color: '#1F2937' });
    }
    var mSolCard = makeFrame(mSolution, {
        bg: null, bgGradient: ['#6366F1', '#4F46E5', 135],
        radius: 16, dir: 'VERTICAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 8, padding: 24,
        primarySizing: 'FIXED', counterSizing: 'FIXED',
        w: 343, h: 220,
        shadow: 'Shadow/lg'
    });
    makeText(mSolCard, 'YQ', { size: 48, weight: 'Extra Bold', color: '#FFFFFF' });
    makeText(mSolCard, 'Tecnología para el progreso', { size: 18, weight: 'Bold', color: '#FFFFFF', align: 'CENTER' });
    makeText(mSolCard, 'IA y algoritmos para conectar a las personas correctas', {
        size: 13, weight: 'Regular', color: '#FFFFFF', opacity: 0.9, align: 'CENTER', w: 280
    });

    // -------- Cómo funciona mobile
    var mHow = sectionM(mobile, { name: 'Cómo funciona', bg: '#F3F4F6', h: 1260 });
    titleM(mHow, 'Así de fácil funciona', 'En solo 4 pasos simples');
    var mHowList = makeFrame(mHow, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mHowList.fills = [];
    var mSteps = [
        ['1', 'Regístrate gratis', 'Crea tu perfil en menos de 2 minutos. Verificamos tu identidad.'],
        ['2', 'Busca o publica', 'Encuentra profesionales cercanos o publica tu servicio.'],
        ['3', 'Coordina y confirma', 'Chatea, acuerda detalles y confirma con pago seguro.'],
        ['4', 'Califica y repite', 'Al finalizar, califica el servicio y ayuda a la comunidad.']
    ];
    for (var mss = 0; mss < mSteps.length; mss++) {
        var mStepCard = card(mHowList, { w: 343, padding: 24, gap: 12, center: true });
        iconCircle(mStepCard, 48, null, mSteps[mss][0], '#FFFFFF', ['#6366F1', '#4F46E5', 135]);
        makeText(mStepCard, mSteps[mss][1], { size: 18, weight: 'Bold', color: '#1F2937', align: 'CENTER', w: 295 });
        makeText(mStepCard, mSteps[mss][2], { size: 14, weight: 'Regular', color: '#6B7280', align: 'CENTER', w: 295 });
    }

    // -------- Servicios mobile
    var mServ = sectionM(mobile, { name: 'Servicios', bg: '#FFFFFF', h: 1500 });
    titleM(mServ, 'Servicios disponibles', '6 categorías iniciales para tu casa');
    var mServList = makeFrame(mServ, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mServList.fills = [];
    var mServData = [
        ['⚡', 'Electricidad',       'Instalación, reparación y mantenimiento certificado.'],
        ['🔧', 'Gasfitería',         'Fugas, desatoros y reparación de tuberías.'],
        ['🎨', 'Pintura',            'Interiores y exteriores con acabados profesionales.'],
        ['🔑', 'Cerrajería',         'Emergencias 24/7, cambio de cerraduras.'],
        ['🧯', 'Electrodomésticos', 'Reparación de lavadoras, refris, microondas.'],
        ['🧹', 'Limpieza técnica',  'Tanques, aires acondicionados, fachadas.']
    ];
    for (var mSv = 0; mSv < mServData.length; mSv++) {
        var mSvCard = card(mServList, {
            w: 343, padding: 20, gap: 10,
            stroke: '#F3F4F6', shadow: 'Shadow/sm'
        });
        iconSquare(mSvCard, 48, ['#6366F1', '#4F46E5', 135], mServData[mSv][0]);
        makeText(mSvCard, mServData[mSv][1], { size: 18, weight: 'Bold', color: '#1F2937' });
        makeText(mSvCard, mServData[mSv][2], { size: 14, weight: 'Regular', color: '#6B7280', w: 303 });
    }

    // -------- Beneficios mobile (2 grupos stacked)
    var mBen = sectionM(mobile, { name: 'Beneficios', bg: '#FFFFFF', h: 1600 });
    titleM(mBen, 'Beneficios para todos', 'Diseñado para clientes y trabajadores');
    var mBenWrap = makeFrame(mBen, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mBenWrap.fills = [];
    var mBenGroups = [
        ['🎯 Para Clientes', ['Ahorra tiempo con profesionales verificados', 'Precios transparentes y competitivos',
                               'Protección con pagos seguros', 'Calificaciones reales de otros usuarios',
                               'Atención inmediata y geolocalización', 'Garantía de satisfacción']],
        ['💼 Para Trabajadores', ['Más clientes sin costo de marketing', 'Pagos seguros y rápidos',
                                   'Construye tu reputación profesional', 'Capacitación gratuita y certificaciones',
                                   'Flexibilidad de horarios', 'Camino a la formalización laboral']]
    ];
    for (var mbg = 0; mbg < mBenGroups.length; mbg++) {
        var mBenCol = makeFrame(mBenWrap, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 10, primarySizing: 'AUTO', counterSizing: 'FIXED',
            w: 343
        });
        mBenCol.fills = [];
        makeText(mBenCol, mBenGroups[mbg][0], { size: 20, weight: 'Bold', color: '#6366F1', align: 'CENTER', w: 343 });
        for (var mbi = 0; mbi < mBenGroups[mbg][1].length; mbi++) {
            var mBenItem = makeFrame(mBenCol, {
                bg: '#F3F4F6', radius: 8,
                dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                padding: 12, gap: 8,
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 343
            });
            mBenItem.strokes = [solidFill('#6366F1')];
            mBenItem.strokeWeight = 0;
            mBenItem.strokeLeftWeight = 4;
            mBenItem.strokeAlign = 'INSIDE';
            makeText(mBenItem, mBenGroups[mbg][1][mbi], { size: 13, weight: 'Regular', color: '#1F2937', w: 300 });
        }
    }

    // -------- Características mobile
    var mFeat = sectionM(mobile, { name: 'Características', bg: '#F3F4F6', h: 1900 });
    titleM(mFeat, 'Características únicas', 'Tecnología al servicio de la comunidad');
    var mFeatList = makeFrame(mFeat, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mFeatList.fills = [];
    var mFeatData = [
        ['📍', 'Geolocalización',       'Profesionales cerca de ti en tiempo real'],
        ['⭐', 'Sistema de Reputación', 'Calificaciones transparentes y reales'],
        ['🔒', 'Pagos Seguros',         'Transacciones protegidas con reembolso'],
        ['✅', 'Perfiles Verificados',  'Verificación de identidad y habilidades'],
        ['🎓', 'Capacitación',          'Cursos gratuitos y certificaciones'],
        ['💬', 'Chat Integrado',        'Comunicación directa y segura']
    ];
    for (var mfd = 0; mfd < mFeatData.length; mfd++) {
        var mFeatCard = card(mFeatList, { w: 343, padding: 24, gap: 12, center: true });
        iconCircle(mFeatCard, 64, null, mFeatData[mfd][0], '#FFFFFF', ['#EC4899', '#10B981', 135]);
        makeText(mFeatCard, mFeatData[mfd][1], { size: 18, weight: 'Bold', color: '#1F2937', align: 'CENTER', w: 295 });
        makeText(mFeatCard, mFeatData[mfd][2], { size: 14, weight: 'Regular', color: '#6B7280', align: 'CENTER', w: 295 });
    }

    // -------- Trabajadores mobile
    var mWork = sectionM(mobile, { name: 'Trabajadores', bg: '#F3F4F6', h: 1200 });
    var mWorkText = makeFrame(mWork, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mWorkText.fills = [];
    chip(mWorkText, 'Para trabajadores', '#818CF8', '#FFFFFF');
    makeText(mWorkText, 'Más clientes, pagos seguros y reputación que crece contigo', {
        size: 24, weight: 'Bold', color: '#1F2937', w: 343
    });
    makeText(mWorkText, 'Electricistas, gasfiteros, pintores, cerrajeros o técnicos. Tú defines tus tarifas, nosotros garantizamos el cobro.', {
        size: 14, weight: 'Regular', color: '#6B7280', w: 343
    });
    var mWorkBenefits = [
        ['👥', 'Clientes constantes en tu distrito'],
        ['🛡', 'Pago garantizado'],
        ['🏅', 'Insignias y ranking'],
        ['🎓', 'Capacitaciones con certificación'],
        ['📱', 'Agenda desde tu celular']
    ];
    var mWorkList = makeFrame(mWorkText, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mWorkList.fills = [];
    for (var mwb = 0; mwb < mWorkBenefits.length; mwb++) {
        var mwRow = makeFrame(mWorkList, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 10, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        mwRow.fills = [];
        iconCircle(mwRow, 28, null, mWorkBenefits[mwb][0], '#FFFFFF', ['#EC4899', '#10B981', 135]);
        makeText(mwRow, mWorkBenefits[mwb][1], { size: 14, weight: 'Regular', color: '#1F2937', w: 280 });
    }
    var mWorkBtn = button(mWorkText, 'Ofrecer mis servicios', 'primary');
    mWorkBtn.resize(343, mWorkBtn.height);
    mWorkBtn.primaryAxisSizingMode = 'FIXED';

    var mStatsList = makeFrame(mWork, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mStatsList.fills = [];
    var mWorkStats = [
        ['+40%', 'Ingresos promedio tras 3 meses'],
        ['48h',  'Verificación de identidad'],
        ['0%',   'Costo de registro']
    ];
    for (var msx = 0; msx < mWorkStats.length; msx++) {
        var mStatCard = card(mStatsList, { w: 343, padding: 20, gap: 4 });
        mStatCard.strokes = [solidFill('#6366F1')];
        mStatCard.strokeWeight = 0;
        mStatCard.strokeLeftWeight = 4;
        mStatCard.strokeAlign = 'INSIDE';
        makeText(mStatCard, mWorkStats[msx][0], { size: 28, weight: 'Extra Bold', color: '#6366F1' });
        makeText(mStatCard, mWorkStats[msx][1], { size: 13, weight: 'Regular', color: '#6B7280', w: 303 });
    }

    // -------- Impacto mobile
    var mImp = sectionM(mobile, { name: 'Impacto', bgGradient: ['#6366F1', '#4F46E5', 135], h: 720 });
    titleM(mImp, 'Impacto social real', 'Transformamos la economía informal', true);
    var mImpGrid = makeFrame(mImp, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mImpGrid.fills = [];
    var mImpRow1 = makeFrame(mImpGrid, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 32, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mImpRow1.fills = [];
    var mImpRow2 = makeFrame(mImpGrid, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 32, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mImpRow2.fills = [];
    var mImpStats = [['60%+', 'Informales en LATAM'], ['2M+', 'Servicios conectados'], ['15', 'Países'], ['98%', 'Satisfacción']];
    for (var mis = 0; mis < mImpStats.length; mis++) {
        var target = mis < 2 ? mImpRow1 : mImpRow2;
        var mStatItem = makeFrame(target, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 4, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        mStatItem.fills = [];
        makeText(mStatItem, mImpStats[mis][0], { size: 40, weight: 'Extra Bold', color: '#FFFFFF', align: 'CENTER' });
        makeText(mStatItem, mImpStats[mis][1], { size: 12, weight: 'Regular', color: '#FFFFFF', opacity: 0.9, align: 'CENTER', w: 130 });
    }

    // -------- Testimonios mobile
    var mTest = sectionM(mobile, { name: 'Testimonios', bg: '#F3F4F6', h: 1000 });
    titleM(mTest, 'Lo que dicen nuestros usuarios', 'Historias reales de éxito');
    var mTestList = makeFrame(mTest, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mTestList.fills = [];
    var mTestData = [
        ['"Pasé de 2 clientes por semana a más de 20. Mi ingreso se triplicó."', 'MC', 'María Carmen R.', 'Electricista · San Miguel'],
        ['"Encontré un gasfitero confiable en 10 minutos. Servicio excelente."', 'JL', 'Juan López', 'Cliente · Surco'],
        ['"La capacitación me ayudó. Ahora tengo insignia Top Rated."', 'RG', 'Roberto Gómez', 'Técnico · Los Olivos']
    ];
    for (var mtd = 0; mtd < mTestData.length; mtd++) {
        var mTestCard = card(mTestList, { w: 343, padding: 20, gap: 14 });
        makeText(mTestCard, '"', { size: 36, weight: 'Bold', color: '#6366F1', opacity: 0.3 });
        makeText(mTestCard, mTestData[mtd][0], { size: 14, weight: 'Regular', color: '#1F2937', w: 303 });
        var mAuthorRow = makeFrame(mTestCard, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 10, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        mAuthorRow.fills = [];
        iconCircle(mAuthorRow, 40, null, mTestData[mtd][1], '#FFFFFF', ['#EC4899', '#10B981', 135]);
        var mAuthorInfo = makeFrame(mAuthorRow, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 2, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        mAuthorInfo.fills = [];
        makeText(mAuthorInfo, mTestData[mtd][2], { size: 14, weight: 'Bold', color: '#1F2937' });
        makeText(mAuthorInfo, mTestData[mtd][3], { size: 12, weight: 'Regular', color: '#6B7280' });
    }

    // -------- FAQ mobile
    var mFaq = sectionM(mobile, { name: 'FAQ', bg: '#FFFFFF', h: 1000 });
    titleM(mFaq, 'Preguntas frecuentes', 'Resolvemos las dudas más comunes');
    var mFaqList = makeFrame(mFaq, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        gap: 10, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    mFaqList.fills = [];
    var mFaqs = [
        ['¿Cómo sé que un trabajador es confiable?', 'Verificación de DNI y reseñas de servicios reales.'],
        ['¿Cuánto cuesta registrarme?', 'Gratis. Solo cobramos comisión por servicio completado.'],
        ['¿Qué medios de pago aceptan?', 'Yape, Plin, tarjetas. Retenemos hasta tu confirmación.'],
        ['¿Qué pasa si el servicio sale mal?', 'Soporte media la disputa y retiene fondos.'],
        ['¿En qué zonas operan?', 'Lima Metropolitana, expansión a Arequipa, Trujillo y Chiclayo.'],
        ['¿Cómo obtener Top Rated?', 'Rating ≥ 4.8 + 20 servicios = insignia automática.']
    ];
    for (var mfq = 0; mfq < mFaqs.length; mfq++) {
        var mFaqItem = makeFrame(mFaqList, {
            bg: mfq === 0 ? '#FFFFFF' : '#F3F4F6',
            radius: 10,
            dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 6, padding: 14,
            primarySizing: 'AUTO', counterSizing: 'FIXED',
            w: 343,
            shadow: mfq === 0 ? 'Shadow/md' : null
        });
        var mQRow = makeFrame(mFaqItem, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 315
        });
        mQRow.fills = [];
        makeText(mQRow, mFaqs[mfq][0], { size: 14, weight: 'Semi Bold', color: '#1F2937', w: 280 });
        makeText(mQRow, mfq === 0 ? '−' : '+', { size: 20, weight: 'Bold', color: '#6366F1' });
        if (mfq === 0) {
            makeText(mFaqItem, mFaqs[mfq][1], { size: 13, weight: 'Regular', color: '#6B7280', w: 315 });
        }
    }

    // -------- Pre-registro mobile
    var mForm = sectionM(mobile, { name: 'Pre-registro', bgGradient: ['#EC4899', '#10B981', 135], h: 1100 });
    var mFormCard = makeFrame(mForm, {
        bg: '#FFFFFF', radius: 16,
        dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        padding: 20, gap: 14,
        primarySizing: 'AUTO', counterSizing: 'FIXED',
        w: 343, shadow: 'Shadow/xl'
    });
    makeText(mFormCard, 'Déjanos tus datos', {
        size: 22, weight: 'Bold', color: '#1F2937', align: 'CENTER', w: 303
    });
    makeText(mFormCard, 'Te avisamos cuando abramos el registro.', {
        size: 13, weight: 'Regular', color: '#6B7280', align: 'CENTER', w: 303
    });
    var mToggle = makeFrame(mFormCard, {
        bg: '#F3F4F6', radius: 10,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        padding: 3, gap: 3,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 303
    });
    var mTogCli = makeFrame(mToggle, {
        bg: '#FFFFFF', radius: 8,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 10, gap: 6,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 148, shadow: 'Shadow/sm'
    });
    makeText(mTogCli, '👤 Cliente', { size: 12, weight: 'Semi Bold', color: '#6366F1' });
    var mTogTra = makeFrame(mToggle, {
        bg: null, radius: 8,
        dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 10, gap: 6,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 148
    });
    mTogTra.fills = [];
    makeText(mTogTra, '💼 Trabajador', { size: 12, weight: 'Semi Bold', color: '#6B7280' });

    var mFormFields = [
        ['Nombre completo', ''],
        ['Correo electrónico', 'tu@correo.com'],
        ['Teléfono (WhatsApp)', '+51 9XX XXX XXX'],
        ['Distrito', 'Selecciona tu distrito ▾']
    ];
    for (var mff = 0; mff < mFormFields.length; mff++) {
        var mFld = makeFrame(mFormCard, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 4, primarySizing: 'AUTO', counterSizing: 'FIXED',
            w: 303
        });
        mFld.fills = [];
        makeText(mFld, mFormFields[mff][0], { size: 12, weight: 'Semi Bold', color: '#1F2937' });
        var mInput = makeFrame(mFld, {
            bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1,
            radius: 8, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            paddingV: 10, paddingH: 12,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 303
        });
        makeText(mInput, mFormFields[mff][1], { size: 13, weight: 'Regular', color: '#9CA3AF' });
    }

    var mSubmit = makeFrame(mFormCard, {
        bg: null, bgGradient: ['#6366F1', '#4F46E5', 135],
        radius: 8, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 14, primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 303, shadow: 'Shadow/md'
    });
    makeText(mSubmit, 'Quiero ser de los primeros', { size: 14, weight: 'Semi Bold', color: '#FFFFFF' });

    // -------- Footer mobile
    var mFooter = sectionM(mobile, { name: 'Footer', bg: '#1F2937', h: 900, padV: 32, gap: 20 });
    var mFooterData = [
        ['Ya Quedó', ['Transformando servicios locales en el Perú.', '🔵 f  t  in  ig']],
        ['Enlaces rápidos', ['Inicio', 'Cómo funciona', 'Beneficios', 'Testimonios']],
        ['Servicios', ['Electricistas', 'Gasfiteros', 'Cuidadores', 'Técnicos']],
        ['Contacto', ['hola@yaquedo.com', '+51 9XX XXX XXX', 'Centro de ayuda']],
        ['Legal', ['Términos y condiciones', 'Política de privacidad', 'Política de cookies', 'Libro de reclamaciones']]
    ];
    for (var mfc = 0; mfc < mFooterData.length; mfc++) {
        var mFCol = makeFrame(mFooter, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'FIXED',
            w: 343
        });
        mFCol.fills = [];
        makeText(mFCol, mFooterData[mfc][0], { size: 16, weight: 'Bold', color: '#818CF8', align: 'CENTER' });
        for (var mfi = 0; mfi < mFooterData[mfc][1].length; mfi++) {
            if (!mFooterData[mfc][1][mfi]) continue;
            makeText(mFCol, mFooterData[mfc][1][mfi], {
                size: 13, weight: 'Regular', color: '#FFFFFF', opacity: 0.8, align: 'CENTER', w: 343
            });
        }
    }
    var mFootBottom = makeFrame(mFooter, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        paddingV: 12, primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 343
    });
    mFootBottom.fills = [];
    mFootBottom.strokes = [solidFill('#FFFFFF', 0.1)];
    mFootBottom.strokeTopWeight = 1;
    mFootBottom.strokeWeight = 0;
    mFootBottom.strokeAlign = 'INSIDE';
    makeText(mFootBottom, '© 2026 Ya Quedó · TetraDev', {
        size: 11, weight: 'Regular', color: '#FFFFFF', opacity: 0.8, align: 'CENTER'
    });

    // =========================================================================
    // 11) PAGES — organización de todo el archivo Figma en páginas
    // =========================================================================
    function ensurePage(name) {
        for (var i = 0; i < figma.root.children.length; i++) {
            if (figma.root.children[i].name === name) return figma.root.children[i];
        }
        var p = figma.createPage();
        p.name = name;
        return p;
    }

    var pCover    = ensurePage('📐 Cover');
    var pDS       = ensurePage('🎨 Design System');
    var pComps    = ensurePage('🧩 Components');
    var pDLand    = ensurePage('🖥 Desktop · Landing');
    var pMLand    = ensurePage('📱 Mobile · Landing');
    var pWF       = ensurePage('📝 Wireframes Lo-Fi');
    var pIA       = ensurePage('🗺 Information Architecture');
    var pSM       = ensurePage('🧭 Site Map');
    var pFlows    = ensurePage('🔀 User Flows');
    var pAppD     = ensurePage('🖥 App · Desktop');
    var pAppM     = ensurePage('📱 App · Mobile');

    // Mover frames existentes a sus páginas
    pDLand.appendChild(landing);
    pMLand.appendChild(mobile);
    pComps.appendChild(btnPrimaryCmp);
    pComps.appendChild(btnSecondaryCmp);
    pComps.appendChild(navbarCmp);
    pComps.appendChild(navbarMobile);

    // =========================================================================
    // 12) COVER — página de portada
    // =========================================================================
    figma.currentPage = pCover;
    var cover = makeFrame(null, {
        name: 'Cover', w: 1440, h: 900,
        bgGradient: ['#667EEA', '#764BA2', 135],
        dir: 'VERTICAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 24, primarySizing: 'FIXED', counterSizing: 'FIXED'
    });
    var coverLogo = makeFrame(cover, {
        bg: '#FFFFFF', radius: 72,
        w: 144, h: 144,
        dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
        primarySizing: 'FIXED', counterSizing: 'FIXED',
        shadow: 'Shadow/xl'
    });
    makeText(coverLogo, 'YQ', { size: 64, weight: 'Extra Bold', color: '#6366F1' });
    makeText(cover, 'Ya Quedó', { size: 88, weight: 'Extra Bold', color: '#FFFFFF', align: 'CENTER' });
    makeText(cover, 'Marketplace de servicios locales · Perú', { size: 22, weight: 'Regular', color: '#FFFFFF', opacity: 0.9, align: 'CENTER' });
    var divider = makeFrame(cover, { bg: '#FFFFFF', w: 120, h: 3, radius: 2, primarySizing: 'FIXED', counterSizing: 'FIXED' });
    divider.opacity = 0.5;
    makeText(cover, 'Trabajo TB1 · Arquitectura de Computadoras', { size: 18, weight: 'Semi Bold', color: '#FFFFFF', opacity: 0.95, align: 'CENTER' });
    makeText(cover, 'Startup: TetraDev', { size: 16, weight: 'Regular', color: '#FFFFFF', opacity: 0.9, align: 'CENTER' });
    var teamWrap = makeFrame(cover, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 4, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    teamWrap.fills = [];
    makeText(teamWrap, 'Integrantes', { size: 14, weight: 'Bold', color: '#FFFFFF', align: 'CENTER', opacity: 0.9 });
    makeText(teamWrap, 'José Emanuel Amaro Saravia · U20241C247', { size: 14, weight: 'Regular', color: '#FFFFFF', opacity: 0.85, align: 'CENTER' });
    makeText(teamWrap, 'Ernesto Yago Caldas Zapata · U202412543', { size: 14, weight: 'Regular', color: '#FFFFFF', opacity: 0.85, align: 'CENTER' });
    makeText(teamWrap, 'Austin Bryan Flores Burga · U202313446', { size: 14, weight: 'Regular', color: '#FFFFFF', opacity: 0.85, align: 'CENTER' });
    makeText(cover, 'Abril 2026', { size: 14, weight: 'Regular', color: '#FFFFFF', opacity: 0.8, align: 'CENTER' });

    // =========================================================================
    // 13) DESIGN SYSTEM — swatches visuales
    // =========================================================================
    figma.currentPage = pDS;
    var dsCanvas = makeFrame(null, {
        name: 'Design System Overview',
        w: 1440, h: 1800,
        bg: '#FFFFFF', dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        padding: 64, gap: 48,
        primarySizing: 'FIXED', counterSizing: 'FIXED'
    });
    makeText(dsCanvas, 'Design System · Ya Quedó', { size: 48, weight: 'Extra Bold', color: '#1F2937' });
    makeText(dsCanvas, 'Tokens, tipografía, colores y sombras del producto', { size: 18, weight: 'Regular', color: '#6B7280' });

    // Sección Colores
    makeText(dsCanvas, 'Colores', { size: 28, weight: 'Bold', color: '#1F2937' });
    var colorGrid = makeFrame(dsCanvas, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    colorGrid.fills = [];
    var colorShow = [
        ['primary', '#6366F1'],
        ['primary-dark', '#4F46E5'],
        ['primary-light', '#818CF8'],
        ['secondary', '#EC4899'],
        ['accent', '#10B981'],
        ['dark', '#1F2937'],
        ['gray', '#6B7280'],
        ['light-gray', '#F3F4F6'],
        ['white', '#FFFFFF'],
        ['error', '#EF4444']
    ];
    for (var cs = 0; cs < colorShow.length; cs++) {
        var sw = makeFrame(colorGrid, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        sw.fills = [];
        var box = makeFrame(sw, {
            bg: colorShow[cs][1],
            w: 120, h: 120, radius: 12,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            stroke: colorShow[cs][0] === 'white' ? '#E5E7EB' : null,
            strokeWeight: 1
        });
        makeText(sw, colorShow[cs][0], { size: 13, weight: 'Semi Bold', color: '#1F2937', align: 'CENTER' });
        makeText(sw, colorShow[cs][1], { size: 11, weight: 'Regular', color: '#6B7280', align: 'CENTER' });
    }

    // Sección Gradientes
    makeText(dsCanvas, 'Gradientes', { size: 28, weight: 'Bold', color: '#1F2937' });
    var gradGrid = makeFrame(dsCanvas, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    gradGrid.fills = [];
    var gradShow = [
        ['primary', '#6366F1', '#4F46E5'],
        ['accent', '#EC4899', '#10B981'],
        ['hero', '#667EEA', '#764BA2']
    ];
    for (var gss = 0; gss < gradShow.length; gss++) {
        var gw = makeFrame(gradGrid, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        gw.fills = [];
        var gbox = makeFrame(gw, {
            bgGradient: [gradShow[gss][1], gradShow[gss][2], 135],
            w: 280, h: 120, radius: 12,
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(gw, 'gradient/' + gradShow[gss][0], { size: 14, weight: 'Semi Bold', color: '#1F2937' });
        makeText(gw, gradShow[gss][1] + ' → ' + gradShow[gss][2], { size: 12, weight: 'Regular', color: '#6B7280' });
    }

    // Sección Tipografía
    makeText(dsCanvas, 'Tipografía · Inter', { size: 28, weight: 'Bold', color: '#1F2937' });
    var typoShow = [
        ['h1', 56, 'Bold', 'Encuentra el servicio que necesitas, al instante'],
        ['h2', 40, 'Bold', 'El desafío que enfrentamos'],
        ['h3', 30, 'Bold', 'La solución: Ya Quedó'],
        ['h4', 24, 'Bold', 'Dificultad para encontrar servicios'],
        ['h5', 20, 'Bold', 'Para Clientes'],
        ['body-lg', 20, 'Regular', 'Conectamos personas con trabajadores independientes de confianza.'],
        ['body', 16, 'Regular', 'Texto de párrafo estándar del producto.'],
        ['body-sm', 14, 'Regular', 'Información secundaria y metadatos.']
    ];
    for (var tp = 0; tp < typoShow.length; tp++) {
        var trow = makeFrame(dsCanvas, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 24, primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 1280
        });
        trow.fills = [];
        var tlabel = makeFrame(trow, {
            bg: '#F3F4F6', radius: 6,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            paddingV: 6, paddingH: 10,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 100, h: 32
        });
        makeText(tlabel, typoShow[tp][0] + ' · ' + typoShow[tp][1], { size: 11, weight: 'Semi Bold', color: '#6366F1' });
        makeText(trow, typoShow[tp][3], { size: typoShow[tp][1], weight: typoShow[tp][2], color: '#1F2937', w: 1100 });
    }

    // Sección Sombras
    makeText(dsCanvas, 'Sombras', { size: 28, weight: 'Bold', color: '#1F2937' });
    var shGrid = makeFrame(dsCanvas, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        gap: 32, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    shGrid.fills = [];
    var shShow = ['Shadow/sm', 'Shadow/md', 'Shadow/lg', 'Shadow/xl'];
    for (var shi = 0; shi < shShow.length; shi++) {
        var shw = makeFrame(shGrid, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        shw.fills = [];
        var shbox = makeFrame(shw, {
            bg: '#FFFFFF', radius: 12,
            w: 200, h: 120,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            shadow: shShow[shi]
        });
        makeText(shw, shShow[shi].replace('Shadow/', 'shadow-'), { size: 13, weight: 'Semi Bold', color: '#1F2937' });
    }

    // =========================================================================
    // 14) COMPONENTS SHOWCASE — vista catalogada de los componentes
    // =========================================================================
    figma.currentPage = pComps;
    var compsCanvas = makeFrame(null, {
        name: 'Components Showcase',
        w: 1440, h: 900,
        bg: '#FFFFFF', dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        padding: 64, gap: 32,
        primarySizing: 'FIXED', counterSizing: 'FIXED'
    });
    compsCanvas.x = 2000; // al lado de los componentes
    makeText(compsCanvas, 'Componentes', { size: 40, weight: 'Extra Bold', color: '#1F2937' });
    makeText(compsCanvas, 'Usa las instancias desde el panel Assets', { size: 15, weight: 'Regular', color: '#6B7280' });
    var compsRow = makeFrame(compsCanvas, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    compsRow.fills = [];
    button(compsRow, 'Button Primary', 'primary');
    button(compsRow, 'Button Secondary', 'secondary');
    var navShowcase = navbarCmp.createInstance();
    compsCanvas.appendChild(navShowcase);
    var navShowcaseM = navbarMobile.createInstance();
    compsCanvas.appendChild(navShowcaseM);

    // =========================================================================
    // 15) INFORMATION ARCHITECTURE — 4 diagramas (el site map es aparte)
    // =========================================================================
    figma.currentPage = pIA;

    // Helper: caja de diagrama
    function iaBox(parent, label, w, h, bg, textColor) {
        var bx = makeFrame(parent, {
            bg: bg || '#F3F4F6',
            radius: 10,
            dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            paddingV: 12, paddingH: 16,
            primarySizing: w ? 'FIXED' : 'AUTO', counterSizing: h ? 'FIXED' : 'AUTO',
            w: w, h: h,
            stroke: '#E5E7EB', strokeWeight: 1
        });
        makeText(bx, label, { size: 13, weight: 'Semi Bold', color: textColor || '#1F2937', align: 'CENTER' });
        return bx;
    }
    function iaDiagramFrame(name, w, h, x, y) {
        var f = makeFrame(null, {
            name: name, w: w, h: h,
            bg: '#FFFFFF', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            padding: 40, gap: 24,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            stroke: '#E5E7EB', strokeWeight: 1, radius: 16
        });
        f.x = x; f.y = y;
        return f;
    }

    // 4.2.1 Organization Systems
    var iaOrg = iaDiagramFrame('4.2.1 · Organization Systems', 1200, 900, 0, 0);
    makeText(iaOrg, '4.2.1 · Organization Systems', { size: 28, weight: 'Bold', color: '#1F2937' });
    makeText(iaOrg, 'Esquemas de organización de contenido: por audiencia, por tarea y por tema', { size: 14, weight: 'Regular', color: '#6B7280' });
    var iaOrgRoot = makeFrame(iaOrg, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    iaOrgRoot.fills = [];
    iaBox(iaOrgRoot, 'YA QUEDÓ', 240, 56, '#6366F1', '#FFFFFF');
    var iaOrgL1 = makeFrame(iaOrgRoot, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 48, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    iaOrgL1.fills = [];
    var branches = [
        ['LANDING PÚBLICA', 'Por audiencia + tema', '#818CF8', [
            'Hero / Propuesta de valor',
            'Problema / Solución',
            'Cómo funciona',
            'Servicios (por tema)',
            'Beneficios / Características',
            'Testimonios / FAQ',
            'Sección Trabajadores',
            'Pre-registro'
        ]],
        ['APLICACIÓN WEB', 'Por tarea', '#EC4899', [
            'Cuenta (registro, login, perfil)',
            'Descubrimiento (home, buscar, filtros)',
            'Contratación (cotización, agenda, chat)',
            'Pagos (checkout, comprobante, dashboard)',
            'Reputación (calificar, reseñas, insignias)',
            'Capacitación (cursos, quiz)'
        ]],
        ['LEGAL & SOPORTE', 'Transversal', '#6B7280', [
            'Términos y condiciones',
            'Política de privacidad',
            'Política de cookies',
            'Libro de reclamaciones',
            'Centro de ayuda'
        ]]
    ];
    for (var br = 0; br < branches.length; br++) {
        var branch = makeFrame(iaOrgL1, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        branch.fills = [];
        iaBox(branch, branches[br][0], 280, 44, branches[br][2], '#FFFFFF');
        makeText(branch, branches[br][1], { size: 11, weight: 'Regular', color: '#6B7280', align: 'CENTER' });
        for (var bl = 0; bl < branches[br][3].length; bl++) {
            iaBox(branch, branches[br][3][bl], 280, 36);
        }
    }

    // 4.2.2 Labeling Systems
    var iaLab = iaDiagramFrame('4.2.2 · Labeling Systems', 1200, 900, 1300, 0);
    makeText(iaLab, '4.2.2 · Labeling Systems', { size: 28, weight: 'Bold', color: '#1F2937' });
    makeText(iaLab, 'Etiquetas consistentes en español (es-419) e inglés (en-US)', { size: 14, weight: 'Regular', color: '#6B7280' });
    var labTable = makeFrame(iaLab, {
        bg: '#FFFFFF', radius: 12,
        stroke: '#E5E7EB', strokeWeight: 1,
        dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        primarySizing: 'AUTO', counterSizing: 'FIXED',
        w: 1120
    });
    var labHeader = makeFrame(labTable, {
        bg: '#F3F4F6',
        dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
        padding: 12, gap: 0,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 1120
    });
    var labCols = ['Categoría', 'es-419', 'en-US', 'Dónde aparece'];
    var labColWs = [220, 280, 280, 340];
    for (var lh = 0; lh < labCols.length; lh++) {
        var lhc = makeFrame(labHeader, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: labColWs[lh]
        });
        lhc.fills = [];
        makeText(lhc, labCols[lh], { size: 12, weight: 'Bold', color: '#1F2937' });
    }
    var labData = [
        ['Navegación', 'Inicio', 'Home', 'Navbar'],
        ['Navegación', 'Servicios', 'Services', 'Navbar'],
        ['Navegación', 'Cómo funciona', 'How it works', 'Navbar'],
        ['Navegación', 'Trabajadores', 'Workers', 'Navbar'],
        ['Navegación', 'FAQ', 'FAQ', 'Navbar'],
        ['CTA', 'Registrarse', 'Sign up', 'Navbar, Hero'],
        ['CTA hero', 'Buscar servicio', 'Find a service', 'Hero'],
        ['CTA hero', 'Ofrecer mis servicios', 'Offer my services', 'Hero, Workers'],
        ['Acción', 'Solicitar cotización', 'Request quote', 'Perfil trabajador'],
        ['Estado', 'En revisión', 'Under review', 'Verificación'],
        ['Estado', 'Verificado', 'Verified', 'Perfil / Search'],
        ['Insignia', 'Top Rated', 'Top Rated', 'Perfil / Search'],
        ['Pago', 'Pagar con Yape', 'Pay with Yape', 'Checkout'],
        ['Legal', 'Términos y condiciones', 'Terms and conditions', 'Footer'],
        ['Legal', 'Libro de reclamaciones', 'Complaints book', 'Footer']
    ];
    for (var ld = 0; ld < labData.length; ld++) {
        var lrow = makeFrame(labTable, {
            bg: ld % 2 ? '#FFFFFF' : '#FAFAFA',
            dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 12, gap: 0,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 1120
        });
        for (var ldc = 0; ldc < labData[ld].length; ldc++) {
            var cell = makeFrame(lrow, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: labColWs[ldc]
            });
            cell.fills = [];
            makeText(cell, labData[ld][ldc], { size: 12, weight: 'Regular', color: '#1F2937' });
        }
    }

    // 4.2.3 Searching Systems
    var iaSrch = iaDiagramFrame('4.2.3 · Searching Systems', 1200, 900, 0, 1000);
    makeText(iaSrch, '4.2.3 · Searching Systems', { size: 28, weight: 'Bold', color: '#1F2937' });
    makeText(iaSrch, 'Búsqueda global (topbar) + filtros facetados (results)', { size: 14, weight: 'Regular', color: '#6B7280' });
    // Flujo: topbar search → autocomplete → results + filters
    var srchFlow = makeFrame(iaSrch, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    srchFlow.fills = [];
    iaBox(srchFlow, 'TOPBAR: "¿Qué servicio necesitas?"', 640, 56, '#6366F1', '#FFFFFF');
    makeText(srchFlow, '↓  escribe "gasfit…"', { size: 12, weight: 'Regular', color: '#6B7280' });
    iaBox(srchFlow, 'Autocomplete: "Gasfitería", "Gasfitero — San Miguel", …', 640, 48, '#E0E7FF', '#4F46E5');
    makeText(srchFlow, '↓  selecciona', { size: 12, weight: 'Regular', color: '#6B7280' });
    var srchResults = makeFrame(srchFlow, {
        bg: '#F3F4F6', radius: 12,
        dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'MIN',
        padding: 16, gap: 16,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 800
    });
    var filters = makeFrame(srchResults, {
        bg: '#FFFFFF', radius: 8, stroke: '#E5E7EB', strokeWeight: 1,
        dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'MIN',
        padding: 12, gap: 8,
        primarySizing: 'FIXED', counterSizing: 'FIXED',
        w: 220, h: 300
    });
    makeText(filters, 'Filtros', { size: 14, weight: 'Bold', color: '#1F2937' });
    var filtItems = ['□ Oficio', '□ Distrito', '≡ Calificación (0–5)', '≡ Precio (S/ 20–500)', '□ Disponibilidad'];
    for (var fli = 0; fli < filtItems.length; fli++) {
        makeText(filters, filtItems[fli], { size: 12, weight: 'Regular', color: '#6B7280' });
    }
    iaBox(filters, 'Aplicar filtros', 196, 36, '#6366F1', '#FFFFFF');
    var resultsCol = makeFrame(srchResults, {
        bg: '#FFFFFF', radius: 8, stroke: '#E5E7EB', strokeWeight: 1,
        dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'MIN',
        padding: 12, gap: 8,
        primarySizing: 'FIXED', counterSizing: 'FIXED',
        w: 524, h: 300
    });
    makeText(resultsCol, '12 resultados ordenados por cercanía + rating', { size: 12, weight: 'Bold', color: '#1F2937' });
    for (var rc = 0; rc < 4; rc++) {
        iaBox(resultsCol, 'Worker Card · Nombre · ⭐ 4.8 · S/ 80', 500, 40);
    }

    // 4.2.4 Navigation Systems
    var iaNav = iaDiagramFrame('4.2.4 · Navigation Systems', 1200, 900, 1300, 1000);
    makeText(iaNav, '4.2.4 · Navigation Systems', { size: 28, weight: 'Bold', color: '#1F2937' });
    makeText(iaNav, 'Navbar público + Topbar app + Sidenav desktop + Bottom nav mobile', { size: 14, weight: 'Regular', color: '#6B7280' });
    var navCol = makeFrame(iaNav, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    navCol.fills = [];
    // Public navbar
    var pubNav = makeFrame(navCol, {
        bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1, radius: 8,
        dir: 'HORIZONTAL', primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
        padding: 12, gap: 8,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 1000
    });
    makeText(pubNav, 'Ya Quedó', { size: 14, weight: 'Extra Bold', color: '#6366F1' });
    var pubLinks = makeFrame(pubNav, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    pubLinks.fills = [];
    var pubNavItems = ['Inicio', 'Servicios', 'Cómo funciona', 'Trabajadores', 'FAQ', 'Login', 'ES | EN'];
    for (var pn = 0; pn < pubNavItems.length; pn++) {
        makeText(pubLinks, pubNavItems[pn], { size: 11, weight: 'Medium', color: '#1F2937' });
    }
    iaBox(pubLinks, 'Registrarse', 80, 28, '#6366F1', '#FFFFFF');
    makeText(navCol, 'Navbar público (landing)', { size: 11, weight: 'Regular', color: '#6B7280' });

    // App topbar + sidenav + bottom nav
    var appNavRow = makeFrame(navCol, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    appNavRow.fills = [];
    var appShell = makeFrame(appNavRow, {
        bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1, radius: 8,
        dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'MIN',
        primarySizing: 'FIXED', counterSizing: 'FIXED',
        w: 600, h: 400
    });
    var appTop = makeFrame(appShell, {
        bg: '#F3F4F6',
        dir: 'HORIZONTAL', primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
        padding: 12,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 600
    });
    makeText(appTop, '☰  Ya Quedó', { size: 12, weight: 'Bold', color: '#6366F1' });
    iaBox(appTop, '🔍  ¿Qué servicio?', 240, 28, '#FFFFFF');
    makeText(appTop, '🔔  👤', { size: 12, weight: 'Regular', color: '#1F2937' });
    var appBody = makeFrame(appShell, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'MIN', counterAlign: 'MIN',
        primarySizing: 'FIXED', counterSizing: 'FIXED',
        w: 600, h: 360
    });
    appBody.fills = [];
    var appSide = makeFrame(appBody, {
        bg: '#FAFAFA', stroke: '#E5E7EB', strokeWeight: 1,
        dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'MIN',
        padding: 12, gap: 6,
        primarySizing: 'FIXED', counterSizing: 'FIXED',
        w: 160, h: 360
    });
    var sideItems = ['🏠 Inicio', '🔍 Buscar', '💬 Mensajes', '📅 Mis solicitudes', '💳 Pagos', '⭐ Reseñas', '🎓 Capacitaciones', '⚙ Ajustes'];
    for (var si = 0; si < sideItems.length; si++) {
        makeText(appSide, sideItems[si], { size: 11, weight: 'Medium', color: '#1F2937' });
    }
    var appMain = makeFrame(appBody, {
        bg: '#FFFFFF',
        dir: 'VERTICAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
        padding: 16, gap: 8,
        primarySizing: 'FIXED', counterSizing: 'FIXED',
        w: 440, h: 360
    });
    makeText(appMain, 'Contenido principal', { size: 14, weight: 'Regular', color: '#9CA3AF' });
    // Mobile shell
    var mobileShell = makeFrame(appNavRow, {
        bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1, radius: 16,
        dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'MIN',
        primarySizing: 'FIXED', counterSizing: 'FIXED',
        w: 200, h: 400
    });
    var mTop = makeFrame(mobileShell, {
        bg: '#F3F4F6',
        dir: 'HORIZONTAL', primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
        padding: 10,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 200
    });
    makeText(mTop, 'Ya Quedó', { size: 11, weight: 'Extra Bold', color: '#6366F1' });
    makeText(mTop, 'ES ☰', { size: 10, weight: 'Regular', color: '#1F2937' });
    var mBody = makeFrame(mobileShell, {
        bg: '#FFFFFF',
        dir: 'VERTICAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
        primarySizing: 'FIXED', counterSizing: 'FIXED',
        w: 200, h: 320
    });
    makeText(mBody, 'Contenido', { size: 11, weight: 'Regular', color: '#9CA3AF' });
    var mBottom = makeFrame(mobileShell, {
        bg: '#FAFAFA', stroke: '#E5E7EB', strokeWeight: 1,
        dir: 'HORIZONTAL', primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
        padding: 8,
        primarySizing: 'FIXED', counterSizing: 'AUTO',
        w: 200
    });
    var mTabs = ['🏠', '🔍', '💬', '👤'];
    for (var mt = 0; mt < mTabs.length; mt++) {
        makeText(mBottom, mTabs[mt], { size: 16, weight: 'Regular', color: '#6366F1' });
    }
    makeText(navCol, 'App desktop (topbar + sidenav) · App mobile (topbar + bottom nav)', { size: 11, weight: 'Regular', color: '#6B7280' });

    // =========================================================================
    // 16) SITE MAP — árbol jerárquico
    // =========================================================================
    figma.currentPage = pSM;
    var smCanvas = makeFrame(null, {
        name: '4.2.5 · Site Map',
        w: 2400, h: 1400,
        bg: '#FFFFFF', dir: 'VERTICAL',
        primaryAlign: 'MIN', counterAlign: 'CENTER',
        padding: 48, gap: 32,
        primarySizing: 'FIXED', counterSizing: 'FIXED'
    });
    makeText(smCanvas, '4.2.5 · Site Map', { size: 40, weight: 'Extra Bold', color: '#1F2937' });
    makeText(smCanvas, 'Jerarquía completa de páginas y vistas', { size: 16, weight: 'Regular', color: '#6B7280' });

    function smNode(parent, label, color, w, txtColor) {
        return iaBox(parent, label, w || 180, 44, color || '#F3F4F6', txtColor || '#1F2937');
    }

    var smRoot = makeFrame(smCanvas, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    smRoot.fills = [];
    smNode(smRoot, 'YA QUEDÓ · Root', '#6366F1', 320, '#FFFFFF');
    var smL1 = makeFrame(smRoot, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 32, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    smL1.fills = [];

    // 3 grandes ramas
    var smBranches = [
        ['/ Landing pública', '#818CF8', [
            '#inicio (Hero)', '#problema', '#solucion', '#como-funciona',
            '#servicios', '#beneficios', '#caracteristicas', '#trabajadores',
            '#impacto', '#testimonios', '#faq', '#pre-registro'
        ]],
        ['/auth/ · Autenticación', '#EC4899', [
            '/register (US-11)', '/register/otp (US-11)',
            '/login (US-12)', '/recover (US-12)'
        ]],
        ['/app/ · App cliente', '#4F46E5', [
            '/home', '/search', '/worker/:id',
            '/quote/request/:wid', '/quote/received/:qid',
            '/booking/:bid', '/payment/:bid', '/payment/receipt/:tx',
            '/messages', '/rating/submit/:bid', '/mis-solicitudes',
            '/ajustes'
        ]]
    ];
    for (var smb = 0; smb < smBranches.length; smb++) {
        var sbCol = makeFrame(smL1, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        sbCol.fills = [];
        smNode(sbCol, smBranches[smb][0], smBranches[smb][1], 260, '#FFFFFF');
        for (var sbi = 0; sbi < smBranches[smb][2].length; sbi++) {
            smNode(sbCol, smBranches[smb][2][sbi], '#F3F4F6', 260);
        }
    }

    // Rama trabajador
    var smWorker = makeFrame(smCanvas, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    smWorker.fills = [];
    smNode(smWorker, '/app/worker/ · App trabajador', '#10B981', 320, '#FFFFFF');
    var smWorkerRow = makeFrame(smWorker, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    smWorkerRow.fills = [];
    var workerPaths = [
        '/onboarding (US-13)', '/profile-edit (US-14)',
        '/requests (US-19)', '/quote/respond/:rid',
        '/dashboard (US-22)', '/reviews (US-24)',
        '/training (US-26)'
    ];
    for (var wp = 0; wp < workerPaths.length; wp++) {
        smNode(smWorkerRow, workerPaths[wp], '#F3F4F6', 200);
    }

    // Rama legal
    var smLegal = makeFrame(smCanvas, {
        bg: null, dir: 'VERTICAL',
        primaryAlign: 'CENTER', counterAlign: 'CENTER',
        gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    smLegal.fills = [];
    smNode(smLegal, '/ · Legal & soporte', '#EF4444', 260, '#FFFFFF');
    var smLegalRow = makeFrame(smLegal, {
        bg: null, dir: 'HORIZONTAL',
        primaryAlign: 'CENTER', counterAlign: 'MIN',
        gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
    });
    smLegalRow.fills = [];
    var legalPaths = ['/terms.html', '/privacy.html', '/privacy.html#cookies', '/terms.html#libro-reclamaciones', '/ayuda'];
    for (var lp = 0; lp < legalPaths.length; lp++) {
        smNode(smLegalRow, legalPaths[lp], '#F3F4F6', 220);
    }

    // =========================================================================
    // 17) USER FLOWS — 8 diagramas con happy + unhappy paths
    // =========================================================================
    figma.currentPage = pFlows;

    function flowStep(parent, label, kind) {
        // kind: 'screen' (blue), 'decision' (yellow), 'end' (green)
        var bg = '#E0E7FF', color = '#4F46E5';
        if (kind === 'decision') { bg = '#FEF3C7'; color = '#92400E'; }
        else if (kind === 'end') { bg = '#D1FAE5'; color = '#065F46'; }
        else if (kind === 'error') { bg = '#FEE2E2'; color = '#991B1B'; }
        return iaBox(parent, label, 180, 44, bg, color);
    }

    function flowArrow(parent, label) {
        var ar = makeFrame(parent, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 2, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        ar.fills = [];
        makeText(ar, '↓', { size: 16, weight: 'Bold', color: '#6B7280' });
        if (label) makeText(ar, label, { size: 10, weight: 'Regular', color: '#6B7280' });
        return ar;
    }

    function flowFrame(title, goal, x, y) {
        var f = makeFrame(null, {
            name: title, w: 1200, h: 900,
            bg: '#FFFFFF', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            padding: 40, gap: 16,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            stroke: '#E5E7EB', strokeWeight: 1, radius: 16
        });
        f.x = x; f.y = y;
        makeText(f, title, { size: 24, weight: 'Bold', color: '#1F2937' });
        makeText(f, 'User Goal: ' + goal, { size: 14, weight: 'Regular', color: '#6B7280' });
        return f;
    }

    function flowRow(parent, gap) {
        var r = makeFrame(parent, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: gap || 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        r.fills = [];
        return r;
    }

    function flowHappyChain(parent, steps) {
        var wrap = makeFrame(parent, {
            bg: '#F9FAFB', radius: 12, padding: 16,
            dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        makeText(wrap, 'Happy path', { size: 12, weight: 'Bold', color: '#10B981' });
        for (var s = 0; s < steps.length; s++) {
            flowStep(wrap, steps[s], 'screen');
            if (s < steps.length - 1) flowArrow(wrap);
        }
        flowStep(wrap, 'END', 'end');
        return wrap;
    }

    function flowUnhappyList(parent, items) {
        var wrap = makeFrame(parent, {
            bg: '#FFF7ED', radius: 12, padding: 16,
            dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'FIXED',
            w: 520, stroke: '#FED7AA', strokeWeight: 1
        });
        makeText(wrap, 'Unhappy paths', { size: 12, weight: 'Bold', color: '#C2410C' });
        for (var u = 0; u < items.length; u++) {
            var ur = makeFrame(wrap, {
                bg: '#FFFFFF', radius: 8, padding: 8,
                dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
                gap: 8, primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 488
            });
            makeText(ur, '⚠', { size: 12, color: '#F59E0B' });
            makeText(ur, items[u], { size: 11, weight: 'Regular', color: '#1F2937', w: 450 });
        }
    }

    var flowsData = [
        {
            title: 'Flow 01 · Cliente contrata servicio',
            goal: 'Contratar un servicio técnico de confianza',
            happy: ['Landing', 'Register', 'OTP', 'Home', 'Search', 'Results', 'Worker Profile', 'Quote Request', 'Quote Received', 'Schedule', 'Payment', 'Receipt', 'Rating'],
            unhappy: [
                'Email ya existe → banner "Recuperar contraseña"',
                'OTP inválido 3× → bloquea y permite reenviar tras 60s',
                'No hay resultados en distrito → muestra aledaños',
                'Trabajador no responde en 2h → sugerir contactar a otro',
                'Slot ya no disponible → propone los siguientes libres',
                'Pago falla → ofrece otro método',
                'Pasarela caída → pausa transacción y notifica',
                'Comentario ofensivo → revisión manual antes de publicar'
            ]
        },
        {
            title: 'Flow 02 · Cliente compara cotizaciones',
            goal: 'Comparar hasta 3 cotizaciones en paralelo',
            happy: ['Worker Profile A', 'Quote Request (marca "enviar a 2 similares")', 'Inbox cliente (3 activas)', 'Quote Received (3)', 'Elige el mejor', 'Accept + Schedule', 'Payment'],
            unhappy: [
                'Solo 1 trabajador responde → elige o rechaza',
                'Nadie responde en 24h → banner "Sin respuestas aún"',
                'Cliente rechaza todas → vuelve a Search'
            ]
        },
        {
            title: 'Flow 03 · Cliente reclama por mal servicio',
            goal: 'Abrir disputa y recuperar dinero si aplica',
            happy: ['Receipt', 'Rating (1-2⭐)', 'Abrir disputa', 'Dispute Form', 'Status En revisión', 'Soporte analiza 48h', 'Resolución + notificación'],
            unhappy: [
                'Cliente sin evidencia → form pide al menos 1 foto',
                'Cliente no responde 7 días → caso se cierra a favor del trabajador',
                'Soporte pide más info → chat de soporte'
            ]
        },
        {
            title: 'Flow 04 · Cliente resuelve duda con FAQ',
            goal: 'Self-service sin contactar soporte',
            happy: ['Landing', 'Click nav FAQ', 'Expand pregunta', 'Respuesta visible inline'],
            unhappy: [
                'Ninguna FAQ responde → CTA "Contactar soporte"',
                'Usuario no encuentra FAQ → Site search lo dirige'
            ]
        },
        {
            title: 'Flow 05 · Trabajador obtiene Verificado',
            goal: 'Completar onboarding y obtener la insignia Verificado',
            happy: ['Landing (CTA Soy trabajador)', 'Register', 'OTP', 'Identity · Step 1 DNI', 'Identity · Step 2 Selfie', 'Status En revisión', '48h pasan', 'Status Verificado', 'Profile Edit'],
            unhappy: [
                'DNI ilegible → Status Rechazado con motivo + reintentar',
                'Abandona Step 2 → email recordatorio a los 2 días',
                'Error de red → retry + preserva datos (US-13)',
                'DNI no coincide selfie → Status Rechazado por fraude'
            ]
        },
        {
            title: 'Flow 06 · Trabajador cobra por servicio',
            goal: 'Ejecutar servicio y recibir el pago',
            happy: ['Dashboard', 'Notificación nueva solicitud', 'Requests Inbox', 'Quote Response', 'Chat', 'Booking confirmado', 'Servicio ejecutado', 'Cliente confirma', '24h después → Dashboard Finance', 'Retiro a Yape/banco'],
            unhappy: [
                'No responde en 2h → ranking baja + solicitud expira',
                'Cliente rechaza cotización → solicitud cerrada',
                'Trabajador rechaza → cliente ve alternativas',
                'Cliente no confirma → liberación auto 72h (US-22)',
                'Cliente abre disputa → fondos retenidos'
            ]
        },
        {
            title: 'Flow 07 · Trabajador responde reseña negativa',
            goal: 'Defender profesionalmente su reputación',
            happy: ['Notificación reseña 2⭐', 'Reviews Panel', 'Abrir reseña', 'Click Responder', 'Response Dialog', 'Filtro contenido OK', 'Respuesta publicada bajo reseña'],
            unhappy: [
                '>500 chars → mat-error y bloquea submit',
                'Contenido ofensivo → rechazo + sugerencia tono',
                'Reseña falsa → reportar al soporte'
            ]
        },
        {
            title: 'Flow 08 · Trabajador sube de nivel con capacitación',
            goal: 'Obtener insignia de certificación',
            happy: ['Dashboard', 'Training Catalog', 'Elegir curso', 'Ver video', 'Quiz 5 preguntas', '≥ 4/5 aprobado', 'Insignia en perfil'],
            unhappy: [
                'Video no carga → Descargar para offline (US-26)',
                'Quiz < 4/5 → reintento en 24h',
                'Abandona video → reanuda donde quedó'
            ]
        }
    ];

    for (var fi = 0; fi < flowsData.length; fi++) {
        var col = fi % 2, rowF = Math.floor(fi / 2);
        var fx = col * 1300, fy = rowF * 1000;
        var ff = flowFrame(flowsData[fi].title, flowsData[fi].goal, fx, fy);
        var fRowContent = flowRow(ff, 24);
        flowHappyChain(fRowContent, flowsData[fi].happy);
        flowUnhappyList(fRowContent, flowsData[fi].unhappy);
    }

    // =========================================================================
    // 18) WIREFRAMES LO-FI — Landing Desktop + Mobile
    // =========================================================================
    figma.currentPage = pWF;

    function wfBox(parent, label, h) {
        var w = makeFrame(parent, {
            bg: '#F3F4F6', stroke: '#9CA3AF', strokeWeight: 1, radius: 4,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1376, h: h
        });
        makeText(w, label, { size: 14, weight: 'Semi Bold', color: '#6B7280' });
        return w;
    }
    function wfBoxM(parent, label, h) {
        var w = makeFrame(parent, {
            bg: '#F3F4F6', stroke: '#9CA3AF', strokeWeight: 1, radius: 4,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 343, h: h
        });
        makeText(w, label, { size: 12, weight: 'Semi Bold', color: '#6B7280' });
        return w;
    }

    // Desktop wireframe
    var wfDesktop = makeFrame(null, {
        name: 'Wireframe · Desktop Landing',
        w: 1440, h: 6500,
        bg: '#FFFFFF', stroke: '#D1D5DB', strokeWeight: 2,
        dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
        gap: 8, padding: 32,
        primarySizing: 'FIXED', counterSizing: 'FIXED'
    });
    wfDesktop.x = 0; wfDesktop.y = 0;
    makeText(wfDesktop, 'Wireframe · Desktop 1440', { size: 14, weight: 'Bold', color: '#6B7280' });
    var wfSecs = [
        ['NAVBAR · Logo | Inicio Servicios Cómo Trabajadores FAQ Login [Registrarse] ES|EN', 70],
        ['HERO · H1 + subtitle + 2 CTAs', 540],
        ['PROBLEMA · 3 cards icono + título + desc', 500],
        ['SOLUCIÓN · 2 col (texto+lista / visual YQ)', 440],
        ['CÓMO FUNCIONA · 4 step cards', 500],
        ['SERVICIOS (US-03) · 6 service cards grid 3×2', 600],
        ['BENEFICIOS · 2 col (clientes / trabajadores) 6 items', 600],
        ['CARACTERÍSTICAS · 6 feature cards 3×2', 640],
        ['TRABAJADORES (US-08) · 2 col (texto+CTA / 3 stat cards)', 500],
        ['IMPACTO · 4 stats sobre gradiente', 440],
        ['TESTIMONIOS (US-04) · 3 cards cita+avatar+distrito', 520],
        ['FAQ (US-06) · 6 items colapsables', 680],
        ['PRE-REGISTRO (US-05) · form con toggle cliente/trabajador', 680],
        ['FOOTER (US-07) · 5 columnas + copyright', 340]
    ];
    for (var ws = 0; ws < wfSecs.length; ws++) {
        wfBox(wfDesktop, wfSecs[ws][0], wfSecs[ws][1]);
    }

    // Mobile wireframe (simpler)
    var wfMobile = makeFrame(null, {
        name: 'Wireframe · Mobile Landing',
        w: 375, h: 9000,
        bg: '#FFFFFF', stroke: '#D1D5DB', strokeWeight: 2,
        dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
        gap: 6, padding: 16,
        primarySizing: 'FIXED', counterSizing: 'FIXED'
    });
    wfMobile.x = 1600; wfMobile.y = 0;
    makeText(wfMobile, 'Wireframe · Mobile 375', { size: 12, weight: 'Bold', color: '#6B7280' });
    var wfMSecs = [
        ['NAVBAR · Logo + ES|EN + ☰', 70],
        ['HERO · H1 + subtitle + 2 CTAs stacked', 480],
        ['PROBLEMA · 3 cards stacked', 640],
        ['SOLUCIÓN · texto + card YQ', 620],
        ['CÓMO FUNCIONA · 4 steps', 1100],
        ['SERVICIOS · 6 cards 1 col', 1340],
        ['BENEFICIOS · 2 grupos stacked', 1420],
        ['CARACTERÍSTICAS · 6 cards', 1720],
        ['TRABAJADORES · texto + 3 stats', 1080],
        ['IMPACTO · 4 stats 2×2', 640],
        ['TESTIMONIOS · 3 stacked', 820],
        ['FAQ · 6 items', 820],
        ['PRE-REGISTRO · form 1 col', 1000],
        ['FOOTER · 5 col stacked', 820]
    ];
    for (var wm = 0; wm < wfMSecs.length; wm++) {
        wfBoxM(wfMobile, wfMSecs[wm][0], wfMSecs[wm][1]);
    }

    // =========================================================================
    // 19) APP SCREENS — helpers + 22 pantallas desktop + 22 mobile
    // =========================================================================
    // --- Helpers de app shell
    function appTopbar(parent, w, showSearch) {
        var tb = makeFrame(parent, {
            bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1,
            dir: 'HORIZONTAL', primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
            paddingV: 12, paddingH: 20,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: w, h: 64
        });
        var brand = makeFrame(tb, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        brand.fills = [];
        makeText(brand, '☰', { size: 20, color: '#1F2937', weight: 'Regular' });
        makeText(brand, 'Ya Quedó', { size: 18, weight: 'Extra Bold', color: '#6366F1' });
        if (showSearch && w > 700) {
            var srchBox = makeFrame(tb, {
                bg: '#F3F4F6', radius: 999,
                dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
                paddingV: 8, paddingH: 14, gap: 8,
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 360
            });
            makeText(srchBox, '🔍', { size: 13, color: '#6B7280' });
            makeText(srchBox, '¿Qué servicio necesitas?', { size: 13, color: '#9CA3AF' });
        }
        var right = makeFrame(tb, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        right.fills = [];
        makeText(right, '🔔', { size: 16, color: '#1F2937' });
        var avatar = makeFrame(right, {
            bg: null, bgGradient: ['#EC4899', '#10B981', 135],
            radius: 999, w: 32, h: 32,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(avatar, 'YQ', { size: 11, weight: 'Bold', color: '#FFFFFF' });
        return tb;
    }

    function appSidenav(parent, h) {
        var sn = makeFrame(parent, {
            bg: '#FAFAFA', stroke: '#E5E7EB', strokeWeight: 1,
            dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'MIN',
            paddingV: 16, paddingH: 12, gap: 4,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 240, h: h
        });
        var snItems = [
            ['🏠  Inicio', true],
            ['🔍  Buscar', false],
            ['💬  Mensajes', false],
            ['📅  Mis solicitudes', false],
            ['💳  Pagos', false],
            ['⭐  Reseñas', false],
            ['🎓  Capacitaciones', false],
            ['⚙  Ajustes', false]
        ];
        for (var sni = 0; sni < snItems.length; sni++) {
            var snItem = makeFrame(sn, {
                bg: snItems[sni][1] ? '#E0E7FF' : null,
                radius: 8,
                dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
                paddingV: 10, paddingH: 12,
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 216
            });
            if (!snItems[sni][1]) snItem.fills = [];
            makeText(snItem, snItems[sni][0], {
                size: 14, weight: snItems[sni][1] ? 'Semi Bold' : 'Medium',
                color: snItems[sni][1] ? '#4F46E5' : '#1F2937'
            });
        }
        return sn;
    }

    function appBottomNav(parent) {
        var bn = makeFrame(parent, {
            bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1,
            dir: 'HORIZONTAL', primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
            paddingV: 12, paddingH: 24,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 64
        });
        var tabs = [['🏠', 'Home', true], ['🔍', 'Buscar', false], ['💬', 'Chat', false], ['👤', 'Perfil', false]];
        for (var tt = 0; tt < tabs.length; tt++) {
            var tab = makeFrame(bn, {
                bg: null, dir: 'VERTICAL',
                primaryAlign: 'CENTER', counterAlign: 'CENTER',
                gap: 2, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            tab.fills = [];
            makeText(tab, tabs[tt][0], { size: 16, color: tabs[tt][2] ? '#6366F1' : '#9CA3AF' });
            makeText(tab, tabs[tt][1], { size: 10, weight: 'Semi Bold', color: tabs[tt][2] ? '#6366F1' : '#9CA3AF' });
        }
        return bn;
    }

    function screenDesktop(title, subtitle, x, y) {
        var scr = makeFrame(null, {
            name: title, w: 1440, h: 900,
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            stroke: '#E5E7EB', strokeWeight: 1
        });
        scr.x = x; scr.y = y;
        return scr;
    }

    function screenMobile(title, x, y) {
        var scr = makeFrame(null, {
            name: title, w: 375, h: 812,
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            stroke: '#E5E7EB', strokeWeight: 1, radius: 16, clip: true
        });
        scr.x = x; scr.y = y;
        return scr;
    }

    function formInput(parent, label, placeholder, w) {
        var fi_ = makeFrame(parent, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 4, primarySizing: 'AUTO', counterSizing: 'FIXED',
            w: w || 320
        });
        fi_.fills = [];
        makeText(fi_, label, { size: 12, weight: 'Semi Bold', color: '#1F2937' });
        var ib = makeFrame(fi_, {
            bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1, radius: 8,
            dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
            paddingV: 12, paddingH: 12,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: w || 320
        });
        makeText(ib, placeholder, { size: 13, weight: 'Regular', color: '#9CA3AF' });
        return fi_;
    }

    function matCard(parent, opts) {
        opts = opts || {};
        return makeFrame(parent, {
            bg: '#FFFFFF', radius: 12,
            dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: opts.center ? 'CENTER' : 'MIN',
            padding: opts.padding != null ? opts.padding : 24,
            gap: opts.gap != null ? opts.gap : 16,
            shadow: 'Shadow/md',
            primarySizing: 'AUTO', counterSizing: opts.w ? 'FIXED' : 'AUTO',
            w: opts.w, stroke: '#F3F4F6', strokeWeight: 1,
            name: opts.name
        });
    }

    function matBtn(parent, label, variant, w) {
        return button(parent, label, variant || 'primary');
    }

    function chip2(parent, label, active) {
        var c = makeFrame(parent, {
            bg: active ? '#E0E7FF' : '#F3F4F6',
            radius: 999,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            paddingV: 6, paddingH: 12,
            primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        makeText(c, label, { size: 12, weight: 'Semi Bold', color: active ? '#4F46E5' : '#6B7280' });
        return c;
    }

    // ============================ APP SCREENS DESKTOP ============================
    figma.currentPage = pAppD;

    var appDX = 0, appDY = 0, appDCol = 0, appDRow = 0;
    function nextAppDesktopPos() {
        var pos = { x: appDCol * 1520, y: appDRow * 980 };
        appDCol++;
        if (appDCol >= 4) { appDCol = 0; appDRow++; }
        return pos;
    }

    // 01 · Register (US-11)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('01 · Register (US-11)', '', p.x, p.y);
        var bg = makeFrame(s, {
            bgGradient: ['#667EEA', '#764BA2', 135],
            dir: 'VERTICAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 900
        });
        var fc = matCard(bg, { w: 480, padding: 40, gap: 20, name: 'Register Card' });
        makeText(fc, 'Crea tu cuenta', { size: 28, weight: 'Bold', color: '#1F2937' });
        var tg = makeFrame(fc, {
            bg: '#F3F4F6', radius: 8,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            padding: 4, gap: 4,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 400
        });
        chip2(tg, '👤 Cliente', true);
        chip2(tg, '💼 Trabajador', false);
        formInput(fc, 'Nombre completo', 'María Carmen Rodríguez', 400);
        formInput(fc, 'Correo electrónico', 'tu@correo.com', 400);
        formInput(fc, 'Teléfono', '+51 9XX XXX XXX', 400);
        formInput(fc, 'Contraseña', '••••••••', 400);
        var cons = makeFrame(fc, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        cons.fills = [];
        makeFrame(cons, { bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1, radius: 4, w: 16, h: 16, primarySizing: 'FIXED', counterSizing: 'FIXED' });
        makeText(cons, 'Acepto términos y política', { size: 12, color: '#6B7280' });
        var bw = matBtn(fc, 'Crear cuenta', 'primary');
        bw.resize(400, bw.height);
        bw.primaryAxisSizingMode = 'FIXED';
        makeText(fc, '¿Ya tienes cuenta? Inicia sesión', { size: 13, weight: 'Semi Bold', color: '#6366F1', align: 'CENTER', w: 400 });
    })();

    // 02 · OTP (US-11 alt)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('02 · OTP Verify', '', p.x, p.y);
        var bg = makeFrame(s, {
            bgGradient: ['#667EEA', '#764BA2', 135],
            dir: 'VERTICAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 900
        });
        var fc = matCard(bg, { w: 480, padding: 40, gap: 20, center: true });
        makeText(fc, 'Verifica tu teléfono', { size: 24, weight: 'Bold', color: '#1F2937', align: 'CENTER', w: 400 });
        makeText(fc, 'Ingresa el código enviado a +51 9XX XXX 123', { size: 13, color: '#6B7280', align: 'CENTER', w: 400 });
        var otp = makeFrame(fc, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        otp.fills = [];
        for (var ot = 0; ot < 6; ot++) {
            var ob = makeFrame(otp, {
                bg: '#FFFFFF', stroke: ot === 2 ? '#6366F1' : '#E5E7EB', strokeWeight: 2, radius: 8,
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'FIXED',
                w: 48, h: 56
            });
            if (ot < 3) makeText(ob, String.fromCharCode(49 + ot), { size: 24, weight: 'Bold', color: '#1F2937' });
        }
        var bw2 = matBtn(fc, 'Verificar', 'primary');
        bw2.resize(400, bw2.height);
        bw2.primaryAxisSizingMode = 'FIXED';
        makeText(fc, 'Reenviar código en 59s', { size: 12, color: '#9CA3AF', align: 'CENTER', w: 400 });
    })();

    // 03 · Login (US-12)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('03 · Login (US-12)', '', p.x, p.y);
        var bg = makeFrame(s, {
            bgGradient: ['#667EEA', '#764BA2', 135],
            dir: 'VERTICAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 900
        });
        var fc = matCard(bg, { w: 440, padding: 40, gap: 20 });
        makeText(fc, 'Inicia sesión', { size: 28, weight: 'Bold', color: '#1F2937' });
        formInput(fc, 'Correo', 'tu@correo.com', 360);
        formInput(fc, 'Contraseña', '••••••••', 360);
        var row = makeFrame(fc, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 360
        });
        row.fills = [];
        var cb = makeFrame(row, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 6, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        cb.fills = [];
        makeFrame(cb, { bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1, radius: 4, w: 14, h: 14, primarySizing: 'FIXED', counterSizing: 'FIXED' });
        makeText(cb, 'Recordarme', { size: 12, color: '#6B7280' });
        makeText(row, '¿Olvidaste contraseña?', { size: 12, weight: 'Semi Bold', color: '#6366F1' });
        var lb = matBtn(fc, 'Iniciar sesión', 'primary');
        lb.resize(360, lb.height);
        lb.primaryAxisSizingMode = 'FIXED';
        makeText(fc, '— o —', { size: 12, color: '#9CA3AF', align: 'CENTER', w: 360 });
        var gb = matBtn(fc, 'Continuar con Google', 'secondary');
        gb.resize(360, gb.height);
        gb.primaryAxisSizingMode = 'FIXED';
    })();

    // 04 · Recover Password
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('04 · Recover Password', '', p.x, p.y);
        var bg = makeFrame(s, {
            bgGradient: ['#667EEA', '#764BA2', 135],
            dir: 'VERTICAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 900
        });
        var fc = matCard(bg, { w: 440, padding: 40, gap: 20 });
        makeText(fc, 'Recuperar contraseña', { size: 26, weight: 'Bold', color: '#1F2937' });
        makeText(fc, 'Te enviaremos un enlace para restablecer tu contraseña', { size: 13, color: '#6B7280', w: 360 });
        formInput(fc, 'Correo electrónico', 'tu@correo.com', 360);
        var rb = matBtn(fc, 'Enviar enlace', 'primary');
        rb.resize(360, rb.height);
        rb.primaryAxisSizingMode = 'FIXED';
    })();

    // 05 · Identity Verify (US-13)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('05 · Identity Verify (US-13)', '', p.x, p.y);
        appTopbar(s, 1440, false);
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 48, gap: 32,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        makeText(body, 'Verifica tu identidad', { size: 32, weight: 'Bold', color: '#1F2937' });
        // Stepper
        var stepper = makeFrame(body, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        stepper.fills = [];
        var stepsLabels = ['1. Documento', '2. Selfie', '3. Revisión'];
        for (var ss = 0; ss < stepsLabels.length; ss++) {
            var st = makeFrame(stepper, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'CENTER', counterAlign: 'CENTER',
                gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            st.fills = [];
            var sd = makeFrame(st, {
                bg: ss <= 1 ? '#6366F1' : '#E5E7EB',
                radius: 16, w: 32, h: 32,
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'FIXED'
            });
            makeText(sd, String(ss + 1), { size: 14, weight: 'Bold', color: ss <= 1 ? '#FFFFFF' : '#6B7280' });
            makeText(st, stepsLabels[ss], { size: 14, weight: 'Semi Bold', color: ss <= 1 ? '#6366F1' : '#9CA3AF' });
            if (ss < 2) makeFrame(stepper, { bg: '#E5E7EB', w: 40, h: 2, primarySizing: 'FIXED', counterSizing: 'FIXED' });
        }
        // Upload zones
        var uprow = makeFrame(body, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'MIN',
            gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        uprow.fills = [];
        for (var uz = 0; uz < 2; uz++) {
            var upz = matCard(uprow, { w: 400, padding: 40, gap: 16, center: true });
            var dashed = makeFrame(upz, {
                bg: '#F9FAFB', stroke: '#6366F1', strokeWeight: 2, radius: 12,
                dir: 'VERTICAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                gap: 8, primarySizing: 'FIXED', counterSizing: 'FIXED',
                w: 320, h: 160
            });
            dashed.dashPattern = [8, 8];
            makeText(dashed, '📷', { size: 36 });
            makeText(dashed, uz === 0 ? 'DNI Anverso' : 'DNI Reverso', { size: 14, weight: 'Semi Bold', color: '#6366F1' });
            makeText(dashed, 'Sube o arrastra', { size: 11, color: '#9CA3AF' });
        }
        matBtn(body, 'Siguiente: Selfie', 'primary');
    })();

    // 06 · Profile Edit (US-14)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('06 · Profile Edit (US-14)', '', p.x, p.y);
        appTopbar(s, 1440, true);
        var rowL = makeFrame(s, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        rowL.fills = [];
        appSidenav(rowL, 836);
        var main = makeFrame(rowL, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            padding: 32, gap: 24,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1200, h: 836
        });
        makeText(main, 'Mi perfil', { size: 28, weight: 'Bold', color: '#1F2937' });
        var tabs = makeFrame(main, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        tabs.fills = [];
        var tabLabels = ['Información', 'Oficios y tarifas', 'Trabajos', 'Disponibilidad'];
        for (var tb2 = 0; tb2 < tabLabels.length; tb2++) {
            var tbc = makeFrame(tabs, {
                bg: null, dir: 'VERTICAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            tbc.fills = [];
            makeText(tbc, tabLabels[tb2], { size: 14, weight: tb2 === 0 ? 'Bold' : 'Medium', color: tb2 === 0 ? '#6366F1' : '#6B7280' });
            if (tb2 === 0) makeFrame(tbc, { bg: '#6366F1', w: 80, h: 2, primarySizing: 'FIXED', counterSizing: 'FIXED' });
        }
        var tabContent = matCard(main, { w: 1136, padding: 32, gap: 20 });
        var avRow = makeFrame(tabContent, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 20, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        avRow.fills = [];
        var bigAv = makeFrame(avRow, {
            bg: null, bgGradient: ['#EC4899', '#10B981', 135],
            radius: 999, w: 100, h: 100,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(bigAv, 'MC', { size: 32, weight: 'Bold', color: '#FFFFFF' });
        var avInfo = makeFrame(avRow, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 6, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        avInfo.fills = [];
        makeText(avInfo, 'María Carmen Rodríguez', { size: 20, weight: 'Bold', color: '#1F2937' });
        makeText(avInfo, 'Electricista · San Miguel, Lima', { size: 14, color: '#6B7280' });
        chip2(avInfo, '✓ Verificado', true);
        formInput(tabContent, 'Bio', 'Electricista con 12 años de experiencia en instalaciones domésticas y comerciales.', 1072);
        formInput(tabContent, 'Teléfono', '+51 987 654 321', 1072);
        formInput(tabContent, 'Distritos donde operas', 'San Miguel, Magdalena, Pueblo Libre', 1072);
        matBtn(tabContent, 'Guardar cambios', 'primary');
    })();

    // 07 · Home (US-15 entry)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('07 · Home Cliente', '', p.x, p.y);
        appTopbar(s, 1440, true);
        var rowL = makeFrame(s, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        rowL.fills = [];
        appSidenav(rowL, 836);
        var main = makeFrame(rowL, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            padding: 32, gap: 24,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1200, h: 836
        });
        makeText(main, 'Hola Juan 👋 ¿Qué necesitas hoy?', { size: 28, weight: 'Bold', color: '#1F2937' });
        var search = matCard(main, { w: 1136, padding: 16, gap: 12 });
        var srow = makeFrame(search, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 12, primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 1088
        });
        srow.fills = [];
        var si_ = makeFrame(srow, {
            bg: '#F3F4F6', radius: 8,
            dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
            paddingV: 12, paddingH: 16,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 600
        });
        makeText(si_, '🔍  ¿Qué servicio buscas?', { size: 14, color: '#9CA3AF' });
        var di = makeFrame(srow, {
            bg: '#F3F4F6', radius: 8,
            dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
            paddingV: 12, paddingH: 16,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 240
        });
        makeText(di, '📍 San Miguel ▾', { size: 14, color: '#6B7280' });
        matBtn(srow, 'Buscar', 'primary');
        makeText(main, 'Categorías', { size: 18, weight: 'Bold', color: '#1F2937' });
        var cats = makeFrame(main, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        cats.fills = [];
        var catList = [['⚡', 'Electricidad'], ['🔧', 'Gasfitería'], ['🎨', 'Pintura'], ['🔑', 'Cerrajería'], ['🧯', 'Electrodomésticos'], ['🧹', 'Limpieza']];
        for (var ca = 0; ca < catList.length; ca++) {
            var catC = makeFrame(cats, {
                bg: '#FFFFFF', radius: 12, stroke: '#E5E7EB', strokeWeight: 1,
                dir: 'VERTICAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                padding: 16, gap: 8,
                primarySizing: 'FIXED', counterSizing: 'FIXED',
                w: 170, h: 100
            });
            makeText(catC, catList[ca][0], { size: 28 });
            makeText(catC, catList[ca][1], { size: 13, weight: 'Semi Bold', color: '#1F2937', align: 'CENTER' });
        }
        makeText(main, 'Trabajadores destacados cerca de ti', { size: 18, weight: 'Bold', color: '#1F2937' });
        var wrow = makeFrame(main, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        wrow.fills = [];
        for (var wk = 0; wk < 4; wk++) {
            var wkC = matCard(wrow, { w: 266, padding: 16, gap: 10 });
            var wav = makeFrame(wkC, {
                bg: null, bgGradient: ['#EC4899', '#10B981', 135],
                radius: 999, w: 56, h: 56,
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'FIXED'
            });
            makeText(wav, 'M' + String.fromCharCode(67 + wk), { size: 16, weight: 'Bold', color: '#FFFFFF' });
            makeText(wkC, 'Trabajador ' + (wk + 1), { size: 16, weight: 'Bold', color: '#1F2937' });
            makeText(wkC, 'Electricista · San Miguel', { size: 12, color: '#6B7280' });
            makeText(wkC, '⭐ 4.' + (8 - wk) + ' · 45 servicios', { size: 12, color: '#F59E0B', weight: 'Semi Bold' });
            makeText(wkC, 'Desde S/ ' + (80 + wk * 20), { size: 14, weight: 'Bold', color: '#6366F1' });
        }
    })();

    // 08 · Search Results (US-15/16)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('08 · Search Results (US-15/16)', '', p.x, p.y);
        appTopbar(s, 1440, true);
        var rowL = makeFrame(s, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        rowL.fills = [];
        // Filters sidebar
        var filters = makeFrame(rowL, {
            bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1,
            dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'MIN',
            padding: 24, gap: 20,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 300, h: 836
        });
        makeText(filters, 'Filtros', { size: 20, weight: 'Bold', color: '#1F2937' });
        var filtGroups = [
            ['Oficio', ['☑ Electricidad', '☐ Gasfitería', '☐ Pintura', '☐ Cerrajería']],
            ['Distrito', ['☑ San Miguel', '☑ Magdalena', '☐ Pueblo Libre']],
            ['Calificación mínima', ['⭐⭐⭐⭐ · 4+ estrellas']],
            ['Precio', ['S/ 20 ——●—— S/ 500']],
            ['Disponibilidad', ['Hoy · Mañana · Esta semana']]
        ];
        for (var fg = 0; fg < filtGroups.length; fg++) {
            makeText(filters, filtGroups[fg][0], { size: 13, weight: 'Bold', color: '#1F2937' });
            for (var fgi = 0; fgi < filtGroups[fg][1].length; fgi++) {
                makeText(filters, filtGroups[fg][1][fgi], { size: 12, color: '#6B7280' });
            }
        }
        matBtn(filters, 'Aplicar filtros', 'primary');
        makeText(filters, 'Limpiar todo', { size: 12, weight: 'Semi Bold', color: '#6366F1', align: 'CENTER', w: 252 });
        // Results
        var res = makeFrame(rowL, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            padding: 32, gap: 16,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1140, h: 836
        });
        var hdr = makeFrame(res, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 1076
        });
        hdr.fills = [];
        makeText(hdr, '12 resultados · ordenados por cercanía y calificación', { size: 14, color: '#6B7280' });
        makeText(hdr, 'Ordenar: Cercanía ▾', { size: 13, weight: 'Semi Bold', color: '#6366F1' });
        for (var wi = 0; wi < 4; wi++) {
            var wc = matCard(res, { w: 1076, padding: 20, gap: 16 });
            var wcr = makeFrame(wc, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                gap: 16, primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 1036
            });
            wcr.fills = [];
            var wiv = makeFrame(wcr, {
                bg: null, bgGradient: ['#EC4899', '#10B981', 135],
                radius: 999, w: 72, h: 72,
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'FIXED'
            });
            makeText(wiv, ['MC', 'JL', 'RG', 'AP'][wi], { size: 20, weight: 'Bold', color: '#FFFFFF' });
            var winf = makeFrame(wcr, {
                bg: null, dir: 'VERTICAL',
                primaryAlign: 'MIN', counterAlign: 'MIN',
                gap: 6, primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 700
            });
            winf.fills = [];
            makeText(winf, ['María Carmen R.', 'Juan López', 'Roberto Gómez', 'Ana Pérez'][wi], { size: 18, weight: 'Bold', color: '#1F2937' });
            makeText(winf, 'Electricista · San Miguel · 1.2 km', { size: 13, color: '#6B7280' });
            var chrow = makeFrame(winf, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            chrow.fills = [];
            chip2(chrow, '✓ Verificado', true);
            if (wi === 0) chip2(chrow, '🏅 Top Rated', true);
            makeText(winf, '⭐ 4.' + (9 - wi) + ' · (' + (45 - wi * 5) + ' servicios)', { size: 12, color: '#F59E0B', weight: 'Semi Bold' });
            var rcol = makeFrame(wcr, {
                bg: null, dir: 'VERTICAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                gap: 6, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            rcol.fills = [];
            makeText(rcol, 'Desde', { size: 11, color: '#6B7280' });
            makeText(rcol, 'S/ ' + (80 + wi * 20), { size: 22, weight: 'Extra Bold', color: '#6366F1' });
            matBtn(rcol, 'Ver perfil', 'primary');
        }
    })();

    // 09 · Worker Profile (US-17)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('09 · Worker Profile (US-17)', '', p.x, p.y);
        appTopbar(s, 1440, true);
        var main = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 32, gap: 24,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        var hero = matCard(main, { w: 1200, padding: 32, gap: 20 });
        var hr = makeFrame(hero, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 24, primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 1136
        });
        hr.fills = [];
        var hav = makeFrame(hr, {
            bg: null, bgGradient: ['#EC4899', '#10B981', 135],
            radius: 999, w: 120, h: 120,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(hav, 'MC', { size: 40, weight: 'Bold', color: '#FFFFFF' });
        var hinf = makeFrame(hr, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 8, primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 750
        });
        hinf.fills = [];
        makeText(hinf, 'María Carmen Rodríguez', { size: 28, weight: 'Extra Bold', color: '#1F2937' });
        makeText(hinf, 'Electricista · San Miguel, Lima', { size: 15, color: '#6B7280' });
        var chips = makeFrame(hinf, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        chips.fills = [];
        chip2(chips, '✓ Verificado', true);
        chip2(chips, '🏅 Top Rated', true);
        chip2(chips, '🎓 Certificado eléctrico', true);
        makeText(hinf, '⭐ 4.9 · 54 reseñas · 120 servicios completados', { size: 14, weight: 'Semi Bold', color: '#F59E0B' });
        matBtn(hr, 'Solicitar cotización', 'primary');
        // Tabs
        var ptabs = makeFrame(hero, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 24, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        ptabs.fills = [];
        var ptl = ['Resumen', 'Reseñas (54)', 'Galería (12)', 'Tarifas'];
        for (var pt = 0; pt < ptl.length; pt++) {
            makeText(ptabs, ptl[pt], { size: 14, weight: pt === 0 ? 'Bold' : 'Regular', color: pt === 0 ? '#6366F1' : '#6B7280' });
        }
        // Bio
        makeText(hero, 'Sobre mí', { size: 16, weight: 'Bold', color: '#1F2937' });
        makeText(hero, 'Electricista con 12 años de experiencia. Especialista en instalaciones eléctricas domésticas, diagnóstico de cortos, instalación de tableros y lámparas.', {
            size: 14, color: '#1F2937', w: 1136
        });
        // Reviews
        var rTitle = matCard(main, { w: 1200, padding: 24, gap: 16 });
        makeText(rTitle, 'Últimas reseñas', { size: 18, weight: 'Bold', color: '#1F2937' });
        for (var rv = 0; rv < 2; rv++) {
            var rev = makeFrame(rTitle, {
                bg: '#F9FAFB', radius: 8, padding: 16, gap: 8,
                dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'MIN',
                primarySizing: 'FIXED', counterSizing: 'FIXED',
                w: 1136, h: 100
            });
            var rvh = makeFrame(rev, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 1104
            });
            rvh.fills = [];
            makeText(rvh, 'Juan L. · hace 3 días', { size: 13, weight: 'Semi Bold', color: '#1F2937' });
            makeText(rvh, '⭐⭐⭐⭐⭐', { size: 14 });
            makeText(rev, 'Excelente trabajo, muy puntual y dejó todo limpio. Recomendado al 100%.', { size: 13, color: '#6B7280', w: 1104 });
        }
    })();

    // 10 · Quote Request (US-18)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('10 · Quote Request (US-18)', '', p.x, p.y);
        appTopbar(s, 1440, true);
        var bg = makeFrame(s, {
            bg: '#F9FAFB',
            dir: 'VERTICAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        var qc = matCard(bg, { w: 640, padding: 32, gap: 20 });
        makeText(qc, 'Solicitar cotización', { size: 24, weight: 'Bold', color: '#1F2937' });
        makeText(qc, 'Con: María Carmen R. · Electricista', { size: 13, color: '#6B7280' });
        formInput(qc, 'Oficio', 'Electricidad', 576);
        formInput(qc, 'Describe tu problema (mín 30 chars)', 'No funciona el interruptor del baño, se queda encendido...', 576);
        var upA = makeFrame(qc, {
            bg: '#F9FAFB', stroke: '#6366F1', strokeWeight: 2, radius: 12,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            padding: 20, gap: 12,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 576
        });
        upA.dashPattern = [6, 6];
        makeText(upA, '📷  Sube fotos del problema (opcional, máx 5)', { size: 13, weight: 'Semi Bold', color: '#6366F1' });
        formInput(qc, 'Urgencia', 'Esta semana', 576);
        formInput(qc, 'Dirección', 'Av. Ejemplo 123, San Miguel', 576);
        var cb2 = makeFrame(qc, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 576
        });
        cb2.fills = [];
        makeFrame(cb2, { bg: '#6366F1', radius: 4, w: 16, h: 16, primarySizing: 'FIXED', counterSizing: 'FIXED' });
        makeText(cb2, 'Enviar también a 2 trabajadores similares para comparar', { size: 12, color: '#1F2937' });
        var qb = matBtn(qc, 'Enviar solicitud', 'primary');
        qb.resize(576, qb.height);
        qb.primaryAxisSizingMode = 'FIXED';
    })();

    // 11 · Requests Inbox (US-19)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('11 · Requests Inbox (US-19)', '', p.x, p.y);
        appTopbar(s, 1440, true);
        var rowL = makeFrame(s, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        rowL.fills = [];
        appSidenav(rowL, 836);
        var main = makeFrame(rowL, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            padding: 32, gap: 24,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1200, h: 836
        });
        makeText(main, 'Solicitudes recibidas', { size: 28, weight: 'Bold', color: '#1F2937' });
        var tabR = makeFrame(main, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        tabR.fills = [];
        chip2(tabR, 'Pendientes (3)', true);
        chip2(tabR, 'Respondidas (12)', false);
        chip2(tabR, 'Rechazadas (1)', false);
        for (var rq = 0; rq < 3; rq++) {
            var rqc = matCard(main, { w: 1136, padding: 20, gap: 12 });
            var rqr = makeFrame(rqc, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 1096
            });
            rqr.fills = [];
            var rqinfo = makeFrame(rqr, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            rqinfo.fills = [];
            var rqav = makeFrame(rqinfo, {
                bg: null, bgGradient: ['#EC4899', '#10B981', 135],
                radius: 999, w: 48, h: 48,
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'FIXED'
            });
            makeText(rqav, ['JL', 'AM', 'PG'][rq], { size: 14, weight: 'Bold', color: '#FFFFFF' });
            var rqd = makeFrame(rqinfo, {
                bg: null, dir: 'VERTICAL',
                primaryAlign: 'MIN', counterAlign: 'MIN',
                gap: 4, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            rqd.fills = [];
            makeText(rqd, ['Juan López', 'Ana María', 'Pedro G.'][rq] + ' · Surco', { size: 14, weight: 'Semi Bold', color: '#1F2937' });
            makeText(rqd, 'Electricidad · No funciona el interruptor del baño...', { size: 12, color: '#6B7280' });
            makeText(rqd, 'Hace ' + (rq + 1) * 12 + ' min · ' + (rq === 0 ? 'Urgente' : 'Esta semana'), { size: 11, color: '#F59E0B', weight: 'Semi Bold' });
            var act = makeFrame(rqr, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'CENTER', counterAlign: 'CENTER',
                gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            act.fills = [];
            matBtn(act, 'Responder', 'primary');
            matBtn(act, 'Rechazar', 'secondary');
        }
    })();

    // 12 · Quote Response (worker, US-19)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('12 · Quote Response (US-19)', '', p.x, p.y);
        appTopbar(s, 1440, false);
        var bg = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        var qr = matCard(bg, { w: 680, padding: 32, gap: 20 });
        makeText(qr, 'Responder cotización', { size: 24, weight: 'Bold', color: '#1F2937' });
        var summ = makeFrame(qr, {
            bg: '#F9FAFB', radius: 8, padding: 16, gap: 6,
            dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'MIN',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 616, h: 100
        });
        makeText(summ, 'De: Juan López · Surco · Urgente', { size: 13, weight: 'Semi Bold', color: '#1F2937' });
        makeText(summ, '"No funciona el interruptor del baño"', { size: 12, color: '#6B7280', w: 584 });
        formInput(qr, 'Monto (S/.)', '180', 616);
        formInput(qr, 'Tiempo estimado', '2 horas', 616);
        formInput(qr, 'Fecha disponible', 'Martes 5 mayo, 10:00', 616);
        formInput(qr, 'Mensaje (opcional)', 'Puedo ir mañana a primera hora', 616);
        var timer = makeFrame(qr, {
            bg: '#FEF3C7', radius: 6, padding: 10,
            dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 616
        });
        makeText(timer, '⏱ Responde antes de las 2h para mantener tu ranking', { size: 12, weight: 'Semi Bold', color: '#92400E' });
        var br = makeFrame(qr, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 12, primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 616
        });
        br.fills = [];
        matBtn(br, 'Enviar cotización', 'primary');
        matBtn(br, 'Rechazar solicitud', 'secondary');
    })();

    // 13 · Quote Received (US-20)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('13 · Quote Received (US-20)', '', p.x, p.y);
        appTopbar(s, 1440, true);
        var bg = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        var qc = matCard(bg, { w: 640, padding: 32, gap: 20 });
        makeText(qc, 'Cotización recibida', { size: 24, weight: 'Bold', color: '#1F2937' });
        var winfo = makeFrame(qc, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        winfo.fills = [];
        var wiv2 = makeFrame(winfo, {
            bg: null, bgGradient: ['#EC4899', '#10B981', 135],
            radius: 999, w: 64, h: 64,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(wiv2, 'MC', { size: 18, weight: 'Bold', color: '#FFFFFF' });
        var wdi = makeFrame(winfo, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 2, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        wdi.fills = [];
        makeText(wdi, 'María Carmen Rodríguez', { size: 16, weight: 'Bold', color: '#1F2937' });
        makeText(wdi, 'Electricista · ⭐ 4.9 · Verificada', { size: 12, color: '#6B7280' });
        var priceBox = makeFrame(qc, {
            bgGradient: ['#6366F1', '#4F46E5', 135], radius: 12,
            dir: 'VERTICAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            padding: 24, gap: 4,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 576, h: 100
        });
        makeText(priceBox, 'S/ 180', { size: 40, weight: 'Extra Bold', color: '#FFFFFF' });
        makeText(priceBox, 'Precio cerrado · 2 horas estimadas', { size: 13, color: '#FFFFFF', opacity: 0.9 });
        makeText(qc, 'Fecha propuesta: Martes 5 mayo, 10:00 AM', { size: 14, weight: 'Semi Bold', color: '#1F2937' });
        makeText(qc, 'Mensaje: "Puedo ir mañana a primera hora"', { size: 13, color: '#6B7280', w: 576 });
        var brq = makeFrame(qc, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 12, primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 576
        });
        brq.fills = [];
        matBtn(brq, 'Aceptar y agendar', 'primary');
        matBtn(brq, 'Proponer otra fecha', 'secondary');
    })();

    // 14 · Booking Schedule (US-20)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('14 · Booking Schedule (US-20)', '', p.x, p.y);
        appTopbar(s, 1440, true);
        var bg = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        var bc = matCard(bg, { w: 720, padding: 32, gap: 16 });
        makeText(bc, 'Selecciona fecha y hora', { size: 22, weight: 'Bold', color: '#1F2937' });
        var cal = makeFrame(bc, {
            bg: '#FFFFFF', radius: 8, stroke: '#E5E7EB', strokeWeight: 1,
            dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'MIN',
            padding: 16, gap: 8,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 656, h: 300
        });
        var calHead = makeFrame(cal, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 624
        });
        calHead.fills = [];
        makeText(calHead, '← Mayo 2026 →', { size: 14, weight: 'Bold', color: '#1F2937' });
        var dayRow = makeFrame(cal, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 4, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        dayRow.fills = [];
        var days = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
        for (var dd = 0; dd < 7; dd++) {
            makeText(dayRow, days[dd], { size: 12, weight: 'Bold', color: '#9CA3AF', w: 80, align: 'CENTER' });
        }
        for (var wk2 = 0; wk2 < 4; wk2++) {
            var wkRow = makeFrame(cal, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'CENTER', counterAlign: 'CENTER',
                gap: 4, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            wkRow.fills = [];
            for (var dn = 0; dn < 7; dn++) {
                var dayNum = wk2 * 7 + dn + 1;
                var selected = (dayNum === 5);
                var db = makeFrame(wkRow, {
                    bg: selected ? '#6366F1' : null, radius: 999,
                    dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                    primarySizing: 'FIXED', counterSizing: 'FIXED',
                    w: 40, h: 40
                });
                if (!selected) db.fills = [];
                makeText(db, String(dayNum), { size: 13, weight: selected ? 'Bold' : 'Regular', color: selected ? '#FFFFFF' : '#1F2937' });
            }
        }
        makeText(bc, 'Horarios disponibles · Martes 5 mayo', { size: 14, weight: 'Bold', color: '#1F2937' });
        var slots = makeFrame(bc, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        slots.fills = [];
        var slotList = ['9:00', '10:00', '11:00', '14:00', '15:00', '16:00'];
        for (var sl = 0; sl < slotList.length; sl++) {
            var selSlot = (sl === 1);
            var sb2 = makeFrame(slots, {
                bg: selSlot ? '#6366F1' : '#F3F4F6', radius: 6,
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                paddingV: 10, paddingH: 14,
                primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            makeText(sb2, slotList[sl], { size: 13, weight: 'Semi Bold', color: selSlot ? '#FFFFFF' : '#6B7280' });
        }
        matBtn(bc, 'Confirmar · Martes 5 mayo, 10:00 AM', 'primary');
    })();

    // 15 · Payment Checkout (US-21)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('15 · Payment Checkout (US-21)', '', p.x, p.y);
        appTopbar(s, 1440, true);
        var bg = makeFrame(s, {
            bg: '#F9FAFB', dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            padding: 32, gap: 24,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        // Métodos
        var pay = matCard(bg, { w: 560, padding: 28, gap: 20 });
        makeText(pay, 'Elige método de pago', { size: 22, weight: 'Bold', color: '#1F2937' });
        var methods = [
            ['Yape', '💜 Tu billetera más rápida', true],
            ['Plin', '💙 Pago móvil', false],
            ['Tarjeta débito/crédito', '💳 Visa, Mastercard, Amex', false]
        ];
        for (var pm = 0; pm < methods.length; pm++) {
            var mc = makeFrame(pay, {
                bg: '#FFFFFF', stroke: methods[pm][2] ? '#6366F1' : '#E5E7EB', strokeWeight: methods[pm][2] ? 2 : 1, radius: 10,
                dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
                padding: 16, gap: 12,
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 504
            });
            var rdio = makeFrame(mc, {
                bg: null, radius: 999, stroke: methods[pm][2] ? '#6366F1' : '#E5E7EB', strokeWeight: methods[pm][2] ? 6 : 2,
                w: 20, h: 20, primarySizing: 'FIXED', counterSizing: 'FIXED',
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER'
            });
            rdio.fills = [];
            var mi = makeFrame(mc, {
                bg: null, dir: 'VERTICAL',
                primaryAlign: 'MIN', counterAlign: 'MIN',
                gap: 2, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            mi.fills = [];
            makeText(mi, methods[pm][0], { size: 15, weight: 'Bold', color: '#1F2937' });
            makeText(mi, methods[pm][1], { size: 12, color: '#6B7280' });
        }
        formInput(pay, 'Celular para Yape', '+51 987 654 321', 504);
        // Resumen
        var summ = matCard(bg, { w: 420, padding: 24, gap: 12 });
        makeText(summ, 'Resumen', { size: 18, weight: 'Bold', color: '#1F2937' });
        var sumItems = [['Servicio electricidad', 'S/ 180.00'], ['Comisión plataforma (12%)', 'S/ 21.60']];
        for (var smi = 0; smi < sumItems.length; smi++) {
            var sr = makeFrame(summ, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 372
            });
            sr.fills = [];
            makeText(sr, sumItems[smi][0], { size: 13, color: '#6B7280' });
            makeText(sr, sumItems[smi][1], { size: 13, color: '#1F2937', weight: 'Semi Bold' });
        }
        makeFrame(summ, { bg: '#E5E7EB', w: 372, h: 1, primarySizing: 'FIXED', counterSizing: 'FIXED' });
        var totRow = makeFrame(summ, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 372
        });
        totRow.fills = [];
        makeText(totRow, 'Total', { size: 16, weight: 'Bold', color: '#1F2937' });
        makeText(totRow, 'S/ 201.60', { size: 24, weight: 'Extra Bold', color: '#6366F1' });
        var pb = matBtn(summ, 'Pagar S/ 201.60', 'primary');
        pb.resize(372, pb.height);
        pb.primaryAxisSizingMode = 'FIXED';
        makeText(summ, '🔒 Pago seguro · Fondos retenidos hasta tu confirmación', { size: 11, color: '#10B981', align: 'CENTER', w: 372 });
    })();

    // 16 · Receipt (US-21)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('16 · Payment Receipt (US-21)', '', p.x, p.y);
        appTopbar(s, 1440, true);
        var bg = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        var rc = matCard(bg, { w: 560, padding: 40, gap: 16, center: true });
        var check = makeFrame(rc, {
            bg: '#10B981', radius: 999, w: 80, h: 80,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(check, '✓', { size: 48, weight: 'Extra Bold', color: '#FFFFFF' });
        makeText(rc, '¡Pago exitoso!', { size: 28, weight: 'Bold', color: '#1F2937', align: 'CENTER', w: 480 });
        makeText(rc, 'Transacción procesada correctamente', { size: 14, color: '#6B7280', align: 'CENTER', w: 480 });
        var det = makeFrame(rc, {
            bg: '#F9FAFB', radius: 10, padding: 16, gap: 6,
            dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'MIN',
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 480
        });
        var detItems = [
            ['ID transacción', 'TRX-2026-054821'],
            ['Fecha', '21 abril 2026, 15:30'],
            ['Trabajador', 'María Carmen Rodríguez'],
            ['Servicio', 'Electricidad · 2h'],
            ['Monto', 'S/ 201.60']
        ];
        for (var di = 0; di < detItems.length; di++) {
            var dir = makeFrame(det, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 448
            });
            dir.fills = [];
            makeText(dir, detItems[di][0], { size: 12, color: '#6B7280' });
            makeText(dir, detItems[di][1], { size: 13, weight: 'Semi Bold', color: '#1F2937' });
        }
        var rbrow = makeFrame(rc, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        rbrow.fills = [];
        matBtn(rbrow, 'Descargar PDF', 'secondary');
        matBtn(rbrow, 'Volver al inicio', 'primary');
    })();

    // 17 · Dashboard Finance (worker, US-22)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('17 · Dashboard Finance (US-22)', '', p.x, p.y);
        appTopbar(s, 1440, true);
        var rowL = makeFrame(s, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        rowL.fills = [];
        appSidenav(rowL, 836);
        var main = makeFrame(rowL, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            padding: 32, gap: 20,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1200, h: 836
        });
        makeText(main, 'Mis finanzas', { size: 28, weight: 'Bold', color: '#1F2937' });
        // KPIs
        var kpis = makeFrame(main, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        kpis.fills = [];
        var kpiData = [
            ['💰', 'Ingresos del mes', 'S/ 3,240', '#10B981'],
            ['📋', 'Servicios completados', '18', '#6366F1'],
            ['⭐', 'Calificación promedio', '4.9', '#F59E0B']
        ];
        for (var kp = 0; kp < kpiData.length; kp++) {
            var kc = matCard(kpis, { w: 370, padding: 20, gap: 8 });
            var kr = makeFrame(kc, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            kr.fills = [];
            var ki = makeFrame(kr, {
                bg: '#F3F4F6', radius: 10, w: 48, h: 48,
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'FIXED'
            });
            makeText(ki, kpiData[kp][0], { size: 24 });
            var kii = makeFrame(kr, {
                bg: null, dir: 'VERTICAL',
                primaryAlign: 'MIN', counterAlign: 'MIN',
                gap: 2, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            kii.fills = [];
            makeText(kii, kpiData[kp][1], { size: 12, color: '#6B7280' });
            makeText(kii, kpiData[kp][2], { size: 24, weight: 'Extra Bold', color: kpiData[kp][3] });
        }
        // Table
        var tbl = matCard(main, { w: 1136, padding: 0, gap: 0 });
        var thead = makeFrame(tbl, {
            bg: '#F9FAFB', dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 14,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 1136
        });
        var colWs2 = [130, 200, 240, 140, 160, 266];
        var thLabels = ['Fecha', 'Cliente', 'Servicio', 'Monto neto', 'Estado', 'Acciones'];
        for (var th = 0; th < thLabels.length; th++) {
            var thc = makeFrame(thead, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: colWs2[th]
            });
            thc.fills = [];
            makeText(thc, thLabels[th], { size: 12, weight: 'Bold', color: '#6B7280' });
        }
        var tableRows = [
            ['21/04', 'Juan López', 'Electricidad', 'S/ 158.40', 'Pendiente'],
            ['19/04', 'Ana María', 'Electricidad', 'S/ 220.00', 'Liberado'],
            ['17/04', 'Pedro G.', 'Electricidad', 'S/ 132.00', 'Disputa'],
            ['15/04', 'Rosa C.', 'Electricidad', 'S/ 110.00', 'Liberado']
        ];
        for (var tr2 = 0; tr2 < tableRows.length; tr2++) {
            var trFrame = makeFrame(tbl, {
                bg: '#FFFFFF', dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                padding: 14,
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 1136
            });
            for (var tc = 0; tc < 5; tc++) {
                var trc = makeFrame(trFrame, {
                    bg: null, dir: 'HORIZONTAL',
                    primaryAlign: 'MIN', counterAlign: 'CENTER',
                    primarySizing: 'FIXED', counterSizing: 'AUTO',
                    w: colWs2[tc]
                });
                trc.fills = [];
                if (tc === 4) {
                    var state = tableRows[tr2][tc];
                    var sbg = state === 'Pendiente' ? '#FEF3C7' : (state === 'Liberado' ? '#D1FAE5' : '#FEE2E2');
                    var sfg = state === 'Pendiente' ? '#92400E' : (state === 'Liberado' ? '#065F46' : '#991B1B');
                    chip2(trc, state, false);
                    var chipNode = trc.children[trc.children.length - 1];
                    chipNode.fills = [solidFill(sbg)];
                    chipNode.children[0].fills = [solidFill(sfg)];
                } else {
                    makeText(trc, tableRows[tr2][tc], { size: 12, color: '#1F2937' });
                }
            }
            var trAct = makeFrame(trFrame, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: colWs2[5]
            });
            trAct.fills = [];
            makeText(trAct, 'Ver detalle', { size: 12, weight: 'Semi Bold', color: '#6366F1' });
        }
    })();

    // 18 · Chat
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('18 · Chat Conversation', '', p.x, p.y);
        appTopbar(s, 1440, true);
        var rowL = makeFrame(s, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        rowL.fills = [];
        // Conversations list
        var convs = makeFrame(rowL, {
            bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1,
            dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'MIN',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 320, h: 836
        });
        var cvsHead = makeFrame(convs, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            padding: 16, gap: 8,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 320
        });
        cvsHead.fills = [];
        makeText(cvsHead, 'Mensajes', { size: 18, weight: 'Bold', color: '#1F2937' });
        for (var cv = 0; cv < 4; cv++) {
            var cvItem = makeFrame(convs, {
                bg: cv === 0 ? '#F9FAFB' : '#FFFFFF',
                dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
                padding: 12, gap: 12,
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 320
            });
            var cvav = makeFrame(cvItem, {
                bg: null, bgGradient: ['#EC4899', '#10B981', 135],
                radius: 999, w: 40, h: 40,
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'FIXED'
            });
            makeText(cvav, ['MC', 'JL', 'AM', 'PG'][cv], { size: 12, weight: 'Bold', color: '#FFFFFF' });
            var cvd = makeFrame(cvItem, {
                bg: null, dir: 'VERTICAL',
                primaryAlign: 'MIN', counterAlign: 'MIN',
                gap: 2, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            cvd.fills = [];
            makeText(cvd, ['María Carmen R.', 'Juan López', 'Ana María', 'Pedro G.'][cv], { size: 13, weight: 'Semi Bold', color: '#1F2937' });
            makeText(cvd, 'Último mensaje hace ' + (cv + 1) * 5 + ' min', { size: 11, color: '#6B7280' });
        }
        // Chat thread
        var chat = makeFrame(rowL, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1120, h: 836
        });
        var chatHead = makeFrame(chat, {
            bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1,
            dir: 'HORIZONTAL', primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
            padding: 16,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 1120
        });
        var chr = makeFrame(chatHead, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        chr.fills = [];
        var chav = makeFrame(chr, {
            bg: null, bgGradient: ['#EC4899', '#10B981', 135],
            radius: 999, w: 40, h: 40,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(chav, 'MC', { size: 12, weight: 'Bold', color: '#FFFFFF' });
        var chn = makeFrame(chr, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 2, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        chn.fills = [];
        makeText(chn, 'María Carmen Rodríguez', { size: 14, weight: 'Bold', color: '#1F2937' });
        makeText(chn, '🟢 En línea', { size: 11, color: '#10B981' });
        // Messages
        var msgs = makeFrame(chat, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            padding: 24, gap: 12,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1120, h: 680
        });
        msgs.fills = [];
        var dialog = [
            [false, 'Hola, ¿podría ayudarme con el problema del interruptor?'],
            [true, 'Claro, con gusto. ¿En qué distrito estás?'],
            [false, 'San Miguel. Puedo mañana en la mañana.'],
            [true, '10:00 AM te funciona? Tarifa cerrada S/ 180.'],
            [false, '¡Perfecto, acepto la cotización!']
        ];
        for (var msgi = 0; msgi < dialog.length; msgi++) {
            var mrow = makeFrame(msgs, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: dialog[msgi][0] ? 'MAX' : 'MIN', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 1072
            });
            mrow.fills = [];
            var bub = makeFrame(mrow, {
                bg: dialog[msgi][0] ? '#6366F1' : '#FFFFFF',
                radius: 12, padding: 12,
                dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
                primarySizing: 'AUTO', counterSizing: 'AUTO',
                stroke: dialog[msgi][0] ? null : '#E5E7EB', strokeWeight: 1
            });
            makeText(bub, dialog[msgi][1], { size: 13, color: dialog[msgi][0] ? '#FFFFFF' : '#1F2937', w: 400 });
        }
        // Input
        var chin = makeFrame(chat, {
            bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1,
            dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 12, gap: 8,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 1120
        });
        makeText(chin, '📎', { size: 18, color: '#6B7280' });
        var inp = makeFrame(chin, {
            bg: '#F3F4F6', radius: 999,
            dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
            paddingV: 10, paddingH: 16,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 960
        });
        makeText(inp, 'Escribe un mensaje…', { size: 13, color: '#9CA3AF' });
        var sendB = makeFrame(chin, {
            bg: null, bgGradient: ['#6366F1', '#4F46E5', 135], radius: 999,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 40, h: 40
        });
        makeText(sendB, '➤', { size: 16, weight: 'Bold', color: '#FFFFFF' });
    })();

    // 19 · Rating Submit (US-23)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('19 · Rating Submit (US-23)', '', p.x, p.y);
        appTopbar(s, 1440, true);
        var bg = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        var rs = matCard(bg, { w: 560, padding: 40, gap: 20, center: true });
        var ravW = makeFrame(rs, {
            bg: null, bgGradient: ['#EC4899', '#10B981', 135],
            radius: 999, w: 80, h: 80,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(ravW, 'MC', { size: 24, weight: 'Bold', color: '#FFFFFF' });
        makeText(rs, '¿Cómo te fue con María Carmen?', { size: 20, weight: 'Bold', color: '#1F2937', align: 'CENTER', w: 480 });
        var stars = makeFrame(rs, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        stars.fills = [];
        for (var st2 = 0; st2 < 5; st2++) {
            makeText(stars, st2 < 5 ? '⭐' : '☆', { size: 48 });
        }
        formInput(rs, 'Comentario', 'Excelente trabajo, muy puntual y profesional.', 480);
        makeText(rs, 'Aspectos destacados', { size: 13, weight: 'Semi Bold', color: '#1F2937' });
        var aspects = makeFrame(rs, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        aspects.fills = [];
        var aspList = ['Puntualidad', 'Limpieza', 'Precio', 'Profesionalismo'];
        for (var asp = 0; asp < aspList.length; asp++) chip2(aspects, aspList[asp], asp < 2);
        var phBox = makeFrame(rs, {
            bg: '#F9FAFB', stroke: '#6366F1', strokeWeight: 2, radius: 10,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            padding: 16,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 480
        });
        phBox.dashPattern = [6, 6];
        makeText(phBox, '📷  Adjuntar foto del trabajo (opcional)', { size: 12, weight: 'Semi Bold', color: '#6366F1' });
        var rsb = matBtn(rs, 'Publicar reseña', 'primary');
        rsb.resize(480, rsb.height);
        rsb.primaryAxisSizingMode = 'FIXED';
    })();

    // 20 · Reviews Response (worker, US-24)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('20 · Reviews Response (US-24)', '', p.x, p.y);
        appTopbar(s, 1440, true);
        var rowL = makeFrame(s, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        rowL.fills = [];
        appSidenav(rowL, 836);
        var main = makeFrame(rowL, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            padding: 32, gap: 20,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1200, h: 836
        });
        makeText(main, 'Reseñas recibidas (54)', { size: 28, weight: 'Bold', color: '#1F2937' });
        for (var rv2 = 0; rv2 < 3; rv2++) {
            var rc2 = matCard(main, { w: 1136, padding: 20, gap: 12 });
            var rh = makeFrame(rc2, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 1096
            });
            rh.fills = [];
            var rhl = makeFrame(rh, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            rhl.fills = [];
            var rvav = makeFrame(rhl, {
                bg: null, bgGradient: ['#EC4899', '#10B981', 135],
                radius: 999, w: 40, h: 40,
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'FIXED'
            });
            makeText(rvav, ['JL', 'AM', 'RG'][rv2], { size: 12, weight: 'Bold', color: '#FFFFFF' });
            var rhinf = makeFrame(rhl, {
                bg: null, dir: 'VERTICAL',
                primaryAlign: 'MIN', counterAlign: 'MIN',
                gap: 2, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            rhinf.fills = [];
            makeText(rhinf, ['Juan López', 'Ana María', 'Roberto G.'][rv2], { size: 14, weight: 'Bold', color: '#1F2937' });
            var stSmall = rv2 === 0 ? '⭐⭐⭐⭐⭐' : (rv2 === 1 ? '⭐⭐⭐⭐' : '⭐⭐');
            makeText(rhinf, stSmall + ' · hace ' + ((rv2 + 1) * 3) + ' días', { size: 11, color: '#F59E0B' });
            matBtn(rh, 'Responder', 'secondary');
            makeText(rc2, ['Excelente trabajo, muy puntual y todo quedó perfecto.', 'Buen servicio, aunque llegó 15 minutos tarde.', 'No quedé conforme con el acabado, tuve que llamar a otro técnico.'][rv2], {
                size: 13, color: '#1F2937', w: 1096
            });
        }
    })();

    // 21 · Top Rated Badge Showcase (US-25)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('21 · Top Rated Profile (US-25)', '', p.x, p.y);
        appTopbar(s, 1440, true);
        var main = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 32, gap: 20,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        var topHero = matCard(main, { w: 1120, padding: 32, gap: 16 });
        var tHr = makeFrame(topHero, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 24, primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 1056
        });
        tHr.fills = [];
        var avBox = makeFrame(tHr, {
            bg: null, bgGradient: ['#EC4899', '#10B981', 135],
            radius: 999, w: 120, h: 120,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(avBox, 'MC', { size: 40, weight: 'Bold', color: '#FFFFFF' });
        var tHi = makeFrame(tHr, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 8, primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 700
        });
        tHi.fills = [];
        makeText(tHi, 'María Carmen Rodríguez', { size: 28, weight: 'Extra Bold', color: '#1F2937' });
        makeText(tHi, 'Electricista · San Miguel, Lima', { size: 14, color: '#6B7280' });
        var chipsR = makeFrame(tHi, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        chipsR.fills = [];
        chip2(chipsR, '✓ Verificado', true);
        var tp = makeFrame(chipsR, {
            bgGradient: ['#F59E0B', '#EF4444', 135], radius: 999,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            paddingV: 6, paddingH: 14, gap: 6,
            primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        makeText(tp, '🏅', { size: 13 });
        makeText(tp, 'TOP RATED', { size: 12, weight: 'Extra Bold', color: '#FFFFFF' });
        chip2(chipsR, '🎓 Certificado eléctrico nivel 2', true);
        // Progress de trabajador
        var progBox = matCard(main, { w: 1120, padding: 24, gap: 12 });
        makeText(progBox, 'Progreso · Estás a 3 servicios de mantener Top Rated', { size: 15, weight: 'Bold', color: '#1F2937' });
        var pbar = makeFrame(progBox, {
            bg: '#F3F4F6', radius: 999,
            dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'MIN',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1072, h: 12
        });
        var pfill = makeFrame(pbar, {
            bgGradient: ['#F59E0B', '#EF4444', 90], radius: 999,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 900, h: 12
        });
        makeText(progBox, '17 de 20 servicios · Calificación actual 4.9/5.0', { size: 12, color: '#6B7280' });
    })();

    // 22 · Training (US-26)
    (function () {
        var p = nextAppDesktopPos();
        var s = screenDesktop('22 · Training Courses (US-26)', '', p.x, p.y);
        appTopbar(s, 1440, true);
        var rowL = makeFrame(s, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1440, h: 836
        });
        rowL.fills = [];
        appSidenav(rowL, 836);
        var main = makeFrame(rowL, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            padding: 32, gap: 20,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 1200, h: 836
        });
        makeText(main, 'Capacitaciones 🎓', { size: 28, weight: 'Bold', color: '#1F2937' });
        makeText(main, 'Mejora tu perfil profesional con cursos cortos y obtén insignias', { size: 14, color: '#6B7280' });
        var crow1 = makeFrame(main, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 16, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        crow1.fills = [];
        var courses = [
            ['⚡', 'Seguridad eléctrica nivel 1', '8 min', 'Completado', '#10B981'],
            ['🔧', 'Gasfitería avanzada', '12 min', 'En progreso', '#F59E0B'],
            ['🎨', 'Acabados profesionales', '10 min', 'Nuevo', '#6366F1'],
            ['💬', 'Atención al cliente', '6 min', 'Nuevo', '#6366F1']
        ];
        for (var co = 0; co < courses.length; co++) {
            var cco = matCard(crow1, { w: 272, padding: 16, gap: 10 });
            var cThumb = makeFrame(cco, {
                bg: null, bgGradient: ['#6366F1', '#4F46E5', 135],
                radius: 8,
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'FIXED',
                w: 240, h: 120
            });
            makeText(cThumb, courses[co][0] + ' ▶', { size: 36, color: '#FFFFFF' });
            makeText(cco, courses[co][1], { size: 14, weight: 'Bold', color: '#1F2937' });
            makeText(cco, '⏱ ' + courses[co][2], { size: 11, color: '#6B7280' });
            var stch = chip2(cco, courses[co][3], false);
            stch.fills = [solidFill(courses[co][4], 0.15)];
            stch.children[0].fills = [solidFill(courses[co][4])];
        }
        // Quiz preview
        var quizCard = matCard(main, { w: 1136, padding: 24, gap: 16 });
        makeText(quizCard, 'Quiz · Seguridad eléctrica nivel 1', { size: 18, weight: 'Bold', color: '#1F2937' });
        makeText(quizCard, 'Pregunta 3 de 5 · ¿Cuál es el voltaje estándar en Perú?', { size: 14, color: '#1F2937' });
        var qOpts = ['110V', '220V', '127V', '380V'];
        for (var qo = 0; qo < qOpts.length; qo++) {
            var qob = makeFrame(quizCard, {
                bg: qo === 1 ? '#E0E7FF' : '#FFFFFF',
                stroke: qo === 1 ? '#6366F1' : '#E5E7EB', strokeWeight: qo === 1 ? 2 : 1, radius: 8,
                dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
                padding: 14, gap: 12,
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 1088
            });
            var qr = makeFrame(qob, {
                bg: null, radius: 999, stroke: qo === 1 ? '#6366F1' : '#D1D5DB', strokeWeight: qo === 1 ? 6 : 2,
                w: 18, h: 18, primarySizing: 'FIXED', counterSizing: 'FIXED'
            });
            qr.fills = [];
            makeText(qob, qOpts[qo], { size: 13, weight: qo === 1 ? 'Semi Bold' : 'Regular', color: '#1F2937' });
        }
        matBtn(quizCard, 'Siguiente pregunta', 'primary');
    })();

    // ============================ APP SCREENS MOBILE ============================
    figma.currentPage = pAppM;

    var appMCol = 0, appMRow = 0;
    function nextAppMobilePos() {
        var pos = { x: appMCol * 430, y: appMRow * 880 };
        appMCol++;
        if (appMCol >= 8) { appMCol = 0; appMRow++; }
        return pos;
    }

    function mobileTopbar(parent, title) {
        var tb = makeFrame(parent, {
            bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1,
            dir: 'HORIZONTAL', primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
            paddingV: 12, paddingH: 16,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 56
        });
        makeText(tb, '← ' + (title || 'Ya Quedó'), { size: 15, weight: 'Semi Bold', color: '#1F2937' });
        makeText(tb, '🔔 👤', { size: 14 });
        return tb;
    }

    function mobileAppScreen(title, x, y) {
        return screenMobile(title, x, y);
    }

    // M01 · Register Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M01 · Register', p.x, p.y);
        var bg = makeFrame(s, {
            bgGradient: ['#667EEA', '#764BA2', 135],
            dir: 'VERTICAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            padding: 16,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 812
        });
        var fc = matCard(bg, { w: 343, padding: 20, gap: 14 });
        makeText(fc, 'Crea tu cuenta', { size: 22, weight: 'Bold', color: '#1F2937' });
        var tg = makeFrame(fc, {
            bg: '#F3F4F6', radius: 8,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            padding: 4, gap: 4,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 303
        });
        chip2(tg, '👤 Cliente', true);
        chip2(tg, '💼 Trabajador', false);
        formInput(fc, 'Nombre completo', 'María Carmen R.', 303);
        formInput(fc, 'Correo', 'tu@correo.com', 303);
        formInput(fc, 'Teléfono', '+51 9XX XXX XXX', 303);
        formInput(fc, 'Contraseña', '••••••••', 303);
        var cb = matBtn(fc, 'Crear cuenta', 'primary');
        cb.resize(303, cb.height);
        cb.primaryAxisSizingMode = 'FIXED';
    })();

    // M02 · OTP Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M02 · OTP', p.x, p.y);
        var bg = makeFrame(s, {
            bgGradient: ['#667EEA', '#764BA2', 135],
            dir: 'VERTICAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            padding: 16,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 812
        });
        var fc = matCard(bg, { w: 343, padding: 24, gap: 16, center: true });
        makeText(fc, 'Verifica tu teléfono', { size: 20, weight: 'Bold', color: '#1F2937', align: 'CENTER', w: 295 });
        makeText(fc, 'Código enviado a +51 9XX XXX 123', { size: 12, color: '#6B7280', align: 'CENTER', w: 295 });
        var otp = makeFrame(fc, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 6, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        otp.fills = [];
        for (var ot = 0; ot < 6; ot++) {
            var ob = makeFrame(otp, {
                bg: '#FFFFFF', stroke: ot === 2 ? '#6366F1' : '#E5E7EB', strokeWeight: 2, radius: 6,
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'FIXED',
                w: 40, h: 48
            });
            if (ot < 3) makeText(ob, String.fromCharCode(49 + ot), { size: 20, weight: 'Bold', color: '#1F2937' });
        }
        var vb = matBtn(fc, 'Verificar', 'primary');
        vb.resize(295, vb.height);
        vb.primaryAxisSizingMode = 'FIXED';
        makeText(fc, 'Reenviar en 59s', { size: 11, color: '#9CA3AF', align: 'CENTER', w: 295 });
    })();

    // M03 · Login Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M03 · Login', p.x, p.y);
        var bg = makeFrame(s, {
            bgGradient: ['#667EEA', '#764BA2', 135],
            dir: 'VERTICAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            padding: 16,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 812
        });
        var fc = matCard(bg, { w: 343, padding: 24, gap: 16 });
        makeText(fc, 'Inicia sesión', { size: 22, weight: 'Bold', color: '#1F2937' });
        formInput(fc, 'Correo', 'tu@correo.com', 295);
        formInput(fc, 'Contraseña', '••••••••', 295);
        makeText(fc, '¿Olvidaste contraseña?', { size: 12, weight: 'Semi Bold', color: '#6366F1', align: 'RIGHT', w: 295 });
        var lb = matBtn(fc, 'Iniciar sesión', 'primary');
        lb.resize(295, lb.height);
        lb.primaryAxisSizingMode = 'FIXED';
        makeText(fc, '— o —', { size: 11, color: '#9CA3AF', align: 'CENTER', w: 295 });
        var gb = matBtn(fc, 'Continuar con Google', 'secondary');
        gb.resize(295, gb.height);
        gb.primaryAxisSizingMode = 'FIXED';
    })();

    // M04 · Recover Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M04 · Recover', p.x, p.y);
        var bg = makeFrame(s, {
            bgGradient: ['#667EEA', '#764BA2', 135],
            dir: 'VERTICAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            padding: 16,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 812
        });
        var fc = matCard(bg, { w: 343, padding: 24, gap: 16 });
        makeText(fc, 'Recuperar contraseña', { size: 20, weight: 'Bold', color: '#1F2937' });
        makeText(fc, 'Te enviaremos un enlace a tu correo', { size: 12, color: '#6B7280', w: 295 });
        formInput(fc, 'Correo', 'tu@correo.com', 295);
        var rb = matBtn(fc, 'Enviar enlace', 'primary');
        rb.resize(295, rb.height);
        rb.primaryAxisSizingMode = 'FIXED';
    })();

    // M05 · Identity Verify Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M05 · Identity Verify', p.x, p.y);
        mobileTopbar(s, 'Verificación');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 16, gap: 16,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 756
        });
        makeText(body, 'Paso 1 de 3: DNI Anverso', { size: 16, weight: 'Bold', color: '#1F2937' });
        var stepBar = makeFrame(body, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        stepBar.fills = [];
        for (var sb3 = 0; sb3 < 3; sb3++) {
            var sdot = makeFrame(stepBar, {
                bg: sb3 === 0 ? '#6366F1' : '#E5E7EB', radius: 999,
                w: 24, h: 24, primarySizing: 'FIXED', counterSizing: 'FIXED',
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER'
            });
            makeText(sdot, String(sb3 + 1), { size: 12, weight: 'Bold', color: sb3 === 0 ? '#FFFFFF' : '#6B7280' });
            if (sb3 < 2) makeFrame(stepBar, { bg: '#E5E7EB', w: 40, h: 2, primarySizing: 'FIXED', counterSizing: 'FIXED' });
        }
        var uz = matCard(body, { w: 343, padding: 16, gap: 8, center: true });
        var dz = makeFrame(uz, {
            bg: '#F9FAFB', stroke: '#6366F1', strokeWeight: 2, radius: 10,
            dir: 'VERTICAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            padding: 20, gap: 8,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 311, h: 200
        });
        dz.dashPattern = [6, 6];
        makeText(dz, '📷', { size: 36 });
        makeText(dz, 'Toma o sube foto', { size: 13, weight: 'Semi Bold', color: '#6366F1' });
        var nb = matBtn(body, 'Siguiente', 'primary');
        nb.resize(343, nb.height);
        nb.primaryAxisSizingMode = 'FIXED';
    })();

    // M06 · Profile Edit Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M06 · Profile Edit', p.x, p.y);
        mobileTopbar(s, 'Mi perfil');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 16, gap: 12,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 692
        });
        var pc = matCard(body, { w: 343, padding: 16, gap: 10, center: true });
        var av = makeFrame(pc, {
            bg: null, bgGradient: ['#EC4899', '#10B981', 135],
            radius: 999, w: 80, h: 80,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(av, 'MC', { size: 24, weight: 'Bold', color: '#FFFFFF' });
        makeText(pc, 'María Carmen R.', { size: 18, weight: 'Bold', color: '#1F2937', align: 'CENTER' });
        chip2(pc, '✓ Verificado', true);
        formInput(pc, 'Bio', 'Electricista con 12 años...', 311);
        formInput(pc, 'Distrito principal', 'San Miguel', 311);
        var sb4 = matBtn(pc, 'Guardar', 'primary');
        sb4.resize(311, sb4.height);
        sb4.primaryAxisSizingMode = 'FIXED';
        appBottomNav(s);
    })();

    // M07 · Home Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M07 · Home', p.x, p.y);
        mobileTopbar(s, 'Hola Juan 👋');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            padding: 16, gap: 16,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 692
        });
        var srb = makeFrame(body, {
            bg: '#FFFFFF', radius: 10, stroke: '#E5E7EB', strokeWeight: 1,
            dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 12, gap: 8,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 343
        });
        makeText(srb, '🔍', { size: 14 });
        makeText(srb, '¿Qué servicio buscas?', { size: 13, color: '#9CA3AF' });
        makeText(body, 'Categorías', { size: 15, weight: 'Bold', color: '#1F2937' });
        var catR1 = makeFrame(body, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'MIN',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        catR1.fills = [];
        var mCats = [['⚡', 'Electricidad'], ['🔧', 'Gasfitería'], ['🎨', 'Pintura']];
        for (var mc2 = 0; mc2 < mCats.length; mc2++) {
            var cc = matCard(catR1, { w: 109, padding: 12, gap: 6, center: true });
            makeText(cc, mCats[mc2][0], { size: 22 });
            makeText(cc, mCats[mc2][1], { size: 11, weight: 'Semi Bold', color: '#1F2937', align: 'CENTER' });
        }
        makeText(body, 'Destacados cerca', { size: 15, weight: 'Bold', color: '#1F2937' });
        for (var wk3 = 0; wk3 < 2; wk3++) {
            var wc = matCard(body, { w: 343, padding: 14, gap: 10 });
            var wkr = makeFrame(wc, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                gap: 12, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            wkr.fills = [];
            var wa = makeFrame(wkr, {
                bg: null, bgGradient: ['#EC4899', '#10B981', 135],
                radius: 999, w: 44, h: 44,
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'FIXED'
            });
            makeText(wa, ['MC', 'JL'][wk3], { size: 13, weight: 'Bold', color: '#FFFFFF' });
            var wii = makeFrame(wkr, {
                bg: null, dir: 'VERTICAL',
                primaryAlign: 'MIN', counterAlign: 'MIN',
                gap: 2, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            wii.fills = [];
            makeText(wii, ['María Carmen R.', 'Juan López'][wk3], { size: 13, weight: 'Bold', color: '#1F2937' });
            makeText(wii, '⭐ 4.9 · S/ 80', { size: 11, color: '#F59E0B' });
        }
        appBottomNav(s);
    })();

    // M08 · Search Results Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M08 · Search Results', p.x, p.y);
        mobileTopbar(s, 'Resultados');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 12, gap: 10,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 692
        });
        var filt = matBtn(body, '⚙ Filtros (2)', 'secondary');
        filt.resize(351, filt.height);
        filt.primaryAxisSizingMode = 'FIXED';
        makeText(body, '12 resultados', { size: 12, color: '#6B7280' });
        for (var wk4 = 0; wk4 < 3; wk4++) {
            var wc = matCard(body, { w: 351, padding: 12, gap: 8 });
            var wkr = makeFrame(wc, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                gap: 10, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            wkr.fills = [];
            var wa = makeFrame(wkr, {
                bg: null, bgGradient: ['#EC4899', '#10B981', 135],
                radius: 999, w: 40, h: 40,
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'FIXED'
            });
            makeText(wa, ['MC', 'JL', 'RG'][wk4], { size: 12, weight: 'Bold', color: '#FFFFFF' });
            var wii = makeFrame(wkr, {
                bg: null, dir: 'VERTICAL',
                primaryAlign: 'MIN', counterAlign: 'MIN',
                gap: 2, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            wii.fills = [];
            makeText(wii, ['María Carmen R.', 'Juan López', 'Roberto G.'][wk4], { size: 12, weight: 'Bold', color: '#1F2937' });
            makeText(wii, 'Electricista · 1.2 km · ⭐ 4.' + (9 - wk4), { size: 10, color: '#6B7280' });
            var rp = makeFrame(wkr, {
                bg: null, dir: 'VERTICAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                gap: 2, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            rp.fills = [];
            makeText(rp, 'S/ ' + (80 + wk4 * 20), { size: 14, weight: 'Bold', color: '#6366F1' });
        }
    })();

    // M09 · Worker Profile Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M09 · Worker Profile', p.x, p.y);
        mobileTopbar(s, 'Perfil');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 12, gap: 12,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 692
        });
        var pc = matCard(body, { w: 351, padding: 16, gap: 8, center: true });
        var pa = makeFrame(pc, {
            bg: null, bgGradient: ['#EC4899', '#10B981', 135],
            radius: 999, w: 80, h: 80,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(pa, 'MC', { size: 24, weight: 'Bold', color: '#FFFFFF' });
        makeText(pc, 'María Carmen Rodríguez', { size: 18, weight: 'Bold', color: '#1F2937', align: 'CENTER' });
        makeText(pc, 'Electricista · San Miguel', { size: 12, color: '#6B7280', align: 'CENTER' });
        var chrs = makeFrame(pc, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 6, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        chrs.fills = [];
        chip2(chrs, '✓', true);
        chip2(chrs, '🏅 Top', true);
        makeText(pc, '⭐ 4.9 · 54 reseñas · 120 servicios', { size: 11, color: '#F59E0B', weight: 'Semi Bold' });
        var mb = matBtn(pc, 'Solicitar cotización', 'primary');
        mb.resize(319, mb.height);
        mb.primaryAxisSizingMode = 'FIXED';
        var rp2 = matCard(body, { w: 351, padding: 12, gap: 6 });
        makeText(rp2, 'Reseña · Juan L.', { size: 12, weight: 'Bold', color: '#1F2937' });
        makeText(rp2, '⭐⭐⭐⭐⭐', { size: 12 });
        makeText(rp2, 'Excelente trabajo, muy puntual', { size: 11, color: '#6B7280', w: 327 });
    })();

    // M10 · Quote Request Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M10 · Quote Request', p.x, p.y);
        mobileTopbar(s, 'Cotización');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 16, gap: 12,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 756
        });
        var qc = matCard(body, { w: 343, padding: 16, gap: 12 });
        makeText(qc, 'Para: María Carmen R.', { size: 13, weight: 'Semi Bold', color: '#1F2937' });
        formInput(qc, 'Oficio', 'Electricidad', 311);
        formInput(qc, 'Problema', 'No funciona el interruptor...', 311);
        formInput(qc, 'Urgencia', 'Esta semana', 311);
        formInput(qc, 'Dirección', 'Av. Ejemplo 123', 311);
        var sb5 = matBtn(qc, 'Enviar', 'primary');
        sb5.resize(311, sb5.height);
        sb5.primaryAxisSizingMode = 'FIXED';
    })();

    // M11 · Requests Inbox Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M11 · Requests Inbox', p.x, p.y);
        mobileTopbar(s, 'Solicitudes');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 12, gap: 10,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 692
        });
        var tabs = makeFrame(body, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            gap: 6, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        tabs.fills = [];
        chip2(tabs, 'Pendientes (3)', true);
        chip2(tabs, 'Respondidas', false);
        for (var rq = 0; rq < 3; rq++) {
            var rc = matCard(body, { w: 351, padding: 12, gap: 8 });
            var rr = makeFrame(rc, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'MIN', counterAlign: 'CENTER',
                gap: 10, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            rr.fills = [];
            var ra = makeFrame(rr, {
                bg: null, bgGradient: ['#EC4899', '#10B981', 135],
                radius: 999, w: 36, h: 36,
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'FIXED'
            });
            makeText(ra, ['JL', 'AM', 'PG'][rq], { size: 11, weight: 'Bold', color: '#FFFFFF' });
            var ri = makeFrame(rr, {
                bg: null, dir: 'VERTICAL',
                primaryAlign: 'MIN', counterAlign: 'MIN',
                gap: 2, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            ri.fills = [];
            makeText(ri, ['Juan López · Surco', 'Ana María · Lince', 'Pedro G. · Miraflores'][rq], { size: 12, weight: 'Bold', color: '#1F2937' });
            makeText(ri, 'Electricidad · hace ' + (rq + 1) * 12 + ' min', { size: 10, color: '#6B7280' });
            var rba = makeFrame(rc, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'CENTER', counterAlign: 'CENTER',
                gap: 8, primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 327
            });
            rba.fills = [];
            matBtn(rba, 'Responder', 'primary');
            matBtn(rba, 'Rechazar', 'secondary');
        }
    })();

    // M12 · Quote Response Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M12 · Quote Response', p.x, p.y);
        mobileTopbar(s, 'Responder');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 16, gap: 12,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 756
        });
        var qr = matCard(body, { w: 343, padding: 16, gap: 12 });
        var summ = makeFrame(qr, {
            bg: '#F9FAFB', radius: 8, padding: 10,
            dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 4, primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 311
        });
        makeText(summ, 'Juan López · Surco · Urgente', { size: 12, weight: 'Semi Bold', color: '#1F2937' });
        makeText(summ, '"No funciona el interruptor del baño"', { size: 11, color: '#6B7280' });
        formInput(qr, 'Monto (S/.)', '180', 311);
        formInput(qr, 'Tiempo', '2 horas', 311);
        formInput(qr, 'Fecha', 'Martes 5, 10 AM', 311);
        var sb6 = matBtn(qr, 'Enviar cotización', 'primary');
        sb6.resize(311, sb6.height);
        sb6.primaryAxisSizingMode = 'FIXED';
    })();

    // M13 · Quote Received Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M13 · Quote Received', p.x, p.y);
        mobileTopbar(s, 'Cotización');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 16, gap: 12,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 756
        });
        var qc = matCard(body, { w: 343, padding: 20, gap: 12, center: true });
        var qa = makeFrame(qc, {
            bg: null, bgGradient: ['#EC4899', '#10B981', 135],
            radius: 999, w: 56, h: 56,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(qa, 'MC', { size: 16, weight: 'Bold', color: '#FFFFFF' });
        makeText(qc, 'María Carmen R.', { size: 15, weight: 'Bold', color: '#1F2937', align: 'CENTER' });
        var pbox = makeFrame(qc, {
            bgGradient: ['#6366F1', '#4F46E5', 135], radius: 10,
            dir: 'VERTICAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            padding: 16, gap: 2,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 303, h: 84
        });
        makeText(pbox, 'S/ 180', { size: 32, weight: 'Extra Bold', color: '#FFFFFF' });
        makeText(pbox, '2 horas · Martes 5, 10 AM', { size: 12, color: '#FFFFFF', opacity: 0.9 });
        var ab = matBtn(qc, 'Aceptar y agendar', 'primary');
        ab.resize(303, ab.height);
        ab.primaryAxisSizingMode = 'FIXED';
        var ab2 = matBtn(qc, 'Proponer otra fecha', 'secondary');
        ab2.resize(303, ab2.height);
        ab2.primaryAxisSizingMode = 'FIXED';
    })();

    // M14 · Booking Schedule Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M14 · Booking Schedule', p.x, p.y);
        mobileTopbar(s, 'Agendar');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 16, gap: 12,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 756
        });
        var bc = matCard(body, { w: 343, padding: 16, gap: 10 });
        makeText(bc, 'Mayo 2026', { size: 14, weight: 'Bold', color: '#1F2937', align: 'CENTER', w: 311 });
        for (var wk5 = 0; wk5 < 3; wk5++) {
            var wkRow = makeFrame(bc, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'CENTER', counterAlign: 'CENTER',
                gap: 4, primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            wkRow.fills = [];
            for (var dn = 0; dn < 7; dn++) {
                var dayNum = wk5 * 7 + dn + 1;
                var selected = (dayNum === 5);
                var db = makeFrame(wkRow, {
                    bg: selected ? '#6366F1' : null, radius: 999,
                    dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                    primarySizing: 'FIXED', counterSizing: 'FIXED',
                    w: 36, h: 36
                });
                if (!selected) db.fills = [];
                makeText(db, String(dayNum), { size: 11, weight: 'Semi Bold', color: selected ? '#FFFFFF' : '#1F2937' });
            }
        }
        makeText(bc, 'Horarios · Mar 5 mayo', { size: 13, weight: 'Bold', color: '#1F2937' });
        var slotsM = makeFrame(bc, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 6, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        slotsM.fills = [];
        var mSlots = ['9:00', '10:00', '11:00', '15:00'];
        for (var ms2 = 0; ms2 < mSlots.length; ms2++) {
            var sbB = makeFrame(slotsM, {
                bg: ms2 === 1 ? '#6366F1' : '#F3F4F6', radius: 6,
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                paddingV: 8, paddingH: 10,
                primarySizing: 'AUTO', counterSizing: 'AUTO'
            });
            makeText(sbB, mSlots[ms2], { size: 11, weight: 'Semi Bold', color: ms2 === 1 ? '#FFFFFF' : '#6B7280' });
        }
        var cb3 = matBtn(bc, 'Confirmar', 'primary');
        cb3.resize(311, cb3.height);
        cb3.primaryAxisSizingMode = 'FIXED';
    })();

    // M15 · Payment Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M15 · Payment', p.x, p.y);
        mobileTopbar(s, 'Pagar');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 16, gap: 12,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 756
        });
        var pc = matCard(body, { w: 343, padding: 14, gap: 10 });
        makeText(pc, 'Elige método', { size: 14, weight: 'Bold', color: '#1F2937' });
        var methods = [['Yape', true], ['Plin', false], ['Tarjeta', false]];
        for (var pm = 0; pm < methods.length; pm++) {
            var mc = makeFrame(pc, {
                bg: '#FFFFFF', stroke: methods[pm][1] ? '#6366F1' : '#E5E7EB', strokeWeight: methods[pm][1] ? 2 : 1, radius: 8,
                dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
                padding: 12, gap: 10,
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 311
            });
            var rd = makeFrame(mc, {
                bg: null, radius: 999, stroke: methods[pm][1] ? '#6366F1' : '#E5E7EB', strokeWeight: methods[pm][1] ? 5 : 2,
                w: 16, h: 16, primarySizing: 'FIXED', counterSizing: 'FIXED'
            });
            rd.fills = [];
            makeText(mc, methods[pm][0], { size: 13, weight: 'Semi Bold', color: '#1F2937' });
        }
        var tot = makeFrame(pc, {
            bgGradient: ['#6366F1', '#4F46E5', 135], radius: 8,
            dir: 'HORIZONTAL', primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
            padding: 12,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 311
        });
        makeText(tot, 'Total', { size: 13, weight: 'Bold', color: '#FFFFFF' });
        makeText(tot, 'S/ 201.60', { size: 18, weight: 'Extra Bold', color: '#FFFFFF' });
        var pb = matBtn(pc, 'Pagar S/ 201.60', 'primary');
        pb.resize(311, pb.height);
        pb.primaryAxisSizingMode = 'FIXED';
    })();

    // M16 · Receipt Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M16 · Receipt', p.x, p.y);
        mobileTopbar(s, 'Comprobante');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            padding: 16, gap: 12,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 756
        });
        var rc = matCard(body, { w: 343, padding: 20, gap: 12, center: true });
        var ch = makeFrame(rc, {
            bg: '#10B981', radius: 999, w: 64, h: 64,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(ch, '✓', { size: 36, weight: 'Extra Bold', color: '#FFFFFF' });
        makeText(rc, '¡Pago exitoso!', { size: 22, weight: 'Bold', color: '#1F2937', align: 'CENTER' });
        var det = makeFrame(rc, {
            bg: '#F9FAFB', radius: 8, padding: 12, gap: 4,
            dir: 'VERTICAL', primaryAlign: 'MIN', counterAlign: 'MIN',
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 303, h: 140
        });
        var dItems = [['ID', 'TRX-054821'], ['Fecha', '21/04/2026'], ['Trabajador', 'María Carmen'], ['Monto', 'S/ 201.60']];
        for (var di = 0; di < dItems.length; di++) {
            var dr = makeFrame(det, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 279
            });
            dr.fills = [];
            makeText(dr, dItems[di][0], { size: 11, color: '#6B7280' });
            makeText(dr, dItems[di][1], { size: 11, weight: 'Semi Bold', color: '#1F2937' });
        }
        var vb = matBtn(rc, 'Descargar PDF', 'secondary');
        vb.resize(303, vb.height);
        vb.primaryAxisSizingMode = 'FIXED';
    })();

    // M17 · Dashboard Finance Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M17 · Dashboard Finance', p.x, p.y);
        mobileTopbar(s, 'Finanzas');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 12, gap: 10,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 692
        });
        var kpiRow = makeFrame(body, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'MIN',
            gap: 8, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        kpiRow.fills = [];
        var mkpis = [['S/ 3,240', 'Este mes', '#10B981'], ['18', 'Servicios', '#6366F1'], ['4.9', 'Rating', '#F59E0B']];
        for (var km = 0; km < mkpis.length; km++) {
            var kc = matCard(kpiRow, { w: 113, padding: 10, gap: 2, center: true });
            makeText(kc, mkpis[km][0], { size: 16, weight: 'Extra Bold', color: mkpis[km][2] });
            makeText(kc, mkpis[km][1], { size: 10, color: '#6B7280' });
        }
        makeText(body, 'Transacciones', { size: 13, weight: 'Bold', color: '#1F2937' });
        for (var tr3 = 0; tr3 < 4; tr3++) {
            var tc = matCard(body, { w: 351, padding: 10, gap: 4 });
            var tri = makeFrame(tc, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 327
            });
            tri.fills = [];
            makeText(tri, ['Juan López', 'Ana María', 'Pedro G.', 'Rosa C.'][tr3], { size: 12, weight: 'Semi Bold', color: '#1F2937' });
            makeText(tri, 'S/ ' + [158, 220, 132, 110][tr3] + '.00', { size: 13, weight: 'Bold', color: '#10B981' });
            var states = ['Pendiente', 'Liberado', 'Disputa', 'Liberado'];
            var stBg = [['#FEF3C7', '#92400E'], ['#D1FAE5', '#065F46'], ['#FEE2E2', '#991B1B'], ['#D1FAE5', '#065F46']][tr3];
            var stc = chip2(tc, states[tr3], false);
            stc.fills = [solidFill(stBg[0])];
            stc.children[0].fills = [solidFill(stBg[1])];
        }
    })();

    // M18 · Chat Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M18 · Chat', p.x, p.y);
        var chead = makeFrame(s, {
            bg: '#FFFFFF', stroke: '#E5E7EB', strokeWeight: 1,
            dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 12, gap: 10,
            primarySizing: 'FIXED', counterSizing: 'AUTO',
            w: 375
        });
        makeText(chead, '←', { size: 18, color: '#1F2937' });
        var cha = makeFrame(chead, {
            bg: null, bgGradient: ['#EC4899', '#10B981', 135],
            radius: 999, w: 36, h: 36,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(cha, 'MC', { size: 11, weight: 'Bold', color: '#FFFFFF' });
        var chi = makeFrame(chead, {
            bg: null, dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            gap: 2, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        chi.fills = [];
        makeText(chi, 'María Carmen R.', { size: 13, weight: 'Bold', color: '#1F2937' });
        makeText(chi, '🟢 En línea', { size: 10, color: '#10B981' });
        var mbody = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'MIN',
            padding: 16, gap: 8,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 680
        });
        mbody.fills = [solidFill('#F9FAFB')];
        var dialog = [
            [false, 'Hola, ¿podría ayudarme?'],
            [true, 'Claro. ¿Distrito?'],
            [false, 'San Miguel, mañana AM.'],
            [true, '10 AM · S/ 180']
        ];
        for (var mi2 = 0; mi2 < dialog.length; mi2++) {
            var mrw = makeFrame(mbody, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: dialog[mi2][0] ? 'MAX' : 'MIN', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 343
            });
            mrw.fills = [];
            var bub = makeFrame(mrw, {
                bg: dialog[mi2][0] ? '#6366F1' : '#FFFFFF',
                radius: 12, padding: 10,
                dir: 'HORIZONTAL', primaryAlign: 'MIN', counterAlign: 'CENTER',
                primarySizing: 'AUTO', counterSizing: 'AUTO',
                stroke: dialog[mi2][0] ? null : '#E5E7EB', strokeWeight: 1
            });
            makeText(bub, dialog[mi2][1], { size: 12, color: dialog[mi2][0] ? '#FFFFFF' : '#1F2937', w: 220 });
        }
    })();

    // M19 · Rating Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M19 · Rating', p.x, p.y);
        mobileTopbar(s, 'Calificar');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            padding: 16, gap: 12,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 756
        });
        var rc = matCard(body, { w: 343, padding: 20, gap: 12, center: true });
        var rav = makeFrame(rc, {
            bg: null, bgGradient: ['#EC4899', '#10B981', 135],
            radius: 999, w: 64, h: 64,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(rav, 'MC', { size: 20, weight: 'Bold', color: '#FFFFFF' });
        makeText(rc, '¿Cómo te fue?', { size: 18, weight: 'Bold', color: '#1F2937', align: 'CENTER' });
        var sts = makeFrame(rc, {
            bg: null, dir: 'HORIZONTAL',
            primaryAlign: 'CENTER', counterAlign: 'CENTER',
            gap: 6, primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        sts.fills = [];
        for (var ss2 = 0; ss2 < 5; ss2++) makeText(sts, '⭐', { size: 36 });
        formInput(rc, 'Comentario', 'Excelente trabajo...', 303);
        var rsb = matBtn(rc, 'Publicar', 'primary');
        rsb.resize(303, rsb.height);
        rsb.primaryAxisSizingMode = 'FIXED';
    })();

    // M20 · Reviews Response Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M20 · Reviews Response', p.x, p.y);
        mobileTopbar(s, 'Reseñas (54)');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 12, gap: 10,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 692
        });
        for (var rv2 = 0; rv2 < 3; rv2++) {
            var rc2 = matCard(body, { w: 351, padding: 12, gap: 6 });
            var rh = makeFrame(rc2, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 327
            });
            rh.fills = [];
            makeText(rh, ['Juan L. · ⭐⭐⭐⭐⭐', 'Ana M. · ⭐⭐⭐⭐', 'Roberto G. · ⭐⭐'][rv2], { size: 12, weight: 'Bold', color: '#1F2937' });
            makeText(rh, 'Responder', { size: 11, weight: 'Semi Bold', color: '#6366F1' });
            makeText(rc2, ['Excelente trabajo, muy puntual.', 'Buen servicio, algo tarde.', 'Acabado no quedó bien.'][rv2], { size: 11, color: '#6B7280', w: 327 });
        }
    })();

    // M21 · Top Rated Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M21 · Top Rated', p.x, p.y);
        mobileTopbar(s, 'Mi perfil');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 16, gap: 12,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 692
        });
        var tc = matCard(body, { w: 343, padding: 20, gap: 10, center: true });
        var tav = makeFrame(tc, {
            bg: null, bgGradient: ['#EC4899', '#10B981', 135],
            radius: 999, w: 88, h: 88,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            primarySizing: 'FIXED', counterSizing: 'FIXED'
        });
        makeText(tav, 'MC', { size: 28, weight: 'Bold', color: '#FFFFFF' });
        makeText(tc, 'María Carmen R.', { size: 18, weight: 'Bold', color: '#1F2937', align: 'CENTER' });
        var trc = makeFrame(tc, {
            bgGradient: ['#F59E0B', '#EF4444', 135], radius: 999,
            dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
            paddingV: 8, paddingH: 16, gap: 6,
            primarySizing: 'AUTO', counterSizing: 'AUTO'
        });
        makeText(trc, '🏅 TOP RATED', { size: 14, weight: 'Extra Bold', color: '#FFFFFF' });
        makeText(tc, '⭐ 4.9 · 54 reseñas · 120 servicios', { size: 12, color: '#F59E0B', weight: 'Semi Bold' });
        var prog = matCard(body, { w: 343, padding: 14, gap: 6 });
        makeText(prog, 'Progreso · 17 de 20 servicios', { size: 12, weight: 'Bold', color: '#1F2937' });
        var pbar = makeFrame(prog, {
            bg: '#F3F4F6', radius: 999,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 311, h: 10
        });
        var pfill = makeFrame(pbar, {
            bgGradient: ['#F59E0B', '#EF4444', 90], radius: 999,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 265, h: 10
        });
    })();

    // M22 · Training Mobile
    (function () {
        var p = nextAppMobilePos();
        var s = mobileAppScreen('M22 · Training', p.x, p.y);
        mobileTopbar(s, 'Capacitaciones');
        var body = makeFrame(s, {
            bg: '#F9FAFB', dir: 'VERTICAL',
            primaryAlign: 'MIN', counterAlign: 'CENTER',
            padding: 12, gap: 10,
            primarySizing: 'FIXED', counterSizing: 'FIXED',
            w: 375, h: 692
        });
        var mCourses = [
            ['⚡', 'Seguridad eléctrica', '8 min', 'Completado', '#10B981'],
            ['🔧', 'Gasfitería avanzada', '12 min', 'En progreso', '#F59E0B'],
            ['🎨', 'Acabados pro', '10 min', 'Nuevo', '#6366F1']
        ];
        for (var co = 0; co < mCourses.length; co++) {
            var cc = matCard(body, { w: 351, padding: 12, gap: 8 });
            var ct = makeFrame(cc, {
                bg: null, bgGradient: ['#6366F1', '#4F46E5', 135],
                radius: 8,
                dir: 'HORIZONTAL', primaryAlign: 'CENTER', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'FIXED',
                w: 327, h: 90
            });
            makeText(ct, mCourses[co][0] + ' ▶', { size: 28, color: '#FFFFFF' });
            makeText(cc, mCourses[co][1], { size: 13, weight: 'Bold', color: '#1F2937' });
            var ctbot = makeFrame(cc, {
                bg: null, dir: 'HORIZONTAL',
                primaryAlign: 'SPACE_BETWEEN', counterAlign: 'CENTER',
                primarySizing: 'FIXED', counterSizing: 'AUTO',
                w: 327
            });
            ctbot.fills = [];
            makeText(ctbot, '⏱ ' + mCourses[co][2], { size: 10, color: '#6B7280' });
            var cchip = chip2(ctbot, mCourses[co][3], false);
            cchip.fills = [solidFill(mCourses[co][4], 0.15)];
            cchip.children[0].fills = [solidFill(mCourses[co][4])];
        }
    })();

    // =========================================================================
    // FINAL
    // =========================================================================
    figma.currentPage = pDLand;
    try {
        figma.viewport.scrollAndZoomIntoView([landing]);
    } catch (e) { /* noop */ }

    figma.closePlugin('✅ Ya Quedó v4 listo — 11 páginas organizadas, Design System, Componentes, Landing Desktop+Mobile, 4 diagramas IA + Site Map, 8 User Flows, Wireframes Lo-Fi, 22 pantallas App Desktop + 22 App Mobile.');
})().catch(function (err) {
    var msg = err && err.message ? err.message : String(err);
    console.error(err);
    figma.closePlugin('❌ Error: ' + msg);
});
