import React from "react";

export default function Header() {
  return (
    <header>
      <h1 className="text-2xl md:text-3xl font-semibold mb-2 ">
        Os números do RSI 💰
      </h1>
      <p className="my-2 w-3/4 lg:w-1/2  mx-auto">
        Nos recentes debates no contexto das eleições legislativas de 2022,
        André Ventura tem reforçado a sua posição crítica sobre o{" "}
        <a
          href="https://www.seg-social.pt/rendimento-social-de-insercao"
          target="_blank"
          rel="noopener noreferrer"
          className="link"
        >
          Rendimento Social de Inserção (RSI)
        </a>
        , rendimento que é pago pela Segurança Social a pessoas em situação de
        pobreza extrema. Mas afinal, que números são ou não comparáveis com os
        do RSI?{" "}
      </p>
    </header>
  );
}
