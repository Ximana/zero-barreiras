// Vocabulário de gestos médicos para o contexto de Saúde Sexual e Reprodutiva em Angola

export const GESTOS_MEDICOS = {
  // === PARTES DO CORPO ===
  cabeca: {
    nome: 'Cabeça',
    emoji: '🧠',
    categoria: 'corpo',
    descricao: 'Mão apontando para a cabeça'
  },
  barriga: {
    nome: 'Barriga',
    emoji: '🫃',
    categoria: 'corpo',
    descricao: 'Mão aberta sobre a barriga'
  },
  peito: {
    nome: 'Peito',
    emoji: '🫀',
    categoria: 'corpo',
    descricao: 'Mão no peito'
  },
  costas: {
    nome: 'Costas',
    emoji: '🔙',
    categoria: 'corpo',
    descricao: 'Mão atrás'
  },

  // === SINTOMAS ===
  dor: {
    nome: 'Dor',
    emoji: '😣',
    categoria: 'sintoma',
    descricao: 'Punho fechado'
  },
  febre: {
    nome: 'Febre',
    emoji: '🌡️',
    categoria: 'sintoma',
    descricao: 'Mão na testa'
  },
  enjoo: {
    nome: 'Enjoo',
    emoji: '🤢',
    categoria: 'sintoma',
    descricao: 'Mão na boca'
  },
  sangue: {
    nome: 'Sangramento',
    emoji: '🩸',
    categoria: 'sintoma',
    descricao: 'Indicador apontando para baixo'
  },
  cansaco: {
    nome: 'Cansaço',
    emoji: '😴',
    categoria: 'sintoma',
    descricao: 'Dois dedos abertos para baixo'
  },

  // === SAÚDE SEXUAL E REPRODUTIVA ===
  gravida: {
    nome: 'Gravidez',
    emoji: '🤰',
    categoria: 'ssr',
    descricao: 'Mãos em arco na barriga'
  },
  menstruacao: {
    nome: 'Menstruação',
    emoji: '🔴',
    categoria: 'ssr',
    descricao: 'Três dedos abertos'
  },
  medicamento: {
    nome: 'Medicamento',
    emoji: '💊',
    categoria: 'geral',
    descricao: 'Polegar e indicador juntos'
  },

  // === URGÊNCIA E COMUNICAÇÃO ===
  urgente: {
    nome: 'Urgente',
    emoji: '🚨',
    categoria: 'urgencia',
    descricao: 'Indicador para cima em movimento'
  },
  ajuda: {
    nome: 'Ajuda',
    emoji: '🆘',
    categoria: 'urgencia',
    descricao: 'Mão aberta, 5 dedos'
  },
  sim: {
    nome: 'Sim',
    emoji: '✅',
    categoria: 'comunicacao',
    descricao: 'Polegar para cima'
  },
  nao: {
    nome: 'Não',
    emoji: '❌',
    categoria: 'comunicacao',
    descricao: 'Polegar para baixo'
  },
  nao_entendo: {
    nome: 'Não entendo',
    emoji: '❓',
    categoria: 'comunicacao',
    descricao: 'Mão aberta em movimento lateral'
  },

  // === CONTEXTO MÉDICO ===
  medico: {
    nome: 'Médico',
    emoji: '👨‍⚕️',
    categoria: 'geral',
    descricao: 'Dois dedos juntos'
  },
  hospital: {
    nome: 'Hospital',
    emoji: '🏥',
    categoria: 'geral',
    descricao: 'Quatro dedos abertos'
  },
  consulta: {
    nome: 'Consulta',
    emoji: '📋',
    categoria: 'geral',
    descricao: 'Indicador e médio abertos'
  },
  agua: {
    nome: 'Água',
    emoji: '💧',
    categoria: 'geral',
    descricao: 'Dedos curvados para baixo'
  },
  familia: {
    nome: 'Família',
    emoji: '👨‍👩‍👧',
    categoria: 'geral',
    descricao: 'Ambas as mãos unidas'
  },
}

// Gestos agrupados por categoria para a UI
export const CATEGORIAS = {
  corpo: { nome: 'Partes do Corpo', cor: 'blue' },
  sintoma: { nome: 'Sintomas', cor: 'red' },
  ssr: { nome: 'Saúde Sexual e Reprodutiva', cor: 'purple' },
  urgencia: { nome: 'Urgência', cor: 'orange' },
  comunicacao: { nome: 'Comunicação', cor: 'green' },
  geral: { nome: 'Geral', cor: 'gray' },
}

// Gestos por categoria
export const GESTOS_POR_CATEGORIA = Object.entries(GESTOS_MEDICOS).reduce((acc, [chave, gesto]) => {
  if (!acc[gesto.categoria]) acc[gesto.categoria] = []
  acc[gesto.categoria].push({ chave, ...gesto })
  return acc
}, {})
