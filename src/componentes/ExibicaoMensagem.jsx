import { useTextoParaFala } from '../hooks/useFalaParaTexto'

export default function ExibicaoMensagem({ mensagem, origem, carregando }) {
  const { falar, parar, falando } = useTextoParaFala()

  const ePaciente = origem === 'paciente'

  return (
    <div className={`flex flex-col gap-2 animate-deslizar-cima ${ePaciente ? 'items-start' : 'items-end'}`}>
      {/* Etiqueta de origem */}
      <div className="flex items-center gap-2 px-1">
        <span className="text-xs text-white/30 font-corpo">
          {ePaciente ? '🤚 Paciente' : '👨‍⚕️ Profissional de Saúde'}
        </span>
      </div>

      {/* Balão da mensagem */}
      <div
        className={`relative max-w-[85%] rounded-2xl px-5 py-4 
          ${ePaciente
            ? 'bg-primaria-500/15 border border-primaria-500/30 rounded-tl-sm'
            : 'bg-white/8 border border-white/15 rounded-tr-sm'
          }`}
      >
        {carregando ? (
          <div className="flex items-center gap-2 py-1">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="w-2 h-2 bg-primaria-400 rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="text-white/40 text-sm font-corpo">A processar com IA...</span>
          </div>
        ) : (
          <p className="text-white font-corpo text-sm leading-relaxed">{mensagem}</p>
        )}
      </div>

      {/* Botão de ouvir */}
      {mensagem && !carregando && (
        <button
          onClick={() => falando ? parar() : falar(mensagem)}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full 
                      transition-all duration-200 font-corpo
                      ${falando
                        ? 'bg-primaria-500/20 text-primaria-400 border border-primaria-500/40'
                        : 'text-white/30 hover:text-white/60 border border-transparent hover:border-white/10'
                      }`}
        >
          <span>{falando ? '🔊' : '🔈'}</span>
          <span>{falando ? 'A falar...' : 'Ouvir'}</span>
        </button>
      )}
    </div>
  )
}
