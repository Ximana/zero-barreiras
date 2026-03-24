import { useState } from 'react'
import ConfiguracaoChave from './componentes/ConfiguracaoChave'
import TelaInicial from './paginas/TelaInicial'
import TelaMenu from './paginas/TelaMenu'
import TelaConsulta from './paginas/TelaConsulta'
import TelaInformacoes from './paginas/TelaInformacoes'

const envConfigurado =
  import.meta.env.VITE_GEMINI_API_KEY &&
  import.meta.env.VITE_GEMINI_API_KEY !== 'coloca_aqui_a_tua_chave_gemini' &&
  import.meta.env.VITE_GEMINI_MODELO

// Telas disponíveis
const TELAS = {
  INICIAL: 'inicial',
  MENU: 'menu',
  CONSULTA: 'consulta',
  INFORMACOES: 'informacoes',
}

export default function Aplicacao() {
  const [tela, setTela] = useState(TELAS.INICIAL)

  if (!envConfigurado) {
    return <ConfiguracaoChave />
  }

  if (tela === TELAS.INICIAL) {
    return <TelaInicial aoIniciar={() => setTela(TELAS.MENU)} />
  }

  if (tela === TELAS.MENU) {
    return (
      <TelaMenu
        aoConsulta={() => setTela(TELAS.CONSULTA)}
        aoInformacoes={() => setTela(TELAS.INFORMACOES)}
        aoVoltar={() => setTela(TELAS.INICIAL)}
      />
    )
  }

  if (tela === TELAS.CONSULTA) {
    return <TelaConsulta aoVoltar={() => setTela(TELAS.MENU)} />
  }

  if (tela === TELAS.INFORMACOES) {
    return <TelaInformacoes aoVoltar={() => setTela(TELAS.MENU)} />
  }

  return null
}
