import { useState, useEffect, useRef } from "react";
import logo from '../assets/logo.jpg'
import {
  HandMetal,
  Dna,
  Mic,
  MapPin,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Shield,
  Users,
  Zap,
} from "lucide-react";

const SLIDES = [
  {
    Icon: HandMetal,
    titulo: "Comunicação sem barreiras",
    descricao:
      "Traduzimos gestos de pacientes surdos em frases claras para os profissionais de saúde em tempo real.",
    cor: "#F46300",
  },
  {
    Icon: Dna,
    titulo: "Saúde Sexual e Reprodutiva para todos",
    descricao:
      "Pessoas com deficiência têm o mesmo direito ao acesso à saúde sexual e reprodutiva de qualidade.",
    cor: "#E05500",
  },
  {
    Icon: Mic,
    titulo: "Voz e gesto unidos",
    descricao:
      "O profissional fala, a IA simplifica. O paciente gesticula, a IA traduz. Uma ponte entre dois mundos.",
    cor: "#FF7A1A",
  },
  {
    Icon: MapPin,
    titulo: "Feito para Angola",
    descricao:
      "Desenvolvido com contexto angolano, linguagem local e foco nas necessidades reais das comunidades.",
    cor: "#CC4A00",
  },
];

export default function TelaInicial({ aoIniciar }) {
  const [slideActual, setSlideActual] = useState(0);
  const [arrastando, setArrastando] = useState(false);
  const inicioArrasteRef = useRef(0);
  const intervaloRef = useRef(null);

  const avancarSlide = () => setSlideActual((s) => (s + 1) % SLIDES.length);
  const recuarSlide = () =>
    setSlideActual((s) => (s - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    intervaloRef.current = setInterval(avancarSlide, 4500);
    return () => clearInterval(intervaloRef.current);
  }, []);

  const reiniciarIntervalo = () => {
    clearInterval(intervaloRef.current);
    intervaloRef.current = setInterval(avancarSlide, 4500);
  };

  const irParaSlide = (i) => {
    setSlideActual(i);
    reiniciarIntervalo();
  };

  const aoIniciarArraste = (e) => {
    setArrastando(true);
    inicioArrasteRef.current = e.touches ? e.touches[0].clientX : e.clientX;
  };
  const aoTerminarArraste = (e) => {
    if (!arrastando) return;
    setArrastando(false);
    const fim = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const delta = inicioArrasteRef.current - fim;
    if (Math.abs(delta) > 50) {
      delta > 0 ? avancarSlide() : recuarSlide();
      reiniciarIntervalo();
    }
  };

  const slide = SLIDES[slideActual];
  const SlideIcon = slide.Icon;

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* TOP NAVBAR */}
      <nav className="flex sticky top-0 z-30 justify-between items-center px-6 py-0 h-16 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex gap-3 items-center">
          <div className="flex items-baseline gap-1.5">
            <img src={logo} className="w-20" alt="" />
          </div>
        </div>
        <div className="flex gap-3 items-center">
          <span className="hidden font-sans text-xs text-gray-400 sm:inline">
            Hackathon 2026
          </span>
          <div className="bg-laranja/8 border border-laranja/20 rounded-lg px-3 py-1.5">
            <p className="font-sans text-xs font-semibold text-laranja">
              UNFPA Angola
            </p>
          </div>
        </div>
      </nav>

      {/* HERO — duas colunas desktop */}
      <main className="flex flex-col flex-1 lg:flex-row">
        {/* PAINEL esquerdo */}
        <div className="flex flex-col justify-center px-8 py-12 bg-white border-r border-gray-100 lg:w-5/12 xl:w-1/2 lg:px-16 lg:py-20">
          <h1 className="mb-6 text-4xl font-bold leading-tight text-gray-900 font-display lg:text-5xl xl:text-6xl">
            Saúde acessível
            <br />
            para todos
          </h1>
          <p className="mb-10 max-w-sm font-sans text-base leading-relaxed text-gray-500">
            Tecnologia que elimina barreiras de comunicação entre pacientes com
            deficiência e profissionais de saúde em Angola
          </p>

          <button
            onClick={aoIniciar}
            className="botao-primario self-start flex items-center gap-3 text-base px-8 py-4 rounded-2xl
                       hover:-translate-y-0.5 transition-all duration-200"
          >
            <span>Começar</span>
          </button>
        </div>

        {/* Painel direito — carousel */}
        <div className="flex relative flex-col justify-center items-center px-6 py-12 lg:w-7/12 xl:w-1/2 lg:px-12">
          <div className="absolute inset-0 opacity-20 pointer-events-none padrao-pontos" />

          <div
            className="relative z-10 w-full max-w-lg"
            onMouseDown={aoIniciarArraste}
            onMouseUp={aoTerminarArraste}
            onTouchStart={aoIniciarArraste}
            onTouchEnd={aoTerminarArraste}
          >
            <button
              onClick={() => {
                recuarSlide();
                reiniciarIntervalo();
              }}
              className="flex absolute -left-5 top-1/2 z-10 justify-center items-center w-10 h-10 text-gray-500 bg-white rounded-full border border-gray-200 shadow-lg transition-all duration-200 -translate-y-1/2 hover:border-laranja hover:text-laranja"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => {
                avancarSlide();
                reiniciarIntervalo();
              }}
              className="flex absolute -right-5 top-1/2 z-10 justify-center items-center w-10 h-10 text-gray-500 bg-white rounded-full border border-gray-200 shadow-lg transition-all duration-200 -translate-y-1/2 hover:border-laranja hover:text-laranja"
            >
              <ChevronRight size={18} />
            </button>

            <div
              key={slideActual}
              className="overflow-hidden bg-white rounded-3xl border shadow-2xl select-none shadow-laranja/10 border-laranja/8 animate-aparecer"
            >
              <div
                className="h-1.5 w-full"
                style={{
                  background: `linear-gradient(90deg, ${slide.cor}, ${slide.cor}66)`,
                }}
              />
              <div className="flex flex-col gap-8 items-center p-10 text-center">
                
                <div className="flex flex-col gap-4">
                  <h2 className="text-2xl font-bold leading-tight text-gray-900 font-display lg:text-3xl">
                    {slide.titulo}
                  </h2>
                  <p className="max-w-sm font-sans text-sm leading-relaxed text-gray-500 lg:text-base">
                    {slide.descricao}
                  </p>
                </div>
                <div className="flex gap-3 items-center w-full">
                  <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700 bg-laranja"
                      style={{
                        width: `${((slideActual + 1) / SLIDES.length) * 100}%`,
                      }}
                    />
                  </div>
                  <span className="font-sans text-xs font-medium text-gray-400 whitespace-nowrap">
                    {slideActual + 1} / {SLIDES.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-2 justify-center mt-6">
              {SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => irParaSlide(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === slideActual
                      ? "w-8 h-2.5 bg-laranja"
                      : "w-2.5 h-2.5 bg-laranja/25 hover:bg-laranja/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
