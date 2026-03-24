import { useState } from 'react'
import ExibicaoMensagem from '../componentes/ExibicaoMensagem'
import ResumoDaConsulta from '../componentes/ResumoDaConsulta'

export default function HistoricoConsulta({ historico, aoLimpar }) {
  const [mostrarResumo, setMostrarResumo] = useState(false)

  if (historico.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <span className="text-5xl opacity-30">💬</span>
        <p className="text-gray-400 font-sans text-sm text-center">
          O histórico da consulta aparecerá aqui.<br />
          Começa a comunicar no modo Paciente ou Profissional.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-xs font-sans">
          {historico.length} mensagem{historico.length !== 1 ? 's' : ''} nesta sessão
        </p>
        <div className="flex gap-3">
          <button onClick={() => setMostrarResumo(true)}
            className="text-xs text-laranja hover:text-laranja-escuro font-sans
                       font-semibold transition-colors flex items-center gap-1">
            <span>📋</span> Resumo IA
          </button>
          <button onClick={aoLimpar}
            className="text-xs text-gray-400 hover:text-red-500 font-sans transition-colors">
            Limpar
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {historico.map((msg, i) => (
          <ExibicaoMensagem key={i} mensagem={msg.texto} origem={msg.origem} carregando={false} />
        ))}
      </div>

      {mostrarResumo && (
        <ResumoDaConsulta historico={historico} aoFechar={() => setMostrarResumo(false)} />
      )}
    </div>
  )
}
