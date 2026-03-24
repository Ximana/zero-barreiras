export default function ConfiguracaoChave() {
  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center p-4 fundo-animado">
      <div className="flex flex-col gap-6 items-center w-full max-w-md text-center">
        <div className="inline-flex justify-center items-center w-20 h-20 text-4xl rounded-3xl border bg-red-500/20 border-red-500/30">
          ⚙️
        </div>
        <div>
          <h1 className="mb-2 text-2xl font-extrabold text-white font-display">
            Configuração em falta
          </h1>
          <p className="text-sm leading-relaxed text-white/50 font-corpo">
            O ficheiro <code className="text-primaria-400 bg-white/5 px-1.5 py-0.5 rounded">.env</code> não está configurado.<br />
            Abre o ficheiro e preenche as variáveis:
          </p>
        </div>
        <div className="px-5 py-4 w-full text-left rounded-2xl border bg-black/40 border-white/10">
          <code className="font-mono text-sm leading-relaxed text-green-400">
            <span className="text-white/30"># .env</span><br />
            VITE_GEMINI_API_KEY=<span className="text-yellow-400">AIzaSy...</span><br />
            VITE_GEMINI_MODELO=<span className="text-yellow-400">gemini-2.5-flash-preview-04-17</span>
          </code>
        </div>
        <p className="text-xs text-white/30 font-corpo">
          Depois de guardar o ficheiro, reinicia o servidor com <code className="text-white/50">npm run dev</code>
        </p>
      </div>
    </div>
  )
}