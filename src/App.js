import React, { useState } from "react";

import Chart from "./components/Chart";
import ChartButton from "./components/ChartButton";
import chartConfig from "./chartsContent";
import GithubLink from "./components/GithubLink";
import Header from "./components/Header";
import ScrollButton from "./components/ScrollButton";

function App() {
  const [chart, setChart] = useState("LFV");
  const scrollToTop = () => window.scrollTo(0, 0);

  return (
    <div>
      <ScrollButton />
      <GithubLink />
      <div className="py-10 w-full lg:w-9/12 mx-auto">
        <div className="text-gray-600 text-sm md:text-base text-center my-4">
          <Header />
          <div className="flex flex-row flex-wrap gap-2 mx-auto justify-center mt-8 w-9/12 lg:w-3/4">
            {["LFV", "Azores", "AP"].map((value) => (
              <ChartButton
                key={value}
                value={value}
                label={chartConfig[value].buttonLabel}
                isActive={value === chart}
                onClick={() => setChart(value)}
              />
            ))}
          </div>
          <div className="mt-2 text-gray-400 text-sm w-3/4 lg:w-1/2 mx-auto">
            {chartConfig[chart].detail}
          </div>
        </div>
        <Chart {...chartConfig[chart]} chart={chart} />
        <div className="flex justify-center">
          <button
            onClick={scrollToTop}
            className="text-xs text-center text-slate-400 border-slate-400 uppercase border-dashed border-b-2 cursor-pointer hover:border-slate-800 hover:text-slate-800"
          >
            Voltar ao topo
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
