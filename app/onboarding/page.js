'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const [businessInfo, setBusinessInfo] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSave() {
    if (!businessInfo.trim()) return;
    setLoading(true);

    // Por ahora guardamos en localStorage
    // Después lo conectamos a MongoDB con el usuario
    localStorage.setItem('businessInfo', businessInfo);

    setTimeout(() => {
      router.push('/dashboard');
    }, 800);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-lg">

        <div className="mb-6">
          <h1 className="text-2xl font-medium text-gray-900">
            Cuéntame sobre tu negocio
          </h1>
          <p className="text-gray-500 mt-1 text-sm">
            La IA usará esta información para sugerirte respuestas perfectas.
          </p>
        </div>

        <textarea
          className="w-full border border-gray-200 rounded-xl p-4 text-sm text-gray-800 resize-none focus:outline-none focus:border-gray-400 transition-colors"
          rows={6}
          placeholder="Ejemplo: Vendo ropa femenina en Bogotá. Mis productos van de $50.000 a $200.000. Hago envíos a toda Colombia. Mi estilo es cercano y amable. Mi diferencial es la calidad y atención rápida."
          value={businessInfo}
          onChange={(e) => setBusinessInfo(e.target.value)}
        />

        <button
          onClick={handleSave}
          disabled={loading || !businessInfo.trim()}
          className="mt-4 w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-medium hover:bg-gray-700 transition-colors disabled:opacity-40"
        >
          {loading ? 'Guardando...' : 'Empezar a vender →'}
        </button>
      </div>
    </div>
  );
}