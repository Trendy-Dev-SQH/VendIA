import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">

      {/* Nav */}
      <nav className="flex justify-between items-center px-6 md:px-16 py-4 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur z-50">
        <div className="text-xl font-black tracking-tight text-gray-900">Vend<span className="text-emerald-700">IA</span></div>
        <div className="hidden md:flex gap-8 items-center">
          <a href="#funciones" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Funciones</a>
          <a href="#casos" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Casos de uso</a>
          <a href="#precios" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Precios</a>
          <Link href="/sign-in" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">Iniciar sesión</Link>
        </div>
        <Link href="/sign-up" className="text-sm bg-emerald-700 text-white px-5 py-2.5 rounded-full hover:bg-emerald-600 transition-colors font-medium">
          Empezar ahora
        </Link>
      </nav>

      {/* Hero */}
      <section className="px-6 md:px-16 pt-16 md:pt-24 pb-16 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-gray-950 mb-6">
              Tu negocio responde WhatsApp incluso cuando no estás disponible.
            </h1>
            <p className="text-gray-500 text-base md:text-lg leading-relaxed mb-8 max-w-md">
              VendIA responde preguntas frecuentes, captura información de tu negocio y ayuda a atender clientes automáticamente, sin la presencia de un experto en tu marca.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/sign-up" className="bg-emerald-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-600 transition-colors text-sm">
                Probar demo
              </Link>
              <a href="#funciones" className="border border-gray-200 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors text-sm">
                Ver cómo funciona
              </a>
            </div>
          </div>

          {/* Chat mockup */}
          <div className="bg-gray-50 rounded-3xl border border-gray-100 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-200">
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center text-sm">🤖</div>
              <div>
                <p className="text-sm font-semibold text-gray-900">Charly</p>
                <p className="text-xs text-emerald-600">● Disponible</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-xs shadow-sm">
                <p className="text-xs text-gray-700">Hola, ¿me puedes decir el costo de cada para mañana?</p>
              </div>
              <div className="flex justify-end">
                <div className="bg-emerald-700 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs">
                  <p className="text-xs text-white">Claro, el servicio tiene un costo de $270. ¿Te gustaría agendar una cita para mañana? Tenemos disponibilidad a las 10am y 3pm.</p>
                </div>
              </div>
              <div className="bg-white border border-gray-100 rounded-2xl rounded-tl-sm px-4 py-2.5 max-w-xs shadow-sm">
                <p className="text-xs text-gray-700">Sí, por favor</p>
              </div>
              <div className="flex justify-end">
                <div className="bg-emerald-700 rounded-2xl rounded-tr-sm px-4 py-2.5 max-w-xs">
                  <p className="text-xs text-white">Confirmado. Te esperamos mañana. ¡Confírma tu cita! ✅</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="bg-gray-50 px-6 md:px-16 py-16 md:py-24" id="funciones">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest mb-4">El desafío</p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-gray-950 mb-14">
            Atender WhatsApp no debería ser un trabajo de tiempo completo.
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: '💬', title: 'Clientes sin respuesta', desc: 'El 63% de las personas abandonan una compra si no reciben respuesta en los primeros 15 minutos.' },
              { icon: '🌙', title: 'Mensajes fuera de horario', desc: 'Tu negocio sigue generando consultas en la noche y fines de semana, pero nadie los atiende.' },
              { icon: '🔁', title: 'Consultas repetitivas', desc: 'Tu tiempo se pierde respondiendo las mismas preguntas una y otra vez a tus clientes.' },
              { icon: '📉', title: 'Pérdida de ventas', desc: 'Cada mensaje ignorado genera una venta perdida que se fue a la competencia que sí respondió.' },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 text-left shadow-sm">
                <div className="text-2xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-sm text-gray-900 mb-2">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 md:px-16 py-16 md:py-24 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-12 gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-950">Configura tu asistente en minutos.</h2>
            <p className="text-gray-500 mt-3 max-w-md">Un proceso diseñado para que no pierdas tiempo con configuraciones complejas.</p>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">←</button>
            <button className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:bg-gray-50">→</button>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { num: '01', title: 'Describe tu negocio', desc: 'Sube tu catálogo, precios y horarios. VendIA aprende tu marca, lenguaje y tono de voz.' },
            { num: '02', title: 'Conecta WhatsApp', desc: 'Tu negocio sigue generando consultas. Es tan sencillo como iniciar sesión en WhatsApp Web.' },
            { num: '03', title: 'VendIA responde', desc: 'El sistema comienza a filtrar y responder. Solo intervendrás en lo más importante.' },
          ].map((step, i) => (
            <div key={i} className="border border-gray-100 rounded-2xl p-6 bg-white">
              <p className="text-3xl font-black text-gray-100 mb-4">{step.num}</p>
              <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Use cases */}
      <section className="bg-gray-50 px-6 md:px-16 py-16 md:py-24" id="casos">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-950 text-center mb-12">Diseñado para negocios locales.</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { icon: '✂️', title: 'Estéticas y Barberías', desc: 'Agenda turnos, confirma disponibilidad y deriva el trabajo con clientes bases.' },
              { icon: '☕', title: 'Cafeterías y Panaderías', desc: 'Toma pedidos anticipados, confirma el menú del día y proporciona la ubicación exacta a nuevos clientes.' },
              { icon: '🏪', title: 'Tiendas Locales', desc: 'Gestiona consultas de stock de productos, métodos de pago y tiempos de entrega de manera inmediata.', featured: true },
              { icon: '🍽️', title: 'Restaurantes', desc: 'Gestiona reservas de mesa y programa automáticamente recordatorios personalizados.' },
            ].map((item, i) => (
              <div key={i} className={`rounded-2xl p-6 ${item.featured ? 'bg-emerald-700 text-white' : 'bg-white border border-gray-100'}`}>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg mb-4 ${item.featured ? 'bg-emerald-600' : 'bg-gray-50'}`}>{item.icon}</div>
                <h3 className={`font-bold mb-2 ${item.featured ? 'text-white' : 'text-gray-900'}`}>{item.title}</h3>
                <p className={`text-sm leading-relaxed ${item.featured ? 'text-emerald-100' : 'text-gray-500'}`}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard stats */}
      <section className="px-6 md:px-16 py-16 md:py-24 max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-950 text-center mb-4">Todo bajo control desde tu panel.</h2>
        <p className="text-center text-gray-500 mb-12">Visualiza el rendimiento de tu asistente y las conversaciones que ha gestionado por ti.</p>
        <div className="bg-gray-950 rounded-3xl p-6 md:p-10">
          <div className="bg-gray-900 rounded-2xl p-6 mb-4">
            <div className="h-8 bg-gray-800 rounded-lg w-48 mb-6"></div>
            <div className="grid grid-cols-3 gap-6 mb-6">
              {[
                { label: 'Conversaciones', value: '1,284' },
                { label: 'Msgs. atendidos', value: '8,402' },
                { label: 'Tiempo promedio', value: '42h' },
              ].map((stat, i) => (
                <div key={i}>
                  <p className="text-xs text-gray-500 mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                </div>
              ))}
            </div>
            <div className="h-24 bg-gray-800 rounded-xl flex items-center justify-center">
              <p className="text-xs text-gray-600">Actividad de conversaciones en tiempo real</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-50 px-6 md:px-16 py-16 md:py-24" id="precios">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-950 text-center mb-12">Planes simples para negocios en crecimiento.</h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl p-8">
              <p className="font-bold text-gray-900 mb-1">Plan Beta</p>
              <p className="text-4xl font-black text-gray-950 mb-1">Gratis</p>
              <p className="text-xs text-gray-400 mb-6">por tiempo limitado · MXN</p>
              <ul className="space-y-3 mb-8">
                {['Hasta 300 conversaciones/mes','Configuración base','1 número de WhatsApp'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="text-emerald-600 font-bold">○</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="block text-center py-3 rounded-full border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors">
                Seleccionar Beta
              </Link>
            </div>
            <div className="bg-emerald-700 rounded-2xl p-8 relative">
              <div className="absolute -top-3 right-6 bg-white text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">Popular</div>
              <p className="font-bold text-white mb-1">Plan Pro</p>
              <p className="text-4xl font-black text-white mb-1">$49</p>
              <p className="text-xs text-emerald-200 mb-6">por mes · USD</p>
              <ul className="space-y-3 mb-8">
                {['Conversaciones ilimitadas','Catálogo dinámico','Prioridad en soporte','Análisis avanzado'].map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-emerald-100">
                    <span className="text-white font-bold">○</span>{f}
                  </li>
                ))}
              </ul>
              <Link href="/sign-up" className="block text-center py-3 rounded-full bg-white text-emerald-700 font-semibold text-sm hover:bg-emerald-50 transition-colors">
                Seleccionar Pro
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-2xl mx-auto bg-gray-950 rounded-3xl p-10 md:p-16 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight mb-6">
            Empieza a atender clientes automáticamente.
          </h2>
          <p className="text-gray-400 mb-8 text-lg">Únete a los negocios que ya están escalando su atención al cliente con precisión y profesionalismo.</p>
          <Link href="/sign-up" className="inline-block bg-emerald-500 text-white px-8 py-4 rounded-xl text-base font-bold hover:bg-emerald-400 transition-colors">
            Solicitar acceso
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 md:px-16 py-6 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xl font-black tracking-tight">Vend<span className="text-emerald-700">IA</span></div>
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
