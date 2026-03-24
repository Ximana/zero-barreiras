export default function AlternadorModo({ modo, aoMudarModo }) {
  return (
    <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-2xl p-1">
      <button
        onClick={() => aoMudarModo('paciente')}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-corpo 
                    font-medium transition-all duration-200 flex-1 justify-center
                    ${modo === 'paciente'
                      ? 'bg-primaria-500 text-white shadow-lg shadow-primaria-500/25'
                      : 'text-white/40 hover:text-white/70'
                    }`}
      >
        <span>🤚</span>
        <span>Paciente</span>
      </button>

      <button
        onClick={() => aoMudarModo('medico')}
        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-corpo 
                    font-medium transition-all duration-200 flex-1 justify-center
                    ${modo === 'medico'
                      ? 'bg-primaria-500 text-white shadow-lg shadow-primaria-500/25'
                      : 'text-white/40 hover:text-white/70'
                    }`}
      >
        <span>👨‍⚕️</span>
        <span>Profissional</span>
      </button>
    </div>
  )
}
