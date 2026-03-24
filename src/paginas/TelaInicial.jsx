import { useState, useEffect, useRef } from 'react'

const SLIDES = [
  {
    emoji: '🤚',
    titulo: 'Comunicação sem barreiras',
    descricao: 'Traduzimos gestos de pacientes surdos em frases claras para os profissionais de saúde em tempo real.',
    cor: '#F46300',
  },
  {
    emoji: '🧬',
    titulo: 'Saúde Sexual e Reprodutiva para todos',
    descricao: 'Pessoas com deficiência têm o mesmo direito ao acesso à saúde sexual e reprodutiva de qualidade.',
    cor: '#E05500',
  },
  {
    emoji: '🎙️',
    titulo: 'Voz e gesto unidos',
    descricao: 'O profissional fala, a IA simplifica. O paciente gesticula, a IA traduz. Uma ponte entre dois mundos.',
    cor: '#FF7A1A',
  },
  {
    emoji: '🇦🇴',
    titulo: 'Feito para Angola',
    descricao: 'Desenvolvido com contexto angolano, linguagem local e foco nas necessidades reais das comunidades.',
    cor: '#CC4A00',
  },
]

export default function TelaInicial({ aoIniciar }) {
  const [slideActual, setSlideActual] = useState(0)
  const [arrastando, setArrastando] = useState(false)
  const inicioArrasteRef = useRef(0)
  const intervaloRef = useRef(null)

  const avancarSlide = () => setSlideActual(s => (s + 1) % SLIDES.length)
  const recuarSlide = () => setSlideActual(s => (s - 1 + SLIDES.length) % SLIDES.length)

  useEffect(() => {
    intervaloRef.current = setInterval(avancarSlide, 4000)
    return () => clearInterval(intervaloRef.current)
  }, [])

  const reiniciarIntervalo = () => {
    clearInterval(intervaloRef.current)
    intervaloRef.current = setInterval(avancarSlide, 4000)
  }

  const irParaSlide = (i) => { setSlideActual(i); reiniciarIntervalo() }

  const aoIniciarArraste = (e) => {
    setArrastando(true)
    inicioArrasteRef.current = e.touches ? e.touches[0].clientX : e.clientX
  }

  const aoTerminarArraste = (e) => {
    if (!arrastando) return
    setArrastando(false)
    const fim = e.changedTouches ? e.changedTouches[0].clientX : e.clientX
    const delta = inicioArrasteRef.current - fim
    if (Math.abs(delta) > 50) {
      delta > 0 ? avancarSlide() : recuarSlide()
      reiniciarIntervalo()
    }
  }

  const slide = SLIDES[slideActual]

  return (
    <div className="min-h-screen fundo-inicial flex flex-col">

      {/* Padrão de pontos decorativo */}
      <div className="absolute inset-0 padrao-pontos opacity-40 pointer-events-none" />

      {/* Cabeçalho com logótipo */}
      <header className="relative z-10 px-6 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-laranja rounded-2xl flex items-center justify-center
                          shadow-lg shadow-laranja/30 text-2xl">
            🤚
          </div>
          <div>
            <span className="font-display font-bold text-xl text-laranja leading-none block">Zero</span>
            <span className="font-display font-bold text-xl text-gray-800 leading-none block">Barreiras</span>
          </div>
        </div>

        {/* Badge UNFPA */}
        <div className="flex flex-col items-end gap-1">
          <div className="bg-white border border-laranja/20 rounded-xl px-3 py-1.5 shadow-sm">
            <p className="text-laranja text-xs font-sans font-semibold">UNFPA Angola</p>
          </div>
          <p className="text-gray-400 text-xs font-sans">Hackathon 2026</p>
        </div>
      </header>

      {/* Área principal — carrossel */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 gap-10">

        {/* Título acima do carrossel */}
        <div className="text-center max-w-xs">
          <p className="text-xs font-sans font-semibold uppercase tracking-widest text-laranja/60 mb-2">
            Hackathon Zero Barreiras
          </p>
          <h1 className="font-display font-bold text-3xl text-gray-800 leading-tight">
            Saúde acessível para <span className="texto-gradiente">todos</span>
          </h1>
        </div>

        {/* Carrossel */}
        <div
          className="w-full max-w-sm"
          onMouseDown={aoIniciarArraste}
          onMouseUp={aoTerminarArraste}
          onTouchStart={aoIniciarArraste}
          onTouchEnd={aoTerminarArraste}
        >
          <div
            className="bg-white rounded-3xl shadow-xl shadow-laranja/10 border border-laranja/10
                        p-8 flex flex-col items-center gap-6 text-center select-none"
            style={{ minHeight: 280 }}
          >
            {/* Emoji animado */}
            <div
              className="w-24 h-24 rounded-3xl flex items-center justify-center text-5xl
                          shadow-lg animate-flutuar transition-all duration-500"
              style={{ background: `${slide.cor}18`, border: `2px solid ${slide.cor}30` }}
            >
              {slide.emoji}
            </div>

            {/* Conteúdo do slide */}
            <div className="flex flex-col gap-3 animate-deslizar-cima" key={slideActual}>
              <h2 className="font-display font-bold text-xl text-gray-800 leading-tight">
                {slide.titulo}
              </h2>
              <p className="font-sans text-sm text-gray-500 leading-relaxed">
                {slide.descricao}
              </p>
            </div>
          </div>

          {/* Indicadores dos slides */}
          <div className="flex justify-center gap-2 mt-5">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => irParaSlide(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === slideActual
                    ? 'w-8 h-2.5 bg-laranja'
                    : 'w-2.5 h-2.5 bg-laranja/20 hover:bg-laranja/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Botão Início */}
        <button
          onClick={aoIniciar}
          className="w-full max-w-sm botao-primario text-lg py-4 flex items-center justify-center gap-3
                     rounded-3xl shadow-xl shadow-laranja/30 hover:shadow-2xl hover:shadow-laranja/40
                     hover:-translate-y-0.5 transition-all duration-200"
        >
          <span>Iniciar</span>
          <span className="text-xl">→</span>
        </button>

        {/* Parceiros */}
        <div className="text-center">
          <p className="text-xs text-gray-400 font-sans mb-3">Parceiros</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['Ministério da Saúde', 'Acelera', 'AfriYAN', 'LARDEF', 'YAPAMA'].map(p => (
              <span key={p} className="text-xs text-gray-400 font-sans bg-white border border-gray-100
                                       px-3 py-1 rounded-full shadow-sm">
                {p}
              </span>
            ))}
          </div>
        </div>
      </main>

      {/* Rodapé */}
      <footer className="relative z-10 text-center px-6 py-6">
        <p className="text-gray-300 text-xs font-sans">
          Zero Barreiras · Luanda · 2026
        </p>
      </footer>
    </div>
  )
}
