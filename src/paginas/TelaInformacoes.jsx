import { useState } from 'react'
import {
  ChevronLeft, ChevronDown, BookOpen,
  Eye, Ear, Accessibility, Brain, HeartPulse, LayoutGrid,
  AlertTriangle, Star, Info, HandMetal
} from 'lucide-react'

const CATEGORIAS = [
  { id: 'todos', rotulo: 'Todos', Icon: LayoutGrid },
  { id: 'visual', rotulo: 'Visual', Icon: Eye },
  { id: 'auditiva', rotulo: 'Auditiva', Icon: Ear },
  { id: 'motora', rotulo: 'Motora', Icon: Accessibility },
  { id: 'cognitiva', rotulo: 'Cognitiva', Icon: Brain },
  { id: 'ssr', rotulo: 'SSR Geral', Icon: HeartPulse },
]

const INFORMACOES = [
  {
    categoria: 'auditiva', titulo: 'Atendimento a pacientes surdos', urgencia: 'essencial',
    conteudo: [
      'Mantém sempre contacto visual directo com o paciente durante a consulta.',
      'Fala de frente para o paciente e com boa iluminação no rosto — muitos surdos fazem leitura labial.',
      'Usa frases curtas e simples. Evita termos técnicos sem explicação.',
      'Confirma sempre a compreensão pedindo ao paciente que repita a informação com gestos ou escrita.',
      'Nunca fales com um intérprete em vez de falar directamente com o paciente.',
      'Disponibiliza papel e caneta para comunicação escrita quando necessário.',
    ],
  },
  {
    categoria: 'auditiva', titulo: 'SSR e pacientes surdos', urgencia: 'importante',
    conteudo: [
      'Pacientes surdos têm o mesmo direito ao acesso à informação sobre contracepção, ISTs e gravidez.',
      'Materiais informativos sobre SSR devem estar disponíveis em formatos visuais e pictogramas.',
      'A falta de acesso à informação aumenta o risco de gravidez não planeada e ISTs na população surda.',
      'Sempre que possível, providencia um intérprete de Língua Gestual Angolana (LGA) para consultas de SSR.',
      'Respeita a privacidade — nunca uses familiares como intérpretes em consultas de SSR sem consentimento.',
    ],
  },
  {
    categoria: 'visual', titulo: 'Atendimento a pacientes com deficiência visual', urgencia: 'essencial',
    conteudo: [
      'Identifica-te sempre que entras no espaço — diz o teu nome e função antes de tocar no paciente.',
      'Descreve o ambiente, os procedimentos e os equipamentos verbalmente antes de os usar.',
      'Pede sempre permissão antes de guiar ou tocar o paciente.',
      'Evita expressões como "aqui", "ali", "este" — substitui por indicações concretas.',
      'Lê em voz alta todos os documentos que o paciente precise de assinar ou compreender.',
      'Garante que as informações de seguimento são dadas oralmente e não apenas por escrito.',
    ],
  },
  {
    categoria: 'visual', titulo: 'SSR e deficiência visual', urgencia: 'importante',
    conteudo: [
      'Explica verbalmente todos os métodos contraceptivos disponíveis.',
      'Descreve os passos de qualquer exame ginecológico ou urológico antes de realizá-lo.',
      'Instrui o paciente sobre como identificar sinais de alerta através de sensações físicas.',
      'Garante que a embalagem de medicamentos tenha indicações em Braille ou instruções gravadas em áudio.',
      'Pacientes com deficiência visual têm maior risco de abuso sexual — cria um ambiente de confiança.',
    ],
  },
  {
    categoria: 'motora', titulo: 'Atendimento a pacientes com deficiência motora', urgencia: 'essencial',
    conteudo: [
      'Verifica se a sala de consulta e a casa de banho são acessíveis para cadeira de rodas.',
      'Pergunta sempre ao paciente como prefere ser ajudado — nunca assumes que precisas de ajudar.',
      'Adapta a posição da maca ou cadeira de exame para permitir a transferência segura do paciente.',
      'Permite tempo extra para deslocação, transferência e posicionamento sem pressão.',
      'Comunica com o paciente ao nível dos olhos — senta-te se o paciente estiver numa cadeira de rodas.',
    ],
  },
  {
    categoria: 'motora', titulo: 'SSR e deficiência motora', urgencia: 'importante',
    conteudo: [
      'Pacientes com deficiência motora têm uma vida sexual activa e têm direito a cuidados de SSR completos.',
      'Adapta as posições de exame ginecológico conforme a mobilidade do paciente.',
      'Discute as opções de contracepção tendo em conta a capacidade motora.',
      'Informa sobre o impacto de medicamentos na função sexual.',
      'Avalia o risco de gravidez de alto risco em pacientes com certas condições motoras.',
    ],
  },
  {
    categoria: 'cognitiva', titulo: 'Atendimento a pacientes com deficiência cognitiva', urgencia: 'essencial',
    conteudo: [
      'Usa linguagem simples, frases curtas e concretas. Evita metáforas e linguagem abstracta.',
      'Dá instruções uma de cada vez — não sobrecarregues o paciente com muita informação.',
      'Usa pictogramas, imagens e demonstrações sempre que possível.',
      'Confirma a compreensão pedindo ao paciente que repita com as suas próprias palavras.',
      'Respeita a capacidade de tomada de decisão do paciente.',
      'Cria um ambiente calmo, previsível e sem pressa.',
    ],
  },
  {
    categoria: 'cognitiva', titulo: 'SSR e deficiência cognitiva', urgencia: 'critico',
    conteudo: [
      'Pessoas com deficiência cognitiva têm maior risco de abuso sexual — avalia sempre sinais de alerta.',
      'O consentimento informado deve ser adaptado ao nível de compreensão do paciente.',
      'Fornece educação sexual adaptada — estas pessoas têm o direito de aprender sobre o próprio corpo.',
      'Envolve cuidadores de confiança na educação sobre SSR, sem excluir o paciente.',
      'Avalia a necessidade de contracepção de longa duração considerando a capacidade de gestão diária.',
    ],
  },
  {
    categoria: 'ssr', titulo: 'Direitos reprodutivos das pessoas com deficiência', urgencia: 'essencial',
    conteudo: [
      'Pessoas com deficiência têm os mesmos direitos reprodutivos que qualquer outra pessoa.',
      'A esterilização forçada de pessoas com deficiência é uma violação dos direitos humanos e é ilegal.',
      'Nunca desencorajes uma pessoa com deficiência de ter filhos sem uma razão médica clara.',
      'Oferece sempre informação sobre planeamento familiar, contracepção e gravidez.',
      'Combate o preconceito — a ideia de que pessoas com deficiência não têm vida sexual é um mito.',
    ],
  },
  {
    categoria: 'ssr', titulo: 'Sinais de alerta — violência e abuso', urgencia: 'critico',
    conteudo: [
      'Pessoas com deficiência têm 2 a 10 vezes mais risco de sofrer violência e abuso sexual.',
      'Sinais de alerta: lesões inexplicáveis, medo do acompanhante, comportamento ansioso em consulta.',
      'Cria sempre um momento a sós com o paciente durante a consulta para avaliar a segurança.',
      'Em Angola, contacta as autoridades competentes se houver suspeita de abuso.',
      'Não questiones a veracidade do relato — acredita e documenta.',
    ],
  },
]

