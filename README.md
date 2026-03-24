# 🤚 Zero Barreiras

**Comunicação acessível entre pacientes surdos e profissionais de saúde em Angola.**

Projeto desenvolvido para o **Hackathon Zero Barreiras — UNFPA Angola 2026**.  
Tema: *Acesso à Saúde Sexual e Reprodutiva da Pessoa com Deficiência.*

---

## 🚀 Como Instalar e Executar

### Pré-requisitos
- Node.js 18 ou superior → [nodejs.org](https://nodejs.org)
- Uma chave gratuita do Google Gemini → [aistudio.google.com](https://aistudio.google.com)

### Passos

```bash
# 1. Entra na pasta do projeto
cd zero-barreiras

# 2. Instala as dependências
npm install

# 3. Copia o ficheiro de configuração
cp .env.exemplo .env

# 4. Abre o ficheiro .env e coloca a tua chave Gemini
# VITE_GEMINI_API_KEY=AIzaSy...

# 5. Inicia o servidor de desenvolvimento
npm run dev

# 6. Abre no browser: http://localhost:3000
```

---

## 🛠️ Stack Tecnológica

| Tecnologia | Uso |
|---|---|
| React + Vite | Interface da aplicação |
| Tailwind CSS | Estilização |
| MediaPipe Hands | Detecção de gestos via câmara |
| Google Gemini API | IA para construção de frases |
| Web Speech API | Voz → texto e texto → voz |

---

## 📱 Funcionalidades

### Modo Paciente (🤚)
- Detecção de gestos em tempo real via câmara
- Reconhecimento de 25 gestos médicos chave
- Conversão de gestos em frases naturais com IA (Gemini)
- Botões de gesto rápido para demo sem câmara
- Leitura em voz alta da mensagem gerada

### Modo Profissional de Saúde (👨‍⚕️)
- Entrada por voz ou texto
- Simplificação automática da mensagem com IA
- Sugestão de gestos para o paciente responder
- Leitura em voz alta da mensagem simplificada

### Histórico da Consulta (💬)
- Registo completo da sessão
- Resumo automático da consulta com IA
- Leitura em voz alta do resumo

---

## 🖐️ Gestos Suportados

| Categoria | Gestos |
|---|---|
| Partes do Corpo | Cabeça, Barriga, Peito, Costas |
| Sintomas | Dor, Febre, Enjoo, Sangramento, Cansaço |
| Saúde Sexual e Reprodutiva | Gravidez, Menstruação |
| Urgência | Urgente, Ajuda |
| Comunicação | Sim, Não, Não entendo |
| Geral | Médico, Hospital, Consulta, Água, Família, Medicamento |

---

## 🏗️ Estrutura de Diretórios

```
zero-barreiras/
├── src/
│   ├── componentes/         # Componentes React reutilizáveis
│   │   ├── AlternadorModo.jsx
│   │   ├── CameraGestos.jsx
│   │   ├── ChipsGestos.jsx
│   │   ├── ConfiguracaoChave.jsx
│   │   ├── EntradaVoz.jsx
│   │   ├── ExibicaoMensagem.jsx
│   │   ├── GlossarioGestos.jsx
│   │   └── ResumoDaConsulta.jsx
│   ├── dados/               # Dados estáticos
│   │   └── gestos.js        # Vocabulário de gestos médicos
│   ├── estilos/             # CSS global
│   │   └── global.css
│   ├── hooks/               # Hooks React personalizados
│   │   ├── useDeteccaoGestos.js
│   │   └── useFalaParaTexto.js
│   ├── paginas/             # Páginas principais
│   │   ├── HistoricoConsulta.jsx
│   │   ├── ModoMedico.jsx
│   │   └── ModoPaciente.jsx
│   ├── servicos/            # Serviços externos
│   │   ├── classificadorGestos.js
│   │   └── gemini.js
│   ├── Aplicacao.jsx        # Componente raiz
│   └── main.jsx             # Entrada da aplicação
├── publico/                 # Ficheiros estáticos
│   └── icone.svg
├── .env.exemplo             # Exemplo de configuração
├── .gitignore
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

---

## 🔑 Obter a Chave Gemini Gratuita

1. Acede a [aistudio.google.com](https://aistudio.google.com)
2. Faz login com a tua conta Google
3. Clica em **"Get API Key"**
4. Cria uma nova chave
5. Copia e cola no ficheiro `.env`

---

## 📦 Construir para Produção

```bash
npm run build
```

Os ficheiros de produção ficam na pasta `dist/`.  
Para fazer deploy gratuito usa [Vercel](https://vercel.com) ou [Netlify](https://netlify.com).

---

## 🇦🇴 Parceiros

UNFPA Angola · Ministério da Saúde · Acelera · AfriYAN · LARDEF · YAPAMA

---

*Hackathon Zero Barreiras · Luanda · Março 2026*
