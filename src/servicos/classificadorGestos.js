/**
 * classificadorGestos.js — Linguagem Gestual Angolana (LGA)
 *
 * Melhorias:
 *  - classificarGesto(landmarks, contexto) aceita contexto opcional:
 *      { maoDireita, maoEsquerda, duasMaos }
 *  - Novos gestos que usam 2 mãos: gravida, familia, muito, inchaço, exame
 *  - Lógica de prioridade: gestos de 2 mãos são verificados primeiro quando
 *    ambas as mãos estão presentes
 *
 * Pontos do MediaPipe (landmarks):
 *  0: Pulso
 *  1–4:   Polegar (base → ponta)
 *  5–8:   Indicador (base → ponta)
 *  9–12:  Médio (base → ponta)
 *  13–16: Anelar (base → ponta)
 *  17–20: Mínimo (base → ponta)
 */

// ── Utilitários ────────────────────────────────────────────────────────────────

function dedoAberto(p, ponta, base) {
  return p[ponta].y < p[base].y
}

function contarDedosAbertos(p) {
  let n = 0
  for (const [ponta, base] of [[8,6],[12,10],[16,14],[20,18]]) {
    if (dedoAberto(p, ponta, base)) n++
  }
  return n
}

function polegarAberto(p) {
  return Math.abs(p[4].x - p[2].x) > 0.05
}

function distancia(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2)
}

// ── Formas de mão ─────────────────────────────────────────────────────────────

function polegarParaCima(p) {
  return p[4].y < p[3].y && p[4].y < p[2].y &&
    !dedoAberto(p, 8, 6) && !dedoAberto(p, 12, 10)
}

function polegarParaBaixo(p) {
  return p[4].y > p[3].y && p[4].y > p[2].y &&
    !dedoAberto(p, 8, 6) && !dedoAberto(p, 12, 10)
}

function apenasIndicadorAberto(p) {
  return dedoAberto(p, 8, 6) &&
    !dedoAberto(p, 12, 10) &&
    !dedoAberto(p, 16, 14) &&
    !dedoAberto(p, 20, 18)
}

function indicadorEMedioAbertos(p) {
  return dedoAberto(p, 8, 6) &&
    dedoAberto(p, 12, 10) &&
    !dedoAberto(p, 16, 14) &&
    !dedoAberto(p, 20, 18)
}

function tresDedosAbertos(p) {
  return dedoAberto(p, 8, 6) &&
    dedoAberto(p, 12, 10) &&
    dedoAberto(p, 16, 14) &&
    !dedoAberto(p, 20, 18)
}

function quatroDedosAbertos(p) {
  return dedoAberto(p, 8, 6) &&
    dedoAberto(p, 12, 10) &&
    dedoAberto(p, 16, 14) &&
    dedoAberto(p, 20, 18) &&
    !polegarAberto(p)
}

function maoAberta(p) {
  return dedoAberto(p, 8, 6) &&
    dedoAberto(p, 12, 10) &&
    dedoAberto(p, 16, 14) &&
    dedoAberto(p, 20, 18) &&
    polegarAberto(p)
}

function punhoFechado(p) {
  return !dedoAberto(p, 8, 6) &&
    !dedoAberto(p, 12, 10) &&
    !dedoAberto(p, 16, 14) &&
    !dedoAberto(p, 20, 18) &&
    !polegarAberto(p)
}

function pincaOK(p) {
  return distancia(p[4], p[8]) < 0.06 &&
    !dedoAberto(p, 12, 10) &&
    !dedoAberto(p, 16, 14)
}

// Mão em C (dedos curvados, palma à frente) — usado em "gravidez"
function maoEmArco(p) {
  const abertura = contarDedosAbertos(p)
  const curvatura =
    Math.abs(p[8].y - p[5].y) < 0.15 &&
    Math.abs(p[12].y - p[9].y) < 0.15
  return abertura >= 2 && curvatura
}

// Palma plana horizontal (dedos juntos apontando para a frente)
function palmaPlana(p) {
  return maoAberta(p) && Math.abs(p[5].y - p[17].y) < 0.06
}

// ── Gestos com 2 mãos (LGA) ───────────────────────────────────────────────────

/**
 * Gravidez — ambas as mãos em arco na zona da barriga (simetria horizontal)
 * Heurística: as duas mãos estão ao mesmo nível vertical (±15%) e próximas
 */
function gestoDuasMaosGravida(md, me) {
  if (!md || !me) return false
  const nivelSimilar = Math.abs(md[0].y - me[0].y) < 0.15
  const proximidade  = distancia(md[0], me[0]) < 0.50
  const ambasArco    = maoEmArco(md) && maoEmArco(me)
  return nivelSimilar && proximidade && ambasArco
}

/**
 * Família — ambas as mãos abertas unidas (pulsos próximos)
 */
function gestoDuasMaosFamilia(md, me) {
  if (!md || !me) return false
  return maoAberta(md) && maoAberta(me) && distancia(md[0], me[0]) < 0.30
}

/**
 * Muito — mãos a afastar-se, ambas abertas, simétricas
 */
function gestoDuasMaosMuito(md, me) {
  if (!md || !me) return false
  const afastadas    = distancia(md[0], me[0]) > 0.45
  const ambасAbertas = maoAberta(md) && maoAberta(me)
  return afastadas && ambасAbertas
}

/**
 * Inchaço — mãos a simular volume (palmas uma para a outra, distantes)
 */
