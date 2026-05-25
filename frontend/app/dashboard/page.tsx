'use client'
import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import axios from 'axios'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export default function Dashboard() {
  const { user } = useUser()
  const [businessId, setBusinessId] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [stats, setStats] = useState({ totalConversations: 0, activeConversations: 0, totalMessages: 0, botHandledRate: 0 })
  const [config, setConfig] = useState({ botName: '', businessContext: '', catalog: '', faq: '' })

  useEffect(() => {
    if (!user) return
    initBusiness()
  }, [user])

  async function initBusiness() {
    try {
      let res
      try {
        res = await axios.post(API + '/api/business', {
          name: user.fullName || 'Mi Negocio',
          ownerEmail: user.primaryEmailAddress?.emailAddress,
          ownerName: user.fullName || 'Dueno',
        })
      } catch (e) {
        res = await axios.get(API + '/api/business/email/' + user.primaryEmailAddress?.emailAddress)
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

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">VendIA</div>
        <div className="text-sm text-gray-600">Hola {user?.firstName}</div>
      </nav>
      <div className="max-w-5xl mx-auto px-8 py-10">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl p-6 border">
            <div className="text-sm text-gray-500 mb-1">Conversaciones</div>
            <div className="text-3xl font-bold">{stats.totalConversations}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border">
            <div className="text-sm text-gray-500 mb-1">Activas</div>
            <div className="text-3xl font-bold text-purple-600">{stats.activeConversations}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border">
            <div className="text-sm text-gray-500 mb-1">Mensajes</div>
            <div className="text-3xl font-bold">{stats.totalMessages}</div>
          </div>
          <div className="bg-white rounded-2xl p-6 border">
            <div className="text-sm text-gray-500 mb-1">Bot resolvio</div>
            <div className="text-3xl font-bold text-green-600">{stats.botHandledRate}%</div>
          </div>
        </div>
        <div className="bg-white rounded-2xl border p-8">
          <h2 className="text-lg font-bold mb-6">Configuracion de tu bot</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Nombre del bot</label>
              <input className="mt-1 w-full border rounded-lg px-4 py-2 text-sm" value={config.botName} onChange={e => setConfig({...config, botName: e.target.value})} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Descripcion del negocio</label>
              <textarea className="mt-1 w-full border rounded-lg px-4 py-2 text-sm h-24" value={config.businessContext} onChange={e => setConfig({...config, businessContext: e.target.value})} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Catalogo</label>
              <textarea className="mt-1 w-full border rounded-lg px-4 py-2 text-sm h-24" value={config.catalog} onChange={e => setConfig({...config, catalog: e.target.value})} />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Preguntas frecuentes</label>
              <textarea className="mt-1 w-full border rounded-lg px-4 py-2 text-sm h-24" value={config.faq} onChange={e => setConfig({...config, faq: e.target.value})} />
            </div>
            <button onClick={saveConfig} disabled={saving} className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm hover:bg-purple-700 disabled:opacity-50">
              {saving ? 'Guardando...' : saved ? 'Guardado' : 'Guardar configuracion'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}