import { useEffect, useRef, useState, useCallback } from 'react'
import { classificarGesto, EstabilizadorDeGesto } from '../servicos/classificadorGestos'

/**
 * useDeteccaoGestos — detecção com suporte a 2 mãos (LGA angolana)
 *
 * Novidades:
 *  - maxNumHands: 2 → captura gestos que envolvem ambas as mãos
 *  - Passa { maoDireita, maoEsquerda, landmarks } ao classificador
 *  - Expõe `gestosAcumulados` (array) e `limparGestosAcumulados`
 *    para o componente pai construir a frase progressivamente
 *  - `aoDetectarGesto` continua a ser chamado por compatibilidade
 */
export function useDeteccaoGestos({ ativo = false, aoDetectarGesto }) {
  const refCamara   = useRef(null)
  const refCanvas   = useRef(null)
  const refHands    = useRef(null)
  const refCamera   = useRef(null)
  const refEstabilizador = useRef(new EstabilizadorDeGesto())

  const [carregando,        setCarregando]        = useState(false)
  const [erro,              setErro]              = useState(null)
  const [gestoBruto,        setGestoBruto]        = useState(null)
  const [pontosDetectados,  setPontosDetectados]  = useState(false)
  const [numMaos,           setNumMaos]           = useState(0)
  const [gestosAcumulados,  setGestosAcumulados]  = useState([])

  // ── Limpar fila de gestos (chamado pelo componente pai antes de converter) ──
  const limparGestosAcumulados = useCallback(() => {
    setGestosAcumulados([])
    refEstabilizador.current.reiniciar()
  }, [])

  const inicializar = useCallback(async () => {
    if (!ativo || !refCamara.current) return

    setCarregando(true)
    setErro(null)

    try {
      const { Hands } = await import('@mediapipe/hands')
      const { Camera } = await import('@mediapipe/camera_utils')

      const hands = new Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
      })

      // ── Activar detecção de 2 mãos ─────────────────────────────────────────
      hands.setOptions({
        maxNumHands:           2,     // ← era 1
        modelComplexity:       1,
        minDetectionConfidence: 0.65,
        minTrackingConfidence:  0.55,
      })

      hands.onResults((resultados) => {
        const canvas = refCanvas.current
        if (!canvas) return

        const ctx    = canvas.getContext('2d')
        const { width, height } = canvas
        ctx.clearRect(0, 0, width, height)

        const maos = resultados.multiHandLandmarks   || []
        const info = resultados.multiHandedness       || []

        setNumMaos(maos.length)
        setPontosDetectados(maos.length > 0)

        if (maos.length === 0) {
          setGestoBruto(null)
          refEstabilizador.current.processar(null)
          return
        }

        // ── Desenha todas as mãos detectadas ──────────────────────────────────
        maos.forEach((landmarks, idx) => {
          const lado = info[idx]?.label  // 'Left' | 'Right' (espelhado pela câmara)
          desenharMao(ctx, landmarks, width, height, lado)
        })

        // ── Prepara contexto de 2 mãos para o classificador ───────────────────
        let maoDireita  = null
        let maoEsquerda = null

        maos.forEach((landmarks, idx) => {
          // MediaPipe com câmara espelhada: 'Left' aparece à direita do ecrã
          const label = info[idx]?.label
          if (label === 'Right') maoDireita  = landmarks
          else                   maoEsquerda = landmarks
        })

        // Classifica com base nas duas mãos (a mais significativa prevalece)
        const gestoBrutoActual = classificarGesto(maos[0], {
          maoDireita,
          maoEsquerda,
          duasMaos: maos.length === 2,
        })

        setGestoBruto(gestoBrutoActual)

        const gestoConfirmado = refEstabilizador.current.processar(gestoBrutoActual)
        if (gestoConfirmado) {
          // Acumula na frase (máximo 10 gestos)
          setGestosAcumulados(prev =>
            prev.length >= 10 ? prev : [...prev, gestoConfirmado],
          )
          aoDetectarGesto?.(gestoConfirmado)
        }
      })

      const camera = new Camera(refCamara.current, {
        onFrame: async () => {
          await hands.send({ image: refCamara.current })
        },
        width:  640,
        height: 480,
      })

      await camera.start()

      refHands.current  = hands
      refCamera.current = camera
      setCarregando(false)

    } catch (err) {
      console.error('Erro ao inicializar câmara:', err)
      setErro('Não foi possível aceder à câmara. Verifica as permissões.')
      setCarregando(false)
    }
  }, [ativo, aoDetectarGesto])

  const parar = useCallback(async () => {
    if (refCamera.current) {
      await refCamera.current.stop()
      refCamera.current = null
    }
    if (refHands.current) {
      refHands.current.close()
      refHands.current = null
    }
    refEstabilizador.current.reiniciar()
    setPontosDetectados(false)
    setNumMaos(0)
    setGestoBruto(null)
  }, [])

  useEffect(() => {
    if (ativo) inicializar()
    else       parar()
    return () => { parar() }
  }, [ativo, inicializar, parar])

  return {
    refCamara,
    refCanvas,
    carregando,
    erro,
    gestoBruto,
    pontosDetectados,
    numMaos,
    gestosAcumulados,
    limparGestosAcumulados,
  }
}

// ── Desenha uma mão no canvas com cor diferente por lado ──────────────────────
function desenharMao(ctx, landmarks, largura, altura, lado) {
  const corLinha = lado === 'Right'
    ? 'rgba(244, 99, 0, 0.75)'   // laranja — mão direita
    : 'rgba(14, 165, 233, 0.75)' // azul    — mão esquerda

  const corPonto = lado === 'Right' ? '#F46300' : '#0EA5E9'

  const conexoes = [
    [0,1],[1,2],[2,3],[3,4],
    [0,5],[5,6],[6,7],[7,8],
    [0,9],[9,10],[10,11],[11,12],
    [0,13],[13,14],[14,15],[15,16],
    [0,17],[17,18],[18,19],[19,20],
    [5,9],[9,13],[13,17],
  ]

  ctx.strokeStyle = corLinha
  ctx.lineWidth   = 2

  for (const [a, b] of conexoes) {
    ctx.beginPath()
    ctx.moveTo(landmarks[a].x * largura, landmarks[a].y * altura)
    ctx.lineTo(landmarks[b].x * largura, landmarks[b].y * altura)
    ctx.stroke()
  }

  for (const p of landmarks) {
    ctx.beginPath()
    ctx.arc(p.x * largura, p.y * altura, 5, 0, Math.PI * 2)
    ctx.fillStyle   = corPonto
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth   = 1.5
    ctx.stroke()
  }
}