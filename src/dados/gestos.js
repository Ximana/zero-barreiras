// Vocabulário de gestos — cada entrada tem um ficheiro de vídeo correspondente 
// Convenção de paths: /videos/gestos/[chave].mp4
// Para frases compostas: /videos/frases/[chave].mp4 

export const GESTOS_MEDICOS = {

  // ── PARTES DO CORPO ───────────────────────────────────────────
  cabeca: {
    nome: 'Cabeça',
    emoji: '🧠',
    categoria: 'corpo',
    descricao: 'Mão apontando para a cabeça',
    video: '/videos/gestos/cabeca.mp4',
  },
  barriga: {
    nome: 'Barriga',
    emoji: '🫃',
    categoria: 'corpo',
    descricao: 'Mão aberta sobre a barriga',
    video: '/videos/gestos/barriga.mp4',
  },
  peito: {
    nome: 'Peito',
    emoji: '🫀',
    categoria: 'corpo',
    descricao: 'Mão no peito',
    video: '/videos/gestos/peito.mp4',
  },
  costas: {
    nome: 'Costas',
    emoji: '🔙',
    categoria: 'corpo',
    descricao: 'Mão atrás',
    video: '/videos/gestos/costas.mp4',
  },
  utero: {
    nome: 'Útero',
    emoji: '🫄',
    categoria: 'corpo',
    descricao: 'Mãos formando triângulo na zona pélvica',
    video: '/videos/gestos/utero.mp4',
  },
  vagina: {
    nome: 'Vagina',
    emoji: '♀️',
    categoria: 'corpo',
    descricao: 'Gesto específico da LGA — zona pélvica',
    video: '/videos/gestos/vagina.mp4',
  },
  mama: {
    nome: 'Mama',
    emoji: '🫁',
    categoria: 'corpo',
    descricao: 'Mão curvada no peito',
    video: '/videos/gestos/mama.mp4',
  },
  pernas: {
    nome: 'Pernas',
    emoji: '🦵',
    categoria: 'corpo',
    descricao: 'Mão a deslizar pela perna',
    video: '/videos/gestos/pernas.mp4',
  },

  // ── SINTOMAS ──────────────────────────────────────────────────
  dor: {
    nome: 'Dor',
    emoji: '😣',
    categoria: 'sintoma',
    descricao: 'Punho fechado',
    video: '/videos/gestos/dor.mp4',
  },
  dor_forte: {
    nome: 'Dor forte',
    emoji: '😖',
    categoria: 'sintoma',
    descricao: 'Punho fechado com tremor',
    video: '/videos/gestos/dor_forte.mp4',
  },
  febre: {
    nome: 'Febre',
    emoji: '🌡️',
    categoria: 'sintoma',
    descricao: 'Mão na testa',
    video: '/videos/gestos/febre.mp4',
  },
  enjoo: {
    nome: 'Enjoo',
    emoji: '🤢',
    categoria: 'sintoma',
    descricao: 'Mão na boca',
    video: '/videos/gestos/enjoo.mp4',
  },
  sangue: {
    nome: 'Sangramento',
    emoji: '🩸',
    categoria: 'sintoma',
    descricao: 'Indicador apontando para baixo',
    video: '/videos/gestos/sangue.mp4',
  },
  cansaco: {
    nome: 'Cansaço',
    emoji: '😴',
    categoria: 'sintoma',
    descricao: 'Dois dedos abertos para baixo',
    video: '/videos/gestos/cansaco.mp4',
  },
  comichao: {
    nome: 'Comichão',
    emoji: '🖐️',
    categoria: 'sintoma',
    descricao: 'Dedos a coçar a palma',
    video: '/videos/gestos/comichao.mp4',
  },
  corrimento: {
    nome: 'Corrimento',
    emoji: '💧',
    categoria: 'sintoma',
    descricao: 'Dedos a deslizar para baixo',
    video: '/videos/gestos/corrimento.mp4',
  },
  inchaço: {
    nome: 'Inchaço',
    emoji: '🎈',
    categoria: 'sintoma',
    descricao: 'Mãos a afastar como a inflar',
    video: '/videos/gestos/inchaco.mp4',
  },
  tontura: {
    nome: 'Tontura',
    emoji: '😵',
    categoria: 'sintoma',
    descricao: 'Dedo a rodar perto da cabeça',
    video: '/videos/gestos/tontura.mp4',
  },

  // ── SAÚDE SEXUAL E REPRODUTIVA ────────────────────────────────
  gravida: {
    nome: 'Gravidez',
    emoji: '🤰',
    categoria: 'ssr',
    descricao: 'Mãos em arco na barriga',
    video: '/videos/gestos/gravida.mp4',
  },
  menstruacao: {
    nome: 'Menstruação',
    emoji: '🔴',
    categoria: 'ssr',
    descricao: 'Três dedos abertos',
    video: '/videos/gestos/menstruacao.mp4',
  },
  menstruacao_atrasada: {
    nome: 'Menstruação atrasada',
    emoji: '📅',
    categoria: 'ssr',
    descricao: 'Gesto de menstruação + espera',
    video: '/videos/gestos/menstruacao_atrasada.mp4',
  },
  contracepcao: {
    nome: 'Contracepção',
    emoji: '💊',
    categoria: 'ssr',
    descricao: 'Polegar e indicador — pílula',
    video: '/videos/gestos/contracepcao.mp4',
  },
  preservativo: {
    nome: 'Preservativo',
    emoji: '🛡️',
    categoria: 'ssr',
    descricao: 'Gesto de colocar preservativo',
    video: '/videos/gestos/preservativo.mp4',
  },
  ist: {
    nome: 'Infecção (IST)',
    emoji: '🦠',
    categoria: 'ssr',
    descricao: 'Gesto de bactéria/infecção',
    video: '/videos/gestos/ist.mp4',
  },
  parto: {
    nome: 'Parto',
    emoji: '👶',
    categoria: 'ssr',
    descricao: 'Mãos abertas para baixo',
    video: '/videos/gestos/parto.mp4',
  },
  higiene: {
    nome: 'Higiene',
    emoji: '🧼',
    categoria: 'ssr',
    descricao: 'Mãos a lavar',
    video: '/videos/gestos/higiene.mp4',
  },
  absorvente: {
    nome: 'Absorvente',
    emoji: '🩹',
    categoria: 'ssr',
    descricao: 'Mãos planas na zona pélvica',
    video: '/videos/gestos/absorvente.mp4',
  },
  colo_utero: {
    nome: 'Colo do útero',
    emoji: '🔬',
    categoria: 'ssr',
    descricao: 'Gesto combinado de útero + colo',
    video: '/videos/gestos/colo_utero.mp4',
  },
  exame: {
    nome: 'Exame',
    emoji: '🩺',
    categoria: 'ssr',
    descricao: 'Mão em movimento de examinar',
    video: '/videos/gestos/exame.mp4',
  },

  // ── COMUNICAÇÃO ───────────────────────────────────────────────
  sim: {
    nome: 'Sim',
    emoji: '✅',
    categoria: 'comunicacao',
    descricao: 'Polegar para cima',
    video: '/videos/gestos/sim.mp4',
  },
  nao: {
    nome: 'Não',
    emoji: '❌',
    categoria: 'comunicacao',
    descricao: 'Polegar para baixo',
    video: '/videos/gestos/nao.mp4',
  },
  nao_entendo: {
    nome: 'Não entendo',
    emoji: '❓',
    categoria: 'comunicacao',
    descricao: 'Mão aberta em movimento lateral',
    video: '/videos/gestos/nao_entendo.mp4',
  },
  repetir: {
    nome: 'Repetir',
    emoji: '🔁',
    categoria: 'comunicacao',
    descricao: 'Dedo indicador em círculo',
    video: '/videos/gestos/repetir.mp4',
  },
  obrigado: {
    nome: 'Obrigado',
    emoji: '🙏',
    categoria: 'comunicacao',
    descricao: 'Mão no peito inclinando a cabeça',
    video: '/videos/gestos/obrigado.mp4',
  },
  pouco: {
    nome: 'Pouco',
    emoji: '🤏',
    categoria: 'comunicacao',
    descricao: 'Indicador e polegar quase a tocar',
    video: '/videos/gestos/pouco.mp4',
  },
  muito: {
    nome: 'Muito',
    emoji: '🙌',
    categoria: 'comunicacao',
    descricao: 'Mãos afastando-se',
    video: '/videos/gestos/muito.mp4',
  },
  sempre: {
    nome: 'Sempre',
    emoji: '♾️',
    categoria: 'comunicacao',
    descricao: 'Dedo indicador em círculo contínuo',
    video: '/videos/gestos/sempre.mp4',
  },
  as_vezes: {
    nome: 'Às vezes',
    emoji: '🔄',
    categoria: 'comunicacao',
    descricao: 'Mão a balançar lateralmente',
    video: '/videos/gestos/as_vezes.mp4',
  },
  hoje: {
    nome: 'Hoje',
    emoji: '📅',
    categoria: 'comunicacao',
    descricao: 'Indicador apontando para baixo, no presente',
    video: '/videos/gestos/hoje.mp4',
  },
  dias: {
    nome: 'Dias',
    emoji: '🗓️',
    categoria: 'comunicacao',
    descricao: 'Dedos a contar',
    video: '/videos/gestos/dias.mp4',
  },

  // ── URGÊNCIA ──────────────────────────────────────────────────
  urgente: {
    nome: 'Urgente',
    emoji: '🚨',
    categoria: 'urgencia',
    descricao: 'Indicador para cima em movimento',
    video: '/videos/gestos/urgente.mp4',
  },
  ajuda: {
    nome: 'Ajuda',
    emoji: '🆘',
    categoria: 'urgencia',
    descricao: 'Mão aberta, 5 dedos',
    video: '/videos/gestos/ajuda.mp4',
  },
  chamar_medico: {
    nome: 'Chamar médico',
    emoji: '📣',
    categoria: 'urgencia',
    descricao: 'Mão a acenar para chamar',
    video: '/videos/gestos/chamar_medico.mp4',
  },

  // ── CONTEXTO MÉDICO ───────────────────────────────────────────
  medicamento: {
    nome: 'Medicamento',
    emoji: '💊',
    categoria: 'geral',
    descricao: 'Polegar e indicador juntos',
    video: '/videos/gestos/medicamento.mp4',
  },
  medico: {
    nome: 'Médico',
    emoji: '👨‍⚕️',
    categoria: 'geral',
    descricao: 'Dois dedos juntos',
    video: '/videos/gestos/medico.mp4',
  },
  hospital: {
    nome: 'Hospital',
    emoji: '🏥',
    categoria: 'geral',
    descricao: 'Quatro dedos abertos',
    video: '/videos/gestos/hospital.mp4',
  },
  consulta: {
    nome: 'Consulta',
    emoji: '📋',
    categoria: 'geral',
    descricao: 'Indicador e médio abertos',
    video: '/videos/gestos/consulta.mp4',
  },
  agua: {
    nome: 'Água',
    emoji: '💧',
    categoria: 'geral',
    descricao: 'Dedos curvados para baixo',
    video: '/videos/gestos/agua.mp4',
  },
  familia: {
    nome: 'Família',
    emoji: '👨‍👩‍👧',
    categoria: 'geral',
    descricao: 'Ambas as mãos unidas',
    video: '/videos/gestos/familia.mp4',
  },
  resultado: {
    nome: 'Resultado',
    emoji: '📄',
    categoria: 'geral',
    descricao: 'Mão aberta a virar',
    video: '/videos/gestos/resultado.mp4',
  },
  cirurgia: {
    nome: 'Cirurgia',
    emoji: '🔪',
    categoria: 'geral',
    descricao: 'Mão a simular corte',
    video: '/videos/gestos/cirurgia.mp4',
  },
}

