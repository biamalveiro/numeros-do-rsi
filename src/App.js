import React, { useState } from "react";

import Chart from "./Chart";
import chartConfig from "./chartConfig";

const buttonStyle =
  "inline-block px-2 py-1 text-xs text-center text-slate-500 uppercase border-2 bg-white transition duration-200 ease-in-out border-slate-500  rounded-md cursor-pointer hover:border-slate-600 hover:bg-slate-100";

function App() {
  const [chart, setChart] = useState("LFV");

  return (
    <div className="py-10 w-full md:w-9/12 mx-auto">
      <div className="text-gray-600 text-center my-4">
        <a
          href="https://github.com/biamalveiro/numeros-do-rsi"
          className="absolute top-0 right-0 m-2"
        >
          <svg
            width="24"
            height="24"
            fill="currentColor"
            className="text-gray-500 hover:text-gray-600 mr-3 text-opacity-50 transform"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.463 2 11.97c0 4.404 2.865 8.14 6.839 9.458.5.092.682-.216.682-.48 0-.236-.008-.864-.013-1.695-2.782.602-3.369-1.337-3.369-1.337-.454-1.151-1.11-1.458-1.11-1.458-.908-.618.069-.606.069-.606 1.003.07 1.531 1.027 1.531 1.027.892 1.524 2.341 1.084 2.91.828.092-.643.35-1.083.636-1.332-2.22-.251-4.555-1.107-4.555-4.927 0-1.088.39-1.979 1.029-2.675-.103-.252-.446-1.266.098-2.638 0 0 .84-.268 2.75 1.022A9.606 9.606 0 0112 6.82c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.372.202 2.386.1 2.638.64.696 1.028 1.587 1.028 2.675 0 3.83-2.339 4.673-4.566 4.92.359.307.678.915.678 1.846 0 1.332-.012 2.407-.012 2.734 0 .267.18.577.688.48C19.137 20.107 22 16.373 22 11.969 22 6.463 17.522 2 12 2z"
            ></path>
          </svg>
        </a>
        <h1 className="text-3xl font-semibold mb-2 ">Os números do RSI 💰</h1>
        <p className="my-2 w-3/4 md:w-1/2  mx-auto">
          Nos recentes debates no contexto das eleições legislativas de 2022,
          André Ventura tem reforçado a sua posição crítica sobre o{" "}
          <a
            href="https://www.seg-social.pt/rendimento-social-de-insercao"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 underline"
          >
            Rendimento Social de Inserção (RSI)
          </a>
          , rendimento que é pago pela Segurança Social a pessoas em situação de
          pobreza extrema. Mas afinal, que números são ou não comparáveis com os
          do RSI?{" "}
        </p>
        <div className="flex flex-row flex-wrap gap-2 mx-auto justify-center mt-8 w-9/12 md:w-3/4">
          <button
            className={`${buttonStyle} ${
              chart === "LFV" ? "bg-slate-200" : ""
            }`}
            onClick={() => setChart("LFV")}
          >
            RSI e Luís Filipe Vieira
          </button>
          <button
            className={`${buttonStyle} ${chart === "AP" ? "bg-slate-200" : ""}`}
            onClick={() => setChart("AP")}
          >
            RSI e salários da Administração Pública
          </button>
          <button
            className={`${buttonStyle} ${
              chart === "Azores" ? "bg-slate-200" : ""
            }`}
            onClick={() => setChart("Azores")}
          >
            RSI nos Açores
          </button>
        </div>
        <div className="mt-2 text-gray-400 text-sm w-3/4 md:w-1/2 mx-auto">
          {chartConfig[chart].detail}
        </div>
      </div>

      <Chart {...chartConfig[chart]} chart={chart} />
    </div>
  );
}

export default App;
