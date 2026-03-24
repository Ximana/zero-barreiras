import { useEffect, useRef, useState, useCallback } from 'react'
import { classificarGesto, EstabilizadorDeGesto } from '../servicos/classificadorGestos'

/**
 * Hook para detecção de gestos em tempo real usando MediaPipe Hands
 */
export function useDeteccaoGestos({ ativo = false, aoDetectarGesto }) {
  const refCamara = useRef(null)
  const refCanvas = useRef(null)
  const refHands = useRef(null)
  const refCamera = useRef(null)
  const refEstabilizador = useRef(new EstabilizadorDeGesto())
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState(null)
  const [gestoBruto, setGestoBruto] = useState(null)
  const [pontosDetectados, setPontosDetectados] = useState(false)

  const inicializar = useCallback(async () => {
    if (!ativo || !refCamara.current) return

    setCarregando(true)
    setErro(null)

    try {
      // Importa MediaPipe dinamicamente
      const { Hands } = await import('@mediapipe/hands')
      const { Camera } = await import('@mediapipe/camera_utils')

      const hands = new Hands({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
      })

      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.7,
        minTrackingConfidence: 0.6
      })

      hands.onResults((resultados) => {
        // Desenha no canvas
        if (refCanvas.current) {
          const ctx = refCanvas.current.getContext('2d')
          const { width, height } = refCanvas.current

          ctx.clearRect(0, 0, width, height)

          if (resultados.multiHandLandmarks?.length > 0) {
            setPontosDetectados(true)
            const landmarks = resultados.multiHandLandmarks[0]

            // Desenha os pontos da mão
            desenharMao(ctx, landmarks, width, height)

            // Classifica o gesto
            const gestoBrutoAtual = classificarGesto(landmarks)
            setGestoBruto(gestoBrutoAtual)

            // Estabiliza e confirma
            const gestoConfirmado = refEstabilizador.current.processar(gestoBrutoAtual)
            if (gestoConfirmado && aoDetectarGesto) {
              aoDetectarGesto(gestoConfirmado)
            }
          } else {
            setPontosDetectados(false)
            setGestoBruto(null)
            refEstabilizador.current.processar(null)
          }
        }
      })

      const camera = new Camera(refCamara.current, {
        onFrame: async () => {
          await hands.send({ image: refCamara.current })
        },
        width: 640,
        height: 480
      })

      await camera.start()

      refHands.current = hands
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
    setGestoBruto(null)
  }, [])

  useEffect(() => {
    if (ativo) {
      inicializar()
    } else {
      parar()
    }
    return () => { parar() }
  }, [ativo, inicializar, parar])

  return { refCamara, refCanvas, carregando, erro, gestoBruto, pontosDetectados }
}

// Desenha os pontos da mão no canvas
function desenharMao(ctx, landmarks, largura, altura) {
  const conexoes = [
    [0, 1], [1, 2], [2, 3], [3, 4],        // polegar
    [0, 5], [5, 6], [6, 7], [7, 8],        // indicador
    [0, 9], [9, 10], [10, 11], [11, 12],   // médio
    [0, 13], [13, 14], [14, 15], [15, 16], // anelar
    [0, 17], [17, 18], [18, 19], [19, 20], // mínimo
    [5, 9], [9, 13], [13, 17]              // palma
  ]

  // Linha das conexões
  ctx.strokeStyle = 'rgba(249, 115, 22, 0.7)'
  ctx.lineWidth = 2

  for (const [inicio, fim] of conexoes) {
    ctx.beginPath()
    ctx.moveTo(landmarks[inicio].x * largura, landmarks[inicio].y * altura)
    ctx.lineTo(landmarks[fim].x * largura, landmarks[fim].y * altura)
    ctx.stroke()
  }

  // Pontos
  for (const ponto of landmarks) {
    ctx.beginPath()
    ctx.arc(ponto.x * largura, ponto.y * altura, 5, 0, Math.PI * 2)
    ctx.fillStyle = '#f97316'
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 1.5
    ctx.stroke()
  }
}
