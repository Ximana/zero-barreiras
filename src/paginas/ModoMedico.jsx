import { useState } from 'react'
import EntradaVoz from '../componentes/EntradaVoz'
import ExibicaoMensagem from '../componentes/ExibicaoMensagem'
import PlayerGestual from '../componentes/PlayerGestual'
import { textoParaSequenciaGestos } from '../dados/gestos'
import { Lightbulb, HandMetal, ChevronDown, ChevronUp, CheckCircle2, Info, Sparkles } from 'lucide-react'

export default function ModoMedico({ aoAdicionarHistorico }) {
  const [textoMedico, setTextoMedico]       = useState('')
  const [mensagemActiva, setMensagemActiva] = useState(null)
  const [sequencia, setSequencia]           = useState([])
  const [mostrarPlayer, setMostrarPlayer]   = useState(true)
  const [interpretado, setInterpretado]     = useState(false)

  const interpretarMensagem = () => {
    const texto = textoMedico.trim()
    if (!texto) return
    const itens = textoParaSequenciaGestos(texto)
    setMensagemActiva(texto)
    setSequencia(itens)
    setMostrarPlayer(true)
    setInterpretado(true)
    aoAdicionarHistorico({ origem: 'medico', texto })
  }

  const limpar = () => {
    setTextoMedico('')
    setMensagemActiva(null)
    setSequencia([])
    setInterpretado(false)
  }

  const numFrases   = sequencia.filter(i => i.tipo === 'frase').length
  const numGestos   = sequencia.filter(i => i.tipo === 'gesto').length
  const temSemGesto = sequencia.some(i => i.chave === 'nao_entendo')

  return (
    <div className="flex flex-col lg:flex-row lg:gap-6 lg:items-start gap-6">

      {/* ══ COLUNA ESQUERDA — Entrada ══════════════════════════════════════════ */}
      <div className="flex flex-col gap-5 lg:w-5/12 lg:sticky lg:top-6">

        {/* Instrução */}
        <div className="flex gap-3 items-start px-5 py-4 bg-amber-50 rounded-2xl border border-amber-200">
          <Lightbulb size={18} className="text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-sans text-sm font-semibold text-amber-800">Como usar</p>
            <p className="mt-1 font-sans text-xs text-amber-700">
              Escreve ou dita a mensagem. Se a frase existir no banco de dados, o vídeo
              correspondente é reproduzido directamente. Caso contrário, os gestos individuais
              são seleccionados e reproduzidos em sequência.
            </p>
          </div>
        </div>

        {/* Entrada de texto / voz */}
        <div className="flex flex-col gap-3">
          <label className="font-sans text-sm font-semibold text-gray-700">A tua mensagem</label>
          <EntradaVoz
            valor={textoMedico}
            aoMudar={(v) => { setTextoMedico(v); setInterpretado(false) }}
            placeholder="Ex: Bom dia / Tens dor de cabeça? / Preciso de ajuda urgente"
          />
        </div>

        {/* Botão interpretar */}
        <button
          onClick={interpretarMensagem}
          disabled={!textoMedico.trim()}
          className="flex gap-2 justify-center items-center w-full botao-primario
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <HandMetal size={17} />
          <span>Interpretar em Linguagem Gestual</span>
        </button>

        {/* Resumo rápido após interpretação */}
        {interpretado && mensagemActiva && (
          <div className="flex flex-col gap-3 px-4 py-3 bg-green-50 rounded-2xl border border-green-200">
            <div className="flex gap-2 items-center">
              <CheckCircle2 size={15} className="text-green-600 flex-shrink-0" />
              <p className="font-sans text-xs font-semibold text-green-800">
                {sequencia.length} item{sequencia.length !== 1 ? 's' : ''}
                {numFrases > 0 && ` · ${numFrases} frase${numFrases !== 1 ? 's' : ''}`}
                {numGestos > 0 && ` · ${numGestos} gesto${numGestos !== 1 ? 's' : ''}`}
              </p>
            </div>
            <ExibicaoMensagem mensagem={mensagemActiva} origem="medico" carregando={false} />
          </div>
        )}

        {/* Aviso: palavras sem correspondência */}
        {interpretado && temSemGesto && (
          <div className="flex gap-3 items-start px-4 py-3 bg-blue-50 rounded-xl border border-blue-200">
            <Info size={15} className="text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="font-sans text-xs text-blue-700">
              Algumas palavras não têm equivalente no banco de dados. Considera adicionar
              mais vocabulário ao ficheiro{' '}
              <code className="font-mono bg-blue-100 px-1 rounded">gestos.js</code>.
            </p>
          </div>
        )}

        {/* Botão nova mensagem */}
        {interpretado && (
          <button
            onClick={limpar}
            className="font-sans text-sm text-gray-400 hover:text-laranja transition-colors
                       text-center underline underline-offset-2"
          >
            ↩ Nova mensagem
          </button>
        )}
      </div>

      {/* ══ COLUNA DIREITA — Player ════════════════════════════════════════════ */}
      <div className="flex flex-col gap-4 lg:w-7/12">

        {/* Placeholder desktop antes de interpretar */}
        {!interpretado && (
          <div className="hidden lg:flex flex-col items-center justify-center gap-4
                          rounded-2xl border-2 border-dashed border-laranja/20 bg-laranja/3"
               style={{ aspectRatio: '832 / 1104' }}>
            <div className="flex justify-center items-center w-14 h-14 rounded-2xl bg-laranja/10">
              <Sparkles size={26} className="text-laranja/50" />
            </div>
            <div className="text-center px-8">
              <p className="font-sans text-sm font-semibold text-gray-400">
                A reprodução aparecerá aqui
              </p>
              <p className="font-sans text-xs text-gray-300 mt-1">
                Introduz uma mensagem e clica em Interpretar
              </p>
            </div>
          </div>
        )}

        {/* Player — vídeo + controlos + miniaturas (itens identificados) */}
        {interpretado && sequencia.length > 0 && (
          <div className="animate-deslizar-cima">
            {/* Cabeçalho colapsável do player */}
            <div className="overflow-hidden bg-white rounded-2xl border border-gray-200 shadow-sm">
              <button
                onClick={() => setMostrarPlayer(p => !p)}
                className="flex justify-between items-center px-5 py-4 w-full
                           transition-colors duration-200 hover:bg-gray-50"
              >
                <div className="flex gap-3 items-center">
                  <div className="flex justify-center items-center w-8 h-8 rounded-lg bg-laranja/10">
                    <HandMetal size={15} className="text-laranja" />
                  </div>
                  <div className="text-left">
                    <p className="font-sans text-sm font-semibold text-gray-900">
                      Reprodução em Linguagem Gestual
                    </p>
                    <p className="font-sans text-xs text-gray-400">
                      {sequencia.length} item{sequencia.length !== 1 ? 's' : ''} em sequência
                    </p>
                  </div>
                </div>
                {mostrarPlayer
                  ? <ChevronUp size={16} className="text-gray-400" />
                  : <ChevronDown size={16} className="text-gray-400" />}
              </button>

              {mostrarPlayer && (
                <div className="px-5 pb-5 border-t border-gray-100">
                  <div className="pt-4">
                    {/*
                      PlayerGestual mostra:
                        1. Vídeo portrait (832×1104)
                        2. Controlos
                        3. Miniaturas / itens identificados
                    */}
                    <PlayerGestual sequencia={sequencia} aoTerminar={() => {}} />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}