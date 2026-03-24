import { useState } from 'react'

const CATEGORIAS = [
  { id: 'todos', rotulo: 'Todos', emoji: '📋' },
  { id: 'visual', rotulo: 'Deficiência Visual', emoji: '👁️' },
  { id: 'auditiva', rotulo: 'Deficiência Auditiva', emoji: '👂' },
  { id: 'motora', rotulo: 'Deficiência Motora', emoji: '♿' },
  { id: 'cognitiva', rotulo: 'Deficiência Cognitiva', emoji: '🧠' },
  { id: 'ssr', rotulo: 'SSR Geral', emoji: '🧬' },
]

const INFORMACOES = [
  {
    categoria: 'auditiva',
    titulo: 'Atendimento a pacientes surdos',
    emoji: '🤟',
    urgencia: 'essencial',
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
    categoria: 'auditiva',
    titulo: 'SSR e pacientes surdos',
    emoji: '🩺',
    urgencia: 'importante',
    conteudo: [
      'Pacientes surdos têm o mesmo direito ao acesso à informação sobre contracepção, ISTs e gravidez.',
      'Materiais informativos sobre SSR devem estar disponíveis em formatos visuais e pictogramas.',
      'A falta de acesso à informação aumenta o risco de gravidez não planeada e ISTs na população surda.',
      'Sempre que possível, providencia um intérprete de Língua Gestual Angolana (LGA) para consultas de SSR.',
      'Respeita a privacidade — nunca uses familiares como intérpretes em consultas de SSR sem consentimento.',
    ],
  },
  {
    categoria: 'visual',
    titulo: 'Atendimento a pacientes com deficiência visual',
    emoji: '🦯',
    urgencia: 'essencial',
    conteudo: [
      'Identifica-te sempre que entras no espaço — diz o teu nome e função antes de tocar no paciente.',
      'Descreve o ambiente, os procedimentos e os equipamentos verbalmente antes de os usar.',
      'Pede sempre permissão antes de guiar ou tocar o paciente.',
      'Evita expressões como "aqui", "ali", "este" — substitui por indicações concretas ("à tua esquerda", "a 30 cm de distância").',
      'Lê em voz alta todos os documentos que o paciente precise de assinar ou compreender.',
      'Garante que as informações de seguimento são dadas oralmente e não apenas por escrito.',
    ],
  },
  {
    categoria: 'visual',
    titulo: 'SSR e deficiência visual',
    emoji: '💊',
    urgencia: 'importante',
    conteudo: [
      'Explica verbalmente todos os métodos contraceptivos disponíveis — não dependa apenas de folhetos visuais.',
      'Descreve os passos de qualquer exame ginecológico ou urológico antes de realizá-lo.',
      'Instrui o paciente sobre como identificar sinais de alerta (dor, sangramento) através de sensações físicas.',
      'Garante que a embalagem de medicamentos tenha indicações em Braille ou que as instruções sejam gravadas em áudio.',
      'Pacientes com deficiência visual têm maior risco de abuso sexual — cria um ambiente de confiança e pergunta sobre segurança.',
    ],
  },
  {
    categoria: 'motora',
    titulo: 'Atendimento a pacientes com deficiência motora',
    emoji: '♿',
    urgencia: 'essencial',
    conteudo: [
      'Verifica se a sala de consulta e a casa de banho são acessíveis para cadeira de rodas antes da consulta.',
      'Pergunta sempre ao paciente como prefere ser ajudado — nunca assumes que precisas de ajudar.',
      'Adapta a posição da maca ou cadeira de exame para permitir a transferência segura do paciente.',
      'Permite tempo extra para deslocação, transferência e posicionamento sem pressão.',
      'Comunica com o paciente ao nível dos olhos — senta-te se o paciente estiver numa cadeira de rodas.',
    ],
  },
  {
    categoria: 'motora',
    titulo: 'SSR e deficiência motora',
    emoji: '🧬',
    urgencia: 'importante',
    conteudo: [
      'Pacientes com deficiência motora têm uma vida sexual activa e têm direito a cuidados de SSR completos.',
      'Adapta as posições de exame ginecológico conforme a mobilidade do paciente — consulta o paciente sobre o que funciona.',
      'Discute as opções de contracepção tendo em conta a capacidade motora (ex: DIU pode ser preferível a pílula diária).',
      'Informa sobre o impacto de medicamentos na função sexual — alguns relaxantes musculares afectam a libido.',
      'Avalia o risco de gravidez de alto risco em pacientes com certas condições motoras (ex: lesão medular).',
    ],
  },
  {
    categoria: 'cognitiva',
    titulo: 'Atendimento a pacientes com deficiência cognitiva',
    emoji: '🧩',
    urgencia: 'essencial',
    conteudo: [
      'Usa linguagem simples, frases curtas e concretas. Evita metáforas e linguagem abstracta.',
      'Dá instruções uma de cada vez — não sobrecarregues o paciente com muita informação ao mesmo tempo.',
      'Usa pictogramas, imagens e demonstrações sempre que possível.',
      'Confirma a compreensão pedindo ao paciente que repita a informação com as suas próprias palavras.',
      'Respeita a capacidade de tomada de decisão do paciente — não dirigas a consulta apenas ao acompanhante.',
      'Cria um ambiente calmo, previsível e sem pressa.',
    ],
  },
  {
    categoria: 'cognitiva',
    titulo: 'SSR e deficiência cognitiva',
    emoji: '🛡️',
    urgencia: 'critico',
    conteudo: [
      'Pessoas com deficiência cognitiva têm maior risco de abuso sexual — avalia sempre sinais de alerta.',
      'O consentimento informado deve ser adaptado ao nível de compreensão do paciente — usa linguagem fácil.',
      'Fornece educação sexual adaptada — estas pessoas têm o direito de aprender sobre o próprio corpo e limites.',
      'Envolve cuidadores de confiança na educação sobre SSR, mas sem excluir o paciente do processo.',
      'Avalia a necessidade de contracepção de longa duração considerando a capacidade de gestão diária do paciente.',
    ],
  },
  {
    categoria: 'ssr',
    titulo: 'Direitos reprodutivos das pessoas com deficiência',
    emoji: '⚖️',
    urgencia: 'essencial',
    conteudo: [
      'Pessoas com deficiência têm os mesmos direitos reprodutivos que qualquer outra pessoa — este é um direito humano.',
      'A esterilização forçada de pessoas com deficiência é uma violação dos direitos humanos e é ilegal.',
      'Nunca desencorajes uma pessoa com deficiência de ter filhos sem uma razão médica clara e consentimento informado.',
      'Oferece sempre informação sobre planeamento familiar, contracepção e gravidez, independentemente da deficiência.',
      'Combate o preconceito — a ideia de que pessoas com deficiência não têm vida sexual é um mito prejudicial.',
    ],
  },
  {
    categoria: 'ssr',
    titulo: 'Princípios gerais de atendimento inclusivo',
    emoji: '🌍',
    urgencia: 'importante',
    conteudo: [
      'Dirige-te sempre ao paciente, não ao acompanhante, excepto quando o paciente pede que o faças.',
      'Pergunta sobre a deficiência apenas se for relevante para a consulta — não a trates como o elemento central.',
      'Respeita a privacidade — consultas de SSR não devem ter acompanhantes sem consentimento explícito do paciente.',
      'Fornece informação em formatos acessíveis (áudio, pictogramas, linguagem simples, gestos).',
      'Regista as necessidades de acessibilidade no processo clínico do paciente para futuras consultas.',
      'A barreira mais comum não é a deficiência em si — é a atitude do profissional de saúde.',
    ],
  },
  {
    categoria: 'ssr',
    titulo: 'Sinais de alerta — violência e abuso',
    emoji: '🚨',
    urgencia: 'critico',
    conteudo: [
      'Pessoas com deficiência têm 2 a 10 vezes mais risco de sofrer violência e abuso sexual.',
      'Sinais de alerta: lesões inexplicáveis, medo do acompanhante, comportamento ansioso em consulta.',
      'Cria sempre um momento a sós com o paciente durante a consulta para avaliar a segurança.',
      'Em Angola, contacta as autoridades competentes se houver suspeita de abuso a uma pessoa com deficiência.',
      'Não questiones a veracidade do relato — acredita e documenta.',
    ],
  },
]

