import "./App.css";
import { IncenseCard } from "./components/IncenseCard";

import { incenses } from "./data/incenses";

function App() {
  return (
    <main>
      <h1>Твоя коллекция благовоний</h1>
      <p>Держи руку на пульсе</p>

      {incenses.map((item) => {
        return <IncenseCard incense={item} key={item.id}></IncenseCard>;
      })}
    </main>
  );
}

export default App;
