export default function ConfiguracaoChave() {
  return (
    <div className="fixed inset-0 fundo-inicial flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md text-center flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-red-50 border-2 border-red-200 rounded-3xl
                        flex items-center justify-center text-4xl shadow-sm">
          ⚙️
        </div>
        <div>
          <h1 className="font-display font-bold text-2xl text-gray-800 mb-2">
            Configuração em falta
          </h1>
          <p className="text-gray-500 font-sans text-sm leading-relaxed">
            O ficheiro <code className="text-laranja bg-laranja/10 px-1.5 py-0.5 rounded font-mono">.env</code> não está configurado.<br />
            Preenche as variáveis abaixo e reinicia o servidor.
          </p>
        </div>
        <div className="w-full bg-gray-900 border border-gray-700 rounded-2xl px-5 py-4 text-left shadow-xl">
          <code className="text-sm font-mono leading-relaxed">
            <span className="text-gray-500"># .env</span><br />
            <span className="text-blue-300">VITE_GEMINI_API_KEY</span>
            <span className="text-white">=</span>
            <span className="text-yellow-300">AIzaSy...</span><br />
            <span className="text-blue-300">VITE_GEMINI_MODELO</span>
            <span className="text-white">=</span>
            <span className="text-yellow-300">gemini-2.5-flash-preview-04-17</span>
          </code>
        </div>
        <p className="text-gray-400 text-xs font-sans">
          Depois de guardar, reinicia com{' '}
          <code className="text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded">npm run dev</code>
        </p>
      </div>
    </div>
  )
}
