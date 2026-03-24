import { useState } from 'react'
import { gerarResumoDaConsulta } from '../servicos/gemini'
import { useTextoParaFala } from '../hooks/useFalaParaTexto'

export default function ResumoDaConsulta({ historico, aoFechar }) {
  const [resumo, setResumo] = useState('')
  const [carregando, setCarregando] = useState(false)
  const { falar, falando } = useTextoParaFala()

  const gerarResumo = async () => {
    if (historico.length === 0) return
    setCarregando(true)
    try {
      const texto = await gerarResumoDaConsulta(historico)
      setResumo(texto)
    } catch {
      setResumo('Erro ao gerar resumo. Verifica a tua chave Gemini.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white border border-laranja/15 rounded-3xl
                      overflow-hidden shadow-2xl shadow-laranja/15">

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="font-display font-bold text-gray-800 text-xl">Resumo da Consulta</h2>
            <p className="text-gray-400 text-sm font-sans mt-0.5">Gerado automaticamente pela IA</p>
          </div>
          <button onClick={aoFechar}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-500
                       flex items-center justify-center text-gray-400 transition-all duration-200">
            ✕
          </button>
        </div>

        <div className="px-6 py-6 flex flex-col gap-4">
          {!resumo && !carregando && (
            <div className="text-center py-6">
              <span className="text-5xl block mb-4">📋</span>
              <p className="text-gray-400 font-sans text-sm">
                Clica no botão abaixo para gerar um resumo estruturado desta consulta.
              </p>
            </div>
          )}

          {carregando && (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="w-8 h-8 border-2 border-laranja border-t-transparent rounded-full animate-spin" />
              <p className="text-gray-400 text-sm font-sans">A gerar resumo com Gemini...</p>
            </div>
          )}

          {resumo && (
            <div className="bg-laranja/5 border border-laranja/15 rounded-2xl p-4">
              <p className="text-gray-700 font-sans text-sm leading-relaxed whitespace-pre-wrap">{resumo}</p>
            </div>
          )}

          {historico.length === 0 && (
            <p className="text-yellow-600 text-xs font-sans text-center bg-yellow-50
                          border border-yellow-200 rounded-xl p-3">
              ⚠️ Nenhuma mensagem na consulta ainda.
            </p>
          )}
        </div>

        <div className="flex gap-3 px-6 pb-6">
          {!resumo ? (
            <button onClick={gerarResumo}
              disabled={carregando || historico.length === 0}
              className="botao-primario flex-1 disabled:opacity-40 disabled:cursor-not-allowed">
              {carregando ? 'A gerar...' : 'Gerar Resumo com IA'}
            </button>
          ) : (
            <>
              <button onClick={() => falando ? undefined : falar(resumo)}
                className="botao-secundario flex items-center gap-2">
                <span>{falando ? '🔊' : '🔈'}</span>
                <span>{falando ? 'A falar...' : 'Ouvir'}</span>
              </button>
              <button onClick={gerarResumo} className="botao-secundario flex-1">
                Regenerar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
