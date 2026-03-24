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
    } catch (err) {
      setResumo('Erro ao gerar resumo. Verifica a tua chave Gemini.')
    } finally {
      setCarregando(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-escura-800 border border-white/10 rounded-3xl overflow-hidden">

        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <h2 className="font-display font-bold text-white text-xl">Resumo da Consulta</h2>
            <p className="text-white/40 text-sm font-corpo mt-0.5">
              Gerado automaticamente pela IA
            </p>
          </div>
          <button
            onClick={aoFechar}
            className="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 
                       flex items-center justify-center text-white/50 hover:text-white
                       transition-all duration-200"
          >
            ✕
          </button>
        </div>

        {/* Conteúdo */}
        <div className="px-6 py-6 flex flex-col gap-4">
          {!resumo && !carregando && (
            <div className="text-center py-6">
              <span className="text-5xl block mb-4">📋</span>
              <p className="text-white/50 font-corpo text-sm">
                Clica no botão abaixo para gerar um resumo estruturado desta consulta usando IA.
              </p>
            </div>
          )}

          {carregando && (
            <div className="flex flex-col items-center gap-3 py-6">
              <div className="w-8 h-8 border-2 border-primaria-500 border-t-transparent rounded-full animate-spin" />
              <p className="text-white/50 text-sm font-corpo">A gerar resumo com Gemini...</p>
            </div>
          )}

          {resumo && (
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4">
              <p className="text-white font-corpo text-sm leading-relaxed whitespace-pre-wrap">{resumo}</p>
            </div>
          )}

          {historico.length === 0 && (
            <p className="text-yellow-400/70 text-xs font-corpo text-center">
              ⚠️ Nenhuma mensagem na consulta ainda.
            </p>
          )}
        </div>

        {/* Acções */}
        <div className="flex gap-3 px-6 pb-6">
          {!resumo ? (
            <button
              onClick={gerarResumo}
              disabled={carregando || historico.length === 0}
              className="botao-primario flex-1 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {carregando ? 'A gerar...' : 'Gerar Resumo com IA'}
            </button>
          ) : (
            <>
              <button
                onClick={() => falar(resumo)}
                className="botao-secundario flex items-center gap-2"
              >
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
