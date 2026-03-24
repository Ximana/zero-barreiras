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
      setErro(err.message === 'CHAVE_GEMINI_NAO_CONFIGURADA'
        ? 'Chave Gemini não configurada. Verifica o ficheiro .env.'
        : 'Erro ao processar. Tenta novamente.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Instrução */}
      <div className="bg-laranja/6 border border-laranja/15 rounded-2xl px-5 py-4 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">💡</span>
        <div>
          <p className="text-gray-700 font-sans text-sm font-semibold">Como usar</p>
          <p className="text-gray-500 font-sans text-xs mt-1">
            Fala ou escreve a tua mensagem. A IA simplifica e sugere gestos para o paciente responder.
          </p>
        </div>
      </div>

      {/* Entrada */}
      <div className="flex flex-col gap-3">
        <h3 className="font-display font-semibold text-gray-700 text-sm">A tua mensagem</h3>
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
        className="botao-primario w-full flex items-center justify-center gap-2
                   disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {carregando ? (
          <>
            <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
            <span>A processar com Gemini...</span>
          </>
        ) : (
          <><span>🤖</span><span>Simplificar para o Paciente</span></>
        )}
      </button>

      {erro && <p className="text-red-500 text-sm font-sans text-center">{erro}</p>}

      {/* Resultado */}
      {respostaSimples && (
        <div className="flex flex-col gap-4 animate-deslizar-cima">

          <div className="flex flex-col gap-2">
            <h3 className="font-display font-semibold text-gray-700 text-sm">
              Mensagem simplificada para o paciente
            </h3>
            <ExibicaoMensagem
              mensagem={respostaSimples.mensagem_simples}
              origem="medico"
              carregando={false}
            />
          </div>

          {respostaSimples.gestos_sugeridos?.length > 0 && (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-laranja/15" />
                <p className="text-gray-400 text-xs font-sans whitespace-nowrap">
                  O paciente pode responder com
                </p>
                <div className="flex-1 h-px bg-laranja/15" />
              </div>

              <div className="flex flex-wrap gap-2">
                {respostaSimples.gestos_sugeridos.map((chave) => {
                  const gesto = GESTOS_MEDICOS[chave]
                  if (!gesto) return null
                  return (
                    <div key={chave}
                      className="flex flex-col items-center gap-1.5 bg-white border border-laranja/15
                                 rounded-2xl px-4 py-3 min-w-[80px] shadow-sm">
                      <span className="text-3xl">{gesto.emoji}</span>
                      <span className="text-gray-700 text-xs font-sans font-semibold text-center">
                        {gesto.nome}
                      </span>
                      <span className="text-gray-400 text-xs font-sans text-center leading-tight">
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
