import { useState } from "react";
import ModoPaciente from "./ModoPaciente";
import ModoMedico from "./ModoMedico";
import HistoricoConsulta from "./HistoricoConsulta";
import logo from '../assets/logo.jpg'
import {
  ChevronLeft,
  Stethoscope,
  HandMetal,
  MessageSquare,
  Circle,
} from "lucide-react";

const ABAS = [
  {
    id: "paciente",
    rotulo: "Paciente",
    descricao: "Gestos e comunicação",
  },
  {
    id: "medico",
    rotulo: "Profissional",
    descricao: "Modo médico",
  },
  {
    id: "historico",
    rotulo: "Histórico",
    descricao: "Registo da consulta",
  },
];

export default function TelaConsulta({ aoVoltar }) {
  const [abaActiva, setAbaActiva] = useState("paciente");
  const [historico, setHistorico] = useState([]);

  const adicionarHistorico = (mensagem) => {
    setHistorico((prev) => [
      ...prev,
      { ...mensagem, hora: new Date().toLocaleTimeString("pt-AO") },
    ]);
  };

  const abaInfo = ABAS.find((a) => a.id === abaActiva);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <nav className="flex sticky top-0 z-30 justify-between items-center px-6 h-16 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex gap-4 items-center">
          <button
            onClick={aoVoltar}
            className="flex justify-center items-center w-9 h-9 text-gray-500 bg-white rounded-xl border border-gray-200 transition-all duration-200 hover:border-laranja hover:text-laranja"
          >
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-2.5">
            <div className="flex items-baseline gap-1.5">
              <img src={logo} className="w-20" alt="" />
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          {historico.length > 0 && (
            <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-xl px-3 py-1.5">
              <div className="indicador-ativo" />
              <span className="font-sans text-xs font-semibold text-green-700">
                {historico.length} mensagens
              </span>
            </div>
          )}
          <div className="flex items-center gap-1.5 bg-laranja/8 rounded-xl px-3 py-1.5">
            <Circle size={8} className="text-laranja fill-laranja" />
            <span className="font-sans text-xs font-semibold text-laranja">
              Sessão activa
            </span>
          </div>
        </div>
      </nav>

      <div className="flex overflow-hidden flex-1">
        {/* SIDEBAR — desktop */}
        <aside className="hidden flex-col flex-shrink-0 bg-white border-r border-gray-200 lg:flex lg:w-64 xl:w-72">
          <div className="p-6 border-b border-gray-100">
            <p className="mb-1 font-sans text-xs font-semibold tracking-wider text-gray-400 uppercase">
              Consulta em curso
            </p>
            <h2 className="text-xl font-bold text-gray-900 font-display">
              Modo de vista
            </h2>
          </div>
          <nav className="p-4 flex flex-col gap-1.5 flex-1">
            {ABAS.map(({ id, rotulo, descricao }) => (
              <button
                key={id}
                onClick={() => setAbaActiva(id)}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-left w-full
                            transition-all duration-200
                            ${
                              abaActiva === id
                                ? "bg-laranja text-white shadow-md shadow-laranja/25"
                                : "text-gray-600 hover:bg-gray-100"
                            }`}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-sans text-sm font-semibold leading-none">
                    {rotulo}
                  </p>
                  <p
                    className={`text-xs mt-1 ${abaActiva === id ? "text-white/70" : "text-gray-400"}`}
                  >
                    {descricao}
                  </p>
                </div>
                {id === "historico" && historico.length > 0 && (
                  <span
                    className={`text-xs font-sans font-bold rounded-lg px-2 py-0.5
                    ${abaActiva === id ? "bg-white/25 text-white" : "bg-laranja/10 text-laranja"}`}
                  >
                    {historico.length}
                  </span>
                )}
              </button>
            ))}
          </nav>
          <div className="p-4 m-4 bg-gray-50 rounded-2xl border border-gray-200">
            <p className="font-sans text-xs leading-relaxed text-gray-400">
              Os dados da sessão são eliminados ao sair. Não é guardada nenhuma
              informação clínica.
            </p>
          </div>
        </aside>

        <div className="flex overflow-hidden flex-col flex-1">
          {/* Mobile tabs */}
          <div className="px-4 py-3 bg-white border-b border-gray-200 lg:hidden">
            <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
              {ABAS.map(({ id, rotulo }) => (
                <button
                  key={id}
                  onClick={() => setAbaActiva(id)}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs
                              font-sans font-semibold transition-all duration-200
                              ${
                                abaActiva === id
                                  ? "bg-laranja text-white shadow-md shadow-laranja/25"
                                  : "text-gray-500 hover:text-gray-700"
                              }`}
                >
                  <span>{rotulo}</span>
                  {id === "historico" && historico.length > 0 && (
                    <span
                      className={`text-xs rounded-md px-1.5 py-0.5 ${abaActiva === id ? "bg-white/30" : "bg-laranja/15 text-laranja"}`}
                    >
                      {historico.length}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Titulo da pagina */}
          <div className="flex gap-3 items-center px-6 py-5 bg-white border-b border-gray-100 lg:px-8">
            <div>
              <h1 className="text-lg font-bold leading-tight text-gray-900 font-display">
                {abaInfo.rotulo}
              </h1>
              <p className="font-sans text-xs text-gray-400">
                {abaInfo.descricao}
              </p>
            </div>
          </div>

          <main className="overflow-y-auto flex-1 px-6 py-6 lg:px-8">
            <div className="mx-auto max-w-2xl lg:max-w-none">
              {abaActiva === "paciente" && (
                <ModoPaciente aoAdicionarHistorico={adicionarHistorico} />
              )}
              {abaActiva === "medico" && (
                <ModoMedico aoAdicionarHistorico={adicionarHistorico} />
              )}
              {abaActiva === "historico" && (
                <HistoricoConsulta
                  historico={historico}
                  aoLimpar={() => setHistorico([])}
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