function gestoDuasMaosInchaco(md, me) {
  if (!md || !me) return false
  const afastadas = distancia(md[0], me[0]) > 0.35 && distancia(md[0], me[0]) < 0.65
  return afastadas && maoAberta(md) && maoAberta(me)
}

/**
 * Exame / palpação — uma mão aberta sobre a outra (sobreposição vertical)
 */
function gestoDuasMaosExame(md, me) {
  if (!md || !me) return false
  const sobrepostoH  = Math.abs(md[0].x - me[0].x) < 0.20
  const sobrepostoV  = Math.abs(md[0].y - me[0].y) < 0.20
  return sobrepostoH && sobrepostoV && (maoAberta(md) || maoAberta(me))
}

/**
 * Útero — triângulo com os dois polegares e indicadores
 */
function gestoDuasMaosUtero(md, me) {
  if (!md || !me) return false
  const pontasProximas = distancia(md[4], me[4]) < 0.12 ||
                         distancia(md[8], me[8]) < 0.12
  return pontasProximas
}

// ── Classificador principal ───────────────────────────────────────────────────

/**
 * @param {Array} landmarks — 21 pontos da mão principal (MediaPipe)
 * @param {object} contexto — { maoDireita, maoEsquerda, duasMaos }
 * @returns {string|null} — chave do gesto ou null
 */
export function classificarGesto(landmarks, contexto = {}) {
  if (!landmarks || landmarks.length < 21) return null

  const p  = landmarks
  const md = contexto.maoDireita  || null
  const me = contexto.maoEsquerda || null
  const d2 = contexto.duasMaos    || false

  // ── 1. Gestos prioritários com 2 mãos ──────────────────────────────────────
  if (d2) {
    if (gestoDuasMaosGravida(md, me))  return 'gravida'
    if (gestoDuasMaosFamilia(md, me))  return 'familia'
    if (gestoDuasMaosUtero(md, me))    return 'utero'
    if (gestoDuasMaosExame(md, me))    return 'exame'
    if (gestoDuasMaosMuito(md, me))    return 'muito'
    if (gestoDuasMaosInchaco(md, me))  return 'inchaço'
  }

  // ── 2. Gestos de 1 mão ─────────────────────────────────────────────────────

  // Urgência / comunicação (prioridade alta)
  if (polegarParaCima(p))   return 'sim'
  if (polegarParaBaixo(p))  return 'nao'
  if (maoAberta(p))         return 'ajuda'
  if (punhoFechado(p))      return 'dor'

  // Formas específicas
  if (pincaOK(p))                 return 'medicamento'
  if (apenasIndicadorAberto(p))   return 'urgente'
  if (indicadorEMedioAbertos(p))  return 'consulta'
  if (tresDedosAbertos(p))        return 'menstruacao'
  if (quatroDedosAbertos(p))      return 'hospital'

  // Palma plana para baixo — sangramento / indicar para baixo
  if (palmaPlana(p) && p[9].y > p[0].y)  return 'sangue'

  // Mão na testa — febre (pulso elevado, mão aberta)
  if (maoAberta(p) && p[0].y < 0.35)  return 'febre'

  // Mão na boca — enjoo (pulso na metade inferior + mão curvada)
  if (!maoAberta(p) && p[0].y > 0.60 && contarDedosAbertos(p) >= 2)
    return 'enjoo'

  // Indicador + mínimo abertos, outros fechados — "não entendo"
  const dedosA = contarDedosAbertos(p)
  if (dedosA === 2 &&
    dedoAberto(p, 8, 6) &&
    dedoAberto(p, 20, 18) &&
    !dedoAberto(p, 12, 10)) return 'nao_entendo'

  return null
}

// ── Estabilizador de gesto ────────────────────────────────────────────────────

/**
 * Buffer de confirmação — evita que gestos trepidantes sejam registados.
 * Um gesto só é confirmado quando aparece ≥ limiarConfirmacao vezes
 * dentro de uma janela de tamanhoBuffer frames.
 */
export class EstabilizadorDeGesto {
  constructor(tamanhoBuffer = 10, limiarConfirmacao = 7) {
    this.buffer                = []
    this.tamanhoBuffer         = tamanhoBuffer
    this.limiarConfirmacao     = limiarConfirmacao
    this.ultimoGestoConfirmado = null
    this.ultimoTempoConfirmado = 0
    this.intervaloMinimo       = 1800  // ms entre confirmações do mesmo gesto
  }

  processar(gestoBruto) {
    this.buffer.push(gestoBruto)
    if (this.buffer.length > this.tamanhoBuffer) this.buffer.shift()
    if (this.buffer.length < this.tamanhoBuffer) return null

    const contagem = {}
    for (const g of this.buffer) {
      if (g) contagem[g] = (contagem[g] || 0) + 1
    }

    const melhor = Object.entries(contagem).sort(([,a],[,b]) => b - a)[0]
    if (!melhor || melhor[1] < this.limiarConfirmacao) return null

    const gesto = melhor[0]
    const agora = Date.now()

    if (gesto === this.ultimoGestoConfirmado &&
        agora - this.ultimoTempoConfirmado < this.intervaloMinimo) {
      return null
    }

    this.ultimoGestoConfirmado = gesto
    this.ultimoTempoConfirmado = agora
    this.buffer = []
    return gesto
  }

  reiniciar() {
    this.buffer                = []
    this.ultimoGestoConfirmado = null
    this.ultimoTempoConfirmado = 0
  }
}