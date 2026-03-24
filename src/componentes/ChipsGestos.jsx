import { GESTOS_MEDICOS } from '../dados/gestos'

export default function ChipsGestos({ gestos, aoRemover, aoLimpar }) {
  if (!gestos || gestos.length === 0) {
    return (
      <div className="flex items-center justify-center h-14 rounded-2xl border border-dashed border-white/10">
        <p className="text-white/30 text-sm font-corpo">
          Os gestos detectados aparecerão aqui...
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-wrap gap-2 items-center">
      {gestos.map((gesto, indice) => {
        const info = GESTOS_MEDICOS[gesto]
        if (!info) return null
        return (
          <button
            key={indice}
            onClick={() => aoRemover && aoRemover(indice)}
            className="chip-gesto hover:bg-red-500/20 hover:border-red-500/40 
                       hover:text-red-400 transition-all duration-200 animate-aparecer
                       cursor-pointer group"
            title="Clica para remover"
          >
            <span>{info.emoji}</span>
            <span>{info.nome}</span>
            <span className="opacity-0 group-hover:opacity-100 text-xs ml-1 transition-opacity">✕</span>
          </button>
        )
      })}

      {gestos.length > 0 && (
        <button
          onClick={aoLimpar}
          className="text-white/30 hover:text-red-400 text-xs font-corpo 
                     transition-colors duration-200 px-2 py-1"
        >
          Limpar tudo
        </button>
      )}
    </div>
  )
}
