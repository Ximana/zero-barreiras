import { useRef, useEffect } from 'react'
import { useDeteccaoGestos } from '../hooks/useDeteccaoGestos'
import { GESTOS_MEDICOS } from '../dados/gestos'

export default function CameraGestos({ ativo, aoDetectarGesto }) {
  const { refCamara, refCanvas, carregando, erro, gestoBruto, pontosDetectados } =
    useDeteccaoGestos({ ativo, aoDetectarGesto })

  const gestoAtual = gestoBruto ? GESTOS_MEDICOS[gestoBruto] : null

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/40">
      {/* Vídeo da câmara (escondido, usado pelo MediaPipe) */}
      <video
        ref={refCamara}
        className="absolute inset-0 w-full h-full object-cover scale-x-[-1]"
        muted
        playsInline
      />

      {/* Canvas para desenho dos pontos da mão */}
      <canvas
        ref={refCanvas}
        width={640}
        height={480}
        className="absolute inset-0 w-full h-full scale-x-[-1]"
      />

      {/* Estado de carregamento */}
      {carregando && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 gap-3">
          <div className="w-10 h-10 border-2 border-primaria-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-white/70 text-sm font-corpo">A iniciar câmara...</p>
        </div>
      )}

      {/* Erro */}
      {erro && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-4">
          <span className="text-4xl mb-3">📷</span>
          <p className="text-red-400 text-sm text-center font-corpo">{erro}</p>
          <p className="text-white/40 text-xs text-center mt-2">
            Permite o acesso à câmara nas definições do browser
          </p>
        </div>
      )}

      {/* Câmara inativa */}
      {!ativo && !carregando && !erro && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 gap-2">
          <span className="text-5xl animate-flutuar">🤚</span>
          <p className="text-white/50 text-sm font-corpo">Câmara desactivada</p>
        </div>
      )}

      {/* Indicador de gesto detectado */}
      {ativo && !carregando && gestoAtual && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 
                        bg-black/80 backdrop-blur-sm border border-primaria-500/50 
                        rounded-full px-4 py-2 flex items-center gap-2 animate-aparecer">
          <span className="text-xl">{gestoAtual.emoji}</span>
          <span className="text-white text-sm font-corpo font-medium">{gestoAtual.nome}</span>
        </div>
      )}

      {/* Indicador de presença da mão */}
      {ativo && !carregando && (
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <div className={pontosDetectados ? 'indicador-ativo' : 'indicador-inativo'} />
          <span className="text-white/60 text-xs font-corpo">
            {pontosDetectados ? 'Mão detectada' : 'Sem mão'}
          </span>
        </div>
      )}

      {/* Borda animada quando activa */}
      {ativo && !carregando && (
        <div className="absolute inset-0 rounded-2xl ring-1 ring-primaria-500/30 pointer-events-none" />
      )}
    </div>
  )
}
