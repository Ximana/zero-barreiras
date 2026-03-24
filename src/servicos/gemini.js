import { GoogleGenerativeAI } from '@google/generative-ai'

// Obtém a chave: primeiro do .env, depois do localStorage via window.__GEMINI_KEY__
const obterChave = () => {
  const chaveEnv = import.meta.env.VITE_GEMINI_API_KEY
  const chaveRuntime = window.__GEMINI_KEY__

  const chave = chaveRuntime || chaveEnv

  if (!chave || chave === 'coloca_aqui_a_tua_chave_gemini') {
    throw new Error('CHAVE_GEMINI_NAO_CONFIGURADA')
  }
  return chave
}

/**
 * Converte lista de gestos em frase natural em Português angolano
 */
export async function gestosParaFrase(gestos) {
  const genAI = new GoogleGenerativeAI(obterChave())
  const modelo = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const prompt = `És um assistente médico especializado em comunicação acessível em Angola.

Um paciente surdo comunicou através de gestos, nesta ordem: ${gestos.join(', ')}.

A tua tarefa:
1. Interpreta estes gestos no contexto de saúde sexual e reprodutiva
2. Constrói UMA frase clara e natural em Português angolano
3. A frase deve ser directa e útil para um profissional de saúde
4. Se houver urgência nos gestos, menciona isso primeiro

Responde APENAS com a frase, sem explicações, sem aspas.`

  const resultado = await modelo.generateContent(prompt)
  return resultado.response.text().trim()
}

/**
 * Simplifica mensagem do médico e sugere gestos de resposta
 */
export async function textoParaRespostaSimples(textoMedico) {
  const genAI = new GoogleGenerativeAI(obterChave())
  const modelo = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const prompt = `És um assistente médico em Angola que ajuda na comunicação com pacientes surdos.

O médico disse: "${textoMedico}"

A tua tarefa:
1. Simplifica esta mensagem para linguagem muito simples e clara
2. Usa frases curtas, máximo 15 palavras
3. Sugere entre 2 a 4 gestos simples que o paciente pode usar para responder
4. Os gestos devem ser apenas desta lista: sim, nao, dor, cabeca, barriga, peito, costas, febre, enjoo, sangue, cansaco, gravida, menstruacao, urgente, ajuda, medico, hospital, consulta, agua, familia, medicamento, nao_entendo

Responde SOMENTE em JSON válido, sem markdown, sem backticks, neste formato exacto:
{"mensagem_simples":"texto aqui","gestos_sugeridos":["gesto1","gesto2"]}`

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

/**
 * Gera resumo estruturado da consulta
 */
export async function gerarResumoDaConsulta(historico) {
  const genAI = new GoogleGenerativeAI(obterChave())
  const modelo = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' })

  const historicoTexto = historico.map(msg =>
    `${msg.origem === 'paciente' ? 'PACIENTE' : 'MÉDICO'}: ${msg.texto}`
  ).join('\n')

  const prompt = `Baseado nesta consulta médica em Angola com um paciente surdo:

${historicoTexto}

Gera um resumo estruturado em Português angolano simples com:
1. O que o paciente comunicou (principais queixas)
2. O que o médico indicou
3. Próximos passos (se mencionados)

Sê conciso e claro. Máximo 150 palavras.`

  const resultado = await modelo.generateContent(prompt)
  return resultado.response.text().trim()
}