// ── FRASES COMPLETAS EM LINGUAGEM GESTUAL ─────────────────────────────────────

export const FRASES_GESTUAIS = {

  bom_dia: {
    texto: 'Bom dia',
    categoria: 'geral',
    gestos: ['sim', 'obrigado'],
    video_frase: '/videos/frases/bom_dia.mp4',
  },
  boa_tarde: {
    texto: 'Boa tarde',
    categoria: 'geral',
    gestos: ['sim', 'obrigado'],
    video_frase: '/videos/frases/boa_tarde.mp4',
  },
  boa_noite: {
    texto: 'Boa noite',
    categoria: 'geral',
    gestos: ['sim', 'obrigado'],
    video_frase: '/videos/frases/boa_noite.mp4',
  },
  como_estas: {
    texto: 'Como estas',
    categoria: 'geral',
    gestos: ['sim', 'obrigado'],
    video_frase: '/videos/frases/como_estas.mp4',
  },
  tudo_bem: {
    texto: 'Tudo bem',
    categoria: 'geral',
    gestos: ['sim', 'obrigado'],
    video_frase: '/videos/frases/tudo_bem.mp4',
  },
  tenho_dor_barriga: {
    texto: 'Tenho dor na barriga',
    categoria: 'sintoma',
    gestos: ['dor', 'barriga'],
    video_frase: '/videos/frases/tenho_dor_barriga.mp4',
  },
  dor_muito_forte: {
    texto: 'A dor é muito forte',
    categoria: 'sintoma',
    gestos: ['dor', 'muito'],
    video_frase: '/videos/frases/dor_muito_forte.mp4',
  },
  dor_pouca: {
    texto: 'A dor é pouca / fraca',
    categoria: 'sintoma',
    gestos: ['dor', 'pouco'],
    video_frase: '/videos/frases/dor_pouca.mp4',
  },
  tenho_febre: {
    texto: 'Tenho febre',
    categoria: 'sintoma',
    gestos: ['febre'],
    video_frase: '/videos/frases/tenho_febre.mp4',
  },
  estou_com_enjoo: {
    texto: 'Estou com enjoo',
    categoria: 'sintoma',
    gestos: ['enjoo'],
    video_frase: '/videos/frases/estou_com_enjoo.mp4',
  },
  tenho_sangramento: {
    texto: 'Estou com sangramento',
    categoria: 'sintoma',
    gestos: ['sangue'],
    video_frase: '/videos/frases/tenho_sangramento.mp4',
  },
  sangramento_barriga: {
    texto: 'Tenho sangramento na zona da barriga / vaginal',
    categoria: 'sintoma',
    gestos: ['sangue', 'barriga'],
    video_frase: '/videos/frases/sangramento_barriga.mp4',
  },
  ha_quantos_dias: {
    texto: 'Há quantos dias?',
    categoria: 'pergunta',
    gestos: ['dias'],
    video_frase: '/videos/frases/ha_quantos_dias.mp4',
  },
  menstruacao_atrasada: {
    texto: 'A minha menstruação está atrasada',
    categoria: 'ssr',
    gestos: ['menstruacao', 'menstruacao_atrasada'],
    video_frase: '/videos/frases/menstruacao_atrasada.mp4',
  },
  menstruacao_irregular: {
    texto: 'A minha menstruação é irregular',
    categoria: 'ssr',
    gestos: ['menstruacao', 'as_vezes'],
    video_frase: '/videos/frases/menstruacao_irregular.mp4',
  },
  menstruacao_com_dor: {
    texto: 'Tenho muita dor durante a menstruação',
    categoria: 'ssr',
    gestos: ['menstruacao', 'dor', 'muito'],
    video_frase: '/videos/frases/menstruacao_com_dor.mp4',
  },
  sangramento_fora_periodo: {
    texto: 'Tenho sangramento fora do período',
    categoria: 'ssr',
    gestos: ['menstruacao', 'sangue'],
    video_frase: '/videos/frases/sangramento_fora_periodo.mp4',
  },
  uso_absorvente: {
    texto: 'Uso absorvente',
    categoria: 'ssr',
    gestos: ['absorvente', 'higiene'],
    video_frase: '/videos/frases/uso_absorvente.mp4',
  },
  posso_estar_gravida: {
    texto: 'Posso estar grávida',
    categoria: 'ssr',
    gestos: ['gravida'],
    video_frase: '/videos/frases/posso_estar_gravida.mp4',
  },
  gravida_com_dor: {
    texto: 'Estou grávida e tenho dor',
    categoria: 'ssr',
    gestos: ['gravida', 'dor'],
    video_frase: '/videos/frases/gravida_com_dor.mp4',
  },
  gravida_com_sangramento: {
    texto: 'Estou grávida e tenho sangramento — é urgente',
    categoria: 'ssr',
    gestos: ['gravida', 'sangue', 'urgente'],
    video_frase: '/videos/frases/gravida_sangramento_urgente.mp4',
  },
  parto_urgente: {
    texto: 'Estou em trabalho de parto, é urgente',
    categoria: 'ssr',
    gestos: ['parto', 'urgente', 'ajuda'],
    video_frase: '/videos/frases/parto_urgente.mp4',
  },
  quero_contracepcao: {
    texto: 'Quero método contraceptivo',
    categoria: 'ssr',
    gestos: ['contracepcao'],
    video_frase: '/videos/frases/quero_contracepcao.mp4',
  },
  usar_preservativo: {
    texto: 'Quero preservativo',
    categoria: 'ssr',
    gestos: ['preservativo'],
    video_frase: '/videos/frases/usar_preservativo.mp4',
  },
  tenho_corrimento: {
    texto: 'Tenho corrimento vaginal',
    categoria: 'ssr',
    gestos: ['corrimento', 'vagina'],
    video_frase: '/videos/frases/tenho_corrimento.mp4',
  },
  corrimento_com_comichao: {
    texto: 'Tenho corrimento com comichão',
    categoria: 'ssr',
    gestos: ['corrimento', 'comichao'],
    video_frase: '/videos/frases/corrimento_comichao.mp4',
  },
  suspeita_ist: {
    texto: 'Suspeito de infecção / IST',
    categoria: 'ssr',
    gestos: ['ist', 'exame'],
    video_frase: '/videos/frases/suspeita_ist.mp4',
  },
  fazer_exame: {
    texto: 'Preciso fazer um exame',
    categoria: 'ssr',
    gestos: ['exame'],
    video_frase: '/videos/frases/fazer_exame.mp4',
  },
  exame_colo_utero: {
    texto: 'Preciso de exame ao colo do útero',
    categoria: 'ssr',
    gestos: ['colo_utero', 'exame'],
    video_frase: '/videos/frases/exame_colo_utero.mp4',
  },
  preciso_ajuda_urgente: {
    texto: 'Preciso de ajuda urgente',
    categoria: 'urgencia',
    gestos: ['ajuda', 'urgente'],
    video_frase: '/videos/frases/preciso_ajuda_urgente.mp4',
  },
  chamar_medico_agora: {
    texto: 'Chame o médico agora',
    categoria: 'urgencia',
    gestos: ['chamar_medico', 'urgente'],
    video_frase: '/videos/frases/chamar_medico_agora.mp4',
  },
  nao_consigo_respirar: {
    texto: 'Não consigo respirar bem',
    categoria: 'urgencia',
    gestos: ['peito', 'dor_forte', 'urgente'],
    video_frase: '/videos/frases/nao_consigo_respirar.mp4',
  },
  onde_doi: {
    texto: 'Onde dói?',
    categoria: 'pergunta_medico',
    gestos: ['dor'],
    video_frase: '/videos/frases/onde_doi.mp4',
  },
  desde_quando: {
    texto: 'Desde quando tens este problema?',
    categoria: 'pergunta_medico',
    gestos: ['dias', 'sempre'],
    video_frase: '/videos/frases/desde_quando.mp4',
  },
  ja_tomou_medicamento: {
    texto: 'Já tomaste algum medicamento?',
    categoria: 'pergunta_medico',
    gestos: ['medicamento', 'sim', 'nao'],
    video_frase: '/videos/frases/ja_tomou_medicamento.mp4',
  },
  esta_gravida: {
    texto: 'Estás grávida?',
    categoria: 'pergunta_medico',
    gestos: ['gravida', 'sim', 'nao'],
    video_frase: '/videos/frases/esta_gravida.mp4',
  },
  toma_contracepcao: {
    texto: 'Usas algum método contraceptivo?',
    categoria: 'pergunta_medico',
    gestos: ['contracepcao', 'sim', 'nao'],
    video_frase: '/videos/frases/toma_contracepcao.mp4',
  },
  ultima_menstruacao: {
    texto: 'Quando foi a tua última menstruação?',
    categoria: 'pergunta_medico',
    gestos: ['menstruacao', 'dias'],
    video_frase: '/videos/frases/ultima_menstruacao.mp4',
  },
  dor_forte_ou_fraca: {
    texto: 'A dor é forte ou fraca?',
    categoria: 'pergunta_medico',
    gestos: ['dor', 'muito', 'pouco'],
    video_frase: '/videos/frases/dor_forte_ou_fraca.mp4',
  },
  tens_corrimento: {
    texto: 'Tens corrimento vaginal?',
    categoria: 'pergunta_medico',
    gestos: ['corrimento', 'sim', 'nao'],
    video_frase: '/videos/frases/tens_corrimento.mp4',
  },
  tens_comichao: {
    texto: 'Tens comichão?',
    categoria: 'pergunta_medico',
    gestos: ['comichao', 'sim', 'nao'],
    video_frase: '/videos/frases/tens_comichao.mp4',
  },
  vou_receitar_medicamento: {
    texto: 'Vou receitar-te um medicamento',
    categoria: 'orientacao_medico',
    gestos: ['medicamento'],
    video_frase: '/videos/frases/vou_receitar_medicamento.mp4',
  },
  precisa_exame: {
    texto: 'Precisas de fazer um exame',
    categoria: 'orientacao_medico',
    gestos: ['exame'],
    video_frase: '/videos/frases/precisa_exame.mp4',
  },
  volta_amanha: {
    texto: 'Volta amanhã',
    categoria: 'orientacao_medico',
    gestos: ['hospital', 'hoje'],
    video_frase: '/videos/frases/volta_amanha.mp4',
  },
  beber_agua: {
    texto: 'Bebe bastante água',
    categoria: 'orientacao_medico',
    gestos: ['agua', 'muito'],
    video_frase: '/videos/frases/beber_agua.mp4',
  },
  manter_higiene: {
    texto: 'Mantém uma boa higiene íntima',
    categoria: 'orientacao_medico',
    gestos: ['higiene', 'vagina'],
    video_frase: '/videos/frases/manter_higiene.mp4',
  },
}

