import { useState } from 'react'
import ExibicaoMensagem from '../componentes/ExibicaoMensagem'
import ResumoDaConsulta from '../componentes/ResumoDaConsulta'

export default function HistoricoConsulta({ historico, aoLimpar }) {
  const [mostrarResumo, setMostrarResumo] = useState(false)

  if (historico.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4">
        <span className="text-5xl opacity-30">💬</span>
        <p className="text-white/30 font-corpo text-sm text-center">
          O histórico da consulta aparecerá aqui.<br />
          Começa a comunicar no modo Paciente ou Profissional.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">

      {/* Acções */}
      <div className="flex items-center justify-between">
        <p className="text-white/40 text-xs font-corpo">
          {historico.length} mensagem{historico.length !== 1 ? 's' : ''} nesta sessão
        </p>
        <div className="flex gap-3">
          <button
            onClick={() => setMostrarResumo(true)}
            className="text-xs text-primaria-400 hover:text-primaria-300 font-corpo 
                       transition-colors flex items-center gap-1"
          >
            <span>📋</span> Resumo IA
          </button>
          <button
            onClick={aoLimpar}
            className="text-xs text-white/30 hover:text-red-400 font-corpo 
                       transition-colors"
          >
            Limpar
          </button>
        </div>
      </div>

      {/* Lista de mensagens */}
      <div className="flex flex-col gap-4">
        {historico.map((msg, i) => (
          <div key={i}>
            <ExibicaoMensagem
              mensagem={msg.texto}
              origem={msg.origem}
              carregando={false}
            />
          </div>
        ))}
      </div>

      {/* Modal de resumo */}
      {mostrarResumo && (
        <ResumoDaConsulta
          historico={historico}
          aoFechar={() => setMostrarResumo(false)}
        />
      )}
    </div>
  )
}
