import { Stethoscope, BookOpen, ChevronLeft, ArrowRight, HandMetal, Activity, Users, Clock } from 'lucide-react'
import logo from '../assets/logo.jpg'
const CARDS = [
  {
    id: 'consulta',
    titulo: 'Consulta',
    descricao: 'Comunicação entre paciente surdo e profissional de saúde.',
    cor: '#F46300',
     },
  {
    id: 'informacoes',
    titulo: 'Informações',
    descricao: 'Guia atendimento a pessoas com deficiência em SSR.',
    cor: '#0EA5E9',
 },
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
            
            <div className="flex items-baseline gap-1.5">
              <img src={logo} className="w-20" alt="" />
            </div>
          </div>
        </div>
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
            {CARDS.map(({ id, titulo, descricao, cor }) => (
              <button
                key={id}
                onClick={handlers[id]}
                className="flex overflow-hidden relative flex-col gap-6 p-8 text-left bg-white rounded-2xl border border-gray-200 transition-all duration-300 group hover:border-transparent hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="absolute top-0 right-0 left-0 h-1 rounded-t-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: `linear-gradient(90deg, ${cor}, ${cor}77)` }} />

                <div className="flex justify-between items-start">
                  
                 
                </div>

                <div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-900 transition-colors duration-200 font-display group-hover:text-laranja">
                    {titulo}
                  </h2>
                  <p className="font-sans text-sm leading-relaxed text-gray-500">{descricao}</p>
                </div>

               
              </button>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}