// ── METADADOS DE CATEGORIAS ───────────────────────────────────────────────────

export const CATEGORIAS = {
  corpo:      { nome: 'Partes do Corpo',             cor: 'blue'   },
  sintoma:    { nome: 'Sintomas',                     cor: 'red'    },
  ssr:        { nome: 'Saúde Sexual e Reprodutiva',   cor: 'purple' },
  urgencia:   { nome: 'Urgência',                     cor: 'orange' },
  comunicacao:{ nome: 'Comunicação',                  cor: 'green'  },
  geral:      { nome: 'Geral',                        cor: 'gray'   },
}

export const CATEGORIAS_FRASES = {
  sintoma:            { nome: 'Sintomas',                cor: 'red'    },
  ssr:                { nome: 'SSR',                     cor: 'purple' },
  urgencia:           { nome: 'Urgência',                cor: 'orange' },
  pergunta_medico:    { nome: 'Perguntas do Médico',     cor: 'blue'   },
  orientacao_medico:  { nome: 'Orientações do Médico',   cor: 'green'  },
  geral:              { nome: 'Geral',                   cor: 'gray'   },
}

// ── HELPERS ───────────────────────────────────────────────────────────────────

export const GESTOS_POR_CATEGORIA = Object.entries(GESTOS_MEDICOS).reduce((acc, [chave, gesto]) => {
  if (!acc[gesto.categoria]) acc[gesto.categoria] = []
  acc[gesto.categoria].push({ chave, ...gesto })
  return acc
}, {})

