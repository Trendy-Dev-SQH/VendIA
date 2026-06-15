'use client'
import { useUser } from '@clerk/nextjs'
import { useState, useEffect } from 'react'
import axios from 'axios'

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export default function Conversations() {
  const { user } = useUser()
  const [businessId, setBusinessId] = useState(null)
  const [conversations, setConversations] = useState([])
  const [selected, setSelected] = useState(null)
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

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
      } catch {
        res = await axios.get(API + '/api/business/email/' + user.primaryEmailAddress?.emailAddress)
      }
      setBusinessId(res.data.id)
      loadConversations(res.data.id)
    } catch (err) {
      console.error(err)
    }
  }

  async function loadConversations(bid) {
    try {
      const res = await axios.get(API + '/api/business/' + bid + '/conversations')
      setConversations(res.data)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  async function selectConversation(conv) {
    setSelected(conv)
    try {
      const res = await axios.get(API + '/api/business/' + businessId + '/conversations/' + conv.id + '/messages')
      setMessages(res.data)
    } catch (err) {
      console.error(err)
    }
  }

  function statusLabel(status) {
    if (status === 'BOT_ACTIVE') return { label: 'Bot activo', color: 'bg-green-100 text-green-700' }
    if (status === 'HUMAN_TAKEOVER') return { label: 'Humano', color: 'bg-yellow-100 text-yellow-700' }
    return { label: 'Cerrada', color: 'bg-gray-100 text-gray-500' }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">VendIA</div>
        <div className="flex gap-4 text-sm">
          <a href="/dashboard" className="text-gray-500 hover:text-black">Dashboard</a>
          <a href="/dashboard/conversations" className="font-semibold text-black">Conversaciones</a>
        </div>
        <div className="text-sm text-gray-600">Hola {user?.firstName}</div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-10 flex gap-6 h-[calc(100vh-73px)]">
        {/* Lista */}
        <div className="w-80 bg-white rounded-2xl border overflow-y-auto">
          <div className="p-4 border-b font-semibold text-sm">
            Conversaciones ({conversations.length})
          </div>
          {loading && <div className="p-4 text-sm text-gray-400">Cargando...</div>}
          {!loading && conversations.length === 0 && (
            <div className="p-4 text-sm text-gray-400">Sin conversaciones aún</div>
          )}
          {conversations.map(conv => {
            const { label, color } = statusLabel(conv.status)
            const lastMsg = conv.messages?.[0]
            return (
              <div
                key={conv.id}
                onClick={() => selectConversation(conv)}
                className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selected?.id === conv.id ? 'bg-purple-50' : ''}`}
              >
                <div className="flex justify-between items-start mb-1">
                  <div className="font-medium text-sm">{conv.contact.name || conv.contact.phone}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${color}`}>{label}</span>
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {lastMsg ? lastMsg.content : 'Sin mensajes'}
                </div>
                <div className="text-xs text-gray-300 mt-1">
                  {new Date(conv.lastMsgAt).toLocaleString('es-CO')}
                </div>
              </div>
            )
          })}
        </div>

        {/* Mensajes */}
        <div className="flex-1 bg-white rounded-2xl border flex flex-col">
          {!selected ? (
            <div className="flex-1 flex items-center justify-center text-gray-400 text-sm">
              Selecciona una conversación
            </div>
          ) : (
            <>
              <div className="p-4 border-b flex justify-between items-center">
                <div>
                  <div className="font-semibold">{selected.contact.name || selected.contact.phone}</div>
                  <div className="text-xs text-gray-400">{selected.contact.phone}</div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${statusLabel(selected.status).color}`}>
                  {statusLabel(selected.status).label}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map(msg => (
                  <div key={msg.id} className={`flex ${msg.role === 'USER' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-xs px-4 py-2 rounded-2xl text-sm ${
                      msg.role === 'USER'
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-purple-600 text-white'
                    }`}>
                      {msg.content}
                      <div className={`text-xs mt-1 ${msg.role === 'USER' ? 'text-gray-400' : 'text-purple-200'}`}>
                        {new Date(msg.createdAt).toLocaleTimeString('es-CO')}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
