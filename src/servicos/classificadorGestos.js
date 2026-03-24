/**
 * Classificador de gestos médicos baseado nos pontos do MediaPipe Hands
 * Usa geometria simples — sem treino de modelo ML
 *
 * Pontos do MediaPipe (landmarks):
 * 0: Pulso
 * 1-4: Polegar (base → ponta)
 * 5-8: Indicador (base → ponta)
 * 9-12: Médio (base → ponta)
 * 13-16: Anelar (base → ponta)
 * 17-20: Mínimo (base → ponta)
 */

// Verifica se um dedo está aberto (ponta mais alta que base)
function dedoAberto(pontos, pontaDedo, baseDedo) {
  return pontos[pontaDedo].y < pontos[baseDedo].y
}

// Conta quantos dedos estão abertos (excluindo polegar)
function contarDedosAbertos(pontos) {
  let conta = 0
  // Indicador, Médio, Anelar, Mínimo
  const pares = [[8, 6], [12, 10], [16, 14], [20, 18]]
  for (const [ponta, base] of pares) {
    if (dedoAberto(pontos, ponta, base)) conta++
  }
  return conta
}

// Polegar aberto — compara posição horizontal
function polegarAberto(pontos) {
  return Math.abs(pontos[4].x - pontos[2].x) > 0.05
}

// Polegar para cima (SIM)
function polegarParaCima(pontos) {
  return pontos[4].y < pontos[3].y && pontos[4].y < pontos[2].y &&
         !dedoAberto(pontos, 8, 6) && !dedoAberto(pontos, 12, 10)
}

// Polegar para baixo (NÃO)
function polegarParaBaixo(pontos) {
  return pontos[4].y > pontos[3].y && pontos[4].y > pontos[2].y &&
         !dedoAberto(pontos, 8, 6) && !dedoAberto(pontos, 12, 10)
}

// Só indicador aberto
function apenasIndicadorAberto(pontos) {
  return dedoAberto(pontos, 8, 6) &&
         !dedoAberto(pontos, 12, 10) &&
         !dedoAberto(pontos, 16, 14) &&
         !dedoAberto(pontos, 20, 18)
}

// Indicador e médio abertos (forma de V / paz)
function indicadorEMedioAbertos(pontos) {
  return dedoAberto(pontos, 8, 6) &&
         dedoAberto(pontos, 12, 10) &&
         !dedoAberto(pontos, 16, 14) &&
         !dedoAberto(pontos, 20, 18)
}

// Três dedos abertos
function tresDedosAbertos(pontos) {
  return dedoAberto(pontos, 8, 6) &&
         dedoAberto(pontos, 12, 10) &&
         dedoAberto(pontos, 16, 14) &&
         !dedoAberto(pontos, 20, 18)
}

// Quatro dedos abertos (sem polegar)
function quatroDedosAbertos(pontos) {
  return dedoAberto(pontos, 8, 6) &&
         dedoAberto(pontos, 12, 10) &&
         dedoAberto(pontos, 16, 14) &&
         dedoAberto(pontos, 20, 18) &&
         !polegarAberto(pontos)
}

// Mão completamente aberta
function maoAberta(pontos) {
  return dedoAberto(pontos, 8, 6) &&
         dedoAberto(pontos, 12, 10) &&
         dedoAberto(pontos, 16, 14) &&
         dedoAberto(pontos, 20, 18) &&
         polegarAberto(pontos)
}

// Punho fechado
function punhoFechado(pontos) {
  return !dedoAberto(pontos, 8, 6) &&
         !dedoAberto(pontos, 12, 10) &&
         !dedoAberto(pontos, 16, 14) &&
         !dedoAberto(pontos, 20, 18) &&
         !polegarAberto(pontos)
}

// Polegar e indicador juntos (forma de OK / pinça)
function pincaOK(pontos) {
  const distancia = Math.sqrt(
    Math.pow(pontos[4].x - pontos[8].x, 2) +
    Math.pow(pontos[4].y - pontos[8].y, 2)
  )
  return distancia < 0.06 &&
         !dedoAberto(pontos, 12, 10) &&
         !dedoAberto(pontos, 16, 14)
}

/**
 * Função principal — classifica o gesto a partir dos landmarks do MediaPipe
 * @param {Array} landmarks - 21 pontos {x, y, z} retornados pelo MediaPipe
 * @returns {string|null} - Chave do gesto ou null se não reconhecido
 */
export function classificarGesto(landmarks) {
  if (!landmarks || landmarks.length < 21) return null

  const p = landmarks

  // Urgência e comunicação (prioridade máxima)
  if (polegarParaCima(p)) return 'sim'
  if (polegarParaBaixo(p)) return 'nao'
  if (maoAberta(p)) return 'ajuda'
  if (punhoFechado(p)) return 'dor'

  // Gestos específicos
  if (apenasIndicadorAberto(p)) return 'urgente'
  if (indicadorEMedioAbertos(p)) return 'consulta'
  if (tresDedosAbertos(p)) return 'menstruacao'
  if (quatroDedosAbertos(p)) return 'hospital'
  if (pincaOK(p)) return 'medicamento'

  // Dois dedos juntos (médio + indicador fechados = médico)
  const dedosAbertos = contarDedosAbertos(p)
  if (dedosAbertos === 2 &&
      dedoAberto(p, 8, 6) &&
      dedoAberto(p, 20, 18) &&
      !dedoAberto(p, 12, 10)) return 'nao_entendo'

  return null
}

/**
 * Buffer de estabilização — evita que gestos trepidantes sejam registados
 */
export class EstabilizadorDeGesto {
  constructor(tamanhoBuffer = 8, limiarConfirmacao = 6) {
    this.buffer = []
    this.tamanhoBuffer = tamanhoBuffer
    this.limiarConfirmacao = limiarConfirmacao
    this.ultimoGestoConfirmado = null
    this.ultimoTempoConfirmado = 0
    this.intervaloMinimo = 1500 // ms entre gestos
  }

  processar(gestoBruto) {
    this.buffer.push(gestoBruto)
    if (this.buffer.length > this.tamanhoBuffer) {
      this.buffer.shift()
    }

    if (this.buffer.length < this.tamanhoBuffer) return null

    // Conta qual gesto aparece mais no buffer
    const contagem = {}
    for (const g of this.buffer) {
      if (g) contagem[g] = (contagem[g] || 0) + 1
    }

    const melhorGesto = Object.entries(contagem)
      .sort(([, a], [, b]) => b - a)[0]

    if (!melhorGesto || melhorGesto[1] < this.limiarConfirmacao) return null

    const gestoPrincipal = melhorGesto[0]
    const agora = Date.now()

    // Evita repetir o mesmo gesto consecutivamente
    if (gestoPrincipal === this.ultimoGestoConfirmado &&
        agora - this.ultimoTempoConfirmado < this.intervaloMinimo) {
      return null
    }

    this.ultimoGestoConfirmado = gestoPrincipal
    this.ultimoTempoConfirmado = agora
    this.buffer = []
    return gestoPrincipal
  }

  reiniciar() {
    this.buffer = []
    this.ultimoGestoConfirmado = null
    this.ultimoTempoConfirmado = 0
  }
}
