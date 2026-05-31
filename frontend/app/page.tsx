import Link from 'next/link'

export default function Home() {
  return (
    <main style={{background:'#05070B',color:'#FFFFFF',fontFamily:'Inter,sans-serif',minHeight:'100vh',overflowX:'hidden'}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        .card{background:#0D1117;border:1px solid #1F2937;border-radius:16px}
        .btn-primary{background:#0B6B4B;color:#fff;border:none;cursor:pointer;font-weight:600;transition:all 0.2s}
        .btn-primary:hover{background:#0d7d58}
        .accent{color:#22C55E}
        .muted{color:#94A3B8}
        .faq-item summary{cursor:pointer;list-style:none;padding:16px 0;display:flex;justify-content:space-between;align-items:center;font-weight:500;border-bottom:1px solid #1F2937}
        .faq-item summary::-webkit-details-marker{display:none}
        .faq-item[open] summary{color:#22C55E}
        .faq-item p{padding:12px 0 16px;color:#94A3B8;font-size:14px;line-height:1.6;border-bottom:1px solid #1F2937}
        .phone-mockup{background:linear-gradient(135deg,#0D1117,#111827);border:2px solid #1F2937;border-radius:36px;padding:12px;box-shadow:0 40px 80px rgba(0,0,0,0.6),0 0 0 1px rgba(34,197,94,0.1);position:relative;overflow:hidden}
        .phone-screen{background:#05070B;border-radius:26px;padding:16px;min-height:320px;position:relative}
        .metric-card{background:#0D1117;border:1px solid #1F2937;border-radius:12px;padding:16px 20px;flex:1;min-width:0}
        .step-num{width:32px;height:32px;border-radius:50%;background:rgba(11,107,75,0.15);border:1px solid rgba(34,197,94,0.3);display:flex;align-items:center;justify-content:center;color:#22C55E;font-weight:700;font-size:14px;flex-shrink:0}
        .tag{background:rgba(255,255,255,0.06);border:1px solid #1F2937;border-radius:100px;padding:8px 16px;font-size:13px;color:#94A3B8;display:inline-flex;align-items:center;gap:6px}
        .compare-col{background:#0D1117;border:1px solid #1F2937;border-radius:16px;padding:24px;flex:1;min-width:0}
        .compare-col.good{border-color:rgba(34,197,94,0.3);background:rgba(11,107,75,0.06)}
        .test-card{background:#0D1117;border:1px solid #1F2937;border-radius:14px;padding:20px}
        @media(max-width:768px){.hero-grid{grid-template-columns:1fr!important}.hide-mobile{display:none!important}.compare-flex{flex-direction:column!important}}
      `}</style>

      {/* Navbar */}
      <nav style={{position:'sticky',top:0,zIndex:50,background:'rgba(5,7,11,0.95)',backdropFilter:'blur(12px)',borderBottom:'1px solid #1F2937',padding:'0 24px'}}>
        <div style={{maxWidth:1120,margin:'0 auto',display:'flex',alignItems:'center',justifyContent:'space-between',height:60}}>
          <div style={{fontWeight:800,fontSize:20,letterSpacing:'-0.02em'}}>Vend<span className="accent">IA</span></div>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <Link href="/sign-in" style={{color:'#94A3B8',textDecoration:'none',fontSize:14,fontWeight:500}}>Iniciar sesión</Link>
            <Link href="/sign-up" className="btn-primary" style={{padding:'8px 20px',borderRadius:100,fontSize:14,textDecoration:'none',display:'inline-block'}}>Empezar gratis</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section style={{padding:'80px 24px 60px',maxWidth:1120,margin:'0 auto'}}>
        <div className="hero-grid" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:48,alignItems:'center'}}>
          <div>
            <div style={{display:'inline-flex',alignItems:'center',gap:8,background:'rgba(34,197,94,0.08)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:100,padding:'6px 14px',marginBottom:24}}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'#22C55E',display:'inline-block',animation:'pulse 2s infinite'}}></span>
              <span style={{fontSize:12,color:'#22C55E',fontWeight:600}}>PROCESO AUTOMÁTICO</span>
            </div>
            <h1 style={{fontSize:'clamp(2rem,5vw,3.5rem)',fontWeight:900,lineHeight:1.05,letterSpacing:'-0.03em',marginBottom:20}}>
              Tu negocio responde WhatsApp incluso cuando estás ocupado
            </h1>
            <p style={{fontSize:16,color:'#94A3B8',lineHeight:1.7,marginBottom:32,maxWidth:420}}>
              Automatiza la atención y vende 24/7 sin tocar el teléfono. Inteligencia artificial diseñada para negocios locales.
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:12,alignItems:'flex-start'}}>
              <Link href="/sign-up" className="btn-primary" style={{padding:'14px 28px',borderRadius:12,fontSize:16,textDecoration:'none',display:'inline-block'}}>Empezar gratis</Link>
              <p style={{fontSize:12,color:'#475569'}}>No requiere tarjeta de crédito</p>
            </div>
          </div>

          {/* Phone mockup */}
          <div style={{display:'flex',justifyContent:'center'}}>
            <div className="phone-mockup" style={{width:'100%',maxWidth:280}}>
              <div className="phone-screen">
                <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:16,paddingBottom:12,borderBottom:'1px solid #1F2937'}}>
                  <div style={{width:32,height:32,borderRadius:'50%',background:'rgba(11,107,75,0.3)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:16}}>🤖</div>
                  <div>
                    <p style={{fontSize:12,fontWeight:600,color:'#F8FAFC'}}>VendIA Bot</p>
                    <p style={{fontSize:10,color:'#22C55E'}}>● En línea</p>
                  </div>
                </div>
                <div style={{display:'flex',flexDirection:'column',gap:10}}>
                  <div style={{background:'#1F2937',borderRadius:'12px 12px 12px 4px',padding:'10px 14px',maxWidth:'85%'}}>
                    <p style={{fontSize:12,color:'#E2E8F0',lineHeight:1.5}}>¡Hola! ¿En qué te puedo ayudar hoy? 😊</p>
                  </div>
                  <div style={{display:'flex',justifyContent:'flex-end'}}>
                    <div style={{background:'#0B6B4B',borderRadius:'12px 12px 4px 12px',padding:'10px 14px',maxWidth:'85%'}}>
                      <p style={{fontSize:12,color:'#fff',lineHeight:1.5}}>¿Tienen stock del modelo Pro?</p>
                    </div>
                  </div>
                  <div style={{background:'#1F2937',borderRadius:'12px 12px 12px 4px',padding:'10px 14px',maxWidth:'85%'}}>
                    <p style={{fontSize:12,color:'#E2E8F0',lineHeight:1.5}}>¡Sí! Tenemos 5 unidades. ¿Te lo reservo? 🎉</p>
                    <p style={{fontSize:10,color:'#22C55E',textAlign:'right',marginTop:4}}>✓✓ 10:42</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section style={{padding:'0 24px 64px',maxWidth:1120,margin:'0 auto'}}>
        <div style={{display:'flex',gap:12,flexWrap:'wrap'}}>
          {[
            { v:'+85%', l:'Más ventas' },
            { v:'+60%', l:'Clientes bien atendidos' },
            { v:'24/7', l:'Atención automática' },
          ].map((m,i) => (
            <div key={i} className="metric-card">
              <p style={{fontSize:28,fontWeight:900,color:'#22C55E',letterSpacing:'-0.02em'}}>{m.v}</p>
              <p style={{fontSize:12,color:'#64748B',marginTop:4}}>{m.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cómo funciona */}
      <section style={{padding:'64px 24px',maxWidth:1120,margin:'0 auto'}}>
        <h2 style={{fontSize:'clamp(1.5rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.02em',marginBottom:40}}>Cómo funciona</h2>
        <div style={{display:'flex',flexDirection:'column',gap:24}}>
          {[
            { n:'1', t:'Configura', d:'Escanea tu código QR, conecta WhatsApp y carga el catálogo de ventas.' },
            { n:'2', t:'Entrena', d:'Sube tus datos, estadísticas y preguntas. La IA aprende todo sobre tu negocio.' },
            { n:'3', t:'Conecta', d:'Conecta todo con un par de clics de registro y actualiza información al momento.' },
            { n:'4', t:'VendIA responde', d:'Tu asistente empieza a vender y atender clientes 24/7 de forma automática.' },
          ].map((step, i) => (
            <div key={i} style={{display:'flex',gap:16,alignItems:'flex-start'}}>
              <div className="step-num">{step.n}</div>
              <div>
                <p style={{fontWeight:700,fontSize:16,marginBottom:6}}>{step.t}</p>
                <p style={{fontSize:14,color:'#94A3B8',lineHeight:1.6}}>{step.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Centro de Mando */}
      <section style={{padding:'64px 24px',maxWidth:1120,margin:'0 auto'}}>
        <h2 style={{fontSize:'clamp(1.5rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.02em',marginBottom:12}}>El Centro de Mando</h2>
        <p style={{color:'#94A3B8',marginBottom:32,fontSize:15}}>Ten el control de tu negocio en una interfaz diseñada para la efectividad.</p>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:16}}>
          <div className="card" style={{padding:24}}>
            <div style={{width:40,height:40,background:'rgba(34,197,94,0.1)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,marginBottom:16}}>📊</div>
            <p style={{fontWeight:700,fontSize:16,marginBottom:8}}>Dashboard de Ventas</p>
            <p style={{fontSize:13,color:'#94A3B8',lineHeight:1.6}}>Visualiza ideas y métricas en tiempo real con gráficas de alto impacto.</p>
          </div>
          <div className="card" style={{padding:24}}>
            <div style={{width:40,height:40,background:'rgba(34,197,94,0.1)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:20,marginBottom:16}}>🧠</div>
            <p style={{fontWeight:700,fontSize:16,marginBottom:8}}>Base de Conocimientos</p>
            <p style={{fontSize:13,color:'#94A3B8',lineHeight:1.6}}>Carga tu catálogo, preguntas y respuestas para optimizar todo tu equipo.</p>
          </div>
        </div>
      </section>

      {/* Diseñado para ti */}
      <section style={{padding:'64px 24px',maxWidth:1120,margin:'0 auto'}}>
        <h2 style={{fontSize:'clamp(1.5rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.02em',marginBottom:32}}>Diseñado para ti</h2>
        <div style={{display:'flex',flexWrap:'wrap',gap:10}}>
          {[
            {icon:'☕',l:'Cafeterías'},{icon:'✂️',l:'Estéticas'},{icon:'🏪',l:'Tiendas Locales'},
            {icon:'🏥',l:'Consultorios'},{icon:'🛠',l:'Servicios'},{icon:'➕',l:'Más'},
          ].map((cat,i) => (
            <span key={i} className="tag">{cat.icon} {cat.l}</span>
          ))}
        </div>
      </section>

      {/* Antes vs Después */}
      <section style={{padding:'64px 24px',maxWidth:1120,margin:'0 auto'}}>
        <h2 style={{fontSize:'clamp(1.5rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.02em',marginBottom:32}}>El cambio es real</h2>
        <div className="compare-flex" style={{display:'flex',gap:16}}>
          <div className="compare-col">
            <p style={{fontWeight:700,marginBottom:16,color:'#EF4444'}}>✕ Sin VendIA</p>
            {['Mensajes ignorados por horas','Pérdida de clientes por falta de respuesta','Consultas en madrugadas sin atender','Solo mensajes en horario diurno'].map((t,i)=>(
              <div key={i} style={{display:'flex',gap:10,marginBottom:10}}>
                <span style={{color:'#EF4444',flexShrink:0}}>✕</span>
                <p style={{fontSize:13,color:'#94A3B8'}}>{t}</p>
              </div>
            ))}
          </div>
          <div className="compare-col good">
            <p style={{fontWeight:700,marginBottom:16,color:'#22C55E'}}>✓ Con VendIA</p>
            {['Respuestas en menos de 1 segundo','Ventas cerradas mientras duermes','Claro mensajes sin confusiones','Siempre disponible'].map((t,i)=>(
              <div key={i} style={{display:'flex',gap:10,marginBottom:10}}>
                <span style={{color:'#22C55E',flexShrink:0}}>✓</span>
                <p style={{fontSize:13,color:'#94A3B8'}}>{t}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section style={{padding:'64px 24px',maxWidth:1120,margin:'0 auto'}}>
        <h2 style={{fontSize:'clamp(1.5rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.02em',marginBottom:32}}>Lo que dicen</h2>
        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))',gap:16}}>
          {[
            { q:'"VendIA cambió mi negocio. Ahora los clientes dicen que les han llegado de inmediato sin que el día sea un solo por el app."', name:'Ana Martínez', role:'Tienda local' },
            { q:'"Recuperé más de 3hrs de jornada. La IA maneja dudas de precios y atención al cliente cuando yo no puedo."', name:'Carlos Wall', role:'Consultor' },
          ].map((t,i)=>(
            <div key={i} className="test-card">
              <p style={{fontSize:14,color:'#94A3B8',lineHeight:1.7,marginBottom:16}}>{t.q}</p>
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div style={{width:32,height:32,borderRadius:'50%',background:'rgba(11,107,75,0.2)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:14,color:'#22C55E',fontWeight:700}}>{t.name[0]}</div>
                <div>
                  <p style={{fontSize:13,fontWeight:600}}>{t.name}</p>
                  <p style={{fontSize:12,color:'#64748B'}}>{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section style={{padding:'64px 24px',maxWidth:720,margin:'0 auto'}}>
        <h2 style={{fontSize:'clamp(1.5rem,4vw,2.5rem)',fontWeight:800,letterSpacing:'-0.02em',marginBottom:32}}>Preguntas frecuentes</h2>
        {[
          { q:'¿Cómo puedo suscribirme?', a:'Solo crea una cuenta, conecta tu WhatsApp Business y configura tu bot en menos de 10 minutos.' },
          { q:'¿Funciona con WhatsApp normal?', a:'VendIA funciona con WhatsApp Business API. Te guiamos en todo el proceso de configuración.' },
          { q:'¿Puedo interactuar de forma manual?', a:'Sí, puedes tomar control de cualquier conversación en cualquier momento desde el dashboard.' },
        ].map((faq,i)=>(
          <details key={i} className="faq-item">
            <summary>
              <span>{faq.q}</span>
              <span style={{color:'#64748B',fontSize:18}}>+</span>
            </summary>
            <p>{faq.a}</p>
          </details>
        ))}
      </section>

      {/* CTA final */}
      <section style={{padding:'64px 24px',maxWidth:1120,margin:'0 auto'}}>
        <div style={{background:'linear-gradient(135deg,#0B1F15,#071811)',border:'1px solid rgba(34,197,94,0.2)',borderRadius:24,padding:'60px 32px',textAlign:'center'}}>
          <h2 style={{fontSize:'clamp(1.75rem,5vw,3rem)',fontWeight:900,letterSpacing:'-0.03em',marginBottom:16}}>
            ¿Listo para automatizar WhatsApp?
          </h2>
          <p style={{color:'#94A3B8',fontSize:16,marginBottom:32,maxWidth:400,margin:'0 auto 32px'}}>
            Únete a los negocios que ya están escalando sin esfuerzo.
          </p>
          <Link href="/sign-up" className="btn-primary" style={{padding:'16px 36px',borderRadius:12,fontSize:16,textDecoration:'none',display:'inline-block',fontWeight:700}}>
            Registrar acceso
          </Link>
          <p style={{fontSize:12,color:'#475569',marginTop:12}}>Instalación guiada en 5 minutos</p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{borderTop:'1px solid #1F2937',padding:'40px 24px'}}>
        <div style={{maxWidth:1120,margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(140px,1fr))',gap:32}}>
          <div>
            <div style={{fontWeight:800,fontSize:18,marginBottom:12}}>Vend<span className="accent">IA</span></div>
            <p style={{fontSize:13,color:'#64748B',lineHeight:1.6}}>Automatización inteligente para negocios locales.</p>
          </div>
          {[
            { title:'Producto', links:['Funciones','Precios','FAQ','Changelog'] },
            { title:'Compañía', links:['Acerca de','Blog','Términos','Privacidad'] },
            { title:'Soporte', links:['Documentación','Contacto','WhatsApp','Discord'] },
          ].map((col,i)=>(
            <div key={i}>
              <p style={{fontWeight:600,fontSize:13,marginBottom:12}}>{col.title}</p>
              {col.links.map((l,j)=>(
                <p key={j} style={{fontSize:13,color:'#64748B',marginBottom:8,cursor:'pointer'}}>{l}</p>
              ))}
            </div>
          ))}
        </div>
        <div style={{maxWidth:1120,margin:'32px auto 0',paddingTop:24,borderTop:'1px solid #1F2937',display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:8}}>
          <p style={{fontSize:12,color:'#475569'}}>© 2026 VendIA · Todos los derechos reservados</p>
          <p style={{fontSize:12,color:'#475569'}}>Hecho con ❤️ para negocios locales</p>
        </div>
      </footer>

    </main>
  )
}