const COR_URGENCIA = {
  critico: 'bg-red-50 border-red-200 text-red-700',
  essencial: 'bg-laranja/8 border-laranja/25 text-laranja',
  importante: 'bg-blue-50 border-blue-200 text-blue-700',
}

const ROTULO_URGENCIA = {
  critico: '🚨 Crítico',
  essencial: '⭐ Essencial',
  importante: 'ℹ️ Importante',
}

export default function TelaInformacoes({ aoVoltar }) {
  const [categoriaActiva, setCategoriaActiva] = useState('todos')
  const [cardAberto, setCardAberto] = useState(null)

  const infoFiltradas = categoriaActiva === 'todos'
    ? INFORMACOES
    : INFORMACOES.filter(i => i.categoria === categoriaActiva)

  return (
    <div className="min-h-screen fundo-app flex flex-col">

      {/* Cabeçalho */}
      <header className="bg-white border-b border-laranja/10 shadow-sm px-5 pt-8 pb-4 sticky top-0 z-20">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={aoVoltar}
              className="w-10 h-10 rounded-2xl bg-laranja/8 border border-laranja/20
                         flex items-center justify-center text-laranja hover:bg-laranja hover:text-white
                         transition-all duration-200 flex-shrink-0"
            >
              ←
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-laranja rounded-xl flex items-center justify-center
                              text-xl shadow-md shadow-laranja/30">
                📋
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-gray-800 leading-tight">
                  Informações
                </h1>
                <p className="text-gray-400 text-xs font-sans">
                  Guia de atendimento inclusivo em SSR
                </p>
              </div>
            </div>
          </div>

          {/* Filtros de categoria */}
          <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
            {CATEGORIAS.map(cat => (
              <button
                key={cat.id}
                onClick={() => setCategoriaActiva(cat.id)}
                className={`whitespace-nowrap flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl
                            font-sans font-semibold transition-all duration-200 border flex-shrink-0
                            ${categoriaActiva === cat.id
                              ? 'bg-laranja border-laranja text-white shadow-md shadow-laranja/25'
                              : 'bg-white border-laranja/15 text-gray-500 hover:border-laranja/40 hover:text-laranja'
                            }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.rotulo}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Lista de informações */}
      <main className="flex-1 px-5 py-6">
        <div className="max-w-lg mx-auto flex flex-col gap-4">

          {/* Contador */}
          <p className="text-gray-400 text-xs font-sans px-1">
            {infoFiltradas.length} {infoFiltradas.length === 1 ? 'tópico' : 'tópicos'} encontrados
          </p>

          {infoFiltradas.map((info, indice) => (
            <div
              key={indice}
              className="bg-white border border-laranja/10 rounded-3xl shadow-sm
                         overflow-hidden transition-all duration-300
                         hover:shadow-md hover:shadow-laranja/10 hover:border-laranja/25"
            >
              {/* Cabeçalho do card */}
              <button
                onClick={() => setCardAberto(cardAberto === indice ? null : indice)}
                className="w-full text-left p-5 flex items-start gap-4"
              >
                <div className="w-12 h-12 bg-laranja/10 rounded-2xl flex items-center
                                justify-center text-2xl flex-shrink-0">
                  {info.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-display font-bold text-base text-gray-800 leading-tight">
                      {info.titulo}
                    </h3>
                    <span className={`text-xl flex-shrink-0 transition-transform duration-300
                      ${cardAberto === indice ? 'rotate-180' : ''}`}>
                      ⌄
                    </span>
                  </div>
                  <span className={`inline-block mt-2 text-xs font-sans font-semibold
                                   px-2.5 py-1 rounded-full border
                                   ${COR_URGENCIA[info.urgencia]}`}>
                    {ROTULO_URGENCIA[info.urgencia]}
                  </span>
                </div>
              </button>

              {/* Conteúdo expandido */}
              {cardAberto === indice && (
                <div className="px-5 pb-5 animate-deslizar-cima">
                  <div className="linha-laranja mb-4" />
                  <ul className="flex flex-col gap-3">
                    {info.conteudo.map((ponto, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-laranja/10 rounded-full flex items-center
                                        justify-center text-laranja text-xs font-sans font-bold
                                        flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <p className="text-gray-600 font-sans text-sm leading-relaxed">
                          {ponto}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {/* Nota de rodapé */}
          <div className="bg-laranja/5 border border-laranja/15 rounded-2xl p-4 mt-2">
            <p className="text-xs text-gray-500 font-sans leading-relaxed text-center">
              📚 Informações baseadas nas directrizes da OMS, UNFPA e boas práticas internacionais
              de atendimento inclusivo em saúde sexual e reprodutiva.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