// ── NORMALIZAÇÃO ──────────────────────────────────────────────────────────────

function norm(s) {
  return s
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

// ── MAPA DE KEYWORDS → GESTOS INDIVIDUAIS ────────────────────────────────────
// Usado como fallback quando nenhuma frase completa é encontrada.
// Ordenado do mais específico (multi-palavra) para o mais genérico.

const MAPA_KW = [
  // Urgência
  { p: ['urgente','urgencia','emergencia','emergente','socorro imediato'],   g: 'urgente'            },
  { p: ['preciso de ajuda','precisa de ajuda','socorro','auxilio','ajuda'],  g: 'ajuda'              },
  { p: ['chamar medico','chame o medico','chama o medico','chama medico'],   g: 'chamar_medico'      },
  // Dor composta
  { p: ['dor forte','doi muito','dor intensa','muita dor','dor severa','dor aguda'], g: 'dor_forte' },
  { p: ['dor de cabeca','dor na cabeca','cabeca dor','dor cabeca'],          g: 'cabeca'             },
  { p: ['dor na barriga','dor abdominal','dor pelvica','dor no abdomen'],    g: 'barriga'            },
  { p: ['dor no peito','dor peito','dor toracica'],                          g: 'peito'              },
  { p: ['dor nas costas','dor costas','dor lombar'],                         g: 'costas'             },
  { p: ['dor'],                                                               g: 'dor'                },
  // Partes do corpo
  { p: ['cabeca','cefalia'],                                                  g: 'cabeca'             },
  { p: ['barriga','abdomen','abdominal','pelvica','pelvico','ventre'],        g: 'barriga'            },
  { p: ['peito','torax','toracica','esternao'],                               g: 'peito'              },
  { p: ['mama','mamas','seio','seios','mamaria'],                             g: 'mama'               },
  { p: ['costas','lombar','lombares','coluna'],                               g: 'costas'             },
  { p: ['perna','pernas','membro inferior'],                                  g: 'pernas'             },
  { p: ['colo do utero','colo uterino','cervical','cervix'],                  g: 'colo_utero'         },
  { p: ['utero','uterina','uterino'],                                         g: 'utero'              },
  { p: ['vagina','vaginal','intima','genital','ginecologica'],                 g: 'vagina'             },
  // Sintomas
  { p: ['febre','temperatura alta','calor','febril'],                         g: 'febre'              },
  { p: ['enjoo','nausea','vomito','vomitar','vomitando','mal estar'],         g: 'enjoo'              },
  { p: ['sangramento','sangue','sangrando','hemorragia','hemorragi'],         g: 'sangue'             },
  { p: ['cansaco','cansada','cansado','fraqueza','fraca','fraco','fadiga'],   g: 'cansaco'            },
  { p: ['comichao','coceira','prurido','cocar','comichoes'],                  g: 'comichao'           },
  { p: ['corrimento','corrimentos','secrecao vaginal','corrimento vaginal'],  g: 'corrimento'         },
  { p: ['inchaco','inchada','inchado','inchamento','edema'],                  g: 'inchaço'            },
  { p: ['tontura','tonturas','vertigem','girando'],                           g: 'tontura'            },
  // SSR
  { p: ['menstruacao atrasada','periodo atrasado','regra atrasada'],          g: 'menstruacao_atrasada' },
  { p: ['trabalho de parto','vai parir','vai dar a luz'],                     g: 'parto'              },
  { p: ['penso higienico','absorvente higienico'],                            g: 'absorvente'         },
  { p: ['higiene intima','limpeza intima','higiene vaginal'],                  g: 'higiene'            },
  { p: ['metodo contraceptivo','contracepcao','anticoncepcional','contracetivo','pilula','pilulas'], g: 'contracepcao' },
  { p: ['gravida','gravidez','gestante','gestacao'],                           g: 'gravida'            },
  { p: ['menstruacao','menstrual','periodo menstrual','regra','ciclo'],        g: 'menstruacao'        },
  { p: ['preservativo','camisinha','condom'],                                  g: 'preservativo'       },
  { p: ['infeccao sexualmente','ist','dst','infeccao sexual','doenca sexual'], g: 'ist'                },
  { p: ['infeccao','inflamacao'],                                              g: 'ist'                },
  { p: ['absorvente'],                                                         g: 'absorvente'         },
  { p: ['higiene','limpeza'],                                                  g: 'higiene'            },
  { p: ['parto','parir','dar a luz'],                                          g: 'parto'              },
  // Comunicação
  { p: ['nao entendo','nao percebi','nao compreendo','nao estou a perceber'], g: 'nao_entendo'        },
  { p: ['de novo','outra vez','repetir','repete','repita'],                   g: 'repetir'            },
  { p: ['obrigado','obrigada','agradeco'],                                    g: 'obrigado'           },
  { p: ['bastante','demasiado','muito','intenso','intensa'],                  g: 'muito'              },
  { p: ['pouco','ligeiro','ligeira','leve'],                                   g: 'pouco'              },
  { p: ['sempre','constante','constantemente','continuo','permanente'],        g: 'sempre'             },
  { p: ['as vezes','por vezes','ocasional','de vez em quando'],               g: 'as_vezes'           },
  { p: ['ha quanto tempo','ha quantos dias','quantos dias','quando comecou'], g: 'dias'               },
  { p: ['hoje','agora','neste momento'],                                       g: 'hoje'               },
  { p: ['dias','semanas','meses'],                                             g: 'dias'               },
  { p: ['confirmo','afirmativo','correcto','certo','sim'],                     g: 'sim'                },
  { p: ['nego','negativo','nao ','nao,','nao.'],                              g: 'nao'                },
  // Contexto médico
  { p: ['exame','exames','analise','analises','teste','rastreio'],             g: 'exame'              },
  { p: ['medicamento','medicamentos','remedio','remedios','comprimido','comprimidos','capsula'], g: 'medicamento' },
  { p: ['medico','medica','doutor','doutora','clinico','dr ','dra '],          g: 'medico'             },
  { p: ['hospital','clinica','centro de saude','unidade de saude','urgencias'], g: 'hospital'          },
  { p: ['consulta','consultar','consultorio','atendimento'],                   g: 'consulta'           },
  { p: ['resultado','resultados','diagnostico','relatorio'],                   g: 'resultado'          },
  { p: ['cirurgia','operacao','operar','intervencao'],                         g: 'cirurgia'           },
  { p: ['agua','hidratacao','beber agua','bebe agua'],                         g: 'agua'               },
  { p: ['familia','familiar','familiares','parente'],                          g: 'familia'            },
]

// ── MOTOR DE MAPEAMENTO TEXTO → SEQUÊNCIA TIPADA ──────────────────────────────
//
// Retorna um array de itens com dois tipos possíveis:
//
//   { tipo: 'frase', chave, video, texto, emoji }
//     → usar o video_frase da frase completa
//
//   { tipo: 'gesto', chave, video, nome, emoji, descricao }
//     → usar o video do gesto individual
//
// Estratégia:
//   1. Varre o texto à procura de frases completas do banco (do mais longo para
//      o mais curto), marcando as posições já consumidas.
//   2. Para o texto que sobrou entre as frases, aplica o MAPA_KW (keyword a
//      keyword) para construir gestos individuais.
//   3. Mantém a ordem de aparecimento no texto original.

export function textoParaSequenciaGestos(texto) {
  const t = norm(texto)

  // ── Passo 1: encontrar todas as frases do banco presentes no texto ─────────
  // Ordena por comprimento decrescente para preferir frases mais longas/específicas
  const frasesOrd = Object.entries(FRASES_GESTUAIS)
    .map(([chave, frase]) => ({ chave, ...frase, normTexto: norm(frase.texto) }))
    .sort((a, b) => b.normTexto.length - a.normTexto.length)

  // Regista segmentos encontrados: { inicio, fim, item }
  const segmentos = []
  let textoRestante = t

  for (const frase of frasesOrd) {
    const idx = textoRestante.indexOf(frase.normTexto)
    if (idx === -1) continue

    // Calcula posição real no texto original normalizado
    const inicioReal = t.indexOf(frase.normTexto)
    if (inicioReal === -1) continue

    // Verifica sobreposição com segmentos já encontrados
    const fim = inicioReal + frase.normTexto.length
    const sobrepos = segmentos.some(s => inicioReal < s.fim && fim > s.inicio)
    if (sobrepos) continue

    segmentos.push({
      inicio: inicioReal,
      fim,
      item: {
        tipo: 'frase',
        chave: frase.chave,
        video: frase.video_frase,
        texto: frase.texto,
        emoji: '🗣️',
      },
    })

    // Remove a frase encontrada do texto restante para não re-processar
    textoRestante = textoRestante.slice(0, inicioReal) +
      ' '.repeat(frase.normTexto.length) +
      textoRestante.slice(fim)
  }

  // ── Passo 2: para o texto restante, aplicar MAPA_KW ───────────────────────
  // Recolhe gestos individuais das partes do texto não cobertas por frases
  const gestosExtras = []
  for (const { p: palavras, g: gesto } of MAPA_KW) {
    if (!GESTOS_MEDICOS[gesto]) continue
    if (gestosExtras.includes(gesto)) continue
    // Verifica se a keyword existe no texto restante (zonas não cobertas por frases)
    if (palavras.some(kw => textoRestante.includes(kw))) {
      gestosExtras.push(gesto)
    }
  }

  // ── Passo 3: montar a sequência final ordenada pela posição no texto ───────
  // Ordena segmentos de frases por ordem de aparecimento
  segmentos.sort((a, b) => a.inicio - b.inicio)

  const sequencia = [
    ...segmentos.map(s => s.item),
    ...gestosExtras.map(chave => {
      const g = GESTOS_MEDICOS[chave]
      return {
        tipo: 'gesto',
        chave,
        video: g.video,
        nome: g.nome,
        emoji: g.emoji,
        descricao: g.descricao,
      }
    }),
  ]

  // Fallback: se não encontrou nada, mostra "não entendo"
  if (sequencia.length === 0) {
    return [{
      tipo: 'gesto',
      chave: 'nao_entendo',
      video: GESTOS_MEDICOS.nao_entendo.video,
      nome: GESTOS_MEDICOS.nao_entendo.nome,
      emoji: GESTOS_MEDICOS.nao_entendo.emoji,
      descricao: GESTOS_MEDICOS.nao_entendo.descricao,
    }]
  }

  return sequencia
}