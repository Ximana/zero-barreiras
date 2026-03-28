import { useTextoParaFala } from '../hooks/useFalaParaTexto'

export default function ExibicaoMensagem({ mensagem, origem, carregando }) {
  const { falar, parar, falando } = useTextoParaFala()
  const ePaciente = origem === 'paciente'

  return (
    <div className={`flex flex-col gap-2 animate-deslizar-cima ${ePaciente ? 'items-start' : 'items-end'}`}>
      <div className="flex items-center gap-2 px-1">
        <span className="text-xs text-gray-400 font-sans">
          {ePaciente ? 'Paciente' : 'Profissional de Saúde'}
        </span>
      </div>

      <div className={`relative max-w-[88%] rounded-2xl px-5 py-4
        ${ePaciente
          ? 'bg-laranja/8 border border-laranja/20 rounded-tl-sm'
          : 'bg-white border border-gray-200 shadow-sm rounded-tr-sm'
        }`}>
        {carregando ? (
          <div className="flex items-center gap-2 py-1">
            <div className="flex gap-1">
              {[0, 1, 2].map(i => (
                <div key={i}
                  className="w-2 h-2 bg-laranja rounded-full animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
            <span className="text-gray-400 text-sm font-sans">A processar com IA...</span>
          </div>
        ) : (
          <p className="text-gray-700 font-sans text-sm leading-relaxed">{mensagem}</p>
        )}
      </div>

      {mensagem && !carregando && (
        <button
          onClick={() => falando ? parar() : falar(mensagem)}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full
                      transition-all duration-200 font-sans
                      ${falando
                        ? 'bg-laranja/10 text-laranja border border-laranja/30'
                        : 'text-gray-400 hover:text-laranja border border-transparent hover:border-laranja/20'
                      }`}
        >
          <span>{falando ? '🔊' : '🔈'}</span>
          <span>{falando ? 'A falar...' : 'Ouvir'}</span>
        </button>
      )}
    </div>
  )
}
