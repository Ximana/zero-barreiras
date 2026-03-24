import { useState } from 'react'
import EntradaVoz from '../componentes/EntradaVoz'
import ExibicaoMensagem from '../componentes/ExibicaoMensagem'
import { textoParaRespostaSimples } from '../servicos/gemini'
import { GESTOS_MEDICOS } from '../dados/gestos'

export default function ModoMedico({ aoAdicionarHistorico }) {
  const [textoMedico, setTextoMedico] = useState('')
  const [respostaSimples, setRespostaSimples] = useState(null)
  const [carregando, setCarregando] = useState(false)
  const [erro, setErro] = useState('')

  const enviarMensagem = async () => {
    if (!textoMedico.trim()) return
    setCarregando(true)
    setErro('')
    setRespostaSimples(null)

    try {
      const resultado = await textoParaRespostaSimples(textoMedico)
      setRespostaSimples(resultado)
      aoAdicionarHistorico({ origem: 'medico', texto: textoMedico })
    } catch (err) {
      if (err.message === 'CHAVE_GEMINI_NAO_CONFIGURADA') {
        setErro('Chave Gemini não configurada. Recarrega a página.')
      } else {
        setErro('Erro ao processar. Tenta novamente.')
      }
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Instrução */}
      <div className="flex gap-3 items-start px-5 py-4 cartao">
        <span className="text-2xl">💡</span>
        <div>
          <p className="text-sm font-medium text-white font-corpo">Como usar</p>
          <p className="mt-1 text-xs text-white/50 font-corpo">
            Fala ou escreve a tua mensagem. A IA simplifica e sugere gestos
            para o paciente surdo responder.
          </p>
        </div>
      </div>

      {/* Entrada do médico */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-white font-display">A tua mensagem</h3>
        <EntradaVoz
          valor={textoMedico}
          aoMudar={setTextoMedico}
          placeholder="Ex: Tens dor de cabeça há quantos dias? Como é a dor — forte ou fraca?"
        />
      </div>

      {/* Botão enviar */}
      <button
        onClick={enviarMensagem}
        disabled={!textoMedico.trim() || carregando}
        className="flex gap-2 justify-center items-center w-full botao-primario disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {carregando ? (
          <>
            <div className="w-4 h-4 rounded-full border-2 animate-spin border-white/40 border-t-white" />
            <span>A processar com Gemini...</span>
          </>
        ) : (
          <>
            <span>🤖</span>
            <span>Simplificar para o Paciente</span>
          </>
        )}
      </button>

      {/* Erro */}
      {erro && (
        <p className="text-sm text-center text-red-400 font-corpo">{erro}</p>
      )}

      {/* Resultado */}
      {respostaSimples && (
        <div className="flex flex-col gap-4 animate-deslizar-cima">

          {/* Mensagem simplificada */}
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-white font-display">
              Mensagem simplificada para o paciente
            </h3>
            <ExibicaoMensagem
              mensagem={respostaSimples.mensagem_simples}
              origem="medico"
              carregando={false}
            />
          </div>

          {/* Gestos sugeridos para resposta */}
          {respostaSimples.gestos_sugeridos?.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex gap-2 items-center">
                <div className="flex-1 linha-gradiente" />
                <p className="text-xs whitespace-nowrap text-white/40 font-corpo">
                  O paciente pode responder com
                </p>
                <div className="flex-1 linha-gradiente" />
              </div>

              <div className="flex flex-wrap gap-2">
                {respostaSimples.gestos_sugeridos.map((chave) => {
                  const gesto = GESTOS_MEDICOS[chave]
                  if (!gesto) return null
                  return (
                    <div
                      key={chave}
                      className="flex flex-col items-center gap-1 bg-white/5 border 
                                 border-white/10 rounded-2xl px-4 py-3 min-w-[80px]"
                    >
                      <span className="text-3xl">{gesto.emoji}</span>
                      <span className="text-xs text-center text-white/70 font-corpo">
                        {gesto.nome}
                      </span>
                      <span className="text-xs leading-tight text-center text-white/30 font-corpo">
                        {gesto.descricao}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}