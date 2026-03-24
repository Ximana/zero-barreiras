import { useState } from 'react'
import ModoPaciente from './ModoPaciente'
import ModoMedico from './ModoMedico'
import HistoricoConsulta from './HistoricoConsulta'

const ABAS = [
  { id: 'paciente', rotulo: 'Paciente', emoji: '🤚' },
  { id: 'medico', rotulo: 'Profissional', emoji: '👨‍⚕️' },
  { id: 'historico', rotulo: 'Histórico', emoji: '💬' },
]

export default function TelaConsulta({ aoVoltar }) {
  const [abaActiva, setAbaActiva] = useState('paciente')
  const [historico, setHistorico] = useState([])

  const adicionarHistorico = (mensagem) => {
    setHistorico(prev => [...prev, {
      ...mensagem,
      hora: new Date().toLocaleTimeString('pt-AO')
    }])
  }

  return (
    <div className="min-h-screen fundo-app flex flex-col">

      {/* Cabeçalho */}
      <header className="bg-white border-b border-laranja/10 shadow-sm px-5 pt-8 pb-4 sticky top-0 z-20">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <button
            onClick={aoVoltar}
            className="w-10 h-10 rounded-2xl bg-laranja/8 border border-laranja/20
                       flex items-center justify-center text-laranja hover:bg-laranja hover:text-white
                       transition-all duration-200 flex-shrink-0"
          >
            ←
          </button>
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className="w-10 h-10 bg-laranja rounded-xl flex items-center justify-center
                            text-xl shadow-md shadow-laranja/30 flex-shrink-0">
              🩺
            </div>
            <div className="min-w-0">
              <h1 className="font-display font-bold text-lg text-gray-800 leading-tight">
                Consulta
              </h1>
              <p className="text-gray-400 text-xs font-sans truncate">
                Comunicação paciente ↔ profissional
              </p>
            </div>
          </div>
          {historico.length > 0 && (
            <div className="flex items-center gap-1.5 bg-green-50 border border-green-200
                            rounded-xl px-3 py-1.5 flex-shrink-0">
              <div className="indicador-ativo" />
              <span className="text-green-700 text-xs font-sans font-medium">
                {historico.length} msg
              </span>
            </div>
          )}
        </div>

        {/* Abas */}
        <div className="max-w-lg mx-auto mt-4">
          <div className="flex items-center gap-1 bg-laranja/5 border border-laranja/10 rounded-2xl p-1">
            {ABAS.map(aba => (
              <button
                key={aba.id}
                onClick={() => setAbaActiva(aba.id)}
                className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs
                            font-sans font-semibold transition-all duration-200 flex-1 justify-center
                            ${abaActiva === aba.id
                              ? 'bg-laranja text-white shadow-md shadow-laranja/30'
                              : 'text-gray-400 hover:text-laranja'
                            }`}
              >
                <span>{aba.emoji}</span>
                <span>{aba.rotulo}</span>
                {aba.id === 'historico' && historico.length > 0 && (
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-sans
                    ${abaActiva === 'historico'
                      ? 'bg-white/30 text-white'
                      : 'bg-laranja/20 text-laranja'}`}>
                    {historico.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Conteúdo */}
      <main className="flex-1 px-5 py-6">
        <div className="max-w-lg mx-auto">
          {abaActiva === 'paciente' && (
            <ModoPaciente aoAdicionarHistorico={adicionarHistorico} />
          )}
          {abaActiva === 'medico' && (
            <ModoMedico aoAdicionarHistorico={adicionarHistorico} />
          )}
          {abaActiva === 'historico' && (
            <HistoricoConsulta historico={historico} aoLimpar={() => setHistorico([])} />
          )}
        </div>
      </main>
    </div>
  )
}
