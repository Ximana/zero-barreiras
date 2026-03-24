import { useState, useRef, useCallback } from 'react'

/**
 * Hook para reconhecimento de voz (fala → texto) usando a Web Speech API nativa
 */
export function useFalaParaTexto({ aoTranscricao }) {
  const [ativo, setAtivo] = useState(false)
  const [transcricao, setTranscricao] = useState('')
  const [suportado, setSuportado] = useState(
    typeof window !== 'undefined' && 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window
  )
  const refReconhecimento = useRef(null)

  const iniciar = useCallback(() => {
    if (!suportado) return

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const reconhecimento = new SpeechRecognition()

    reconhecimento.lang = 'pt-PT' // Português — mais próximo do PT-AO disponível
    reconhecimento.continuous = false
    reconhecimento.interimResults = false
    reconhecimento.maxAlternatives = 1

    reconhecimento.onstart = () => setAtivo(true)

    reconhecimento.onresult = (evento) => {
      const texto = evento.results[0][0].transcript
      setTranscricao(texto)
      if (aoTranscricao) aoTranscricao(texto)
    }

    reconhecimento.onerror = (evento) => {
      console.error('Erro no reconhecimento de voz:', evento.error)
      setAtivo(false)
    }

    reconhecimento.onend = () => setAtivo(false)

    reconhecimento.start()
    refReconhecimento.current = reconhecimento
  }, [suportado, aoTranscricao])

  const parar = useCallback(() => {
    if (refReconhecimento.current) {
      refReconhecimento.current.stop()
    }
    setAtivo(false)
  }, [])

  const limpar = useCallback(() => {
    setTranscricao('')
  }, [])

  return { iniciar, parar, limpar, ativo, transcricao, suportado }
}

/**
 * Hook para síntese de voz (texto → fala) usando a Web Speech API nativa
 */
export function useTextoParaFala() {
  const [falando, setFalando] = useState(false)
  const [suportado] = useState(
    typeof window !== 'undefined' && 'speechSynthesis' in window
  )

  const falar = useCallback((texto, opcoes = {}) => {
    if (!suportado || !texto) return

    // Cancela fala anterior
    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(texto)
    utterance.lang = opcoes.lang || 'pt-PT'
    utterance.rate = opcoes.velocidade || 0.9
    utterance.pitch = opcoes.tom || 1.0
    utterance.volume = opcoes.volume || 1.0

    utterance.onstart = () => setFalando(true)
    utterance.onend = () => setFalando(false)
    utterance.onerror = () => setFalando(false)

    window.speechSynthesis.speak(utterance)
  }, [suportado])

  const parar = useCallback(() => {
    if (suportado) {
      window.speechSynthesis.cancel()
      setFalando(false)
    }
  }, [suportado])

  return { falar, parar, falando, suportado }
}
