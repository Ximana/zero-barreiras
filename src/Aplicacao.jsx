import { useState } from 'react'
import ConfiguracaoChave from './componentes/ConfiguracaoChave'
import ModoPaciente from './paginas/ModoPaciente'
import ModoMedico from './paginas/ModoMedico'
import HistoricoConsulta from './paginas/HistoricoConsulta'

const ABAS = [
  { id: 'paciente', rotulo: 'Paciente', emoji: '🤚' },
  { id: 'medico', rotulo: 'Profissional', emoji: '👨‍⚕️' },
  { id: 'historico', rotulo: 'Histórico', emoji: '💬' },
]

const envConfigurado =
  import.meta.env.VITE_GEMINI_API_KEY &&
  import.meta.env.VITE_GEMINI_API_KEY !== 'coloca_aqui_a_tua_chave_gemini' &&
  import.meta.env.VITE_GEMINI_MODELO

export default function Aplicacao() {
  const [abaActiva, setAbaActiva] = useState('paciente')
  const [historico, setHistorico] = useState([])

  if (!envConfigurado) {
    return <ConfiguracaoChave />
  }

  const adicionarHistorico = (mensagem) => {
    setHistorico(prev => [...prev, {
      ...mensagem,
      hora: new Date().toLocaleTimeString('pt-AO')
    }])
  }

  return (
    <div className="min-h-screen fundo-animado">
      <div className="flex flex-col gap-6 px-4 py-6 mx-auto max-w-lg">

        <header className="flex justify-between items-center">
          <div className="flex gap-3 items-center">
            <div className="flex justify-center items-center w-10 h-10 text-xl rounded-2xl border bg-primaria-500/20 border-primaria-500/30">
              🤚
            </div>
            <div>
              <h1 className="text-lg font-extrabold leading-tight text-white font-display">
                Zero Barreiras
              </h1>
              <p className="text-xs text-white/30 font-corpo">Comunicação Acessível em Saúde</p>
            </div>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-xl px-2.5 py-1">
            <p className="text-xs text-white/40 font-corpo">🇦🇴 Angola</p>
          </div>
        </header>

        {historico.length > 0 && (
          <div className="flex items-center gap-2 bg-green-500/10 border border-green-500/20
                          rounded-2xl px-4 py-2.5">
            <div className="indicador-ativo" />
            <p className="text-xs text-green-400 font-corpo">
              Consulta em curso — {historico.length} mensagem{historico.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        <div className="flex gap-1 items-center p-1 rounded-2xl border bg-white/5 border-white/10">
          {ABAS.map(aba => (
            <button
              key={aba.id}
              onClick={() => setAbaActiva(aba.id)}
              className={`flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs
                          font-corpo font-medium transition-all duration-200 flex-1 justify-center
                          ${abaActiva === aba.id
                            ? 'bg-primaria-500 text-white shadow-lg shadow-primaria-500/25'
                            : 'text-white/40 hover:text-white/70'
                          }`}
            >
              <span>{aba.emoji}</span>
              <span>{aba.rotulo}</span>
              {aba.id === 'historico' && historico.length > 0 && (
                <span className={`text-xs px-1.5 py-0.5 rounded-full font-corpo
                  ${abaActiva === 'historico'
                    ? 'bg-white/20 text-white'
                    : 'bg-primaria-500/30 text-primaria-400'}`}>
                  {historico.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <main className="flex flex-col gap-4">
          {abaActiva === 'paciente' && (
            <ModoPaciente aoAdicionarHistorico={adicionarHistorico} />
          )}
          {abaActiva === 'medico' && (
            <ModoMedico aoAdicionarHistorico={adicionarHistorico} />
          )}
          {abaActiva === 'historico' && (
            <HistoricoConsulta historico={historico} aoLimpar={() => setHistorico([])} />
          )}
        </main>

        <footer className="text-center">
          <div className="mb-4 linha-gradiente" />
          <p className="text-xs text-white/20 font-corpo">
            Hackathon Zero Barreiras · UNFPA Angola · 2026
          </p>
        </footer>
      </div>
    </div>
  )
}