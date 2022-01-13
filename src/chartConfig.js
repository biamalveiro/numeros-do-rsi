import { format } from "d3-format";

const config = {
  LFV: {
    data: [
      {
        label:
          "Agregado familiar composto por um titular, um indivíduo menor, e outro maior (3 pessoas) a receber RSI durante 30 anos",
        value: 500700.0,
      },
      {
        label: "Dívida de Luís Filipe Vieira [Promovalor] ao Novo Banco",
        value: 760000000.0,
      },
    ],
    color: "#fb923c",
    scrollFactor: 24,
    detail: (
      <p>
        <span className="font-bold">Recriação digital</span>.{" "}
        <a
          className="text-blue-500 hover:text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/ruitavares/status/1478877669387390976/photo/1"
        >
          Gráfico original
        </a>{" "}
        mostrado por Rui Tavares no debate com André Ventura, no dia 5 de
        janeiro de 2022, na CNN Portugal.
      </p>
    ),
    formatter: (value) => (value === 0 ? "€ 0" : `€ ${format(",.2f")(value)}`),
  },
  AP: {
    data: [
      {
        label: "Previsão no Orçamento de Estado de 2021 para o RSI",
        value: 364000000.0,
      },
      {
        label:
          "Previsão no Orçamento de Estado de 2021 para salários da Administração Pública",
        value: 23277000000.0,
      },
    ],
    color: "#34d399",
    reference: {
      label: "⅓ dos salários da Administração Pública",
      value: 7759000000,
    },
    scrollFactor: 14,
    detail: (
      <>
        <p>
          <span className="italic">
            "Temos hoje um valor de Rendimento Social de Inserção (RSI)
            extraordinariamente elevado. Estamos a falar de mais de 300 milhões
            por ano. Só para as pessoas terem uma ideia é um terço, é um
            bocadinho mais do que um terço de todos os salários da Administração
            Pública."
          </span>{" "}
          - André Ventura, no debate com João Cotrim de Figueiredo, dia 9 de
          janeiro de 2022 na CNN Portugal
        </p>
        <p className="mt-2">
          Fact-checking por{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:text-blue-600 underline"
            href="https://www.publico.pt/2022/01/10/politica/noticia/despesa-rsi-terco-salarios-administracao-publica-1991343"
          >
            Público
          </a>
        </p>
      </>
    ),
    formatter: (value) =>
      value === 0 ? "€ 0" : `€ ${format(",~g")(value / 10e5)} M`,
  },
  Azores: {
    data: [
      {
        label: "Benefíciarios do RSI nos Açores",
        value: 12778,
      },
      {
        label: "População residente nos Açores",
        value: 236657,
      },
    ],
    color: "#93c5fd",
    scrollFactor: 8,
    reference: {
      label: "½ da população residente nos Açores",
      value: 118000,
    },
    detail: (
      <>
        <p>
          <span className="italic">
            "Vamos lá ser aqui muito sérios. Não sei se já foi aos Açores ou
            não, como a outras regiões do país, anda metade a viver à conta dos
            outros que estão a trabalhar. "
          </span>{" "}
          - André Ventura, no debate com Catarina Martins, dia 2 de janeiro de
          2022 na SIC Notícias
        </p>
        <p className="mt-2">
          Fact-checking por{" "}
          <a
            className="text-blue-500 hover:text-blue-600 underline"
            href="https://poligrafo.sapo.pt/fact-check/ventura-sobre-o-rsi-nos-acores-anda-metade-a-viver-a-conta-dos-outros-que-estao-a-trabalhar-tem-razao"
          >
            Polígrafo
          </a>
        </p>
      </>
    ),
    formatter: (value) => `${format(",~g")(value)}`,
  },
};

export default config;
