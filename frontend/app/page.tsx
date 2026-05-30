import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans">

      {/* Nav */}
      <nav className="flex justify-between items-center px-16 py-5 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="text-2xl font-black tracking-tight">Vend<span className="text-emerald-600">IA</span></div>
        <div className="flex gap-8 items-center">
          <a href="#funciones" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Funciones</a>
          <a href="#precios" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Precios</a>
          <Link href="/sign-in" className="text-sm text-gray-700 hover:text-gray-900 transition-colors">Iniciar sesión</Link>
          <Link href="/sign-up" className="text-sm bg-emerald-700 text-white px-5 py-2.5 rounded-full hover:bg-emerald-600 transition-colors font-medium">Empezar gratis</Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-16 py-28 grid grid-cols-2 gap-16 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
            Nuevo · VendIA 2026
          </div>
          <h1 className="text-6xl font-black leading-none tracking-tighter text-gray-950 mb-5">
            Vende más en<br />WhatsApp con{' '}
            <span className="text-emerald-600">IA 24/7</span>
          </h1>
          <p className="text-lg text-gray-500 leading-relaxed mb-8 font-light max-w-md">
            Tu bot inteligente responde clientes, resuelve dudas y cierra ventas mientras duermes. Setup en 10 minutos, sin código.
          </p>
          <div className="flex gap-4 items-center">
            <Link href="/sign-up" className="bg-emerald-700 text-white px-7 py-3.5 rounded-full text-base hover:bg-emerald-600 transition-colors font-medium">
              Empieza gratis →
            </Link>
            <a href="#funciones" className="text-sm text-gray-700 hover:text-emerald-600 transition-colors font-medium">
              Ver funciones ▸
            </a>
          </div>
          <div className="flex items-center gap-3 mt-8">
            <div className="flex">
              {['JM','AC','PR','+'].map((i, idx) => (
                <div key={idx} className="w-7 h-7 rounded-full border-2 border-white -ml-1.5 first:ml-0 bg-emerald-50 flex items-center justify-center text-xs font-semibold text-emerald-700">{i}</div>
              ))}
            </div>
            <p className="text-xs text-gray-400">+200 negocios ya usan VendIA</p>
          </div>
        </div>

        {/* Mockup */}
        <div className="bg-gray-950 rounded-2xl p-6 shadow-2xl">
          <div className="flex gap-1.5 mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          <div className="flex gap-3 mb-4 items-end">
            <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-xs flex-shrink-0">🤖</div>
            <div className="bg-gray-800 text-gray-200 px-3 py-2 rounded-xl rounded-bl-sm text-xs leading-relaxed max-w-xs">
              ¡Hola! Soy el asistente de <strong>TiendaMax</strong>. ¿En qué te puedo ayudar hoy? 😊
            </div>
          </div>
          <div className="flex justify-end mb-4">
            <div className="bg-emerald-600 text-white px-3 py-2 rounded-xl rounded-br-sm text-xs max-w-xs">
              ¿Tienen zapatillas Nike talla 42?
            </div>
          </div>
          <div className="flex gap-3 mb-4 items-end">
            <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-xs flex-shrink-0">🤖</div>
            <div className="bg-gray-800 text-gray-200 px-3 py-2 rounded-xl rounded-bl-sm text-xs leading-relaxed max-w-xs">
              ¡Sí tenemos! Nike Air Max 270 talla 42 a $180.000. ¿Te la reservo? 🎉
            </div>
          </div>
          <div className="flex justify-end mb-4">
            <div className="bg-emerald-600 text-white px-3 py-2 rounded-xl rounded-br-sm text-xs">
              ¿Hacen domicilios?
            </div>
          </div>
          <div className="flex gap-3 items-end mb-4">
            <div className="w-7 h-7 rounded-full bg-emerald-600 flex items-center justify-center text-xs flex-shrink-0">🤖</div>
            <div className="bg-gray-800 px-3 py-2 rounded-xl rounded-bl-sm flex gap-1 items-center">
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce"></span>
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-bounce [animation-delay:0.4s]"></span>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-4 grid grid-cols-3 gap-2 text-center">
            <div><p className="text-emerald-500 font-bold text-sm">3×</p><p className="text-gray-500 text-xs">más ventas</p></div>
            <div><p className="text-emerald-500 font-bold text-sm">24/7</p><p className="text-gray-500 text-xs">disponible</p></div>
            <div><p className="text-emerald-500 font-bold text-sm">10min</p><p className="text-gray-500 text-xs">setup</p></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 py-20 px-16" id="funciones">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-medium text-emerald-700 uppercase tracking-widest mb-3">Funcionalidades</p>
          <h2 className="text-4xl font-black tracking-tight mb-12 max-w-md leading-tight">Todo lo que necesita tu negocio</h2>
          <div className="grid grid-cols-3 gap-6">
            {[
              { icon: '🧠', title: 'IA con contexto de tu negocio', desc: 'El bot aprende tu catálogo, precios y políticas para responder como un vendedor experto.' },
              { icon: '⚡', title: 'Respuestas instantáneas', desc: 'Nunca más un cliente sin respuesta. El bot actúa en segundos, las 24 horas del día.' },
              { icon: '📊', title: 'Dashboard en tiempo real', desc: 'Ve conversaciones activas, métricas de ventas y el rendimiento de tu bot desde un solo lugar.' },
              { icon: '🔧', title: 'Setup sin código', desc: 'Conecta tu WhatsApp Business y configura el bot en menos de 10 minutos. Sin técnicos.' },
              { icon: '💬', title: 'Toma de control humano', desc: 'Cuando el bot no puede ayudar, transfiere la conversación a un agente humano al instante.' },
              { icon: '🔒', title: 'Seguro y confiable', desc: 'Tus datos y los de tus clientes están protegidos con los más altos estándares de seguridad.' },
            ].map((f, i) => (
              <div key={i} className="bg-white rounded-xl p-7 border border-gray-100">
                <div className="w-11 h-11 bg-emerald-50 rounded-xl flex items-center justify-center text-xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-sm mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 px-16 max-w-6xl mx-auto" id="precios">
        <div className="text-center mb-12">
          <p className="text-xs font-medium text-emerald-700 uppercase tracking-widest mb-3">Precios</p>
          <h2 className="text-4xl font-black tracking-tight">Simple y transparente</h2>
        </div>
        <div className="grid grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="border border-gray-200 rounded-2xl p-8">
            <p className="font-bold mb-1">Beta</p>
            <p className="text-5xl font-black tracking-tight mb-1">Gratis</p>
            <p className="text-xs text-gray-400 mb-6">por tiempo limitado</p>
            <ul className="space-y-2 mb-7">
              {['1 número de WhatsApp','300 conversaciones/mes','Dashboard básico','IA con tu catálogo'].map((f,i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-4 h-4 bg-emerald-50 rounded-full flex items-center justify-center text-xs text-emerald-700 flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/sign-up" className="block text-center py-3 rounded-full text-sm font-medium border-2 border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white transition-colors">
              Empezar gratis
            </Link>
          </div>
          <div className="border-2 border-emerald-600 rounded-2xl p-8 relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-xs font-medium px-4 py-1 rounded-full whitespace-nowrap">Más popular</span>
            <p className="font-bold mb-1">Pro</p>
            <p className="text-5xl font-black tracking-tight mb-1"><sup className="text-xl">$</sup>49</p>
            <p className="text-xs text-gray-400 mb-6">por mes · USD</p>
            <ul className="space-y-2 mb-7">
              {['3 números de WhatsApp','Conversaciones ilimitadas','Dashboard avanzado','Soporte prioritario'].map((f,i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="w-4 h-4 bg-emerald-50 rounded-full flex items-center justify-center text-xs text-emerald-700 flex-shrink-0">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Link href="/sign-up" className="block text-center py-3 rounded-full text-sm font-medium bg-emerald-700 text-white hover:bg-emerald-600 transition-colors">
              Empezar con Pro
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gray-950 py-20 px-16 text-center">
        <h2 className="text-4xl font-black text-white tracking-tight mb-4">¿Listo para vender más?</h2>
        <p className="text-gray-400 mb-8">Únete a los negocios que ya están usando VendIA para crecer.</p>
        <Link href="/sign-up" className="inline-block bg-emerald-600 text-white px-8 py-4 rounded-full text-base font-medium hover:bg-emerald-500 transition-colors">
          Empieza gratis hoy →
        </Link>
      </section>

      {/* Footer */}
      <footer className="px-16 py-6 border-t border-gray-100 flex justify-between items-center">
        <div className="text-xl font-black tracking-tight">Vend<span className="text-emerald-600">IA</span></div>
        <p className="text-xs text-gray-400">© 2026 VendIA · Todos los derechos reservados</p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-gray-400 hover:text-gray-700">Términos</a>
          <a href="#" className="text-xs text-gray-400 hover:text-gray-700">Privacidad</a>
          <a href="#" className="text-xs text-gray-400 hover:text-gray-700">Contacto</a>
        </div>
      </footer>

    </main>
  )
}
