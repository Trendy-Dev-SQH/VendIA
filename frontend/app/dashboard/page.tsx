'use client'
import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import axios from 'axios'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

const NAV_ITEMS = [
  { icon: '⊞', label: 'Dashboard', active: true },
  { icon: '≡', label: 'Conversaciones' },
  { icon: '📖', label: 'Base de Conocimiento' },
  { icon: '👥', label: 'Clientes' },
  { icon: '⚙', label: 'Configuración' },
]

export default function Dashboard() {
  const { user } = useUser()
  const [businessId, setBusinessId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [stats, setStats] = useState({ totalConversations: 0, activeConversations: 0, totalMessages: 0, botHandledRate: 0 })
  const [config, setConfig] = useState({ botName: '', businessContext: '', catalog: '', faq: '' })

  useEffect(() => {
    if (!user) {
      window.location.href = '/sign-in'
      return
    }
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
      } catch (e) {
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
      const statsRes = await axios.get(API + '/api/business/' + res.data.id + '/stats')
      setStats(statsRes.data)
    } catch (err) {
      console.error(err)
    }
  }

  async function saveConfig() {
    if (!businessId) return
    setSaving(true)
    try {
      await axios.put(API + '/api/business/' + businessId + '/bot-config', config)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      console.error(err)
    }
    setSaving(false)
  }

  const kpis = [
    { label: 'Conversaciones', value: stats.totalConversations.toLocaleString(), delta: '+12%', icon: '💬', up: true },
    { label: 'Activas', value: stats.activeConversations.toString(), delta: '+5%', icon: '⚡', up: true },
    { label: 'Mensajes procesados', value: stats.totalMessages > 1000 ? (stats.totalMessages/1000).toFixed(1)+'k' : stats.totalMessages.toString(), delta: '~2%', icon: '📨', up: false },
    { label: 'Resolución IA', value: stats.botHandledRate + '%', delta: '+8%', icon: '✅', up: true },
  ]

  const activity = [
    { time: '10:27', text: 'Cliente solicitó información sobre planes', quote: '"Hola, ¿cuáles son sus precios?"', dot: 'bg-emerald-500' },
    { time: '10:24', text: 'IA respondió exitosamente', tag: 'Categorizado: Ventas', dot: 'bg-emerald-500' },
    { time: '10:15', text: 'Sesión iniciada: Carlos Ruiz', dot: 'bg-gray-300' },
  ]

  const chartBars = [40, 55, 35, 80, 95, 70, 30]
  const days = ['L','M','X','J','V','S','D']

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">

      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-gray-100 flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-700 rounded-lg flex items-center justify-center text-white text-sm font-bold">V</div>
            <div>
              <p className="text-sm font-bold text-gray-900 leading-tight">VendIA</p>
              <p className="text-xs text-gray-400">SaaS de Automatización</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <button key={item.label} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${item.active ? 'bg-emerald-50 text-emerald-700 font-medium' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}>
              <span className="text-base">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
        <div className="px-3 pb-4 space-y-1">
          <button className="w-full flex items-center gap-2 bg-emerald-700 text-white px-3 py-2.5 rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors">
            <span>+</span> Conectar WhatsApp
          </button>
          <div className="flex items-center gap-2 px-3 py-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-xs text-gray-400">Estado de Conexión</span>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Topbar */}
        <header className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <h1 className="text-xl font-bold text-gray-900 leading-tight">Dashboard</h1>
            <p className="text-sm text-gray-400">Resumen de la actividad de tu asistente</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Estado IA: Activo
            </span>
            <span className="inline-flex items-center gap-1.5 bg-gray-50 border border-gray-100 text-gray-600 text-xs font-medium px-3 py-1.5 rounded-full">
              ⚡ WhatsApp: Conectado
            </span>
            <button className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-700 rounded-lg hover:bg-gray-50">🔔</button>
            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-xs font-semibold text-emerald-700">
              {user?.firstName?.[0] || 'U'}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-auto px-8 py-6">

          {/* KPIs */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            {kpis.map((kpi, i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-xl p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg">{kpi.icon}</span>
                  <span className={`text-xs font-medium ${kpi.up ? 'text-emerald-600' : 'text-gray-400'}`}>{kpi.delta} {kpi.up ? '↑' : '—'}</span>
                </div>
                <p className="text-xs text-gray-400 mb-1">{kpi.label}</p>
                <p className="text-2xl font-black text-gray-900 tracking-tight">{kpi.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-3 gap-4 mb-6">

            {/* Chart */}
            <div className="col-span-2 bg-white border border-gray-100 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="font-semibold text-gray-900 text-sm">Actividad Semanal</p>
                  <p className="text-xs text-gray-400 mt-0.5">Mensajes gestionados por la IA</p>
                </div>
                <div className="flex gap-1">
                  <button className="px-3 py-1.5 text-xs bg-gray-900 text-white rounded-lg font-medium">7 Días</button>
                  <button className="px-3 py-1.5 text-xs text-gray-500 rounded-lg hover:bg-gray-50 font-medium">30 Días</button>
                </div>
              </div>
              <div className="flex items-end gap-2 h-32">
                {chartBars.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div className={`w-full rounded-md transition-all ${i === 4 ? 'bg-emerald-700' : 'bg-emerald-100'}`} style={{height: `${h}%`}}></div>
                    <span className="text-xs text-gray-400">{days[i]}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge base */}
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <p className="font-semibold text-gray-900 text-sm">Base de Conocimiento</p>
                <button className="text-xs text-emerald-700 font-medium hover:underline">Editar</button>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-white border border-gray-100 rounded-lg flex items-center justify-center text-sm">📋</div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Catálogo Principal</p>
                    <p className="text-xs text-gray-400">Última sinc: Hace 2h</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Horario</p>
                    <p className="text-xs font-semibold text-gray-900">24/7 Activo</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 mb-0.5">Productos</p>
                    <p className="text-xs font-semibold text-gray-900">142 items</p>
                  </div>
                </div>
              </div>

              {/* Bot config quick edit */}
              <div className="space-y-2">
                <input
                  className="w-full text-xs border border-gray-100 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:border-emerald-300"
                  placeholder="Nombre del bot"
                  value={config.botName}
                  onChange={e => setConfig({...config, botName: e.target.value})}
                />
                <textarea
                  className="w-full text-xs border border-gray-100 rounded-lg px-3 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:border-emerald-300 h-16 resize-none"
                  placeholder="Descripción del negocio"
                  value={config.businessContext}
                  onChange={e => setConfig({...config, businessContext: e.target.value})}
                />
                <button
                  onClick={saveConfig}
                  disabled={saving}
                  className="w-full bg-emerald-700 text-white text-xs font-semibold py-2 rounded-lg hover:bg-emerald-600 transition-colors disabled:opacity-50"
                >
                  {saving ? 'Guardando...' : saved ? '✓ Guardado' : 'Guardar configuración'}
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">

            {/* Activity feed */}
            <div className="col-span-2 bg-white border border-gray-100 rounded-xl p-6">
              <p className="font-semibold text-gray-900 text-sm mb-4">Actividad en tiempo real</p>
              <div className="space-y-4">
                {activity.map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${item.dot}`}></div>
                      {i < activity.length - 1 && <div className="w-px flex-1 bg-gray-100 mt-1"></div>}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-xs font-medium text-gray-900">{item.time}</span>
                        <span className="text-xs text-gray-500">{item.text}</span>
                      </div>
                      {item.quote && <p className="text-xs text-gray-400 italic">{item.quote}</p>}
                      {item.tag && <span className="inline-block mt-1 text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">{item.tag}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI preview */}
            <div className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-sm">👁</span>
                <p className="font-semibold text-gray-900 text-sm">Vista Previa IA</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 space-y-2 mb-3 min-h-40">
                <div className="bg-white border border-gray-100 rounded-xl rounded-tl-sm px-3 py-2 max-w-48 shadow-sm">
                  <p className="text-xs text-gray-700">¿Tienen stock del modelo Pro X en color verde bosque?</p>
                  <p className="text-xs text-gray-400 text-right mt-1">09:41</p>
                </div>
                <div className="flex justify-end">
                  <div className="bg-emerald-100 rounded-xl rounded-tr-sm px-3 py-2 max-w-48">
                    <p className="text-xs text-emerald-900">¡Hola! Sí, actualmente tenemos 5 unidades disponibles del Pro X Verde Bosque. ¿Te gustaría que reserve una para ti o prefieres pasar por la tienda?</p>
                    <p className="text-xs text-emerald-600 text-right mt-1">09:42 ✓✓</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-gray-50 border border-gray-100 rounded-xl px-3 py-2">
                <input className="flex-1 text-xs bg-transparent text-gray-500 focus:outline-none" placeholder="Escribe una respuesta..." />
                <button className="text-gray-300 hover:text-gray-500 text-sm">📎</button>
                <button className="text-gray-300 hover:text-gray-500 text-sm">🎤</button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
