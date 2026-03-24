import { GoogleGenerativeAI } from '@google/generative-ai'

const obterChave = () => {
  const chave = import.meta.env.VITE_GEMINI_API_KEY
  if (!chave || chave === 'coloca_aqui_a_tua_chave_gemini') {
    throw new Error('CHAVE_GEMINI_NAO_CONFIGURADA')
  }
  return chave
}

const obterModelo = () => {
  const modelo = import.meta.env.VITE_GEMINI_MODELO
  if (!modelo) {
    throw new Error('MODELO_GEMINI_NAO_CONFIGURADO')
  }
  return modelo
}

export async function gestosParaFrase(gestos) {
  const genAI = new GoogleGenerativeAI(obterChave())
  const modelo = genAI.getGenerativeModel({ model: obterModelo() })

  const prompt = `És um intérprete médico numa unidade de saúde em Angola.
O teu trabalho é converter gestos de um paciente surdo numa frase clínica clara para o médico entender.

CONTEXTO DO SISTEMA:
- O tema é Saúde Sexual e Reprodutiva (SSR)
- Os gestos representam partes do corpo, sintomas ou intenções de comunicação
- A frase deve soar como o paciente está a falar na primeira pessoa
- Usa Português angolano natural, simples e directo

SIGNIFICADO DE CADA GESTO:
- cabeca = dor ou problema na cabeça
- barriga = dor ou desconforto abdominal / zona pélvica
- peito = dor ou aperto no peito / mamas
- costas = dor nas costas / zona lombar
- dor = há dor nessa zona
- febre = tenho febre / estou com calor
- enjoo = estou com enjoo / vontade de vomitar
- sangue = há sangramento
- cansaco = estou muito cansado / fraco
- gravida = estou grávida / pode estar grávida
- menstruacao = problema com a menstruação / menstruação atrasada ou irregular
- medicamento = preciso de medicamento / estou a tomar medicamento
- urgente = é urgente / preciso de ajuda imediata
- ajuda = preciso de ajuda
- sim = sim / confirmo
- nao = não / nego
- medico = preciso falar com o médico
- hospital = preciso ir ao hospital
- consulta = preciso de uma consulta
- agua = preciso de água
- familia = é sobre a minha família / tenho familiar com problema
- nao_entendo = não estou a perceber

GESTOS DO PACIENTE (por ordem): ${gestos.join(', ')}

REGRAS PARA CONSTRUIR A FRASE:
1. Combina os gestos de forma lógica e clínica — ex: [barriga, dor, urgente] = "Tenho dor forte na barriga, é urgente"
2. Se aparecer [parte do corpo + dor] — junta numa só queixa: "Tenho dor de cabeça"
3. Se aparecer [sangue + barriga/menstruacao] — contexto de SSR: "Estou com sangramento vaginal"
4. Se aparecer [gravida + dor/sangue] — situação de risco: menciona gravidez primeiro
5. Se aparecer [urgente/ajuda] — começa a frase a indicar urgência
6. Fala sempre na primeira pessoa ("Tenho", "Estou", "Preciso")
7. Máximo 2 frases. Sem introduções, sem explicações.

EXEMPLOS:
- [dor, cabeca] → "Tenho dor de cabeça."
- [barriga, dor, urgente] → "Tenho dor forte na barriga, preciso de ajuda urgente."
- [gravida, sangue, urgente] → "Estou grávida e estou com sangramento, é urgente."
- [febre, enjoo, barriga] → "Tenho febre, enjoo e dor na barriga."
- [menstruacao, sangue] → "Estou com sangramento fora do período normal."
- [ajuda, nao_entendo] → "Preciso de ajuda, não estou a perceber o que se passa."

Responde APENAS com a frase do paciente, sem aspas, sem explicações.`

  const resultado = await modelo.generateContent(prompt)
  return resultado.response.text().trim()
}

