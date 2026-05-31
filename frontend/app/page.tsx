import Link from 'next/link'

const features = [
  {
    title: 'Dashboard de Ventas',
    text: 'Visualiza conversaciones, ventas y oportunidades desde un solo lugar.',
    icon: 'chart',
    active: true,
  },
  {
    title: 'Base de Conocimientos',
    text: 'Entrena la IA con catálogo, precios, horarios y preguntas frecuentes.',
    icon: 'brain',
  },
  {
    title: 'Automatización',
    text: 'Conecta productos, respuestas y flujos sin perseguir mensajes manualmente.',
    icon: 'rocket',
  },
  {
    title: 'VendIA responde',
    text: 'Tu asistente atiende clientes 24/7 con tono cercano y contexto del negocio.',
    icon: 'bot',
  },
]

const steps = [
  ['1', 'Configura', 'Conecta WhatsApp Business y registra tu negocio.'],
  ['2', 'Entrena', 'Carga catálogo, preguntas y reglas de atención.'],
  ['3', 'Conecta', 'Activa respuestas, seguimiento y escalamiento humano.'],
  ['4', 'VendIA responde', 'Tu asistente vende y atiende mientras tú avanzas.'],
]

const audiences = ['Cafeterías', 'Estéticas', 'Tiendas locales', 'Consultorios', 'Servicios', 'Más']

const before = [
  'Mensajes ignorados por horas',
  'Ventas perdidas por respuesta lenta',
  'Clientes sin atención fuera de horario',
  'Todo depende de revisar el teléfono',
]

const after = [
  'Respuestas instantáneas',
  'Ventas durante la noche',
  'Clientes atendidos 24/7',
  'IA entrenada con tu catálogo',
]

const faqs = [
  ['¿Cómo puedo suscribirme?', 'Crea una cuenta, conecta tu WhatsApp Business y configura el asistente con los datos de tu negocio.'],
  ['¿Funciona con mi negocio?', 'Sí. VendIA está pensado para negocios locales que venden o atienden por WhatsApp.'],
  ['¿Puedo responder manualmente?', 'Sí. Puedes tomar una conversación cuando necesites intervenir o cerrar una venta especial.'],
]

function LogoMark() {
  return (
    <svg className="logo-mark" viewBox="0 0 64 56" aria-hidden="true">
      <defs>
        <linearGradient id="vendiaLogo" x1="8" x2="56" y1="8" y2="48">
          <stop stopColor="#62F58B" />
          <stop offset="0.62" stopColor="#18C86B" />
          <stop offset="1" stopColor="#0B6B4B" />
        </linearGradient>
      </defs>
      <path d="M10.4 9.8c4.2-2.3 9.4-.8 11.6 3.4l10.4 19.4 10-19.2c2.2-4.2 7.3-5.9 11.5-3.7 4.3 2.2 5.9 7.4 3.7 11.6L41.5 51.5c-1.8 3.4-5.3 5.5-9.1 5.5-3.8 0-7.3-2.1-9.1-5.4L7 21.5C4.8 17.3 6.3 12.1 10.4 9.8Z" fill="url(#vendiaLogo)" />
      <path d="M38.7 44.7 32.4 56l-8.7-16.1c2.8 1.4 5.7 2.5 8.8 3.3 2 .5 4 .9 6.2 1.5Z" fill="#07140F" opacity=".45" />
    </svg>
  )
}

function Icon({ name }: { name: string }) {
  if (name === 'chart') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 39h32" />
        <path d="M12 35V21" />
        <path d="M22 35V12" />
        <path d="M32 35V18" />
        <path d="M12 21l10-9 10 6 8-10" />
      </svg>
    )
  }

  if (name === 'brain') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M18 39a8 8 0 0 1-7-12 8 8 0 0 1 3-15 8 8 0 0 1 14-2 8 8 0 0 1 9 11 8 8 0 0 1-5 15" />
        <path d="M24 9v30" />
        <path d="M16 20c3 0 5 2 5 5" />
        <path d="M31 18c-3 1-5 3-5 7" />
        <path d="M15 30c4-1 7 1 8 5" />
        <path d="M33 29c-4 0-6 2-7 6" />
      </svg>
    )
  }

  if (name === 'rocket') {
    return (
      <svg viewBox="0 0 48 48" aria-hidden="true">
        <path d="M29 8c5-2 9-1 11 1 2 2 3 6 1 11-2 6-7 12-15 17l-8-8C17 21 23 11 29 8Z" />
        <path d="M18 29 9 31l8-12" />
        <path d="M26 37 24 46l-6-9" />
        <path d="M31 17h.1" />
        <path d="M13 35 7 41" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 48 48" aria-hidden="true">
      <path d="M16 10h16a8 8 0 0 1 8 8v10a8 8 0 0 1-8 8H19l-9 6v-7a8 8 0 0 1-6-7V18a8 8 0 0 1 8-8h4Z" />
      <path d="M17 23h.1" />
      <path d="M31 23h.1" />
      <path d="M18 29c4 3 8 3 12 0" />
    </svg>
  )
}

