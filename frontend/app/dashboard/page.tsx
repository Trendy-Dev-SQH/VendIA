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
  const [stats, setStats] = useState({
    totalConversations: 1284,
    activeConversations: 42,
    totalMessages: 8500,
    botHandledRate: 94,
  })
  const [config, setConfig] = useState({ botName: '', businessContext: '', catalog: '', faq: '' })

  useEffect(() => {
    if (!user) { window.location.href = '/sign-in'; return }
    initBusiness()
  }, [user])

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
      if (res.data.botConfig) {
        setConfig({
          botName: res.data.botConfig.botName || '',
          businessContext: res.data.botConfig.businessContext || '',
          catalog: res.data.botConfig.catalog || '',
          faq: res.data.botConfig.faq || '',
        })
      }
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
    { label: 'CONVERSACIONES', value: stats.totalConversations.toLocaleString(), delta: '+12%', up: true },
    { label: 'ACTIVAS', value: stats.activeConversations.toString(), delta: '+8%', up: true },
    { label: 'MENSAJES', value: stats.totalMessages >= 1000 ? (stats.totalMessages/1000).toFixed(1)+'k' : stats.totalMessages.toString(), delta: '+24%', up: true },
    { label: 'RESOLUCIÓN', value: stats.botHandledRate + '%', delta: '+2%', up: true },
  ]

  const chartBars = [30, 45, 35, 90, 55, 40, 25]
  const days = ['L','M','X','J','V','S','D']

  const navItems = [
    { key: 'inicio', icon: '⊞', label: 'Inicio' },
    { key: 'chats', icon: '💬', label: 'Chats' },
    { key: 'clientes', icon: '👥', label: 'Clientes' },
    { key: 'ajustes', icon: '⚙', label: 'Ajustes' },
  ]

  return (
    <div className="bg-gray-50 min-h-screen w-full">

      {/* Desktop sidebar + main */}
      <div className="flex w-full">

        {/* Sidebar — hidden on mobile */}
        <aside className="hidden lg:flex flex-col w-52 xl:w-56 bg-white border-r border-gray-100 min-h-screen fixed top-0 left-0 z-30">
          <div className="px-4 py-4 border-b border-gray-100 flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center text-white text-sm font-bold flex-shrink-0">V</div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">VendIA</p>
              <p className="text-xs text-gray-400 truncate">SaaS de Automatización</p>
            </div>
          </div>
          <nav className="flex-1 px-2 py-3 space-y-0.5">
            {[
              { icon: '⊞', label: 'Dashboard', active: true },
              { icon: '≡', label: 'Conversaciones' },
              { icon: '📖', label: 'Base de Conocimiento' },
              { icon: '👥', label: 'Clientes' },
              { icon: '⚙', label: 'Configuración' },
            ].map((item) => (
              <button key={item.label} className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${item.active ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
                <span>{item.icon}</span>
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </nav>
          <div className="px-2 pb-4 space-y-1">
            <button className="w-full flex items-center justify-center gap-1.5 bg-emerald-700 text-white px-3 py-2 rounded-lg text-xs font-medium hover:bg-emerald-600 transition-colors">
              + Conectar WhatsApp
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse flex-shrink-0"></span>
              <span className="text-xs text-gray-400 truncate">Estado de Conexión</span>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="w-full lg:ml-52 xl:ml-56 flex flex-col min-h-screen">

          {/* Mobile topbar */}
          <header className="lg:hidden bg-white border-b border-gray-100 px-4 py-3 flex items-center justify-between sticky top-0 z-20">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-emerald-700 rounded-md flex items-center justify-center text-white text-xs font-bold">V</div>
              <span className="font-bold text-gray-900 text-sm">VendIA</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔔</span>
              <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-semibold text-emerald-700">
                {user?.firstName?.[0] || 'U'}
              </div>
            </div>
          </header>

          {/* Desktop topbar */}
          <header className="hidden lg:flex bg-white border-b border-gray-100 px-6 xl:px-8 py-4 items-center justify-between sticky top-0 z-20">
            <div>
              <h1 className="text-lg font-bold text-gray-900">Dashboard</h1>
              <p className="text-xs text-gray-400">Resumen de la actividad de tu asistente</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> IA Online
              </span>
              <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full">
                ⚡ WhatsApp Activo
              </span>
              <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-50">🔔</button>
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-semibold text-emerald-700">
                {user?.firstName?.[0] || 'U'}
              </div>
            </div>
          </header>

          {/* Page content */}
          <div className="flex-1 px-4 md:px-6 xl:px-8 py-5 pb-24 lg:pb-8 space-y-5 max-w-6xl w-full mx-auto">

            {/* Mobile status badges */}
            <div className="lg:hidden flex gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-100 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> IA Online
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-gray-100 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-full shadow-sm">
                ⚡ WhatsApp Activo
              </span>
            </div>

            {/* Mobile title */}
            <div className="lg:hidden">
              <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard</h1>
            </div>

            {/* KPIs */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {kpis.map((kpi, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                  <p className="text-xs font-semibold text-gray-400 tracking-widest mb-2">{kpi.label}</p>
                  <p className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight mb-1">{kpi.value}</p>
                  <p className="text-xs text-emerald-600 font-medium">↑ {kpi.delta}</p>
                </div>
              ))}
            </div>

            {/* Chart + AI brain */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-5">
                  <p className="font-semibold text-gray-900 text-sm">Actividad Semanal</p>
                  <span className="text-xs text-gray-400 bg-gray-50 px-2.5 py-1 rounded-lg">Últimos 7 días</span>
                </div>
                <div className="flex items-end gap-1.5 h-28 w-full">
                  {chartBars.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1 min-w-0">
                      <div
                        className={`w-full rounded-md ${i === 3 ? 'bg-emerald-700' : 'bg-emerald-100'}`}
                        style={{height: `${h}%`}}
                      ></div>
                      <span className="text-xs text-gray-400">{days[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Brain card */}
              <div className="bg-gray-900 rounded-xl p-5 shadow-sm flex flex-col justify-between">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 bg-emerald-700 rounded-xl flex items-center justify-center text-lg flex-shrink-0">🧠</div>
                  <div>
                    <p className="text-sm font-bold text-white">Cerebro de la IA</p>
                    <p className="text-xs text-emerald-400">98.2% de precisión en respuestas</p>
                  </div>
                </div>
                <p className="text-sm text-gray-300 leading-relaxed mb-4 flex-1">
                  La IA ha optimizado 4 flujos de venta hoy sin requerir intervención manual.
                </p>
                <button className="w-full bg-white text-gray-900 text-sm font-semibold py-2.5 rounded-lg hover:bg-gray-100 transition-colors">
                  Configurar Lógica
                </button>
              </div>
            </div>

            {/* Chat simulator */}
            <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
              <div className="px-5 pt-4 pb-2">
                <p className="font-semibold text-gray-900 text-sm mb-3">Simulador de Chat</p>
                <div className="bg-emerald-700 rounded-xl px-4 py-2.5 flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-white text-sm">👤</span>
                    <span className="text-white text-sm font-medium">Cliente Potencial</span>
                  </div>
                  <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></span>
                </div>
                <div className="space-y-2 mb-3 min-h-20">
                  <div className="bg-gray-50 rounded-xl rounded-tl-sm px-4 py-2.5 max-w-xs">
                    <p className="text-sm text-gray-700">¿Qué precio tiene el plan SaaS avanzado?</p>
                  </div>
                  <div className="flex justify-end">
                    <div className="bg-emerald-700 rounded-xl rounded-tr-sm px-4 py-2.5 max-w-xs">
                      <p className="text-sm text-white">El plan Avanzado cuesta $49/mes. Incluye IA ilimitada y 5 canales.</p>
                      <p className="text-xs text-emerald-200 text-right mt-1">VendIA · 10:42 AM</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-t border-gray-100 px-4 py-3 flex items-center gap-3">
                <input className="flex-1 text-sm text-gray-500 bg-transparent focus:outline-none min-w-0" placeholder="Probar respuesta de la IA..." />
                <button className="w-8 h-8 bg-emerald-700 text-white rounded-full flex items-center justify-center text-sm hover:bg-emerald-600 transition-colors flex-shrink-0">▷</button>
              </div>
            </div>

            {/* Recent chats */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-gray-900 text-sm">Chats Recientes</p>
                <button className="text-xs text-emerald-700 font-medium hover:underline">Ver todos</button>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Marco Polo', msg: 'Interesado en integración con CRM...', time: '12 min', initial: 'M' },
                  { name: 'Elena Gómez', msg: 'Cita programada para mañana.', time: '1 hr', initial: 'E' },
                ].map((chat, i) => (
                  <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-sm font-bold text-emerald-700 flex-shrink-0">
                      {chat.initial}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900 truncate">{chat.name}</p>
                      <p className="text-xs text-gray-400 truncate">{chat.msg}</p>
                    </div>
                    <span className="text-xs text-gray-400 flex-shrink-0">{chat.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity feed */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <p className="font-semibold text-gray-900 text-sm mb-4">Actividad Reciente</p>
              <div className="space-y-4">
                {[
                  { dot: 'bg-emerald-500', text: 'Base de datos', sub: 'actualizada con 14 nuevos clientes.', time: 'HOY, 09:15 AM' },
                  { dot: 'bg-emerald-500', text: 'WhatsApp', sub: 'reconectado exitosamente.', time: 'AYER, 06:45 PM' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3 items-start">
                    <span className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.dot}`}></span>
                    <div className="min-w-0">
                      <p className="text-sm text-gray-700"><span className="font-semibold">{item.text}</span> {item.sub}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bot config */}
            <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
              <p className="font-semibold text-gray-900 text-sm mb-4">Configuración del Bot</p>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">Nombre del bot</label>
                  <input
                    className="w-full border border-gray-100 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-emerald-300"
                    value={config.botName}
                    onChange={e => setConfig({...config, botName: e.target.value})}
                    placeholder="Asistente"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">Descripción del negocio</label>
                  <textarea
                    className="w-full border border-gray-100 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-emerald-300 h-20 resize-none"
                    value={config.businessContext}
                    onChange={e => setConfig({...config, businessContext: e.target.value})}
                    placeholder="Describe tu negocio..."
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">Catálogo</label>
                  <textarea
                    className="w-full border border-gray-100 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-emerald-300 h-20 resize-none"
                    value={config.catalog}
                    onChange={e => setConfig({...config, catalog: e.target.value})}
                    placeholder="Lista tus productos o servicios..."
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 font-medium block mb-1">Preguntas frecuentes</label>
                  <textarea
                    className="w-full border border-gray-100 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:border-emerald-300 h-20 resize-none"
                    value={config.faq}
                    onChange={e => setConfig({...config, faq: e.target.value})}
                    placeholder="¿Cuáles son sus horarios? ..."
                  />
                </div>
                <button
                  onClick={saveConfig}
                  disabled={saving}
                  className="w-full bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Guardando...' : saved ? '✓ Guardado' : 'Guardar configuración'}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-30 safe-area-pb">
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setMobileNav(item.key)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${mobileNav === item.key ? 'text-emerald-700' : 'text-gray-400'}`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* FAB mobile */}
      <button className="lg:hidden fixed bottom-20 right-4 w-12 h-12 bg-emerald-700 text-white rounded-full shadow-lg flex items-center justify-center text-xl z-20 hover:bg-emerald-600 transition-colors">
        +
      </button>

    </div>
  )
}
