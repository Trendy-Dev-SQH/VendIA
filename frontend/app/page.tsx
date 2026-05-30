import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-950 text-white">

      {/* Nav */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-4 border-b border-gray-800 sticky top-0 bg-gray-950/95 backdrop-blur z-50">
        <div className="text-xl font-black tracking-tight">Vend<span className="text-emerald-400">IA</span></div>
        <div className="flex gap-3 md:gap-6 items-center">
          <Link href="/sign-in" className="text-sm text-gray-400 hover:text-white transition-colors hidden md:block">Iniciar sesión</Link>
          <Link href="/sign-up" className="text-sm bg-emerald-500 text-white px-4 py-2 rounded-full hover:bg-emerald-400 transition-colors font-medium">
            Get started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-16 pt-16 md:pt-24 pb-12 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium px-3 py-1.5 rounded-full mb-6">
              BETA ABIERTA
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-none tracking-tight mb-6">
              Tu negocio responde WhatsApp incluso cuando no estás disponible.
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Atiende clientes, resuelve dudas y agenda citas automáticamente. Sin que lo tengas que tocar el teléfono.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Link href="/sign-up" className="bg-emerald-500 text-white px-6 py-3.5 rounded-xl text-base font-semibold hover:bg-emerald-400 transition-colors text-center">
                Empieza a automatizar gratis
              </Link>
            </div>
            <p className="text-xs text-gray-600">No requiere tarjeta de crédito</p>
          </div>

          {/* Phone mockup */}
          <div className="flex justify-center md:justify-end">
            <div className="w-64 bg-gray-900 rounded-3xl border border-gray-700 overflow-hidden shadow-2xl">
              <div className="bg-gray-800 px-4 py-3 flex items-center gap-3 border-b border-gray-700">
                <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-xs">🤖</div>
                <div>
                  <p className="text-xs font-semibold">Asistente IA</p>
                  <p className="text-xs text-emerald-400">● En línea</p>
                </div>
              </div>
              <div className="p-4 space-y-3 min-h-64">
                <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 max-w-48">
                  <p className="text-xs text-gray-200">¡Hola! Bienvenido/a a Repostería El Sol. ¿En qué te puedo ayudar?</p>
                </div>
                <div className="flex justify-end">
                  <div className="bg-emerald-600 rounded-2xl rounded-tr-sm px-3 py-2 max-w-40">
                    <p className="text-xs">¿Tienen tortas de chocolate para el jueves?</p>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 max-w-48">
                  <p className="text-xs text-gray-200">¡Sí! ¿Nos pides 2 medianas o 1 grande? ¿Quieres la de chocolate suizo? 🍫</p>
                </div>
                <div className="flex justify-end">
                  <div className="bg-emerald-600 rounded-2xl rounded-tr-sm px-3 py-2 max-w-32">
                    <p className="text-xs">Sí, por favor</p>
                  </div>
                </div>
                <div className="bg-gray-800 rounded-2xl rounded-tl-sm px-3 py-2 max-w-48">
                  <p className="text-xs text-gray-200">¡Perfecto! Tu pedido está confirmado para el jueves 🎉</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="px-6 md:px-16 py-16 md:py-24 max-w-4xl mx-auto text-center">
        <div className="w-12 h-12 bg-gray-800 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-8">🚫</div>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
          No pierdas más ventas por no contestar a tiempo.
        </h2>
        <p className="text-gray-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
          Los clientes esperan una respuesta en menos de 5 minutos. Si tardas más, ya se han ido a la competencia.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-xl mx-auto text-left">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <p className="text-emerald-400 text-xl mb-2">✓</p>
            <p className="font-semibold mb-1">Atención 24/7 sin contratar personal adicional</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
            <p className="text-emerald-400 text-xl mb-2">✓</p>
            <p className="font-semibold mb-1">Respuestas instantáneas que cierran ventas</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-16 py-16 md:py-24 bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center mb-12">Cómo funciona VendIA</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { num: '01', title: 'Conecta tu número', desc: 'Escanea el código QR y vincula tu WhatsApp Business en menos de 60 segundos.' },
              { num: '02', title: 'Define tus reglas', desc: 'Configura tu catálogo, horarios de atención y el tono de voz de "Estética Aura" o tu negocio.' },
              { num: '03', title: 'VendIA toma el control', desc: 'Su IA empieza a vender, agendar y filtrar prospectos mientras tú te enfocas en lo importante.' },
            ].map((step, i) => (
              <div key={i} className="bg-gray-800 rounded-2xl p-6">
                <p className="text-emerald-400 text-sm font-bold mb-3">{step.num}</p>
                <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="px-6 md:px-16 py-16 md:py-24 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-center mb-12">Control total sin esfuerzo</h2>
        <p className="text-center text-gray-400 mb-10">Mira cuántos clientes has atendido hoy desde un panel minimalista.</p>
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 grid sm:grid-cols-3 gap-8 text-center mb-6">
          <div>
            <p className="text-4xl font-black text-white mb-1">142</p>
            <p className="text-xs text-gray-500">Mensajes respondidos</p>
            <p className="text-emerald-400 text-xs mt-1">↑ 12%</p>
          </div>
          <div>
            <p className="text-4xl font-black text-white mb-1">18</p>
            <p className="text-xs text-gray-500">Citas agendadas</p>
            <p className="text-emerald-400 text-xs mt-1">Hoy</p>
          </div>
          <div>
            <p className="text-4xl font-black text-emerald-400 mb-1">98%</p>
            <p className="text-xs text-gray-500">Tasa de respuesta</p>
            <p className="text-emerald-400 text-xs mt-1">↑ vs ayer</p>
          </div>
        </div>
        <div className="bg-gray-900 border border-emerald-500/30 rounded-xl p-4 flex items-center gap-3">
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse flex-shrink-0"></div>
          <p className="text-sm text-gray-300"><span className="text-emerald-400 font-medium">Última cita confirmada:</span> "Cita confirmada para Corte de Dama · Sábado 10:00 AM"</p>
        </div>
      </section>

      {/* Target */}
      <section className="px-6 md:px-16 py-16 bg-gray-900">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-8">Ideal para negocios locales</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Cafeterías','Estéticas','Tiendas locales','Consultores','Servicios','Restaurantes','Clínicas'].map((cat, i) => (
              <span key={i} className="bg-gray-800 border border-gray-700 text-gray-300 text-sm px-4 py-2 rounded-full">{cat}</span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-2xl mx-auto bg-emerald-500 rounded-3xl p-10 md:p-14 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-gray-950 tracking-tight mb-4">
            ¿Listo para delegar tu WhatsApp?
          </h2>
          <p className="text-emerald-900 mb-8 text-lg">Empieza gratis. Sin tarjeta. En 5 minutos.</p>
          <Link href="/sign-up" className="inline-block bg-gray-950 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-gray-800 transition-colors">
            Empieza a automatizar gratis
          </Link>
          <p className="text-emerald-800 text-xs mt-4">Instalación guiada en 5 minutos</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-6 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xl font-black tracking-tight">Vend<span className="text-emerald-400">IA</span></div>
        <p className="text-xs text-gray-600">© 2026 VendIA · Todos los derechos reservados</p>
        <div className="flex gap-6">
          <a href="#" className="text-xs text-gray-600 hover:text-gray-400">Términos</a>
          <a href="#" className="text-xs text-gray-600 hover:text-gray-400">Privacidad</a>
          <a href="#" className="text-xs text-gray-600 hover:text-gray-400">Contacto</a>
        </div>
      </footer>

    </main>
  )
}
