import { Stethoscope, BookOpen, ChevronLeft, ArrowRight, HandMetal, Activity, Users, Clock } from 'lucide-react'

const CARDS = [
  {
    id: 'consulta',
    Icon: Stethoscope,
    titulo: 'Consulta',
    descricao: 'Comunicação em tempo real entre paciente surdo e profissional de saúde através de gestos e voz.',
    cor: '#F46300',
    features: ['Reconhecimento de gestos', 'Síntese de voz', 'Histórico em tempo real'],
  },
  {
    id: 'informacoes',
    Icon: BookOpen,
    titulo: 'Informações',
    descricao: 'Guia completo de atendimento a pessoas com deficiência em saúde sexual e reprodutiva.',
    cor: '#0EA5E9',
    features: ['Guias por tipo de deficiência', 'Protocolos de SSR', 'Direitos dos pacientes'],
  },
]

const METRICAS = [
  { Icon: Activity, valor: 'Tempo real', label: 'Comunicação' },
  { Icon: Users, valor: '4+', label: 'Tipos de deficiência' },
  { Icon: Clock, valor: '24/7', label: 'Disponível' },
]

export default function TelaMenu({ aoConsulta, aoInformacoes, aoVoltar }) {
  const handlers = { consulta: aoConsulta, informacoes: aoInformacoes }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">

      <nav className="flex sticky top-0 z-30 justify-between items-center px-6 h-16 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex gap-4 items-center">
          <button onClick={aoVoltar}
            className="flex justify-center items-center w-9 h-9 text-gray-500 bg-white rounded-xl border border-gray-200 transition-all duration-200 hover:border-laranja hover:text-laranja">
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="flex justify-center items-center w-9 h-9 rounded-xl shadow-md bg-laranja shadow-laranja/30">
              <HandMetal size={18} className="text-white" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-bold font-display text-laranja">Zero</span>
              <span className="text-lg font-bold text-gray-800 font-display">Barreiras</span>
            </div>
          </div>
        </div>
        <span className="hidden font-sans text-xs text-gray-400 sm:inline">UNFPA Angola · Hackathon 2026</span>
      </nav>

      <div className="px-6 py-8 bg-white border-b border-gray-100 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <p className="mb-1 font-sans text-xs font-semibold tracking-widest uppercase text-laranja/70">Menu Principal</p>
          <h1 className="text-3xl font-bold text-gray-900 font-display lg:text-4xl">O que precisas hoje?</h1>
          <p className="mt-2 font-sans text-sm text-gray-400">Selecciona uma das opções abaixo para continuar</p>
        </div>
      </div>

      <main className="flex-1 px-6 py-10 lg:px-12">
        <div className="flex flex-col gap-8 mx-auto max-w-5xl">

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {CARDS.map(({ id, Icon, titulo, descricao, cor, features }) => (
              <button
                key={id}
                onClick={handlers[id]}
                className="flex overflow-hidden relative flex-col gap-6 p-8 text-left bg-white rounded-2xl border border-gray-200 transition-all duration-300 group hover:border-transparent hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 left-0 h-1 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${cor}, ${cor}77)` }} />

                <div className="flex justify-between items-start">
                  <div className="flex justify-center items-center w-16 h-16 rounded-2xl transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${cor}12`, border: `1.5px solid ${cor}25` }}>
                    <Icon size={30} style={{ color: cor }} strokeWidth={1.5} />
                  </div>
                  <div className="flex justify-center items-center w-9 h-9 text-gray-300 rounded-xl border border-gray-200 transition-all duration-300 group-hover:border-laranja group-hover:text-laranja">
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </div>
                </div>

                <div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900 transition-colors duration-200 font-display group-hover:text-laranja">
                    {titulo}
                  </h2>
                  <p className="font-sans text-sm leading-relaxed text-gray-500">{descricao}</p>
                </div>

                <ul className="flex flex-col gap-2">
                  {features.map(f => (
                    <li key={f} className="flex gap-2 items-center">
                      <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: cor }} />
                      <span className="font-sans text-xs text-gray-400">{f}</span>
                    </li>
                  ))}
                </ul>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-3 px-8 py-6 bg-white rounded-2xl border border-gray-200 divide-x divide-gray-100">
            {METRICAS.map(({ Icon, valor, label }) => (
              <div key={label} className="flex flex-col gap-2 items-center px-4">
                <div className="flex justify-center items-center w-10 h-10 rounded-xl bg-laranja/8">
                  <Icon size={18} className="text-laranja" />
                </div>
                <span className="text-xl font-bold text-gray-900 font-display">{valor}</span>
                <span className="font-sans text-xs text-center text-gray-400">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}