function WhatsAppMockup() {
  return (
    <div className="whatsapp-shell">
      <div className="wa-sidebar">
        <span className="wa-dot active" />
        <span className="wa-dot" />
        <span className="wa-dot" />
        <span className="wa-help">?</span>
      </div>
      <div className="wa-chat">
        <div className="wa-head">
          <LogoMark />
          <div>
            <strong>VendIA Bot</strong>
            <span>Activo</span>
          </div>
          <span className="verified">✓</span>
          <span className="wa-menu">⋮</span>
        </div>
        <div className="wa-body">
          <span className="wa-day">Today</span>
          <p className="bubble user">Hola, ¿cómo puedo ordenar un producto?</p>
          <p className="bubble bot">Claro. Dime qué producto deseas y te ayudo con disponibilidad, precio y envío.</p>
          <p className="bubble user">¿Tienen envíos hoy?</p>
          <p className="bubble bot">Sí, tenemos entregas el mismo día en tu zona. ¿Quieres que lo reserve?</p>
        </div>
        <div className="wa-input">
          <span>+</span>
          <div>Escribe tu mensaje</div>
          <span>⌕</span>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="landing">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        :root {
          --bg: #07101f;
          --panel: rgba(17, 28, 45, 0.82);
          --panel-strong: #101a2b;
          --line: rgba(113, 247, 151, 0.18);
          --line-soft: rgba(148, 163, 184, 0.18);
          --text: #f8fafc;
          --muted: #93a4b8;
          --dim: #627087;
          --green: #20d66f;
          --green-2: #68f58f;
          --danger: #ff6475;
        }

        * { box-sizing: border-box; }
        body { margin: 0; }
        .landing {
          min-height: 100vh;
          color: var(--text);
          font-family: Inter, Arial, sans-serif;
          background:
            radial-gradient(circle at 18% 0%, rgba(55, 255, 139, 0.14), transparent 28rem),
            radial-gradient(circle at 88% 12%, rgba(24, 119, 242, 0.12), transparent 26rem),
            linear-gradient(180deg, #08111f 0%, #050b17 58%, #07101f 100%);
          overflow-x: hidden;
        }

        .page {
          width: min(1120px, calc(100% - 32px));
          margin: 0 auto;
          padding: 28px 0 48px;
        }

        .shell {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(98, 245, 139, 0.22);
          border-radius: 14px;
          background:
            linear-gradient(145deg, rgba(11, 22, 38, 0.94), rgba(5, 10, 20, 0.98)),
            var(--bg);
          box-shadow: 0 32px 90px rgba(0, 0, 0, 0.46);
        }

        .shell::before {
          content: "";
          position: absolute;
          inset: 0;
          background:
            radial-gradient(circle at 38% 18%, rgba(32, 214, 111, 0.12), transparent 24rem),
            radial-gradient(circle at 80% 68%, rgba(32, 214, 111, 0.09), transparent 20rem);
          pointer-events: none;
        }

        .nav,
        .hero,
        .section,
        .footer {
          position: relative;
          z-index: 1;
        }

        .nav {
          height: 64px;
          padding: 0 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(148, 163, 184, 0.12);
        }

        .brand {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          color: var(--text);
          text-decoration: none;
          font-weight: 800;
          letter-spacing: -0.02em;
        }

        .logo-mark {
          width: 30px;
          height: 27px;
          filter: drop-shadow(0 0 12px rgba(32, 214, 111, 0.38));
          flex: 0 0 auto;
        }

        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 42px;
          padding: 0 22px;
          border-radius: 9px;
          color: #04130c;
          background: linear-gradient(135deg, var(--green-2), var(--green));
          border: 0;
          text-decoration: none;
          font-weight: 800;
          font-size: 14px;
          box-shadow: 0 12px 32px rgba(32, 214, 111, 0.22);
          transition: transform 180ms ease, box-shadow 180ms ease;
        }

        .btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 16px 40px rgba(32, 214, 111, 0.3);
        }

        .hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(280px, 420px);
          gap: 42px;
          align-items: center;
          padding: 64px 24px 52px;
        }

        .hero-copy h1 {
          margin: 0;
          max-width: 620px;
          font-size: clamp(2.35rem, 6vw, 4.95rem);
          line-height: 0.98;
          letter-spacing: -0.045em;
          font-weight: 900;
        }

        .hero-copy p {
          max-width: 560px;
          margin: 22px 0 28px;
          color: var(--muted);
          font-size: 17px;
          line-height: 1.7;
        }

        .cta-stack {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
        }

        .cta-stack small {
          color: var(--dim);
          font-size: 12px;
          padding-left: 34px;
        }

        .product-shot {
          border: 1px solid rgba(98, 245, 139, 0.18);
          border-radius: 22px;
          padding: 14px;
          background:
            linear-gradient(145deg, rgba(26, 42, 66, 0.78), rgba(6, 12, 24, 0.88));
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.03), 0 28px 70px rgba(0,0,0,0.38);
        }

        .whatsapp-shell {
          min-height: 300px;
          display: grid;
          grid-template-columns: 54px minmax(0, 1fr);
          overflow: hidden;
          border: 3px solid #101827;
          border-radius: 18px;
          background: #182337;
        }

        .wa-sidebar {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
          padding: 22px 0 14px;
          background: #142033;
        }

        .wa-dot,
        .wa-help {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: rgba(148, 163, 184, 0.34);
        }

        .wa-dot.active {
          background: var(--green);
          box-shadow: 0 0 0 8px rgba(32, 214, 111, 0.1);
        }

        .wa-help {
          margin-top: auto;
          display: grid;
          place-items: center;
          color: #0f172a;
          font-size: 12px;
          font-weight: 900;
          background: #aeb8c4;
        }

        .wa-chat {
          background: #f6f0e6;
          color: #10201a;
        }

        .wa-head {
          height: 54px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 12px;
          color: #0f172a;
          background: #f8fafc;
          border-bottom: 1px solid #d9dee6;
        }

        .wa-head .logo-mark {
          width: 31px;
          height: 28px;
          padding: 4px;
          border-radius: 50%;
          background: #07101f;
        }

        .wa-head strong {
          display: block;
          font-size: 13px;
          line-height: 1;
        }

        .wa-head span {
          display: block;
          color: #6b7280;
          font-size: 10px;
        }

        .verified {
          color: var(--green) !important;
          font-weight: 900;
        }

        .wa-menu {
          margin-left: auto;
          font-size: 21px !important;
          color: #4b5563 !important;
        }

        .wa-body {
          min-height: 196px;
          padding: 14px;
          background:
            radial-gradient(circle at 18px 18px, rgba(17,24,39,.06) 2px, transparent 3px) 0 0 / 34px 34px,
            #efe7da;
        }

        .wa-day {
          display: table;
          margin: 0 auto 10px;
          padding: 5px 11px;
          border-radius: 8px;
          background: #dce9ee;
          color: #64748b;
          font-size: 11px;
          font-weight: 700;
        }

        .bubble {
          width: fit-content;
          max-width: 78%;
          margin: 7px 0;
          padding: 8px 10px;
          border-radius: 10px;
          font-size: 12px;
          line-height: 1.35;
          box-shadow: 0 1px 1px rgba(15,23,42,.08);
        }

        .bubble.user {
          margin-left: auto;
          background: #d8ffc9;
          border-top-right-radius: 2px;
        }

        .bubble.bot {
          background: #ffffff;
          border-top-left-radius: 2px;
        }

        .wa-input {
          display: grid;
          grid-template-columns: 20px 1fr 20px;
          align-items: center;
          gap: 8px;
          height: 48px;
          padding: 0 12px;
          background: #f8fafc;
          color: #94a3b8;
        }

        .wa-input div {
          height: 28px;
          display: flex;
          align-items: center;
          padding: 0 14px;
          border-radius: 999px;
          background: #ffffff;
          font-size: 12px;
        }

        .section {
          padding: 54px 24px;
        }

        .section.compact {
          padding-top: 34px;
        }

        .section h2 {
          margin: 0 0 12px;
          text-align: center;
          font-size: clamp(1.75rem, 4vw, 2.55rem);
          line-height: 1.08;
          letter-spacing: -0.035em;
          font-weight: 900;
        }

        .section-sub {
          width: min(520px, 100%);
          margin: 0 auto 32px;
          text-align: center;
          color: var(--muted);
          line-height: 1.65;
        }

        .steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .step {
          display: grid;
          grid-template-columns: 44px 1fr;
          gap: 12px;
          align-items: start;
        }

        .step-num {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: linear-gradient(135deg, var(--green-2), var(--green));
          color: #04130c;
          font-size: 24px;
          font-weight: 900;
          box-shadow: 0 10px 28px rgba(32, 214, 111, 0.24);
        }

        .step strong,
        .feature strong,
        .compare-card strong {
          display: block;
          margin-bottom: 6px;
          font-size: 16px;
        }

        .step p,
        .feature p,
        .compare-card p {
          margin: 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.55;
        }

        .feature-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .feature {
          min-height: 198px;
          padding: 22px;
          border: 1px solid var(--line-soft);
          border-radius: 13px;
          background: linear-gradient(145deg, rgba(24, 36, 55, 0.88), rgba(13, 22, 38, 0.92));
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.03);
        }

        .feature.active {
          border-color: rgba(98, 245, 139, 0.55);
          box-shadow: 0 0 0 1px rgba(98, 245, 139, 0.1), 0 22px 60px rgba(32, 214, 111, 0.12);
        }

        .icon-tile {
          width: 58px;
          height: 58px;
          display: grid;
          place-items: center;
          margin-bottom: 18px;
          border-radius: 13px;
          border: 1px solid rgba(98, 245, 139, 0.18);
          background:
            radial-gradient(circle at 50% 45%, rgba(98, 245, 139, 0.2), transparent 65%),
            rgba(32, 214, 111, 0.12);
        }

        .icon-tile svg {
          width: 36px;
          height: 36px;
          fill: none;
          stroke: var(--green-2);
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          filter: drop-shadow(0 0 10px rgba(98, 245, 139, 0.4));
        }

        .audiences {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }

        .pill {
          padding: 8px 14px;
          border: 1px solid rgba(98, 245, 139, 0.42);
          border-radius: 999px;
          color: rgba(104, 245, 143, 0.84);
          background: rgba(32, 214, 111, 0.06);
          font-size: 14px;
        }

        .comparison {
          width: min(790px, 100%);
          margin: 0 auto;
        }

        .switch-row {
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 13px;
          margin-bottom: 12px;
        }

        .switch-badge {
          width: 44px;
          height: 44px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.68);
          background: #f8fafc;
          color: #ef4444;
          font-size: 25px;
          font-weight: 900;
          box-shadow: 0 10px 24px rgba(0,0,0,.25);
        }

        .switch-badge.ok {
          background: linear-gradient(135deg, var(--green-2), var(--green));
          color: #04130c;
        }

        .switch-arrow {
          color: var(--muted);
          font-size: 22px;
          font-weight: 900;
        }

        .compare-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
        }

        .compare-card {
          overflow: hidden;
          border: 1px solid rgba(148, 163, 184, 0.23);
          border-radius: 12px;
          background: rgba(6, 14, 28, 0.74);
        }

        .compare-card.good {
          border-color: rgba(98, 245, 139, 0.58);
          box-shadow: 0 22px 70px rgba(32, 214, 111, 0.12);
        }

        .compare-head {
          padding: 16px 18px;
          text-align: center;
          background: rgba(148, 163, 184, 0.15);
          font-weight: 900;
          font-size: 19px;
        }

        .good .compare-head {
          color: var(--green-2);
          background: rgba(32, 214, 111, 0.13);
          border-bottom: 1px solid rgba(98, 245, 139, 0.35);
        }

        .compare-list {
          display: grid;
          gap: 14px;
          margin: 0;
          padding: 22px;
          list-style: none;
        }

        .compare-list li {
          display: grid;
          grid-template-columns: 20px 1fr;
          gap: 10px;
          color: #d9e3ee;
          font-size: 14px;
          line-height: 1.45;
        }

        .bad-mark { color: var(--danger); }
        .good-mark { color: var(--green-2); }

        .testimonials {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
          width: min(760px, 100%);
          margin: 0 auto;
        }

        .testimonial {
          padding: 22px;
          border: 1px solid var(--line-soft);
          border-radius: 12px;
          background: linear-gradient(145deg, rgba(24, 36, 55, 0.9), rgba(13, 22, 38, 0.95));
        }

        .avatar-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 14px;
        }

        .avatar {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: linear-gradient(135deg, #fef3c7, #fda4af);
          color: #082018;
          font-weight: 900;
        }

        .testimonial p {
          margin: 0 0 16px;
          color: #d9e3ee;
          line-height: 1.6;
        }

        .testimonial strong {
          display: block;
          font-size: 14px;
        }

        .testimonial span {
          color: var(--muted);
          font-size: 13px;
        }

        .faq {
          display: grid;
          gap: 10px;
          width: min(720px, 100%);
          margin: 0 auto;
        }

        details {
          border: 1px solid rgba(148, 163, 184, 0.23);
          border-radius: 10px;
          background: rgba(6, 14, 28, 0.56);
        }

        summary {
          cursor: pointer;
          padding: 16px 18px;
          list-style: none;
          color: #dbeafe;
          font-size: 14px;
          font-weight: 600;
        }

        summary::-webkit-details-marker { display: none; }
        details[open] summary { color: var(--green-2); }
        details p {
          margin: 0;
          padding: 0 18px 16px;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.6;
        }

        .final-cta {
          width: min(760px, 100%);
          margin: 0 auto;
          padding: 38px 24px;
          text-align: center;
          border: 1px solid rgba(98, 245, 139, 0.25);
          border-radius: 14px;
          background:
            radial-gradient(circle at 12% 20%, rgba(98, 245, 139, 0.15), transparent 18rem),
            linear-gradient(135deg, rgba(14, 82, 55, 0.9), rgba(8, 39, 29, 0.95));
        }

        .final-cta h2 {
          margin-bottom: 12px;
        }

        .final-cta p {
          margin: 0 auto 22px;
          color: #bad0c5;
        }

        .final-cta .btn {
          width: min(460px, 100%);
        }

        .footer {
          display: grid;
          grid-template-columns: 1.25fr repeat(3, 1fr);
          gap: 28px;
          padding: 42px 24px 24px;
          color: var(--muted);
        }

        .footer strong {
          display: block;
          margin-bottom: 12px;
          color: var(--text);
          font-size: 14px;
        }

        .footer a,
        .footer span {
          display: block;
          margin: 8px 0;
          color: var(--muted);
          text-decoration: none;
          font-size: 13px;
        }

        .made {
          grid-column: 1 / -1;
          padding-top: 14px;
          text-align: center;
          border-top: 1px solid rgba(148, 163, 184, 0.13);
          color: var(--dim);
          font-size: 13px;
        }

        @media (max-width: 900px) {
          .hero,
          .steps,
          .feature-grid,
          .footer {
            grid-template-columns: 1fr;
          }

          .hero {
            padding-top: 42px;
          }

          .product-shot {
            max-width: 560px;
            width: 100%;
            justify-self: center;
          }

          .steps {
            grid-template-columns: repeat(2, 1fr);
          }

          .feature-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 620px) {
          .page {
            width: min(100% - 18px, 430px);
            padding-top: 10px;
          }

          .shell {
            border-radius: 12px;
          }

          .nav {
            height: 58px;
            padding: 0 16px;
          }

          .nav .btn {
            min-height: 36px;
            padding: 0 14px;
            font-size: 12px;
          }

          .hero,
          .section {
            padding-left: 16px;
            padding-right: 16px;
          }

          .hero-copy h1 {
            font-size: 2.55rem;
          }

          .hero-copy p {
            font-size: 15px;
          }

          .steps,
          .feature-grid,
          .compare-grid,
          .testimonials {
            grid-template-columns: 1fr;
          }

          .feature {
            min-height: auto;
          }

          .whatsapp-shell {
            grid-template-columns: 42px 1fr;
          }

          .wa-sidebar {
            gap: 20px;
          }

          .bubble {
            max-width: 88%;
            font-size: 11px;
          }
        }
      `}</style>

      <div className="page">
        <div className="shell">
          <nav className="nav">
            <Link className="brand" href="/">
              <LogoMark />
              <span>VendIA</span>
            </Link>
            <Link className="btn" href="/sign-up">Empezar gratis</Link>
          </nav>

          <section className="hero">
            <div className="hero-copy">
              <h1>Boost your sales with AI-powered WhatsApp automation</h1>
              <p>
                Automatiza la atención y vende 24/7 sin tocar el teléfono.
                Inteligencia artificial diseñada para negocios locales.
              </p>
              <div className="cta-stack">
                <Link className="btn" href="/sign-up">Empezar gratis</Link>
                <small>No requiere tarjeta de crédito</small>
              </div>
            </div>

            <div className="product-shot">
              <WhatsAppMockup />
            </div>
          </section>

          <section className="section compact">
            <h2>Cómo funciona</h2>
            <p className="section-sub">Entrena, conecta y deja que VendIA atienda cada oportunidad.</p>
            <div className="steps">
              {steps.map(([num, title, text]) => (
                <div className="step" key={num}>
                  <span className="step-num">{num}</span>
                  <div>
                    <strong>{title}</strong>
                    <p>{text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="section">
            <h2>El Centro de Mando</h2>
            <p className="section-sub">Controla ventas, conocimiento y automatizaciones desde una interfaz clara.</p>
            <div className="feature-grid">
              {features.map((feature) => (
                <article className={`feature ${feature.active ? 'active' : ''}`} key={feature.title}>
                  <div className="icon-tile">
                    <Icon name={feature.icon} />
                  </div>
                  <strong>{feature.title}</strong>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="section compact">
            <h2>Diseñado para ti</h2>
            <p className="section-sub">Una IA comercial lista para negocios que viven en WhatsApp.</p>
            <div className="audiences">
              {audiences.map((audience) => (
                <span className="pill" key={audience}>{audience}</span>
              ))}
            </div>
          </section>

          <section className="section">
            <h2>El cambio es real</h2>
            <p className="section-sub">Comparación simple entre atender a mano y vender con VendIA.</p>
            <div className="comparison">
              <div className="switch-row" aria-hidden="true">
                <span className="switch-badge">×</span>
                <span className="switch-arrow">→</span>
                <span className="switch-badge ok">✓</span>
              </div>
              <div className="compare-grid">
                <article className="compare-card">
                  <div className="compare-head">Sin VendIA</div>
                  <ul className="compare-list">
                    {before.map((item) => (
                      <li key={item}><span className="bad-mark">×</span>{item}</li>
                    ))}
                  </ul>
                </article>
                <article className="compare-card good">
                  <div className="compare-head">Con VendIA</div>
                  <ul className="compare-list">
                    {after.map((item) => (
                      <li key={item}><span className="good-mark">✓</span>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
            </div>
          </section>

          <section className="section">
            <h2>Lo que dicen</h2>
            <div className="testimonials">
              <article className="testimonial">
                <div className="avatar-row">
                  <span className="avatar">A</span>
                  <div>
                    <strong>Ana Martínez</strong>
                    <span>Tienda local</span>
                  </div>
                </div>
                <p>“VendIA nos ayudó a responder más rápido y a no perder clientes cuando el equipo está ocupado.”</p>
              </article>
              <article className="testimonial">
                <div className="avatar-row">
                  <span className="avatar">C</span>
                  <div>
                    <strong>Carlos Wall</strong>
                    <span>Consultor</span>
                  </div>
                </div>
                <p>“Ahora las preguntas frecuentes se resuelven solas y puedo enfocarme en cerrar ventas importantes.”</p>
              </article>
            </div>
          </section>

          <section className="section">
            <h2>Preguntas frecuentes</h2>
            <div className="faq">
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>{question}</summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section className="section">
            <div className="final-cta">
              <h2>¿Listo para automatizar WhatsApp?</h2>
              <p>Automatiza la atención, responde al instante y convierte conversaciones en ventas.</p>
              <Link className="btn" href="/sign-up">Registrar acceso</Link>
            </div>
          </section>

          <footer className="footer">
            <div>
              <Link className="brand" href="/">
                <LogoMark />
                <span>VendIA</span>
              </Link>
              <span>Automatización inteligente para negocios locales.</span>
            </div>
            <div>
              <strong>Producto</strong>
              <Link href="/sign-up">Funciones</Link>
              <Link href="/sign-up">Precios</Link>
              <Link href="/sign-up">Demo</Link>
            </div>
            <div>
              <strong>Compañía</strong>
              <Link href="/sign-up">Acerca de</Link>
              <Link href="/sign-up">Privacidad</Link>
              <Link href="/sign-up">Términos</Link>
            </div>
            <div>
              <strong>Soporte</strong>
              <Link href="/sign-up">Contacto</Link>
              <Link href="/sign-up">Documentación</Link>
              <Link href="/sign-up">WhatsApp</Link>
            </div>
            <div className="made">Hecho con cuidado para negocios locales</div>
          </footer>
        </div>
      </div>
    </main>
  )
}