export async function textoParaRespostaSimples(textoMedico) {
  const genAI = new GoogleGenerativeAI(obterChave())
  const modelo = genAI.getGenerativeModel({ model: obterModelo() })

  const prompt = `És um assistente médico numa unidade de saúde em Angola.
O médico falou com um paciente surdo e precisas de fazer duas coisas:
1. Simplificar a mensagem do médico para linguagem muito simples
2. Sugerir gestos que o paciente pode usar para responder

MENSAGEM DO MÉDICO: "${textoMedico}"

REGRAS PARA SIMPLIFICAR:
- Usa frases curtas e directas, máximo 15 palavras
- Sem termos médicos complexos — substitui por linguagem do dia a dia
- Fala directamente com o paciente ("Tens dor?", "Onde dói?")
- Se for uma pergunta, mantém como pergunta simples
- Usa Português angolano natural

EXEMPLOS DE SIMPLIFICAÇÃO:
- "O paciente apresenta sintomatologia abdominal?" → "Tens dor na barriga?"
- "Está a experienciar alguma hemorragia vaginal?" → "Tens sangramento?"
- "Qual é a intensidade da dor numa escala de 1 a 10?" → "A dor é forte ou fraca?"
- "Tem histórico de patologias reprodutivas?" → "Já tiveste problemas assim antes?"

GESTOS DISPONÍVEIS PARA SUGERIR (escolhe os mais relevantes para responder à mensagem):
sim, nao, dor, cabeca, barriga, peito, costas, febre, enjoo, sangue, cansaco, gravida, menstruacao, urgente, ajuda, medico, hospital, consulta, agua, familia, medicamento, nao_entendo

REGRAS PARA SUGERIR GESTOS:
- Sugere entre 2 a 4 gestos que fazem sentido como resposta à mensagem simplificada
- Se for pergunta de sim/não → inclui sempre "sim" e "nao"
- Se for pergunta sobre localização da dor → sugere partes do corpo relevantes
- Se for pergunta sobre sintomas → sugere os sintomas relevantes
- Inclui "nao_entendo" quando a mensagem pode ser confusa para o paciente

Responde SOMENTE em JSON válido, sem markdown, sem backticks, neste formato exacto:
{"mensagem_simples":"texto aqui","gestos_sugeridos":["gesto1","gesto2","gesto3"]}`

  const resultado = await modelo.generateContent(prompt)
  const texto = resultado.response.text().trim()
    .replace(/```json/g, '').replace(/```/g, '').trim()

  try {
    return JSON.parse(texto)
  } catch {
    return {
      mensagem_simples: textoMedico,
      gestos_sugeridos: ['sim', 'nao', 'nao_entendo']
    }
  }
}

export async function gerarResumoDaConsulta(historico) {
  const genAI = new GoogleGenerativeAI(obterChave())
  const modelo = genAI.getGenerativeModel({ model: obterModelo() })

  const historicoTexto = historico.map(msg =>
    `${msg.origem === 'paciente' ? 'PACIENTE' : 'MÉDICO'}: ${msg.texto}`
  ).join('\n')

  const prompt = `És um assistente clínico numa unidade de saúde em Angola.
Abaixo está o registo de uma consulta entre um médico e um paciente surdo, na área de Saúde Sexual e Reprodutiva.

REGISTO DA CONSULTA:
${historicoTexto}

Gera um resumo clínico estruturado em Português angolano simples, com estas 3 secções:

🩺 QUEIXAS DO PACIENTE
— Lista os sintomas e problemas que o paciente comunicou

💬 ORIENTAÇÕES DO MÉDICO
— Resume o que o médico indicou ou perguntou

📋 PRÓXIMOS PASSOS
— Indica acções a tomar (se mencionadas), ou escreve "Não definidos nesta consulta"

REGRAS:
- Linguagem simples e directa, acessível a qualquer pessoa
- Máximo 150 palavras no total
- Se a informação for insuficiente para uma secção, escreve "Informação não disponível"`

  const resultado = await modelo.generateContent(prompt)
  return resultado.response.text().trim()
}