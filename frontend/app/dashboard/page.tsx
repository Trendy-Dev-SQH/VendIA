'use client'

import { useCallback, useEffect, useState } from 'react'
import { SignOutButton, useUser } from '@clerk/nextjs'
import axios from 'axios'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

type SectionKey = 'dashboard' | 'chats' | 'knowledge' | 'clients' | 'settings'

const sectionMeta: Record<SectionKey, { title: string; subtitle: string }> = {
  dashboard: { title: 'Dashboard', subtitle: 'Resumen de la actividad de tu asistente' },
  chats: { title: 'Conversaciones', subtitle: 'Gestiona conversaciones activas, escaladas y cerradas' },
  knowledge: { title: 'Base de Conocimiento', subtitle: 'Entrena la IA con catalogo, reglas y preguntas frecuentes' },
  clients: { title: 'Clientes', subtitle: 'Consulta contactos, historial y oportunidades comerciales' },
  settings: { title: 'Configuracion', subtitle: 'Administra negocio, integraciones, plan y seguridad' },
}

const navItems: Array<{ key: SectionKey; label: string; icon: string }> = [
  { key: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { key: 'chats', label: 'Conversaciones', icon: 'chat' },
  { key: 'knowledge', label: 'Base de Conocimiento', icon: 'book' },
  { key: 'clients', label: 'Clientes', icon: 'users' },
  { key: 'settings', label: 'Configuración', icon: 'gear' },
]

const mobileNav: Array<{ key: SectionKey; label: string; icon: string }> = [
  { key: 'dashboard', label: 'Dashboard', icon: 'grid' },
  { key: 'chats', label: 'Chats', icon: 'chat' },
  { key: 'knowledge', label: 'Conocimiento', icon: 'book' },
  { key: 'settings', label: 'Ajustes', icon: 'gear' },
]

const timeline = [
  { time: '10:27', title: 'Cliente solicitó información sobre planes', note: '"Hola, ¿cuáles son sus precios?"' },
  { time: '10:24', title: 'IA respondió exitosamente', note: 'Categorizado: Ventas', tag: true },
  { time: '10:15', title: 'Sesión iniciada: Carlos Ruiz', note: '' },
]

const recentChats = [
  { name: 'Marco Polo', msg: 'Interesado en integración con CRM...', time: '12m ago', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=96&q=80', online: true },
  { name: 'Elena Gómez', msg: 'Cita programada para mañana.', time: '1h ago', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=96&q=80', online: false },
]

function Icon({ name }: { name: string }) {
  const common = { fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round' } as const

  if (name === 'leaf') return <svg viewBox="0 0 24 24"><path {...common} d="M20 4c-7.2 0-12 4.8-12 12 0 1.8.5 3.2 1.4 4.2C10.4 13.7 14 9.6 20 4Z" /><path {...common} d="M8.5 19.5c-2.5-2.5-2.5-6.7 0-9.2" /></svg>
  if (name === 'grid') return <svg viewBox="0 0 24 24"><path {...common} d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" /></svg>
  if (name === 'chat') return <svg viewBox="0 0 24 24"><path {...common} d="M4 5h15v10H8l-4 4V5Z" /><path {...common} d="M8 9h7M8 12h5" /></svg>
  if (name === 'book') return <svg viewBox="0 0 24 24"><path {...common} d="M4 5c3 0 5 .7 8 3v12c-3-2.3-5-3-8-3V5Z" /><path {...common} d="M20 5c-3 0-5 .7-8 3v12c3-2.3 5-3 8-3V5Z" /></svg>
  if (name === 'users') return <svg viewBox="0 0 24 24"><path {...common} d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 19c.6-3 2.4-5 5-5s4.4 2 5 5" /><path {...common} d="M16 11a2.5 2.5 0 1 0 0-5M14 14c2.8.2 4.7 2 5.3 5" /></svg>
  if (name === 'gear') return <svg viewBox="0 0 24 24"><path {...common} d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" /><path {...common} d="m19 12 2-1-2-3-2 1a7 7 0 0 0-1.5-.9L15 6h-6l-.5 2.1A7 7 0 0 0 7 9L5 8l-2 3 2 1v1l-2 1 2 3 2-1a7 7 0 0 0 1.5.9L9 20h6l.5-2.1A7 7 0 0 0 17 16l2 1 2-3-2-1v-1Z" /></svg>
  if (name === 'bolt') return <svg viewBox="0 0 24 24"><path {...common} d="m13 2-8 12h6l-1 8 8-12h-6l1-8Z" /></svg>
  if (name === 'target') return <svg viewBox="0 0 24 24"><path {...common} d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" /><path {...common} d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" /></svg>
  if (name === 'badge') return <svg viewBox="0 0 24 24"><path {...common} d="m12 3 2.2 2 3-.2.8 2.9 2.4 1.8-1.2 2.7 1.2 2.7-2.4 1.8-.8 2.9-3-.2-2.2 2-2.2-2-3 .2-.8-2.9-2.4-1.8 1.2-2.7-1.2-2.7L6 7.7l.8-2.9 3 .2L12 3Z" /><path {...common} d="m9 12 2 2 4-4" /></svg>
  if (name === 'bookmark') return <svg viewBox="0 0 24 24"><path {...common} d="M7 4h10v16l-5-3-5 3V4Z" /></svg>
  if (name === 'eye') return <svg viewBox="0 0 24 24"><path {...common} d="M2.5 12s3.5-6 9.5-6 9.5 6 9.5 6-3.5 6-9.5 6-9.5-6-9.5-6Z" /><path {...common} d="M12 14.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" /></svg>
  if (name === 'headset') return <svg viewBox="0 0 24 24"><path {...common} d="M4 13a8 8 0 0 1 16 0v4" /><path {...common} d="M5 13h3v6H5a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2ZM19 13h-3v6h3a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2Z" /><path {...common} d="M16 19c0 1.1-1.8 2-4 2" /></svg>
  if (name === 'bell') return <svg viewBox="0 0 24 24"><path {...common} d="M18 9a6 6 0 0 0-12 0c0 7-2 7-2 9h16c0-2-2-2-2-9Z" /><path {...common} d="M10 21h4" /></svg>
  if (name === 'plus') return <svg viewBox="0 0 24 24"><path {...common} d="M12 5v14M5 12h14" /></svg>
  if (name === 'send') return <svg viewBox="0 0 24 24"><path {...common} d="m4 5 16 7-16 7 4-7-4-7Z" /></svg>
  if (name === 'smile') return <svg viewBox="0 0 24 24"><path {...common} d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" /><path {...common} d="M8 10h.01M16 10h.01M8 15c2.5 2 5.5 2 8 0" /></svg>
  if (name === 'mic') return <svg viewBox="0 0 24 24"><path {...common} d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z" /><path {...common} d="M5 11a7 7 0 0 0 14 0M12 18v3" /></svg>
  return null
}

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <span className="brand-icon"><Icon name="leaf" /></span>
        <div>
          <strong>VendIA</strong>
          <span>SaaS de Automatización</span>
        </div>
      </div>

      <nav className="side-nav">
        {navItems.map((item, index) => (
          <button className={`nav-item ${index === 0 ? 'active' : ''}`} key={item.key}>
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="side-bottom">
        <button className="connect-btn"><Icon name="plus" />Conectar WhatsApp</button>
        <div className="connection"><Icon name="target" />Estado de Conexión</div>
      </div>
    </aside>
  )
}

function Topbar({ userInitial }: { userInitial: string }) {
  return (
    <header className="topbar">
      <div className="top-title">
        <h1>Dashboard</h1>
        <p>Resumen de la actividad de tu asistente</p>
      </div>
      <div className="top-actions">
        <span className="status-pill"><span />Estado IA: Activo</span>
        <span className="status-pill"><Icon name="bolt" />WhatsApp: Conectado</span>
        <span className="divider" />
        <button className="icon-btn"><Icon name="bell" /></button>
        <div className="avatar">{userInitial}</div>
      </div>
    </header>
  )
}

function MobileHeader({ userInitial }: { userInitial: string }) {
  return (
    <header className="mobile-header">
      <div className="mobile-brand"><span><Icon name="badge" /></span>VendIA</div>
      <div className="mobile-actions">
        <button><Icon name="bell" /></button>
        <div className="mobile-avatar">{userInitial}</div>
      </div>
    </header>
  )
}

function WeeklyChart() {
  return (
    <section className="panel chart-panel">
      <div className="panel-head">
        <div>
          <h2>Actividad Semanal</h2>
          <p>Mensajes gestionados por la IA</p>
        </div>
        <div className="tabs"><span>7 Días</span><button>30 Días</button></div>
      </div>
      <div className="desktop-curve" aria-hidden="true">
        <svg viewBox="0 0 760 320" preserveAspectRatio="none">
          <defs>
            <linearGradient id="areaFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#08704e" stopOpacity=".2" />
              <stop offset="1" stopColor="#08704e" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[70, 255, 440, 625, 810].map((x) => <path key={x} d={`M${x} 16v272`} stroke="#d8dde4" strokeWidth="1" />)}
          <path d="M70 272 C150 242 205 184 285 168 C360 154 392 260 450 230 C520 194 505 50 575 24 C640 0 680 54 700 235 C724 286 758 255 765 50" fill="url(#areaFill)" />
          <path d="M70 272 C150 242 205 184 285 168 C360 154 392 260 450 230 C520 194 505 50 575 24 C640 0 680 54 700 235" fill="none" stroke="#006b4b" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <div className="chart-days"><span>Lunes</span><span>Martes</span><span>Miércoles</span><span>Jueves</span><span>Viernes</span><span>Sábado</span><span>Domingo</span></div>
      </div>
      <div className="mobile-bars" aria-hidden="true">
        {[42, 62, 38, 88, 56, 72, 48].map((height, index) => (
          <div className="bar-wrap" key={index}>
            <span style={{ height: `${height}%` }} className={index === 3 ? 'peak' : ''} />
            <small>{['L', 'M', 'X', 'J', 'V', 'S', 'D'][index]}</small>
          </div>
        ))}
      </div>
    </section>
  )
}

function KnowledgeCard() {
  return (
    <section className="panel knowledge desktop-only">
      <div className="panel-head compact">
        <h2>Base de Conocimiento</h2>
        <button>Editar</button>
      </div>
      <div className="catalog-card">
        <span className="catalog-icon"><Icon name="bookmark" /></span>
        <div>
          <strong>Catálogo Principal</strong>
          <p>Última sinc: Hace 2h</p>
        </div>
        <div className="catalog-data">
          <span>Horario<strong>24/7 Activo</strong></span>
          <span>Productos<strong>142 items</strong></span>
        </div>
      </div>
    </section>
  )
}

function ChatPreview({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`panel preview ${compact ? 'mobile-preview' : 'desktop-only'}`}>
      <div className="preview-head"><Icon name="eye" />Vista Previa IA</div>
      <div className="preview-body">
        <p className="msg incoming">¿Tienen stock del modelo Pro X en color verde bosque?<small>09:41</small></p>
        <p className="msg outgoing">¡Hola! Sí, actualmente tenemos 5 unidades disponibles del Pro X Verde Bosque. ¿Te gustaría que reserve una para ti o prefieres pasar por la tienda?<small>09:42 ✓✓</small></p>
        <div className="reply-box">
          <Icon name="smile" />
          <span>Escribe una respuesta...</span>
          <b>⌇</b>
          <button><Icon name="mic" /></button>
        </div>
      </div>
    </section>
  )
}

function AiBrain() {
  return (
    <section className="ai-brain">
      <div className="brain-head">
        <span><Icon name="badge" /></span>
        <div>
          <h2>Cerebro de la IA</h2>
          <p>98.2% de precisión en respuestas</p>
        </div>
      </div>
      <p>La IA ha optimizado 4 flujos de venta hoy. No se requiere intervención manual.</p>
      <button>Configurar Lógica</button>
    </section>
  )
}

function ChatSimulator() {
  return (
    <section className="mobile-section simulator">
      <h2>Simulador de Chat</h2>
      <div className="sim-card">
        <div className="sim-head"><span><Icon name="users" /></span>Cliente Potencial</div>
        <div className="sim-body">
          <p className="mini-msg incoming">¿Qué precio tiene el plan SaaS avanzado?</p>
          <p className="mini-msg outgoing">El plan Avanzado cuesta $49/mes. Incluye IA ilimitada y 5 canales.<small>VendIA · 10:42 AM</small></p>
        </div>
        <div className="sim-input"><span>Probar respuesta de la IA...</span><button><Icon name="send" /></button></div>
      </div>
    </section>
  )
}

function OpsSummary() {
  const items = [
    { label: 'Plan actual', value: 'Beta activo', detail: 'Listo para pilotos comerciales' },
    { label: 'WhatsApp Business', value: 'Conectado', detail: 'Webhook y lectura habilitados' },
    { label: 'Entrenamiento IA', value: '82%', detail: 'Completa catalogo y preguntas frecuentes' },
  ]

  return (
    <section className="ops-strip">
      {items.map((item) => (
        <article className="ops-card" key={item.label}>
          <span>{item.label}</span>
          <strong>{item.value}</strong>
          <p>{item.detail}</p>
        </article>
      ))}
      <article className="ops-card action">
        <span>Siguiente paso</span>
        <strong>Publicar base de conocimiento</strong>
        <button>Completar configuracion</button>
      </article>
    </section>
  )
}

export default function Dashboard() {
  const { isLoaded, user } = useUser()
  const [stats, setStats] = useState({ totalConversations: 1284, activeConversations: 42, totalMessages: 12500, botHandledRate: 94.2 })

  const initBusiness = useCallback(async () => {
    const ownerEmail = user?.primaryEmailAddress?.emailAddress
    if (!ownerEmail) return

    try {
      let res
      try {
        res = await axios.post(API + '/api/business', {
          name: user?.fullName || 'Mi Negocio',
          ownerEmail,
          ownerName: user?.fullName || 'Dueño',
        })
      } catch {
        res = await axios.get(API + '/api/business/email/' + ownerEmail)
      }
      const s = await axios.get(API + '/api/business/' + res.data.id + '/stats')
      setStats({
        totalConversations: s.data.totalConversations ?? 1284,
        activeConversations: s.data.activeConversations ?? 42,
        totalMessages: s.data.totalMessages ?? 12500,
        botHandledRate: s.data.botHandledRate ?? 94.2,
      })
    } catch (err) {
      console.error(err)
    }
  }, [user])

  useEffect(() => {
    if (!isLoaded) return
    if (!user) {
      window.location.href = '/sign-in'
      return
    }
    const loadBusiness = async () => {
      await initBusiness()
    }

    void loadBusiness()
  }, [initBusiness, isLoaded, user])

  const userInitial = user?.firstName?.[0] || 'U'
  const kpis = [
    { label: 'Conversaciones', mobile: 'Conversaciones', value: stats.totalConversations.toLocaleString(), delta: '+12% ↗', icon: 'chat' },
    { label: 'Activas', mobile: 'Activas', value: stats.activeConversations.toString(), delta: '+5% ↗', icon: 'target' },
    { label: 'Mensajes Procesados', mobile: 'Mensajes', value: stats.totalMessages >= 1000 ? `${(stats.totalMessages / 1000).toFixed(1)}k` : stats.totalMessages.toString(), delta: '~2% —', icon: 'bolt' },
    { label: 'Resolución IA', mobile: 'Resolución', value: `${stats.botHandledRate}%`, delta: '+8% ↗', icon: 'badge' },
  ]

  return (
    <main className="dashboard-shell">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        :root {
          --green: #006b4b;
          --green-2: #087a56;
          --mint: #b8f5d3;
          --bg: #f8f8f6;
          --mobile-bg: #f7f7fb;
          --line: #d9dee5;
          --soft: #eef1fb;
          --text: #0c1222;
          --muted: #4b5563;
          --dim: #6b7280;
        }

        * { box-sizing: border-box; }
        body { margin: 0; background: var(--bg); color: var(--text); font-family: Inter, Arial, sans-serif; }
        button { font: inherit; }
        svg { width: 1.25em; height: 1.25em; }

        .dashboard-shell {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          font-family: Inter, Arial, sans-serif;
        }

        .sidebar {
          position: fixed;
          inset: 0 auto 0 0;
          width: 320px;
          display: flex;
          flex-direction: column;
          padding: 30px 20px;
          border-right: 1px solid var(--line);
          background: #fff;
          z-index: 20;
        }

        .brand {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .brand-icon {
          width: 50px;
          height: 50px;
          display: grid;
          place-items: center;
          border-radius: 10px;
          background: var(--green);
          color: #fff;
        }

        .brand strong {
          display: block;
          color: var(--green);
          font-size: 22px;
          line-height: 1.1;
        }

        .brand span {
          color: #111827;
          font-size: 15px;
        }

        .side-nav {
          display: grid;
          gap: 18px;
          margin-top: 62px;
        }

        .nav-item {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 13px 20px;
          border: 0;
          border-radius: 9px;
          background: transparent;
          color: #0f1d18;
          font-size: 18px;
          text-align: left;
          cursor: pointer;
        }

        .nav-item svg {
          color: var(--green);
          width: 26px;
          height: 26px;
        }

        .nav-item.active::after {
          content: "";
          position: absolute;
          right: 0;
          top: 0;
          width: 3px;
          height: 100%;
          border-radius: 99px;
          background: var(--green);
        }

        .side-bottom {
          margin-top: auto;
          padding-top: 30px;
          border-top: 1px solid var(--line);
        }

        .connect-btn {
          width: 100%;
          height: 44px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: 0;
          border-radius: 8px;
          background: var(--green);
          color: #fff;
          font-size: 17px;
          font-weight: 700;
        }

        .connection {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 34px;
          color: #111827;
          font-size: 15px;
        }

        .connection svg { color: var(--green); }

        .desktop-main {
          margin-left: 320px;
          min-height: 100vh;
        }

        .topbar {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          border-bottom: 1px solid var(--line);
          background: #fff;
        }

        .top-title h1 {
          margin: 0 0 6px;
          font-size: 30px;
          line-height: 1;
          letter-spacing: -0.035em;
        }

        .top-title p {
          margin: 0;
          color: #111827;
          font-size: 18px;
        }

        .top-actions {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .status-pill {
          min-height: 34px;
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 0 13px;
          border: 1px solid #b7c8bd;
          border-radius: 999px;
          background: #e8f1ec;
          color: var(--green);
          font-weight: 700;
        }

        .status-pill span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--green);
        }

        .status-pill svg {
          width: 18px;
          height: 18px;
        }

        .divider {
          width: 1px;
          height: 38px;
          background: var(--line);
        }

        .icon-btn {
          width: 36px;
          height: 36px;
          display: grid;
          place-items: center;
          border: 0;
          background: transparent;
          color: #0f172a;
        }

        .avatar,
        .mobile-avatar {
          width: 50px;
          height: 50px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: radial-gradient(circle at 45% 25%, #a7f3d0, #0f766e 42%, #0f172a);
          color: #fff;
          font-weight: 900;
          border: 2px solid #d1fae5;
          box-shadow: 0 4px 14px rgba(0,0,0,.12);
        }

        .content {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 386px;
          gap: 30px;
          padding: 30px;
        }

        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 30px;
          grid-column: 1 / -1;
        }

        .kpi-card,
        .panel {
          border: 1px solid var(--line);
          border-radius: 13px;
          background: #fff;
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.05);
        }

        .kpi-card {
          min-height: 218px;
          padding: 31px;
          transition: transform .18s ease, box-shadow .18s ease, border-color .18s ease;
        }

        .kpi-card:hover {
          transform: translateY(-2px);
          border-color: rgba(0, 107, 75, .28);
          box-shadow: 0 20px 42px rgba(15, 23, 42, 0.08);
        }

        .kpi-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 18px;
        }

        .kpi-icon {
          width: 58px;
          height: 58px;
          display: grid;
          place-items: center;
          border-radius: 8px;
          background: #eff0fb;
          color: var(--green);
        }

        .kpi-icon svg {
          width: 29px;
          height: 29px;
        }

        .delta {
          color: var(--green);
          font-weight: 800;
        }

        .kpi-card p {
          margin: 0 0 12px;
          font-size: 18px;
        }

        .kpi-card strong {
          font-size: 37px;
          letter-spacing: -0.04em;
          line-height: 1;
        }

        .ops-strip {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
          padding: 18px;
          border: 1px solid rgba(0, 107, 75, .18);
          border-radius: 14px;
          background:
            radial-gradient(circle at 8% 0, rgba(32, 214, 111, .12), transparent 18rem),
            linear-gradient(135deg, #ffffff 0%, #f3fbf6 100%);
          box-shadow: 0 18px 42px rgba(15, 23, 42, 0.05);
        }

        .ops-card {
          min-height: 116px;
          padding: 18px;
          border: 1px solid rgba(0, 107, 75, .12);
          border-radius: 10px;
          background: rgba(255, 255, 255, .86);
        }

        .ops-card span {
          display: block;
          margin-bottom: 9px;
          color: #52606f;
          font-size: 13px;
          font-weight: 700;
          text-transform: uppercase;
        }

        .ops-card strong {
          display: block;
          color: #071b14;
          font-size: 18px;
          line-height: 1.15;
        }

        .ops-card p {
          margin: 9px 0 0;
          color: #4b5563;
          font-size: 14px;
          line-height: 1.35;
        }

        .ops-card.action {
          background: #071b14;
          color: #fff;
        }

        .ops-card.action span,
        .ops-card.action p {
          color: #b8f5d3;
        }

        .ops-card.action strong {
          color: #fff;
        }

        .ops-card.action button {
          width: 100%;
          min-height: 36px;
          margin-top: 14px;
          border: 0;
          border-radius: 8px;
          background: #31e981;
          color: #03150d;
          font-weight: 900;
          cursor: pointer;
        }

        .main-column,
        .right-column {
          display: grid;
          gap: 30px;
          align-content: start;
        }

        .panel {
          padding: 30px;
        }

        .panel-head {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 16px;
          margin-bottom: 28px;
        }

        .panel-head.compact {
          align-items: center;
          margin-bottom: 20px;
        }

        .panel h2 {
          margin: 0;
          font-size: 18px;
          letter-spacing: -0.02em;
        }

        .panel p {
          margin: 3px 0 0;
          color: #252b36;
        }

        .tabs {
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
        }

        .tabs span {
          padding: 8px 13px;
          border-radius: 9px;
          background: #eff2fb;
          color: var(--green);
        }

        .tabs button,
        .panel-head button {
          border: 0;
          background: transparent;
          color: #001c12;
          font-weight: 700;
          cursor: pointer;
        }

        .chart-panel {
          min-height: 508px;
        }

        .desktop-curve svg {
          width: 100%;
          height: 330px;
          overflow: visible;
        }

        .chart-days {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 10px;
          color: #323a46;
          font-size: 15px;
        }

        .mobile-bars { display: none; }

        .timeline-panel {
          min-height: 334px;
        }

        .timeline-panel h2 {
          margin: 0 0 26px;
          font-size: 18px;
        }

        .event {
          position: relative;
          display: grid;
          grid-template-columns: 16px 1fr;
          gap: 14px;
          padding-bottom: 22px;
        }

        .event::before {
          content: "";
          position: absolute;
          left: 7px;
          top: 11px;
          bottom: 0;
          width: 1px;
          background: var(--line);
        }

        .event:last-child::before { display: none; }

        .event-dot {
          width: 10px;
          height: 10px;
          margin-top: 4px;
          border-radius: 50%;
          background: var(--green);
        }

        .event:last-child .event-dot { background: #e5e7eb; }

        .event p {
          margin: 0;
          color: #3f4651;
          font-size: 15px;
        }

        .event time {
          margin-right: 6px;
          color: #0f172a;
          font-weight: 700;
        }

        .event em {
          display: block;
          margin-top: 9px;
          color: #111827;
          font-size: 18px;
        }

        .event-tag {
          display: inline-flex;
          margin-top: 11px;
          padding: 6px 12px;
          border: 1px solid var(--line);
          border-radius: 5px;
          background: #f0f2fb;
          color: #003d2b;
        }

        .knowledge {
          min-height: 292px;
        }

        .catalog-card {
          display: grid;
          grid-template-columns: 60px 1fr;
          gap: 20px;
          padding: 22px;
          border-radius: 8px;
          background: #eef0fb;
        }

        .catalog-icon {
          width: 60px;
          height: 60px;
          display: grid;
          place-items: center;
          border: 1px solid var(--line);
          border-radius: 5px;
          background: #fff;
          color: var(--green);
        }

        .catalog-card strong {
          display: block;
          margin-top: 9px;
          font-size: 18px;
        }

        .catalog-card p {
          margin: 2px 0 0;
          color: #4b5563;
        }

        .catalog-data {
          grid-column: 1 / -1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 28px;
          padding-top: 14px;
          color: #4b5563;
        }

        .catalog-data strong {
          margin: 3px 0 0;
          color: #0f172a;
          font-size: 16px;
        }

        .preview {
          overflow: hidden;
          padding: 0;
        }

        .preview-head {
          height: 64px;
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 0 20px;
          background: #eef0fb;
          font-size: 18px;
          font-weight: 800;
        }

        .preview-body {
          min-height: 376px;
          padding: 20px;
          background: #e5dcd1;
        }

        .msg {
          position: relative;
          width: fit-content;
          max-width: 80%;
          margin: 0 0 20px;
          padding: 13px 14px;
          border-radius: 8px;
          font-size: 18px;
          line-height: 1.35;
        }

        .msg small {
          display: inline-block;
          margin-left: 10px;
          color: #4b5563;
          font-size: 13px;
        }

        .msg.incoming {
          background: #fff;
        }

        .msg.outgoing {
          margin-left: auto;
          background: #d8ffc9;
        }

        .reply-box {
          height: 48px;
          display: grid;
          grid-template-columns: 28px 1fr 20px 42px;
          align-items: center;
          gap: 10px;
          margin-top: 26px;
          padding: 0 7px 0 16px;
          border-radius: 999px;
          background: #fff;
          box-shadow: 0 6px 18px rgba(0,0,0,.15);
        }

        .reply-box span { color: #394150; }
        .reply-box button {
          width: 40px;
          height: 40px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 50%;
          background: var(--green);
          color: #fff;
        }

        .support-fab {
          position: fixed;
          right: 30px;
          bottom: 30px;
          width: 70px;
          height: 70px;
          display: grid;
          place-items: center;
          border: 0;
          border-radius: 50%;
          background: var(--green);
          color: #fff;
          box-shadow: 0 18px 28px rgba(0,0,0,.18);
          z-index: 30;
        }

        .mobile-header,
        .mobile-content,
        .mobile-bottom-nav,
        .mobile-fab {
          display: none;
        }

        @media (max-width: 1180px) {
          .sidebar { width: 280px; }
          .desktop-main { margin-left: 280px; }
          .content { grid-template-columns: 1fr; }
          .right-column { grid-template-columns: repeat(2, 1fr); }
          .kpi-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 760px) {
          body { background: var(--mobile-bg); }
          .dashboard-shell { background: var(--mobile-bg); padding-bottom: 86px; }
          .sidebar,
          .desktop-main,
          .support-fab {
            display: none;
          }

          .mobile-header {
            height: 55px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 14px;
            border-bottom: 1px solid #c9d2cc;
            background: #fff;
          }

          .mobile-brand {
            display: flex;
            align-items: center;
            gap: 8px;
            color: #003d2b;
            font-weight: 900;
          }

          .mobile-brand span {
            display: grid;
            place-items: center;
            width: 28px;
            height: 28px;
          }

          .mobile-actions {
            display: flex;
            align-items: center;
            gap: 15px;
          }

          .mobile-actions button {
            border: 0;
            background: transparent;
            color: #0f172a;
          }

          .mobile-avatar {
            width: 30px;
            height: 30px;
            font-size: 12px;
          }

          .mobile-content {
            display: block;
            padding: 22px 14px 0;
          }

          .mobile-title {
            margin: 0 0 8px;
            font-size: 15px;
          }

          .mobile-status-row {
            display: flex;
            gap: 7px;
            margin-bottom: 34px;
          }

          .mobile-status-row span {
            display: inline-flex;
            align-items: center;
            gap: 5px;
            height: 21px;
            padding: 0 9px;
            border-radius: 999px;
            background: #8bf0ab;
            color: #003d2b;
            font-size: 11px;
          }

          .mobile-status-row i {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: var(--green);
          }

          .mobile-kpis {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }

          .kpi-card {
            min-height: 111px;
            padding: 16px 14px;
            border-color: #bfc9c2;
            border-radius: 9px;
            box-shadow: none;
          }

          .kpi-card:hover {
            transform: none;
            box-shadow: none;
          }

          .kpi-top {
            margin-bottom: 10px;
          }

          .kpi-icon {
            width: auto;
            height: auto;
            display: block;
            background: transparent;
            color: var(--green);
          }

          .kpi-icon svg {
            width: 22px;
            height: 22px;
          }

          .delta { display: none; }
          .kpi-card p {
            margin: 0 0 7px;
            font-size: 15px;
          }

          .kpi-card strong {
            font-size: 24px;
          }

          .ops-strip {
            display: grid;
            grid-template-columns: 1fr;
            gap: 10px;
            margin-top: 18px;
            padding: 12px;
            border-color: #bfc9c2;
            border-radius: 9px;
            background: #fff;
            box-shadow: none;
          }

          .ops-card {
            min-height: auto;
            padding: 13px;
            border-radius: 8px;
          }

          .ops-card span {
            margin-bottom: 5px;
            font-size: 10px;
          }

          .ops-card strong {
            font-size: 14px;
          }

          .ops-card p {
            font-size: 11px;
          }

          .ops-card.action button {
            min-height: 34px;
            font-size: 12px;
          }

          .panel {
            margin-top: 36px;
            padding: 17px 14px;
            border-color: #bfc9c2;
            border-radius: 9px;
          }

          .panel-head {
            align-items: center;
            margin-bottom: 22px;
          }

          .panel h2 {
            font-size: 15px;
          }

          .panel p,
          .tabs button {
            display: none;
          }

          .tabs span {
            padding: 0;
            background: transparent;
            color: #374151;
            font-size: 12px;
            font-weight: 400;
          }

          .desktop-curve { display: none; }

          .mobile-bars {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            align-items: end;
            gap: 12px;
            height: 155px;
            padding: 14px 5px 0;
          }

          .bar-wrap {
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: flex-end;
            align-items: center;
            gap: 8px;
          }

          .bar-wrap span {
            width: 100%;
            min-height: 24px;
            display: block;
            background: #7bd3aa;
          }

          .bar-wrap span.peak {
            background: var(--green-2);
          }

          .bar-wrap small {
            color: #475569;
            font-size: 10px;
          }

          .ai-brain {
            margin-top: 34px;
            padding: 20px;
            border-radius: 9px;
            background: radial-gradient(circle at 80% 0, rgba(38, 166, 91, .35), transparent 11rem), var(--green);
            color: #fff;
          }

          .brain-head {
            display: flex;
            align-items: center;
            gap: 14px;
            margin-bottom: 18px;
          }

          .brain-head span {
            width: 40px;
            height: 40px;
            display: grid;
            place-items: center;
            border-radius: 7px;
            background: #9defbd;
            color: var(--green);
          }

          .brain-head h2 {
            margin: 0;
            font-size: 15px;
          }

          .brain-head p,
          .ai-brain p {
            margin: 2px 0 0;
            font-size: 12px;
            line-height: 1.35;
          }

          .ai-brain > p {
            margin-bottom: 16px;
            font-size: 13px;
          }

          .ai-brain button {
            width: 100%;
            height: 36px;
            border: 0;
            border-radius: 6px;
            background: #a7f3c7;
            color: #001c12;
            font-weight: 800;
          }

          .mobile-section {
            display: block;
            margin-top: 38px;
          }

          .mobile-section h2 {
            margin: 0 0 16px;
            font-size: 15px;
          }

          .sim-card {
            overflow: hidden;
            border: 1px solid #bfc9c2;
            border-radius: 9px;
            background: #fff;
          }

          .sim-head {
            height: 41px;
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 0 10px;
            background: #086a58;
            color: #fff;
            font-weight: 800;
          }

          .sim-head span {
            width: 29px;
            height: 29px;
            display: grid;
            place-items: center;
            border-radius: 50%;
            background: #dbeafe;
            color: #0f172a;
          }

          .sim-body {
            padding: 18px 14px 20px;
            background: #f0ece8;
          }

          .mini-msg {
            width: fit-content;
            max-width: 78%;
            margin: 0 0 14px;
            padding: 9px 10px;
            border-radius: 6px;
            font-size: 11px;
            line-height: 1.45;
          }

          .mini-msg.incoming { background: #fff; }
          .mini-msg.outgoing {
            margin-left: auto;
            background: #d8ffc9;
          }

          .mini-msg small {
            display: block;
            margin-top: 7px;
            color: #547469;
            font-size: 9px;
            text-align: right;
          }

          .sim-input {
            height: 42px;
            display: grid;
            grid-template-columns: 1fr 30px;
            align-items: center;
            gap: 8px;
            padding: 0 8px;
            background: #eef1fb;
          }

          .sim-input span {
            height: 22px;
            display: flex;
            align-items: center;
            padding: 0 13px;
            border: 1px solid #bfc9c2;
            border-radius: 999px;
            background: #fff;
            color: #6b7280;
            font-size: 11px;
          }

          .sim-input button {
            width: 30px;
            height: 30px;
            display: grid;
            place-items: center;
            border: 0;
            border-radius: 50%;
            background: var(--green);
            color: #fff;
          }

          .recent-head {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 15px;
          }

          .recent-head h2 {
            margin: 0;
            font-size: 15px;
          }

          .recent-head button {
            border: 0;
            background: transparent;
            color: var(--green);
            font-size: 12px;
          }

          .chat-list {
            display: grid;
            gap: 10px;
          }

          .chat-row {
            display: grid;
            grid-template-columns: 44px 1fr auto;
            gap: 11px;
            align-items: center;
            padding: 9px;
            border: 1px solid #bfc9c2;
            border-radius: 9px;
            background: #fff;
          }

          .chat-avatar {
            position: relative;
            width: 41px;
            height: 41px;
          }

          .chat-photo {
            display: block;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background-position: center;
            background-size: cover;
          }

          .chat-avatar > span:not(.chat-photo) {
            position: absolute;
            right: 0;
            bottom: 0;
            width: 9px;
            height: 9px;
            border: 2px solid #fff;
            border-radius: 50%;
            background: var(--green);
          }

          .chat-row strong {
            display: block;
            font-size: 14px;
          }

          .chat-row p {
            margin: 2px 0 0;
            color: #4b5563;
            font-size: 11px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .chat-row time {
            align-self: start;
            color: #4b5563;
            font-size: 9px;
          }

          .mobile-timeline {
            margin-top: 36px;
          }

          .mobile-timeline h2 {
            margin: 0 0 18px;
            font-size: 15px;
          }

          .mobile-event {
            position: relative;
            display: grid;
            grid-template-columns: 14px 1fr;
            gap: 10px;
            padding-bottom: 20px;
          }

          .mobile-event::before {
            content: "";
            position: absolute;
            left: 7px;
            top: 10px;
            bottom: 0;
            width: 1px;
            background: #bfc9c2;
          }

          .mobile-event:last-child::before { display: none; }

          .mobile-event i {
            width: 10px;
            height: 10px;
            margin-top: 4px;
            border-radius: 50%;
            background: var(--green);
          }

          .mobile-event strong {
            display: block;
            font-size: 11px;
          }

          .mobile-event span {
            display: block;
            margin-top: 8px;
            color: #6b7280;
            font-size: 10px;
          }

          .mobile-bottom-nav {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;
            height: 62px;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            border-top: 1px solid #e5e7eb;
            background: #fff;
            box-shadow: 0 -8px 28px rgba(15,23,42,.05);
            z-index: 30;
          }

          .mobile-bottom-nav button {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 3px;
            border: 0;
            background: transparent;
            color: #111827;
            font-size: 9px;
          }

          .mobile-bottom-nav button.active {
            color: var(--green);
          }

          .mobile-bottom-nav svg {
            width: 22px;
            height: 22px;
          }

          .mobile-fab {
            position: fixed;
            right: 24px;
            bottom: 76px;
            width: 50px;
            height: 50px;
            display: grid;
            place-items: center;
            border: 0;
            border-radius: 50%;
            background: var(--green);
            color: #fff;
            box-shadow: 0 12px 22px rgba(0,0,0,.18);
            z-index: 35;
          }

          .desktop-only { display: none; }
        }
      `}</style>

      <Sidebar />

      <div className="desktop-main">
        <Topbar userInitial={userInitial} />
        <div className="content">
          <div className="kpi-grid">
            {kpis.map((kpi) => (
              <article className="kpi-card" key={kpi.label}>
                <div className="kpi-top">
                  <span className="kpi-icon"><Icon name={kpi.icon} /></span>
                  <span className="delta">{kpi.delta}</span>
                </div>
                <p>{kpi.label}</p>
                <strong>{kpi.value}</strong>
              </article>
            ))}
          </div>

          <OpsSummary />

          <div className="main-column">
            <WeeklyChart />
            <section className="panel timeline-panel">
              <h2>Actividad en tiempo real</h2>
              {timeline.map((item) => (
                <div className="event" key={item.time}>
                  <span className="event-dot" />
                  <div>
                    <p><time>{item.time}</time>{item.title}</p>
                    {item.tag ? <span className="event-tag">{item.note}</span> : item.note ? <em>{item.note}</em> : null}
                  </div>
                </div>
              ))}
            </section>
          </div>

          <div className="right-column">
            <KnowledgeCard />
            <ChatPreview />
          </div>
        </div>
      </div>

      <MobileHeader userInitial={userInitial} />
      <div className="mobile-content">
        <h1 className="mobile-title">Dashboard</h1>
        <div className="mobile-status-row">
          <span><i />IA Online</span>
          <span><i />WhatsApp Activo</span>
        </div>

        <div className="mobile-kpis">
          {kpis.map((kpi) => (
            <article className="kpi-card" key={kpi.label}>
              <div className="kpi-top">
                <span className="kpi-icon"><Icon name={kpi.icon === 'target' ? 'bolt' : kpi.icon} /></span>
                <span className="delta">{kpi.delta}</span>
              </div>
              <p>{kpi.mobile}</p>
              <strong>{kpi.mobile === 'Mensajes' ? '8.5k' : kpi.mobile === 'Resolución' ? '94%' : kpi.value}</strong>
            </article>
          ))}
        </div>

        <OpsSummary />

        <WeeklyChart />
        <AiBrain />
        <ChatSimulator />

        <section className="mobile-section">
          <div className="recent-head">
            <h2>Chats Recientes</h2>
            <button>Ver todos</button>
          </div>
          <div className="chat-list">
            {recentChats.map((chat) => (
              <article className="chat-row" key={chat.name}>
                <div className="chat-avatar">
                  <span className="chat-photo" style={{ backgroundImage: `url(${chat.img})` }} />
                  {chat.online ? <span /> : null}
                </div>
                <div>
                  <strong>{chat.name}</strong>
                  <p>{chat.msg}</p>
                </div>
                <time>{chat.time}</time>
              </article>
            ))}
          </div>
        </section>

        <section className="mobile-timeline">
          <h2>Actividad Reciente</h2>
          <div className="mobile-event">
            <i />
            <div>
              <strong>Base de datos actualizada con 14 nuevos clientes.</strong>
              <span>Hoy, 09:15 AM</span>
            </div>
          </div>
          <div className="mobile-event">
            <i />
            <div>
              <strong>WhatsApp reconectado exitosamente.</strong>
              <span>Ayer, 06:45 PM</span>
            </div>
          </div>
        </section>
      </div>

      <button className="support-fab"><Icon name="headset" /></button>
      <button className="mobile-fab"><Icon name="plus" /></button>
      <nav className="mobile-bottom-nav">
        {mobileNav.map((item, index) => (
          <button className={index === 0 ? 'active' : ''} key={item.key}>
            <Icon name={item.icon} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </main>
  )
}
