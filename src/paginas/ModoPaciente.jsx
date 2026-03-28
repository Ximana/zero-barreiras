import { useState, useCallback, useRef } from 'react'
import CameraGestos   from '../componentes/CameraGestos'
import ChipsGestos    from '../componentes/ChipsGestos'
import ExibicaoMensagem from '../componentes/ExibicaoMensagem'
import GlossarioGestos from '../componentes/GlossarioGestos'
import { gestosParaFrase } from '../servicos/gemini'
import { GESTOS_MEDICOS }  from '../dados/gestos'
import logo from '../assets/logo.jpg'

export default function ModoPaciente({ aoAdicionarHistorico }) {
  const [cameraActiva,    setCameraActiva]    = useState(false)
  const [gestosActuais,   setGestosActuais]   = useState([])
  const [mensagemGerada,  setMensagemGerada]  = useState('')
  const [carregando,      setCarregando]      = useState(false)
  const [mostrarGlossario,setMostrarGlossario]= useState(false)
  const [erro,            setErro]            = useState('')

  // Referência para chamar limparGestosAcumulados do CameraGestos
  // É chamada após o utilizador carregar em "Converter"
  const refLimparCamera = useRef(null)

  // ── Callback do hook — cada gesto confirmado pela câmara ─────────────────
  const aoDetectarGesto = useCallback((gesto) => {
    setGestosActuais(prev => prev.length >= 10 ? prev : [...prev, gesto])
  }, [])

  // ── Expõe o limpar da câmara para ser chamado após converter ─────────────
  // CameraGestos passa a função via ref através do prop aoRegistarLimpar
  const aoRegistarLimpar = useCallback((fn) => {
    refLimparCamera.current = fn
  }, [])

  // ── Envia gestos ao Gemini ───────────────────────────────────────────────
  const enviarGestos = async () => {
    if (gestosActuais.length === 0) return
    setCarregando(true)
    setErro('')
    try {
      const nomesGestos = gestosActuais.map(g => GESTOS_MEDICOS[g]?.nome || g)
      const frase = await gestosParaFrase(nomesGestos)
      setMensagemGerada(frase)
      aoAdicionarHistorico({ origem: 'paciente', texto: frase, gestos: gestosActuais })
      // Limpa os gestos da câmara e do estado local
      setGestosActuais([])
      refLimparCamera.current?.()
    } catch (err) {
      setErro(
        err.message === 'CHAVE_GEMINI_NAO_CONFIGURADA'
          ? 'Chave Gemini não configurada. Verifica o ficheiro .env.'
          : 'Erro ao processar gestos. Tenta novamente.',
      )
    } finally {
      setCarregando(false)
    }
  }

  const adicionarGestoManual = (chave) => {
    setGestosActuais(prev => prev.length >= 10 ? prev : [...prev, chave])
    setMostrarGlossario(false)
  }

  const limparTudo = () => {
    setGestosActuais([])
    setMensagemGerada('')
    refLimparCamera.current?.()
  }

  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:gap-6 lg:items-start">

      {/* ══ COLUNA ESQUERDA — Câmara ════════════════════════════════════════ */}
      <div className="flex flex-col gap-4 lg:w-1/2 lg:sticky lg:top-6">

        {/* Instrução */}
        <div className="flex gap-3 items-start px-5 py-4 rounded-2xl border bg-laranja/6 border-laranja/15">
          <div>
            <p className="font-sans text-sm font-semibold text-gray-700">Como usar</p>
            <p className="mt-1 font-sans text-xs text-gray-500">
              Activa a câmara e faz gestos com <strong>uma ou duas mãos</strong>.
              O sistema detecta automaticamente e acumula os gestos.
              Quando terminares, clica <strong>Converter</strong> para gerar a frase.
            </p>
          </div>
        </div>

        {/* Cabeçalho da câmara + controlos */}
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-semibold text-gray-700 font-display">
            Câmara de Gestos
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setMostrarGlossario(true)}
              className="flex gap-1 items-center font-sans text-xs text-gray-400 transition-colors hover:text-laranja"
            >
              Glossário
            </button>
            <button
              onClick={() => setCameraActiva(v => !v)}
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

        {/* Câmara — passa aoRegistarLimpar para obter a referência */}
        <CameraGestos
          ativo={cameraActiva}
          aoDetectarGesto={aoDetectarGesto}
          aoRegistarLimpar={aoRegistarLimpar}
        />

        {/* Gestos rápidos para demonstração */}
        <div className="flex flex-col gap-2">
          <p className="font-sans text-xs text-gray-400">Gestos rápidos para demo:</p>
          <div className="flex flex-wrap gap-2">
            {['dor','ajuda','urgente','cabeca','barriga','febre','sim','nao','gravida','sangue'].map(chave => {
              const g = GESTOS_MEDICOS[chave]
              if (!g) return null
              return (
                <button
                  key={chave}
                  onClick={() => adicionarGestoManual(chave)}
                  className="text-xs transition-all cursor-pointer chip-gesto
                             hover:bg-laranja hover:text-white hover:border-laranja"
                >
                  {g.emoji} {g.nome}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ══ COLUNA DIREITA — Gestos + Resultado ════════════════════════════ */}
      <div className="flex flex-col gap-4 lg:w-1/2">

        {/* Gestos detectados */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700 font-display">
              Gestos Detectados
            </h3>
            {gestosActuais.length > 0 && (
              <button
                onClick={limparTudo}
                className="text-xs font-sans text-gray-400 hover:text-red-400
                           transition-colors underline underline-offset-2"
              >
                Limpar tudo
              </button>
            )}
          </div>
          <ChipsGestos
            gestos={gestosActuais}
            aoRemover={(i) => setGestosActuais(prev => prev.filter((_, idx) => idx !== i))}
            aoLimpar={() => setGestosActuais([])}
          />
        </div>

        {/* Indicador de sequência construída */}
        {gestosActuais.length > 0 && (
          <div className="flex items-start gap-2 px-4 py-3 bg-blue-50 rounded-xl border border-blue-200">
            
            <div>
              <p className="font-sans text-xs font-semibold text-blue-800">
                Sequência a converter ({gestosActuais.length} gesto{gestosActuais.length !== 1 ? 's' : ''})
              </p>
              <p className="font-sans text-xs text-blue-600 mt-0.5">
                {gestosActuais.map(g => GESTOS_MEDICOS[g]?.nome || g).join(' → ')}
              </p>
            </div>
          </div>
        )}

        {/* Botão converter */}
        <button
          onClick={enviarGestos}
          disabled={gestosActuais.length === 0 || carregando}
          className="flex gap-2 justify-center items-center w-full botao-primario
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {carregando ? (
            <>
              <div className="w-4 h-4 rounded-full border-2 animate-spin border-white/50 border-t-white" />
              <span>A processar com Gemini...</span>
            </>
          ) : (
            <><span>Converter Gestos em Frase</span></>
          )}
        </button>

        {erro && (
          <p className="px-4 py-3 font-sans text-sm text-center text-red-500
                        bg-red-50 rounded-xl border border-red-200">
            {erro}
          </p>
        )}

        {/* Mensagem gerada para o médico */}
        {(mensagemGerada || carregando) && (
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-gray-700 font-display">
              Mensagem para o Médico
            </h3>
            <ExibicaoMensagem
              mensagem={mensagemGerada}
              origem="paciente"
              carregando={carregando}
            />
          </div>
        )}

        {/* Estado vazio em desktop */}
        {!carregando && !mensagemGerada && gestosActuais.length === 0 && (
          <div className="hidden flex-col gap-3 justify-center items-center h-48
                          rounded-2xl border-2 border-dashed lg:flex
                          border-laranja/20 bg-laranja/3">
            <p className="px-6 font-sans text-xs text-center text-gray-300">
              Os gestos detectados e a mensagem gerada aparecerão aqui
            </p>
          </div>
        )}
      </div>

      {mostrarGlossario && <GlossarioGestos aoFechar={() => setMostrarGlossario(false)} />}
    </div>
  )
}