import { useState } from 'react'
import { GESTOS_POR_CATEGORIA, CATEGORIAS } from '../dados/gestos'

export default function GlossarioGestos({ aoFechar }) {
  const [categoriaActiva, setCategoriaActiva] = useState('todos')
  const categorias = ['todos', ...Object.keys(CATEGORIAS)]

  const gestosFiltrados = categoriaActiva === 'todos'
    ? Object.entries(GESTOS_POR_CATEGORIA).flatMap(([, gestos]) => gestos)
    : GESTOS_POR_CATEGORIA[categoriaActiva] || []

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center p-4">
      <div className="w-full max-w-lg max-h-[85vh] bg-white border border-laranja/15
                      rounded-3xl flex flex-col overflow-hidden shadow-2xl shadow-laranja/15">

        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
          <div>
            <h2 className="font-display font-bold text-gray-800 text-xl">Glossário de Gestos</h2>
            <p className="text-gray-400 text-sm font-sans mt-0.5">Gestos médicos suportados</p>
          </div>
          <button
            onClick={aoFechar}
            className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-red-50 hover:text-red-500
                       flex items-center justify-center text-gray-400
                       transition-all duration-200 font-sans"
          >✕</button>
        </div>

        <div className="flex gap-2 px-6 py-4 overflow-x-auto border-b border-gray-50">
          {categorias.map(cat => (
            <button
              key={cat}
              onClick={() => setCategoriaActiva(cat)}
              className={`whitespace-nowrap text-xs px-3 py-1.5 rounded-full font-sans font-semibold
                          transition-all duration-200 border flex-shrink-0
                          ${categoriaActiva === cat
                            ? 'bg-laranja border-laranja text-white'
                            : 'border-gray-200 text-gray-500 hover:border-laranja/40 hover:text-laranja'
                          }`}
            >
              {cat === 'todos' ? 'Todos' : CATEGORIAS[cat]?.nome}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          <div className="grid grid-cols-2 gap-2">
            {gestosFiltrados.map((gesto) => (
              <div key={gesto.chave}
                className="flex items-center gap-3 p-3 rounded-2xl border border-gray-100
                           bg-gray-50 hover:border-laranja/25 hover:bg-laranja/5 transition-all">
                <span className="text-2xl">{gesto.emoji}</span>
                <div className="min-w-0">
                  <p className="font-sans font-semibold text-sm text-gray-700">{gesto.nome}</p>
                  <p className="font-sans text-xs text-gray-400 truncate">{gesto.descricao}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-100">
          <p className="text-gray-400 text-xs font-sans text-center">
            {gestosFiltrados.length} gestos · Mantém o gesto 2 segundos para confirmar
          </p>
        </div>
      </div>
    </div>
  )
}
