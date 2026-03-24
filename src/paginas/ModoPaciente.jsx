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
    setGestosActuais(prev => prev.length >= 8 ? prev : [...prev, gesto])
  }, [])

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
      setErro(err.message === 'CHAVE_GEMINI_NAO_CONFIGURADA'
        ? 'Chave Gemini não configurada. Verifica o ficheiro .env.'
        : 'Erro ao processar gestos. Tenta novamente.')
    } finally {
      setCarregando(false)
    }
  }

  const adicionarGestoManual = (chave) => {
    setGestosActuais(prev => prev.length >= 8 ? prev : [...prev, chave])
    setMostrarGlossario(false)
  }

  return (
    <div className="flex flex-col gap-5">

      {/* Instrução */}
      <div className="bg-laranja/6 border border-laranja/15 rounded-2xl px-5 py-4 flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">💡</span>
        <div>
          <p className="text-gray-700 font-sans text-sm font-semibold">Como usar</p>
          <p className="text-gray-500 font-sans text-xs mt-1">
            Activa a câmara e faz gestos — ou adiciona gestos rapidamente pelos botões abaixo.
          </p>
        </div>
      </div>

      {/* Câmara */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-semibold text-gray-700 text-sm">Câmara de Gestos</h3>
          <div className="flex gap-2">
            <button onClick={() => setMostrarGlossario(true)}
              className="text-xs text-gray-400 hover:text-laranja font-sans
                         transition-colors flex items-center gap-1">
              <span>📖</span> Glossário
            </button>
            <button
              onClick={() => setCameraActiva(!cameraActiva)}
              className={`text-xs px-3 py-1.5 rounded-full font-sans font-semibold border transition-all
                ${cameraActiva
                  ? 'bg-red-50 border-red-200 text-red-500'
                  : 'bg-laranja/10 border-laranja/30 text-laranja hover:bg-laranja hover:text-white'
                }`}
            >
              {cameraActiva ? '⏹ Parar' : '▶ Iniciar'}
            </button>
          </div>
        </div>
        <CameraGestos ativo={cameraActiva} aoDetectarGesto={aoDetectarGesto} />
      </div>

      {/* Gestos rápidos */}
      <div className="flex flex-col gap-2">
        <p className="text-gray-400 text-xs font-sans">Gestos rápidos para demo:</p>
        <div className="flex flex-wrap gap-2">
          {['dor', 'ajuda', 'urgente', 'cabeca', 'barriga', 'febre', 'sim', 'nao'].map(chave => {
            const g = GESTOS_MEDICOS[chave]
            return (
              <button key={chave} onClick={() => adicionarGestoManual(chave)}
                className="chip-gesto hover:bg-laranja hover:text-white hover:border-laranja
                           transition-all cursor-pointer text-xs">
                {g.emoji} {g.nome}
              </button>
            )
          })}
        </div>
      </div>

      {/* Gestos detectados */}
      <div className="flex flex-col gap-2">
        <h3 className="font-display font-semibold text-gray-700 text-sm">Gestos Detectados</h3>
        <ChipsGestos
          gestos={gestosActuais}
          aoRemover={(i) => setGestosActuais(prev => prev.filter((_, idx) => idx !== i))}
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
            <div className="w-4 h-4 border-2 border-white/50 border-t-white rounded-full animate-spin" />
            <span>A processar com Gemini...</span>
          </>
        ) : (
          <><span>🤖</span><span>Converter Gestos em Frase</span></>
        )}
      </button>

      {erro && <p className="text-red-500 text-sm font-sans text-center">{erro}</p>}

      {(mensagemGerada || carregando) && (
        <div className="flex flex-col gap-2">
          <h3 className="font-display font-semibold text-gray-700 text-sm">Mensagem para o Médico</h3>
          <ExibicaoMensagem mensagem={mensagemGerada} origem="paciente" carregando={carregando} />
        </div>
      )}

      {mostrarGlossario && <GlossarioGestos aoFechar={() => setMostrarGlossario(false)} />}
    </div>
  )
}
