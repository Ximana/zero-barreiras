import { useFalaParaTexto } from '../hooks/useFalaParaTexto'

export default function EntradaVoz({ valor, aoMudar, placeholder = 'Fala ou escreve aqui...' }) {
  const { iniciar, parar, ativo, suportado } = useFalaParaTexto({
    aoTranscricao: (texto) => aoMudar(texto)
  })

  return (
    <div className="flex flex-col gap-2">
      <textarea
        value={valor}
        onChange={(e) => aoMudar(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="w-full bg-white border-2 border-gray-200 rounded-2xl px-4 py-3
                   text-gray-700 font-sans text-sm resize-none
                   focus:outline-none focus:border-laranja
                   placeholder:text-gray-300 transition-colors shadow-sm"
      />

      {suportado && (
        <button
          onClick={ativo ? parar : iniciar}
          className={`flex items-center justify-center gap-3 w-full py-3 rounded-2xl
                      font-sans font-semibold text-sm transition-all duration-200
                      ${ativo
                        ? 'bg-red-500 text-white shadow-md shadow-red-500/30'
                        : 'bg-laranja/8 border-2 border-laranja/25 text-laranja hover:bg-laranja hover:text-white hover:border-laranja'
                      }`}
        >
          {ativo ? (
            <>
              <div className="onda-voz">
                {[...Array(7)].map((_, i) => <span key={i} />)}
              </div>
              <span>A ouvir... Clica para parar</span>
            </>
          ) : (
            <>
              <span className="text-lg">🎙️</span>
              <span>Clica para falar</span>
            </>
          )}
        </button>
      )}

      {!suportado && (
        <p className="text-gray-400 text-xs font-sans text-center">
          Reconhecimento de voz não suportado. Usa Chrome para melhor experiência.
        </p>
      )}
    </div>
  )
}
