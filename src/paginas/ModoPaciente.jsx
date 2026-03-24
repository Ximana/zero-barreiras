import { useState, useCallback } from 'react'
import CameraGestos from '../componentes/CameraGestos'
import ChipsGestos from '../componentes/ChipsGestos'
import ExibicaoMensagem from '../componentes/ExibicaoMensagem'
import GlossarioGestos from '../componentes/GlossarioGestos'
import { gestosParaFrase } from '../servicos/gemini'
import { GESTOS_MEDICOS } from '../dados/gestos'

export default function ModoPaciente({ aoAdicionarHistorico }) {
  const [cameraActiva, setCameraActiva] = useState(false)
  const [gestosActuais, setGestosActuais] = useState([])
  const [mensagemGerada, setMensagemGerada] = useState('')
  const [carregando, setCarregando] = useState(false)
  const [mostrarGlossario, setMostrarGlossario] = useState(false)
  const [erro, setErro] = useState('')

  const aoDetectarGesto = useCallback((gesto) => {
    setGestosActuais(prev => {
      // Máximo de 8 gestos na fila
      if (prev.length >= 8) return prev
      return [...prev, gesto]
    })
  }, [])

  const removerGesto = (indice) => {
    setGestosActuais(prev => prev.filter((_, i) => i !== indice))
  }

  const enviarGestos = async () => {
    if (gestosActuais.length === 0) return
    setCarregando(true)
    setErro('')
    try {
      const nomesGestos = gestosActuais.map(g => GESTOS_MEDICOS[g]?.nome || g)
      const frase = await gestosParaFrase(nomesGestos)
      setMensagemGerada(frase)
      aoAdicionarHistorico({ origem: 'paciente', texto: frase, gestos: gestosActuais })
      setGestosActuais([])
    } catch (err) {
      if (err.message === 'CHAVE_GEMINI_NAO_CONFIGURADA') {
        setErro('Chave Gemini não configurada. Recarrega a página.')
      } else {
        setErro('Erro ao processar gestos. Tenta novamente.')
      }
    } finally {
      setCarregando(false)
    }
  }

  // Adicionar gesto manualmente pelo glossário (para demo sem câmara)
  const adicionarGestoManual = (chave) => {
    setGestosActuais(prev => prev.length >= 8 ? prev : [...prev, chave])
    setMostrarGlossario(false)
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Instrução */}
      <div className="cartao px-5 py-4 flex items-start gap-3">
        <span className="text-2xl">💡</span>
        <div>
          <p className="text-white font-corpo text-sm font-medium">Como usar</p>
          <p className="text-white/50 font-corpo text-xs mt-1">
            Activa a câmara e faz gestos. O sistema reconhece automaticamente.
            Ou adiciona gestos manualmente pelo glossário.
          </p>
        </div>
      </div>

      {/* Câmara */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-white text-sm">Câmara de Gestos</h3>
          <div className="flex gap-2">
            <button
              onClick={() => setMostrarGlossario(true)}
              className="text-xs text-white/40 hover:text-primaria-400 font-corpo 
                         transition-colors flex items-center gap-1"
            >
              <span>📖</span> Glossário
            </button>
            <button
              onClick={() => setCameraActiva(!cameraActiva)}
              className={`text-xs px-3 py-1.5 rounded-full font-corpo border transition-all
                ${cameraActiva
                  ? 'bg-red-500/20 border-red-500/40 text-red-400'
                  : 'bg-primaria-500/20 border-primaria-500/40 text-primaria-400'
                }`}
            >
              {cameraActiva ? '⏹ Parar' : '▶ Iniciar'}
            </button>
          </div>
        </div>

        <CameraGestos ativo={cameraActiva} aoDetectarGesto={aoDetectarGesto} />
      </div>

      {/* Botões de gesto rápido (para demo) */}
      <div className="flex flex-col gap-2">
        <p className="text-white/30 text-xs font-corpo">Gestos rápidos (para demo):</p>
        <div className="flex flex-wrap gap-2">
          {['dor', 'ajuda', 'urgente', 'cabeca', 'barriga', 'febre', 'sim', 'nao'].map(chave => {
            const g = GESTOS_MEDICOS[chave]
            return (
              <button
                key={chave}
                onClick={() => adicionarGestoManual(chave)}
                className="chip-gesto hover:bg-primaria-500/30 transition-all cursor-pointer text-xs"
              >
                {g.emoji} {g.nome}
              </button>
            )
          })}
        </div>
      </div>

      {/* Gestos detectados */}
      <div className="flex flex-col gap-2">
        <h3 className="font-display font-semibold text-white text-sm">Gestos Detectados</h3>
        <ChipsGestos
          gestos={gestosActuais}
          aoRemover={removerGesto}
          aoLimpar={() => setGestosActuais([])}
        />
      </div>

      {/* Botão enviar */}
      <button
        onClick={enviarGestos}
        disabled={gestosActuais.length === 0 || carregando}
        className="botao-primario w-full flex items-center justify-center gap-2 
                   disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {carregando ? (
          <>
            <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
            <span>A processar com Gemini...</span>
          </>
        ) : (
          <>
            <span>🤖</span>
            <span>Converter Gestos em Frase</span>
          </>
        )}
      </button>

      {/* Erro */}
      {erro && (
        <p className="text-red-400 text-sm font-corpo text-center">{erro}</p>
      )}

      {/* Mensagem gerada */}
      {(mensagemGerada || carregando) && (
        <div className="flex flex-col gap-2">
          <h3 className="font-display font-semibold text-white text-sm">Mensagem para o Médico</h3>
          <ExibicaoMensagem
            mensagem={mensagemGerada}
            origem="paciente"
            carregando={carregando}
          />
        </div>
      )}

      {/* Glossário modal */}
      {mostrarGlossario && (
        <GlossarioGestos aoFechar={() => setMostrarGlossario(false)} />
      )}
    </div>
  )
}
