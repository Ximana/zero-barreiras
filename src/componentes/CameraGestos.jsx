import { useEffect }          from 'react'
import { useDeteccaoGestos } from '../hooks/useDeteccaoGestos'
import { GESTOS_MEDICOS }    from '../dados/gestos'

/**
 * CameraGestos — câmara com detecção de 2 mãos (LGA angolana)
 *
 * Props:
 *  - ativo              {boolean}   — liga/desliga a câmara
 *  - aoDetectarGesto    {function}  — callback para cada gesto confirmado
 *  - aoRegistarLimpar   {function}  — recebe a função limparGestosAcumulados
 *                                     para o componente pai poder chamá-la
 *
 * Novidades visuais:
 *  - Badge indica quantas mãos estão a ser detectadas (1 ou 2)
 *  - Faixa inferior mostra a sequência de gestos acumulados na sessão
 *  - Botão "Limpar" dentro da câmara para reiniciar a fila de gestos
 *  - Cor da borda laranja (mão direita) / azul (mão esquerda) no canvas
 */
export default function CameraGestos({ ativo, aoDetectarGesto, aoRegistarLimpar }) {
  const {
    refCamara,
    refCanvas,
    carregando,
    erro,
    gestoBruto,
    pontosDetectados,
    numMaos,
    gestosAcumulados,
    limparGestosAcumulados,
  } = useDeteccaoGestos({ ativo, aoDetectarGesto })

  const gestoAtual = gestoBruto ? GESTOS_MEDICOS[gestoBruto] : null

  // Regista a função de limpeza no componente pai (ModoPaciente)
  useEffect(() => {
    aoRegistarLimpar?.(limparGestosAcumulados)
  }, [aoRegistarLimpar, limparGestosAcumulados])

  return (
    <div className="flex flex-col gap-3">

      {/* ── Ecrã da câmara ──────────────────────────────────────────────────── */}
      <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 border border-laranja/15">

        {/* Vídeo + Canvas sobrepostos */}
        <video
          ref={refCamara}
          className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
          muted playsInline
        />
        <canvas
          ref={refCanvas}
          width={640} height={480}
          className="absolute inset-0 w-full h-full scale-x-[-1]"
        />

        {/* A carregar */}
        {carregando && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 gap-3">
            <div className="w-10 h-10 border-2 border-laranja border-t-transparent rounded-full animate-spin" />
            <p className="text-gray-500 text-sm font-sans">A iniciar câmara...</p>
          </div>
        )}

        {/* Erro */}
        {erro && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 p-4">
            <span className="text-4xl mb-3">📷</span>
            <p className="text-red-500 text-sm text-center font-sans">{erro}</p>
            <p className="text-gray-400 text-xs text-center mt-2">
              Permite o acesso à câmara nas definições do browser
            </p>
          </div>
        )}

        {/* Câmara desactivada */}
        {!ativo && !carregando && !erro && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-laranja/5 gap-2">
            <p className="text-gray-400 text-sm font-sans">Câmara desactivada</p>
          </div>
        )}

        {/* Gesto actual detectado — faixa inferior */}
        {ativo && !carregando && gestoAtual && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2
                          bg-white/95 border border-laranja/30 shadow-lg
                          rounded-full px-4 py-2 flex items-center gap-2 animate-aparecer">
            <span className="text-xl">{gestoAtual.emoji}</span>
            <span className="text-gray-700 text-sm font-sans font-semibold">{gestoAtual.nome}</span>
          </div>
        )}

        {/* Badge: mãos detectadas + estado */}
        {ativo && !carregando && (
          <div className="absolute top-3 right-3 flex items-center gap-2">

            {/* Número de mãos */}
            {numMaos > 0 && (
              <div className="flex items-center gap-1.5 bg-white/90 rounded-xl px-2.5 py-1.5">
                <span className="text-xs font-sans font-bold text-gray-600">
                  {numMaos === 2 ? '✋🤚' : '✋'}
                </span>
                <span className="text-gray-500 text-xs font-sans">
                  {numMaos === 2 ? '2 mãos' : '1 mão'}
                </span>
              </div>
            )}

            {/* Indicador de detecção */}
            <div className="flex items-center gap-2 bg-white/90 rounded-xl px-2.5 py-1.5">
              <div className={pontosDetectados ? 'indicador-ativo' : 'indicador-inativo'} />
              <span className="text-gray-500 text-xs font-sans">
                {pontosDetectados ? 'Mão detectada' : 'Sem mão'}
              </span>
            </div>
          </div>
        )}

        {/* Legenda das cores do canvas */}
        {ativo && !carregando && pontosDetectados && numMaos > 0 && (
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            <div className="flex items-center gap-1.5 bg-black/40 rounded-lg px-2 py-1">
              <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
              <span className="text-white text-[10px] font-sans">Mão direita</span>
            </div>
            {numMaos === 2 && (
              <div className="flex items-center gap-1.5 bg-black/40 rounded-lg px-2 py-1">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                <span className="text-white text-[10px] font-sans">Mão esquerda</span>
              </div>
            )}
          </div>
        )}

        {/* Borda activa */}
        {ativo && !carregando && (
          <div className="absolute inset-0 rounded-2xl ring-2 ring-laranja/30 pointer-events-none" />
        )}
      </div>

      {/* ── Fila de gestos acumulados ──────────────────────────────────────── */}
      {ativo && gestosAcumulados.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-sans font-semibold text-gray-500">
              Gestos captados ({gestosAcumulados.length}/10)
            </p>
            <button
              onClick={limparGestosAcumulados}
              className="text-[11px] font-sans text-gray-400 hover:text-red-400
                         transition-colors underline underline-offset-2"
            >
              Limpar fila
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {gestosAcumulados.map((chave, i) => {
              const g = GESTOS_MEDICOS[chave]
              if (!g) return null
              return (
                <div
                  key={i}
                  className="flex items-center gap-1 bg-laranja/10 border border-laranja/25
                             text-laranja rounded-full px-2.5 py-1 text-xs font-sans font-medium
                             animate-aparecer"
                >
                  <span>{g.emoji}</span>
                  <span>{g.nome}</span>
                </div>
              )
            })}
          </div>

          {gestosAcumulados.length >= 10 && (
            <p className="text-[11px] font-sans text-amber-600 bg-amber-50
                          border border-amber-200 rounded-lg px-3 py-1.5">
              Limite de 10 gestos atingido. Converte ou limpa antes de continuar.
            </p>
          )}
        </div>
      )}

    </div>
  )
}