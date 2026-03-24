import { useState } from 'react'
import { GESTOS_POR_CATEGORIA, CATEGORIAS } from '../dados/gestos'

const COR_CATEGORIA = {
  corpo: 'border-blue-500/30 bg-blue-500/10 text-blue-300',
  sintoma: 'border-red-500/30 bg-red-500/10 text-red-300',
  ssr: 'border-purple-500/30 bg-purple-500/10 text-purple-300',
  urgencia: 'border-orange-500/30 bg-orange-500/10 text-orange-300',
  comunicacao: 'border-green-500/30 bg-green-500/10 text-green-300',
  geral: 'border-gray-500/30 bg-gray-500/10 text-gray-300',
}

export default function GlossarioGestos({ aoFechar }) {
  const [categoriaActiva, setCategoriaActiva] = useState('todos')

  const categorias = ['todos', ...Object.keys(CATEGORIAS)]

  const gestosFiltrados = categoriaActiva === 'todos'
    ? Object.entries(GESTOS_POR_CATEGORIA).flatMap(([, gestos]) => gestos)
    : GESTOS_POR_CATEGORIA[categoriaActiva] || []

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl max-h-[85vh] bg-escura-800 border border-white/10 
                      rounded-3xl flex flex-col overflow-hidden">

        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
          <div>
            <h2 className="font-display font-bold text-white text-xl">Glossário de Gestos</h2>
            <p className="text-white/40 text-sm font-corpo mt-0.5">
              Gestos médicos suportados pelo sistema
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

        {/* Filtros de categoria */}
        <div className="flex gap-2 px-6 py-4 overflow-x-auto border-b border-white/5">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`whitespace-nowrap text-xs px-3 py-1.5 rounded-full font-corpo 
                          transition-all duration-200 border
                          ${categoriaActiva === cat
                            ? 'bg-primaria-500 border-primaria-500 text-white'
                            : 'border-white/10 text-white/40 hover:text-white/70 hover:border-white/20'
                          }`}
            >
              {cat === 'todos' ? 'Todos' : CATEGORIAS[cat]?.nome}
            </button>
          ))}
        </div>

        {/* Lista de gestos */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="grid grid-cols-2 gap-2">
            {gestosFiltrados.map((gesto) => (
              <div
                key={gesto.chave}
                className={`flex items-center gap-3 p-3 rounded-2xl border 
                            ${COR_CATEGORIA[gesto.categoria]}`}
              >
                <span className="text-2xl">{gesto.emoji}</span>
                <div className="min-w-0">
                  <p className="font-corpo font-medium text-sm text-white">{gesto.nome}</p>
                  <p className="font-corpo text-xs opacity-60 truncate">{gesto.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rodapé */}
        <div className="px-6 py-4 border-t border-white/10">
          <p className="text-white/30 text-xs font-corpo text-center">
            {gestosFiltrados.length} gestos disponíveis • Mantém o gesto por 2 segundos para confirmar
          </p>
        </div>
      </div>
    </div>
  )
}
