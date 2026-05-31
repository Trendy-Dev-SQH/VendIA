'use client'
import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import axios from 'axios'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export default function Dashboard() {
  const { user } = useUser()
  const [businessId, setBusinessId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [mobileNav, setMobileNav] = useState('inicio')
  const [isTyping, setIsTyping] = useState(false)
  const [chatInput, setChatInput] = useState('')
  const [stats, setStats] = useState({ totalConversations: 1284, activeConversations: 42, totalMessages: 8500, botHandledRate: 94 })
  const [config, setConfig] = useState({ botName: '', businessContext: '', catalog: '', faq: '' })

  useEffect(() => {
    if (!user) { window.location.href = '/sign-in'; return }
    initBusiness()
  }, [user])

  useEffect(() => {
    const t = setInterval(() => setIsTyping(p => !p), 3000)
    return () => clearInterval(t)
  }, [])

  async function initBusiness() {
    try {
      let res
      try {
        res = await axios.post(API + '/api/business', {
          name: user?.fullName || 'Mi Negocio',
          ownerEmail: user?.primaryEmailAddress?.emailAddress,
          ownerName: user?.fullName || 'Dueño',
        })
      } catch {
        res = await axios.get(API + '/api/business/email/' + user?.primaryEmailAddress?.emailAddress)
      }
      setBusinessId(res.data.id)
      if (res.data.botConfig) setConfig({ botName: res.data.botConfig.botName || '', businessContext: res.data.botConfig.businessContext || '', catalog: res.data.botConfig.catalog || '', faq: res.data.botConfig.faq || '' })
      const s = await axios.get(API + '/api/business/' + res.data.id + '/stats')
      setStats(s.data)
    } catch (err) { console.error(err) }
  }

  async function saveConfig() {
    if (!businessId) return
    setSaving(true)
    try {
      await axios.put(API + '/api/business/' + businessId + '/bot-config', config)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) { console.error(err) }
    setSaving(false)
  }

  const kpis = [
    { label: 'Conversaciones', value: stats.totalConversations.toLocaleString(), delta: '+12%', icon: '', sub: 'vs mes anterior' },
    { label: 'Activas ahora', value: stats.activeConversations.toString(), delta: '+8%', icon: '', sub: 'en este momento' },
    { label: 'Mensajes', value: stats.totalMessages >= 1000 ? (stats.totalMessages/1000).toFixed(1)+'k' : stats.totalMessages.toString(), delta: '+24%', icon: '', sub: 'procesados por IA' },
    { label: 'Resolución IA', value: stats.botHandledRate + '%', delta: '+2%', icon: '', sub: 'sin intervención' },
    { label: 'Tiempo ahorrado', value: '18h', delta: '+5%', icon: '⏱', sub: 'esta semana' },
  ]

  const chartBars = [
    { h: 30, v: 124 }, { h: 45, v: 189 }, { h: 35, v: 156 },
    { h: 90, v: 312 }, { h: 55, v: 210 }, { h: 40, v: 168 }, { h: 25, v: 98 }
  ]
  const days = ['L','M','X','J','V','S','D']
  const [hoveredBar, setHoveredBar] = useState<number | null>(null)

  const chats = [
    { name: 'Marco Polo', msg: 'Interesado en integración con CRM...', time: '12 min', initial: 'M', status: 'ia', tag: 'Ventas' },
    { name: 'Elena Gómez', msg: 'Cita programada para mañana.', time: '1 hr', initial: 'E', status: 'human', tag: 'Soporte' },
    { name: 'Carlos Ruiz', msg: 'Pregunta sobre precios del plan Pro', time: '2 hr', initial: 'C', status: 'pending', tag: 'Planes' },
  ]

  const statusMap: Record<string, { label: string; color: string; dot: string }> = {
    ia: { label: 'IA', color: 'text-emerald-400', dot: 'bg-emerald-400' },
    human: { label: 'Humano', color: 'text-red-400', dot: 'bg-red-400' },
    pending: { label: 'Pendiente', color: 'text-yellow-400', dot: 'bg-yellow-400' },
  }

  const timeline = [
    { time: '10:27', text: 'Cliente solicitó información sobre planes', sub: '"Hola, ¿cuáles son sus precios?"', color: 'bg-blue-500' },
    { time: '10:24', text: 'IA respondió exitosamente', sub: 'Categorizado: Ventas', color: 'bg-emerald-500' },
    { time: '10:20', text: 'Pedido confirmado por el cliente', sub: 'Zapatillas Nike · $180.000', color: 'bg-emerald-500' },
    { time: '10:15', text: 'Sesión iniciada: Carlos Ruiz', sub: 'Canal WhatsApp Business', color: 'bg-gray-500' },
  ]

  const navItems = [
    { key: 'inicio', icon: '⊞', label: 'Inicio' },
    { key: 'chats', icon: '💬', label: 'Chats' },
    { key: 'clientes', icon: '👥', label: 'Clientes' },
    { key: 'ajustes', icon: '⚙', label: 'Ajustes' },
  ]

  return (
    <div style={{background:'#0B1220'}} className="min-h-screen w-full font-sans text-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        body { font-family: 'Inter', sans-serif; }
        .card { background: #111827; border: 1px solid #243145; border-radius: 14px; }
        .dot-pulse span { display:inline-block; width:6px; height:6px; border-radius:50%; background:#22C55E; margin:0 2px; animation: dotpulse 1.4s infinite; }
        .dot-pulse span:nth-child(2){animation-delay:0.2s}
        .dot-pulse span:nth-child(3){animation-delay:0.4s}
        @keyframes dotpulse { 0%,80%,100%{transform:scale(0.6);opacity:0.4} 40%{transform:scale(1);opacity:1} }
        .bar-tooltip { display:none; position:absolute; bottom:105%; left:50%; transform:translateX(-50%); background:#1E293B; color:#F8FAFC; font-size:10px; font-weight:600; padding:4px 8px; border-radius:6px; white-space:nowrap; border:1px solid #243145; z-index:10; pointer-events:none; }
        .bar-wrap:hover .bar-tooltip { display:block; }
      `}</style>

      <div className="flex w-full">

        {/* Sidebar desktop */}
        <aside className="hidden lg:flex flex-col w-56 xl:w-60 fixed top-0 left-0 min-h-screen z-30" style={{background:'#0D1526',borderRight:'1px solid #1E2D42'}}>
          <div className="px-5 py-5" style={{borderBottom:'1px solid #1E2D42'}}>
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{background:'#0B6B4B'}}>V</div>
              <div>
                <p className="text-sm font-bold" style={{color:'#F8FAFC'}}>VendIA</p>
                <p className="text-xs" style={{color:'#64748B'}}>SaaS de Automatización</p>
              </div>
            </div>
          </div>
          <nav className="flex-1 px-3 py-4 space-y-0.5">
            {[
              { icon: '⊞', label: 'Dashboard', active: true },
              { icon: '≡', label: 'Conversaciones' },
              { icon: '📖', label: 'Base de Conocimiento' },
              { icon: '👥', label: 'Clientes' },
              { icon: '⚙', label: 'Configuración' },
            ].map((item) => (
              <button key={item.label} className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm transition-all" style={item.active ? {background:'rgba(11,107,75,0.15)',color:'#22C55E',fontWeight:600} : {color:'#94A3B8'}}>
                <span>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="px-3 pb-5 space-y-2">
            <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-semibold transition-all" style={{background:'#0B6B4B',color:'white'}}>
              + Conectar WhatsApp
            </button>
            <div className="flex items-center gap-2 px-2 py-1.5">
              <span className="w-2 h-2 rounded-full animate-pulse" style={{background:'#22C55E'}}></span>
              <span className="text-xs" style={{color:'#64748B'}}>Estado de Conexión</span>
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="w-full lg:ml-56 xl:ml-60 flex flex-col min-h-screen">

          {/* Mobile topbar */}
          <header className="lg:hidden px-4 py-3 flex items-center justify-between sticky top-0 z-20" style={{background:'#0D1526',borderBottom:'1px solid #1E2D42'}}>
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-md flex items-center justify-center text-white text-xs font-bold" style={{background:'#0B6B4B'}}>V</div>
              <span className="font-bold text-sm" style={{color:'#F8FAFC'}}>VendIA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔔</span>
              <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{background:'rgba(11,107,75,0.2)',color:'#22C55E'}}>
                {user?.firstName?.[0] || 'U'}
              </div>
            </div>
          </header>

          {/* Desktop topbar */}
          <header className="hidden lg:flex px-6 xl:px-8 py-4 items-center justify-between sticky top-0 z-20" style={{background:'#0D1526',borderBottom:'1px solid #1E2D42'}}>
            <div>
              <h1 className="text-lg font-bold" style={{color:'#F8FAFC'}}>Dashboard</h1>
              <p className="text-xs" style={{color:'#64748B'}}>Resumen de la actividad de tu asistente</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full" style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.2)',color:'#22C55E'}}>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:'#22C55E'}}></span>IA Online
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full" style={{background:'rgba(255,255,255,0.05)',border:'1px solid #243145',color:'#94A3B8'}}>
                ⚡ WhatsApp Activo
              </span>
              <span className="text-xs px-2.5 py-1 rounded-full" style={{background:'rgba(255,255,255,0.05)',border:'1px solid #243145',color:'#64748B'}}>
                Sync: hace 2min
              </span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg transition-all" style={{color:'#64748B'}}>🔔</button>
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{background:'rgba(11,107,75,0.2)',color:'#22C55E'}}>
                {user?.firstName?.[0] || 'U'}
              </div>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 px-4 md:px-6 xl:px-8 py-5 pb-24 lg:pb-8 space-y-4 w-full max-w-6xl mx-auto">

            {/* Mobile header */}
            <div className="lg:hidden">
              <h1 className="text-2xl font-black tracking-tight mb-3" style={{color:'#F8FAFC'}}>Dashboard</h1>
              <div className="flex gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full" style={{background:'rgba(34,197,94,0.1)',border:'1px solid rgba(34,197,94,0.2)',color:'#22C55E'}}>
                  <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{background:'#22C55E'}}></span>IA Online
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full" style={{background:'rgba(255,255,255,0.05)',border:'1px solid #243145',color:'#94A3B8'}}>
                  ⚡ WhatsApp Activo
                </span>
              </div>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {kpis.map((kpi, i) => (
                <div key={i} className="card p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base">{kpi.icon}</span>
                    <span className="text-xs font-semibold" style={{color:'#22C55E'}}>↑ {kpi.delta}</span>
                  </div>
                  <p className="text-xs font-medium mb-1 uppercase tracking-wider" style={{color:'#64748B'}}>{kpi.label}</p>
                  <p className="text-2xl font-black tracking-tight" style={{color:'#F8FAFC'}}>{kpi.value}</p>
                  <p className="text-xs mt-1" style={{color:'#475569'}}>{kpi.sub}</p>
                </div>
              ))}
            </div>

            {/* Chart + AI Brain */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="card p-5 lg:col-span-2">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-sm font-semibold" style={{color:'#F8FAFC'}}>Actividad Semanal</p>
                    <p className="text-xs mt-0.5" style={{color:'#64748B'}}>Mensajes gestionados por la IA</p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-lg" style={{background:'rgba(255,255,255,0.05)',border:'1px solid #243145',color:'#94A3B8'}}>Últimos 7 días</span>
                </div>
                <div className="flex items-end gap-1.5 h-28 w-full">
                  {chartBars.map((bar, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 min-w-0 relative bar-wrap" onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}>
                      <div className="bar-tooltip">{bar.v} msgs</div>
                      <div
                        className="w-full rounded-md transition-all duration-200"
                        style={{
                          height: `${bar.h}%`,
                          background: i === 3 || hoveredBar === i ? '#0B6B4B' : 'rgba(34,197,94,0.15)',
                          border: hoveredBar === i ? '1px solid #22C55E' : '1px solid transparent',
                        }}
                      ></div>
                      <span className="text-xs" style={{color:'#475569'}}>{days[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Brain */}
              <div className="card p-5 flex flex-col" style={{background:'#0D1F2D',borderColor:'rgba(11,107,75,0.3)'}}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0" style={{background:'rgba(11,107,75,0.2)',border:'1px solid rgba(11,107,75,0.4)'}}>🧠</div>
                  <div>
                    <p className="text-sm font-bold" style={{color:'#F8FAFC'}}>Cerebro de la IA</p>
                    <p className="text-xs" style={{color:'#22C55E'}}>98.2% de precisión</p>
                  </div>
                </div>
                <p className="text-sm leading-relaxed mb-4 flex-1" style={{color:'#94A3B8'}}>
                  La IA ha optimizado 4 flujos de venta hoy sin requerir intervención manual.
                </p>
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[{v:'24',l:'FAQs'},{v:'142',l:'Productos'},{v:'24/7',l:'Horario'}].map((item,i)=>(
                    <div key={i} className="text-center p-2 rounded-lg" style={{background:'rgba(255,255,255,0.04)',border:'1px solid #243145'}}>
                      <p className="text-sm font-bold" style={{color:'#22C55E'}}>{item.v}</p>
                      <p className="text-xs" style={{color:'#64748B'}}>{item.l}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full py-2.5 rounded-lg text-sm font-semibold transition-all" style={{background:'rgba(11,107,75,0.15)',border:'1px solid rgba(11,107,75,0.4)',color:'#22C55E'}}>
                  Administrar conocimiento
                </button>
              </div>
            </div>

            {/* Chat simulator */}
            <div className="card overflow-hidden">
              <div className="px-5 pt-4 pb-3" style={{borderBottom:'1px solid #1E2D42'}}>
                <p className="text-sm font-semibold" style={{color:'#F8FAFC'}}>Simulador de Chat</p>
                <p className="text-xs mt-0.5" style={{color:'#64748B'}}>Prueba cómo responde tu IA</p>
              </div>
              <div className="px-5 py-4">
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl mb-4" style={{background:'#0B6B4B'}}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-sm flex-shrink-0" style={{background:'rgba(255,255,255,0.2)'}}>👤</div>
                  <span className="text-sm font-medium text-white">Cliente Potencial</span>
                  <span className="ml-auto w-2 h-2 rounded-full animate-pulse" style={{background:'#86EFAC'}}></span>
                </div>
                <div className="space-y-3 min-h-28 mb-4">
                  <div className="max-w-xs">
                    <div className="px-4 py-2.5 rounded-2xl rounded-tl-sm" style={{background:'rgba(255,255,255,0.07)',border:'1px solid #243145'}}>
                      <p className="text-sm" style={{color:'#E2E8F0'}}>¿Qué precio tiene el plan SaaS avanzado?</p>
                    </div>
                    <p className="text-xs mt-1 ml-1" style={{color:'#475569'}}>09:41</p>
                  </div>
                  <div className="flex justify-end">
                    <div className="max-w-xs">
                      <div className="px-4 py-2.5 rounded-2xl rounded-tr-sm" style={{background:'#0B6B4B'}}>
                        <p className="text-sm text-white">El plan Avanzado cuesta $49/mes. Incluye IA ilimitada y 5 canales.</p>
                        <p className="text-xs text-right mt-1" style={{color:'#86EFAC'}}>VendIA · 09:42 ✓✓</p>
                      </div>
                    </div>
                  </div>
                  {isTyping && (
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0" style={{background:'rgba(11,107,75,0.2)'}}>🤖</div>
                      <div className="px-4 py-2.5 rounded-2xl rounded-tl-sm" style={{background:'rgba(255,255,255,0.07)',border:'1px solid #243145'}}>
                        <div className="dot-pulse flex items-center h-4">
                          <span></span><span></span><span></span>
                        </div>
                      </div>
                      <span className="text-xs" style={{color:'#64748B'}}>IA respondiendo...</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl" style={{background:'rgba(255,255,255,0.04)',border:'1px solid #243145'}}>
                  <input
                    className="flex-1 text-sm bg-transparent focus:outline-none min-w-0"
                    style={{color:'#94A3B8'}}
                    placeholder="Probar respuesta de la IA..."
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                  />
                  <button className="w-8 h-8 rounded-full flex items-center justify-center text-sm transition-all flex-shrink-0" style={{background:'#0B6B4B',color:'white'}}>▷</button>
                </div>
              </div>
            </div>

            {/* Chats recientes */}
            <div className="card p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-semibold" style={{color:'#F8FAFC'}}>Chats Recientes</p>
                <button className="text-xs font-medium transition-all" style={{color:'#22C55E'}}>Ver todos →</button>
              </div>
              <div className="space-y-2">
                {chats.map((chat, i) => {
                  const st = statusMap[chat.status]
                  return (
                    <div key={i} className="flex items-center gap-3 py-3 px-3 rounded-xl transition-all" style={{border:'1px solid transparent'}}>
                      <div className="relative flex-shrink-0">
                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{background:'rgba(11,107,75,0.15)',color:'#22C55E'}}>{chat.initial}</div>
                        <span className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 ${st.dot}`} style={{borderColor:'#111827'}}></span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-semibold truncate" style={{color:'#F8FAFC'}}>{chat.name}</p>
                          <span className={`text-xs font-medium flex-shrink-0 ${st.color}`}>● {st.label}</span>
                        </div>
                        <p className="text-xs truncate" style={{color:'#64748B'}}>{chat.msg}</p>
                      </div>
                      <div className="flex flex-col items-end gap-1 flex-shrink-0">
                        <span className="text-xs" style={{color:'#475569'}}>{chat.time}</span>
                        <span className="text-xs px-2 py-0.5 rounded-full" style={{background:'rgba(255,255,255,0.06)',color:'#94A3B8'}}>{chat.tag}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Timeline */}
            <div className="card p-5">
              <p className="text-sm font-semibold mb-4" style={{color:'#F8FAFC'}}>Actividad en tiempo real</p>
              <div className="space-y-0">
                {timeline.map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${item.color}`}></div>
                      {i < timeline.length - 1 && <div className="w-px flex-1 my-1" style={{background:'#1E2D42'}}></div>}
                    </div>
                    <div className="pb-4 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-mono font-semibold" style={{color:'#22C55E'}}>{item.time}</span>
                        <span className="text-sm font-medium" style={{color:'#E2E8F0'}}>{item.text}</span>
                      </div>
                      <p className="text-xs mt-0.5" style={{color:'#475569'}}>{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bot config */}
            <div className="card p-5">
              <p className="text-sm font-semibold mb-4" style={{color:'#F8FAFC'}}>Configuración del Bot</p>
              <div className="space-y-3">
                {[
                  { label: 'Nombre del bot', key: 'botName', placeholder: 'Ej: Asistente VendIA', multiline: false },
                  { label: 'Descripción del negocio', key: 'businessContext', placeholder: 'Describe tu negocio...', multiline: true },
                  { label: 'Catálogo', key: 'catalog', placeholder: 'Lista tus productos o servicios...', multiline: true },
                  { label: 'Preguntas frecuentes', key: 'faq', placeholder: '¿Cuáles son sus horarios?...', multiline: true },
                ].map((field) => (
                  <div key={field.key}>
                    <label className="text-xs font-medium block mb-1.5" style={{color:'#64748B'}}>{field.label}</label>
                    {field.multiline ? (
                      <textarea
                        className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none h-20 resize-none transition-all"
                        style={{background:'rgba(255,255,255,0.04)',border:'1px solid #243145',color:'#E2E8F0'}}
                        placeholder={field.placeholder}
                        value={config[field.key as keyof typeof config]}
                        onChange={e => setConfig({...config, [field.key]: e.target.value})}
                      />
                    ) : (
                      <input
                        className="w-full px-3 py-2.5 rounded-lg text-sm focus:outline-none transition-all"
                        style={{background:'rgba(255,255,255,0.04)',border:'1px solid #243145',color:'#E2E8F0'}}
                        placeholder={field.placeholder}
                        value={config[field.key as keyof typeof config]}
                        onChange={e => setConfig({...config, [field.key]: e.target.value})}
                      />
                    )}
                  </div>
                ))}
                <button
                  onClick={saveConfig}
                  disabled={saving}
                  className="w-full py-3 rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
                  style={{background:'#0B6B4B',color:'white'}}
                >
                  {saving ? 'Guardando...' : saved ? '✓ Guardado correctamente' : 'Guardar configuración'}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-30" style={{background:'#0D1526',borderTop:'1px solid #1E2D42'}}>
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setMobileNav(item.key)}
              className="flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-all"
              style={mobileNav === item.key ? {color:'#22C55E'} : {color:'#475569'}}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* FAB mobile */}
      <button className="lg:hidden fixed bottom-20 right-4 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-xl z-20 transition-all" style={{background:'#0B6B4B',color:'white'}}>
        +
      </button>

    </div>
  )
}
