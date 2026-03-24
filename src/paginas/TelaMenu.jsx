export default function TelaMenu({ aoConsulta, aoInformacoes, aoVoltar }) {
  return (
    <div className="min-h-screen fundo-inicial flex flex-col">
      <div className="absolute inset-0 padrao-pontos opacity-30 pointer-events-none" />

      {/* Cabeçalho */}
      <header className="relative z-10 px-6 pt-8 flex items-center gap-4">
        <button
          onClick={aoVoltar}
          className="w-10 h-10 rounded-2xl bg-white border border-laranja/20 shadow-sm
                     flex items-center justify-center text-laranja hover:bg-laranja hover:text-white
                     transition-all duration-200"
        >
          ←
        </button>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-laranja rounded-xl flex items-center justify-center
                          shadow-md shadow-laranja/30 text-xl">
            🤚
          </div>
          <div>
            <span className="font-display font-bold text-lg text-laranja leading-none block">Zero</span>
            <span className="font-display font-bold text-lg text-gray-800 leading-none block">Barreiras</span>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="relative z-10 flex-1 flex flex-col justify-center px-6 gap-8">

        <div className="text-center animate-deslizar-cima">
          <p className="text-xs font-sans font-semibold uppercase tracking-widest text-laranja/60 mb-2">
            Menu Principal
          </p>
          <h1 className="font-display font-bold text-3xl text-gray-800 leading-tight">
            O que precisas?
          </h1>
          <p className="text-gray-400 font-sans text-sm mt-2">
            Escolhe uma das opções abaixo
          </p>
        </div>

        {/* Cartões de menu */}
        <div className="flex flex-col gap-4 max-w-sm mx-auto w-full">

          {/* Consulta */}
          <button
            onClick={aoConsulta}
            className="group w-full bg-white border-2 border-laranja/20 rounded-3xl p-6
                       shadow-md shadow-laranja/8 hover:shadow-xl hover:shadow-laranja/20
                       hover:border-laranja/50 hover:-translate-y-1
                       transition-all duration-300 text-left flex items-center gap-5"
          >
            <div className="w-16 h-16 bg-laranja/10 group-hover:bg-laranja rounded-2xl
                            flex items-center justify-center text-3xl flex-shrink-0
                            transition-all duration-300">
              🩺
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display font-bold text-xl text-gray-800 group-hover:text-laranja
                             transition-colors duration-200">
                Consulta
              </h2>
              <p className="font-sans text-sm text-gray-400 mt-1 leading-relaxed">
                Comunicação em tempo real entre paciente surdo e profissional de saúde
              </p>
            </div>
            <span className="text-laranja/40 group-hover:text-laranja text-xl
                             group-hover:translate-x-1 transition-all duration-200">
              →
            </span>
          </button>

          {/* Informações */}
          <button
            onClick={aoInformacoes}
            className="group w-full bg-white border-2 border-laranja/20 rounded-3xl p-6
                       shadow-md shadow-laranja/8 hover:shadow-xl hover:shadow-laranja/20
                       hover:border-laranja/50 hover:-translate-y-1
                       transition-all duration-300 text-left flex items-center gap-5"
          >
            <div className="w-16 h-16 bg-laranja/10 group-hover:bg-laranja rounded-2xl
                            flex items-center justify-center text-3xl flex-shrink-0
                            transition-all duration-300">
              📋
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="font-display font-bold text-xl text-gray-800 group-hover:text-laranja
                             transition-colors duration-200">
                Informações
              </h2>
              <p className="font-sans text-sm text-gray-400 mt-1 leading-relaxed">
                Guia de atendimento a pessoas com deficiência em saúde sexual e reprodutiva
              </p>
            </div>
            <span className="text-laranja/40 group-hover:text-laranja text-xl
                             group-hover:translate-x-1 transition-all duration-200">
              →
            </span>
          </button>
        </div>
      </main>

      <footer className="relative z-10 text-center px-6 py-6">
        <p className="text-gray-300 text-xs font-sans">UNFPA Angola · Hackathon Zero Barreiras 2026</p>
      </footer>
    </div>
  )
}
