import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <nav className="flex justify-between items-center px-8 py-4 border-b">
        <div className="text-xl font-bold">Vend<span className="text-purple-600">IA</span></div>
        <div className="flex gap-4">
          <Link href="/sign-in" className="text-sm text-gray-600 hover:text-gray-900">Iniciar sesión</Link>
          <Link href="/sign-up" className="text-sm bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700">Empezar gratis</Link>
        </div>
      </nav>
      <section className="flex flex-col items-center text-center px-8 py-24">
        <div className="text-sm bg-purple-100 text-purple-700 px-4 py-1 rounded-full mb-6">Nuevo · VendIA 2026</div>
        <h1 className="text-5xl font-bold text-gray-900 max-w-2xl leading-tight mb-6">
          Cierra 3× más ventas en WhatsApp con IA
        </h1>
        <p className="text-xl text-gray-500 max-w-xl mb-10">
          VendIA responde automáticamente a tus clientes en WhatsApp las 24 horas.
        </p>
        <Link href="/sign-up" className="bg-purple-600 text-white px-8 py-3 rounded-full text-lg hover:bg-purple-700">
          Empieza gratis →
        </Link>
      </section>
    </main>
  )
}