const URGENCIA_CONFIG = {
  critico:    { dot: 'bg-red-500',    badge: 'bg-red-50 border-red-200 text-red-600',    Icon: AlertTriangle, rotulo: 'Crítico' },
  essencial:  { dot: 'bg-orange-500', badge: 'bg-orange-50 border-orange-200 text-orange-600', Icon: Star, rotulo: 'Essencial' },
  importante: { dot: 'bg-blue-500',  badge: 'bg-blue-50 border-blue-200 text-blue-600',  Icon: Info, rotulo: 'Importante' },
}

export default function TelaInformacoes({ aoVoltar }) {
  const [categoriaActiva, setCategoriaActiva] = useState('todos')
  const [cardAberto, setCardAberto] = useState(null)

  const infoFiltradas = categoriaActiva === 'todos'
    ? INFORMACOES
    : INFORMACOES.filter(i => i.categoria === categoriaActiva)

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
        <div className="flex gap-2 items-center">
          <div className="flex justify-center items-center w-8 h-8 rounded-lg bg-laranja/10">
            <BookOpen size={15} className="text-laranja" />
          </div>
          <span className="hidden font-sans text-sm font-semibold text-gray-700 sm:inline">Informações</span>
        </div>
      </nav>

      <div className="px-6 py-8 bg-white border-b border-gray-100 lg:px-12">
        <div className="flex flex-col gap-4 mx-auto max-w-5xl sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 font-sans text-xs font-semibold tracking-widest uppercase text-laranja/70">Guia Clínico</p>
            <h1 className="text-3xl font-bold text-gray-900 font-display lg:text-4xl">Atendimento Inclusivo</h1>
            <p className="mt-1 font-sans text-sm text-gray-400">Protocolos de SSR para pessoas com deficiência</p>
          </div>
          <div className="flex gap-2 items-center px-4 py-2 bg-gray-50 rounded-xl border border-gray-200">
            <span className="text-2xl font-bold text-gray-900 font-display">{infoFiltradas.length}</span>
            <span className="font-sans text-xs leading-tight text-gray-400">tópicos<br />disponíveis</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-1 lg:flex-row">

        {/* SIDEBAR */}
        <aside className="flex-shrink-0 bg-white border-b border-gray-200 lg:w-56 xl:w-64 lg:border-b-0 lg:border-r">
          <div className="p-4 lg:p-6">
            <p className="px-1 mb-3 font-sans text-xs font-semibold tracking-wider text-gray-400 uppercase">Filtrar por</p>
            <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-x-visible pb-1 lg:pb-0 scrollbar-none">
              {CATEGORIAS.map(cat => {
                const CatIcon = cat.Icon
                const count = cat.id === 'todos'
                  ? INFORMACOES.length
                  : INFORMACOES.filter(i => i.categoria === cat.id).length
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setCategoriaActiva(cat.id); setCardAberto(null) }}
                    className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-sans
                                font-medium transition-all duration-200 whitespace-nowrap lg:w-full
                                ${categoriaActiva === cat.id
                                  ? 'bg-laranja text-white shadow-md shadow-laranja/25'
                                  : 'text-gray-600 hover:bg-gray-100'
                                }`}
                  >
                    <CatIcon size={15} className="flex-shrink-0" />
                    <span className="flex-1 text-left">{cat.rotulo}</span>
                    <span className={`text-xs font-sans ml-auto rounded-md px-1.5 py-0.5
                                     ${categoriaActiva === cat.id ? 'bg-white/25 text-white' : 'bg-gray-100 text-gray-400'}`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        {/* CONTENT */}
        <main className="flex-1 px-6 py-8 lg:px-10">
          <div className="flex flex-col gap-3 mx-auto max-w-3xl">
            {infoFiltradas.map((info, indice) => {
              const urg = URGENCIA_CONFIG[info.urgencia]
              const UrgIcon = urg.Icon
              const isOpen = cardAberto === indice
              return (
                <div key={indice}
                  className={`bg-white rounded-2xl border transition-all duration-200 overflow-hidden
                               ${isOpen ? 'shadow-lg border-laranja/30 shadow-laranja/8' : 'border-gray-200 hover:border-gray-300'}`}>
                  <button
                    onClick={() => setCardAberto(isOpen ? null : indice)}
                    className="flex gap-4 items-center px-6 py-5 w-full text-left"
                  >
                    <div className={`w-2 h-2 rounded-full flex-shrink-0 ${urg.dot}`} />
                    <div className="flex flex-1 gap-3 items-center min-w-0">
                      <h3 className="flex-1 font-sans text-sm font-semibold leading-tight text-gray-900">{info.titulo}</h3>
                      <span className={`hidden sm:inline-flex items-center gap-1 text-xs font-sans font-semibold
                                       px-2.5 py-1 rounded-full border flex-shrink-0 ${urg.badge}`}>
                        <UrgIcon size={10} />
                        {urg.rotulo}
                      </span>
                    </div>
                    <ChevronDown size={16}
                      className={`text-gray-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 animate-deslizar-cima">
                      <div className="mb-5 h-px bg-gray-100" />
                      <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {info.conteudo.map((ponto, i) => (
                          <li key={i} className="flex gap-3 items-start p-3 bg-gray-50 rounded-xl">
                            <div className="w-6 h-6 bg-laranja rounded-lg flex items-center justify-center
                                            text-white text-xs font-sans font-bold flex-shrink-0 mt-0.5">
                              {i + 1}
                            </div>
                            <p className="font-sans text-xs leading-relaxed text-gray-600">{ponto}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )
            })}

            <div className="flex gap-3 items-start p-5 mt-2 rounded-2xl border bg-laranja/5 border-laranja/15">
              <Info size={16} className="text-laranja flex-shrink-0 mt-0.5" />
              <p className="font-sans text-xs leading-relaxed text-gray-500">
                Informações baseadas nas directrizes da OMS, UNFPA e boas práticas internacionais
                de atendimento inclusivo em saúde sexual e reprodutiva.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}