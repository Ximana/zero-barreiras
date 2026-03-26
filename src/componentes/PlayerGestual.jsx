import { useState, useEffect, useRef, useCallback } from 'react'
import { Play, Pause, SkipForward, RotateCcw, CheckCircle } from 'lucide-react'

/**
 * PlayerGestual — vídeos em formato vertical (832 × 1104 → aspect-ratio 3/4).
 * Estrutura visual:
 *   1. Ecrã de vídeo  (portrait, full-width, double-buffer)
 *   2. Controlos      (play/pause, skip, reiniciar, barra de progresso)
 *   3. Miniaturas     (sequência de itens identificados, scroll horizontal)
 */
export default function PlayerGestual({ sequencia, aoTerminar }) {
  const [indice, setIndice]         = useState(0)
  const [bufferSlot, setBufferSlot] = useState(0)
  const [pausado, setPausado]       = useState(false)
  const [terminado, setTerminado]   = useState(false)
  const [opacidades, setOpacidades] = useState([1, 0])

  const videoRefs  = [useRef(null), useRef(null)]
  const transRef   = useRef(null)
  const pausadoRef = useRef(false)
  pausadoRef.current = pausado

  const itemActual  = sequencia[indice]
  const itemProximo = indice + 1 < sequencia.length ? sequencia[indice + 1] : null

  // ── Carrega e reproduz um slot ──────────────────────────────────────────────
  const carregarSlot = useCallback((slot, item, reproduzir) => {
    const el = videoRefs[slot].current
    if (!el || !item) return
    el.src = item.video
    el.load()
    if (reproduzir) el.play().catch(() => {})
  }, [])

  // ── Pré-carrega o próximo no slot inactivo ──────────────────────────────────
  const preCarregarProximo = useCallback((slotActivo, itemProx) => {
    if (!itemProx) return
    const el = videoRefs[1 - slotActivo].current
    if (!el) return
    el.src = itemProx.video
    el.load()
  }, [])

  // ── Reset quando a sequência muda ──────────────────────────────────────────
  useEffect(() => {
    setIndice(0)
    setBufferSlot(0)
    setPausado(false)
    setTerminado(false)
    setOpacidades([1, 0])
  }, [sequencia])

  // ── Carrega slot activo + pré-carrega seguinte ──────────────────────────────
  useEffect(() => {
    if (terminado) return
    carregarSlot(bufferSlot, itemActual, !pausadoRef.current)
    if (itemProximo) preCarregarProximo(bufferSlot, itemProximo)
  }, [indice, bufferSlot, terminado])

  // ── Pausa / retoma ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (terminado) return
    const el = videoRefs[bufferSlot].current
    if (!el) return
    if (pausado) el.pause()
    else el.play().catch(() => {})
  }, [pausado, terminado])

  // ── Avança para o próximo item (fade 150ms) ─────────────────────────────────
  const avancar = useCallback(() => {
    if (transRef.current) clearTimeout(transRef.current)
    const slotActivo   = bufferSlot
    const slotSeguinte = 1 - slotActivo

    if (indice >= sequencia.length - 1) {
      setOpacidades(prev => { const n = [...prev]; n[slotActivo] = 0; return n })
      transRef.current = setTimeout(() => {
        setTerminado(true)
        aoTerminar?.()
      }, 150)
      return
    }

    setOpacidades([
      slotActivo === 0 ? 0 : 1,
      slotActivo === 0 ? 1 : 0,
    ])
    transRef.current = setTimeout(() => {
      setBufferSlot(slotSeguinte)
      setIndice(i => i + 1)
      const el = videoRefs[slotSeguinte].current
      if (el && !pausadoRef.current) el.play().catch(() => {})
    }, 150)
  }, [bufferSlot, indice, sequencia.length, aoTerminar])

  // ── Reiniciar ───────────────────────────────────────────────────────────────
  const reiniciar = useCallback(() => {
    if (transRef.current) clearTimeout(transRef.current)
    setIndice(0)
    setBufferSlot(0)
    setPausado(false)
    setTerminado(false)
    setOpacidades([1, 0])
    setTimeout(() => {
      carregarSlot(0, sequencia[0], true)
      if (sequencia[1]) preCarregarProximo(0, sequencia[1])
    }, 0)
  }, [sequencia, carregarSlot, preCarregarProximo])

  // ── Saltar para índice específico ───────────────────────────────────────────
  const irPara = useCallback((idx) => {
    if (transRef.current) clearTimeout(transRef.current)
    setIndice(idx)
    setTerminado(false)
    setPausado(false)
    setOpacidades(prev => {
      const n = [...prev]
      n[bufferSlot] = 1
      n[1 - bufferSlot] = 0
      return n
    })
    carregarSlot(bufferSlot, sequencia[idx], true)
    if (sequencia[idx + 1]) preCarregarProximo(bufferSlot, sequencia[idx + 1])
  }, [bufferSlot, sequencia, carregarSlot, preCarregarProximo])

  const labelActual = itemActual
    ? itemActual.tipo === 'frase' ? itemActual.texto : itemActual.nome
    : ''
  const subActual = itemActual?.tipo === 'gesto' ? itemActual.descricao : 'Vídeo de frase completa'

  if (!itemActual && !terminado) return null

  return (
    <div className="flex flex-col gap-4">

      {/* ══ 1. ECRÃ DE VÍDEO — portrait 832 × 1104 (aspect 3/4) ══════════════ */}
      <div
        className="relative w-full bg-gray-900 rounded-2xl overflow-hidden shadow-xl"
        style={{ aspectRatio: '832 / 1104' }}
      >
        {/* Slot 0 */}
        <video
          ref={videoRefs[0]}
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            opacity: opacidades[0],
            transition: 'opacity 0.15s ease',
            zIndex: bufferSlot === 0 ? 2 : 1,
          }}
          onEnded={bufferSlot === 0 && !pausado ? avancar : undefined}
          playsInline
          preload="auto"
        />

        {/* Slot 1 */}
        <video
          ref={videoRefs[1]}
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            opacity: opacidades[1],
            transition: 'opacity 0.15s ease',
            zIndex: bufferSlot === 1 ? 2 : 1,
          }}
          onEnded={bufferSlot === 1 && !pausado ? avancar : undefined}
          playsInline
          preload="auto"
        />

        {/* Ecrã de conclusão */}
        {terminado && (
          <div className="absolute inset-0 flex flex-col gap-3 justify-center items-center
                          bg-gray-900 z-10 animate-aparecer">
            <div className="flex justify-center items-center w-16 h-16 rounded-full bg-green-500/20">
              <CheckCircle size={32} className="text-green-400" />
            </div>
            <p className="font-sans text-sm font-semibold text-white">Sequência concluída</p>
            <button
              onClick={reiniciar}
              className="flex gap-2 items-center px-4 py-2 font-sans text-xs text-white
                         rounded-xl transition-all duration-200 bg-white/10 hover:bg-white/20"
            >
              <RotateCcw size={13} />
              Repetir
            </button>
          </div>
        )}

        {/* Overlay inferior — nome e contador */}
        {!terminado && itemActual && (
          <div
            className="absolute bottom-0 left-0 right-0 px-4 py-4 z-10"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)' }}
          >
            <div className="flex justify-between items-end gap-2">
              <div className="flex flex-col gap-1 min-w-0">
                <div className="flex items-center gap-2">
                  {itemActual.tipo === 'frase' ? (
                    <span className="flex-shrink-0 text-[10px] font-sans font-bold px-2 py-0.5
                                     rounded-full bg-laranja text-white">
                      Frase
                    </span>
                  ) : (
                    <span className="text-lg leading-none">{itemActual.emoji}</span>
                  )}
                  <p className="font-sans text-sm font-semibold text-white truncate">
                    {labelActual}
                  </p>
                </div>
                <p className="text-white/50 text-xs font-sans truncate">{subActual}</p>
              </div>
              <span className="flex-shrink-0 font-sans text-xs font-semibold text-white/70
                               bg-black/40 px-2 py-1 rounded-lg">
                {indice + 1} / {sequencia.length}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ══ 2. CONTROLOS ══════════════════════════════════════════════════════ */}
      <div className="flex gap-3 items-center">

        {/* Play / Pausa */}
        <button
          onClick={() => setPausado(p => !p)}
          disabled={terminado}
          className="flex justify-center items-center w-10 h-10 text-white rounded-xl
                     shadow-md transition-all duration-200 bg-laranja shadow-laranja/30
                     hover:bg-laranja-escuro disabled:opacity-40 flex-shrink-0"
        >
          {pausado ? <Play size={16} /> : <Pause size={16} />}
        </button>

        {/* Skip */}
        <button
          onClick={avancar}
          disabled={terminado}
          className="flex justify-center items-center w-10 h-10 text-gray-600 bg-gray-100
                     rounded-xl transition-all duration-200 hover:bg-gray-200
                     disabled:opacity-40 flex-shrink-0"
        >
          <SkipForward size={16} />
        </button>

        {/* Reiniciar */}
        <button
          onClick={reiniciar}
          className="flex justify-center items-center w-10 h-10 text-gray-600 bg-gray-100
                     rounded-xl transition-all duration-200 hover:bg-gray-200 flex-shrink-0"
        >
          <RotateCcw size={16} />
        </button>

        {/* Barra de progresso segmentada */}
        <div className="flex-1 flex items-center gap-1">
          {sequencia.map((item, i) => (
            <button
              key={i}
              onClick={() => !terminado && irPara(i)}
              title={item.tipo === 'frase' ? item.texto : item.nome}
              className={`h-2 flex-1 rounded-full transition-all duration-200
                ${i < indice         ? 'bg-laranja'
                : i === indice && !terminado ? 'bg-laranja/60 animate-pulse'
                : 'bg-gray-200 hover:bg-gray-300'}
                ${item.tipo === 'frase' ? 'ring-1 ring-laranja/40' : ''}`}
            />
          ))}
        </div>
      </div>

      {/* ══ 3. MINIATURAS — itens identificados ══════════════════════════════ */}
      <div className="flex flex-col gap-2">
        <p className="font-sans text-xs font-semibold text-gray-400 uppercase tracking-wide">
          Sequência identificada
        </p>
        <div className="flex overflow-x-auto gap-2 pb-2 scrollbar-none">
          {sequencia.map((item, i) => {
            const eFrase  = item.tipo === 'frase'
            const activo  = i === indice && !terminado
            const passado = i < indice

            return (
              <button
                key={i}
                onClick={() => irPara(i)}
                className={`flex-shrink-0 flex flex-col items-center gap-1.5 px-3 py-2.5
                            rounded-xl border transition-all duration-200 min-w-[84px] max-w-[100px]
                            ${activo
                              ? 'bg-laranja border-laranja text-white shadow-md shadow-laranja/25'
                              : passado
                              ? 'bg-laranja/10 border-laranja/25 text-laranja'
                              : 'bg-white border-gray-200 text-gray-500 hover:border-laranja/30'
                            }`}
              >
                <span className="text-xl leading-none">{item.emoji}</span>

                <span className="font-sans text-xs font-medium leading-tight text-center
                                 line-clamp-2 w-full">
                  {eFrase ? item.texto : item.nome}
                </span>

                {eFrase && (
                  <span className={`text-[9px] font-sans font-bold px-1.5 py-0.5 rounded-full
                                    ${activo
                                      ? 'bg-white/25 text-white'
                                      : 'bg-laranja/15 text-laranja'}`}>
                    frase
                  </span>
                )}
              </button>
            )
          })}
        </div>
      </div>

    </div>
  )
}