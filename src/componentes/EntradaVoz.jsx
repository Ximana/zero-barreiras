import { useFalaParaTexto } from '../hooks/useFalaParaTexto'

export default function EntradaVoz({ valor, aoMudar, placeholder = 'Fala ou escreve aqui...' }) {
  const { iniciar, parar, ativo, suportado } = useFalaParaTexto({
    aoTranscricao: (texto) => aoMudar(texto)
  })

  return (
    <div className="flex flex-col gap-2">
      <div className="relative">
        <textarea
          value={valor}
          onChange={(e) => aoMudar(e.target.value)}
          placeholder={placeholder}
          rows={3}
          className="px-4 py-3 w-full text-sm text-white rounded-2xl border transition-colors resize-none bg-white/5 border-white/10 font-corpo focus:outline-none focus:border-primaria-500/50 placeholder:text-white/20"
        />
      </div>

      {suportado && (
        <button
          onClick={ativo ? parar : iniciar}
          className={`flex items-center justify-center gap-3 w-full py-3 rounded-2xl 
                      font-corpo font-medium text-sm transition-all duration-200
                      ${ativo
                        ? 'text-red-400 border bg-red-500/20 border-red-500/40'
                        : 'border bg-white/5 border-white/10 text-white/70 hover:border-primaria-500/40 hover:text-white'
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
        <p className="text-xs text-center text-white/30 font-corpo">
          Reconhecimento de voz não suportado neste browser. Usa Chrome para melhor experiência.
        </p>
      )}
    </div>
  )
}