import { useDeteccaoGestos } from '../hooks/useDeteccaoGestos'
import { GESTOS_MEDICOS } from '../dados/gestos'

export default function CameraGestos({ ativo, aoDetectarGesto }) {
  const { refCamara, refCanvas, carregando, erro, gestoBruto, pontosDetectados } =
    useDeteccaoGestos({ ativo, aoDetectarGesto })

  const gestoAtual = gestoBruto ? GESTOS_MEDICOS[gestoBruto] : null

  return (
    <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-gray-100 border border-laranja/15">
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

      {carregando && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 gap-3">
          <div className="w-10 h-10 border-2 border-laranja border-t-transparent rounded-full animate-spin" />
          <p className="text-gray-500 text-sm font-sans">A iniciar câmara...</p>
        </div>
      )}

      {erro && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 p-4">
          <span className="text-4xl mb-3">📷</span>
          <p className="text-red-500 text-sm text-center font-sans">{erro}</p>
          <p className="text-gray-400 text-xs text-center mt-2">
            Permite o acesso à câmara nas definições do browser
          </p>
        </div>
      )}

      {!ativo && !carregando && !erro && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-laranja/5 gap-2">
          <span className="text-5xl animate-flutuar">🤚</span>
          <p className="text-gray-400 text-sm font-sans">Câmara desactivada</p>
        </div>
      )}

      {ativo && !carregando && gestoAtual && (
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2
                        bg-white/95 border border-laranja/30 shadow-lg
                        rounded-full px-4 py-2 flex items-center gap-2 animate-aparecer">
          <span className="text-xl">{gestoAtual.emoji}</span>
          <span className="text-gray-700 text-sm font-sans font-semibold">{gestoAtual.nome}</span>
        </div>
      )}

      {ativo && !carregando && (
        <div className="absolute top-3 right-3 flex items-center gap-2 bg-white/90 rounded-xl px-2.5 py-1.5">
          <div className={pontosDetectados ? 'indicador-ativo' : 'indicador-inativo'} />
          <span className="text-gray-500 text-xs font-sans">
            {pontosDetectados ? 'Mão detectada' : 'Sem mão'}
          </span>
        </div>
      )}

      {ativo && !carregando && (
        <div className="absolute inset-0 rounded-2xl ring-2 ring-laranja/30 pointer-events-none" />
      )}
    </div>
  )
}
