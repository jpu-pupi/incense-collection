import { useParams } from "react-router";
import { incenses } from "../data/incenses";

export default function IncensePage() {
  const params = useParams();
  const incense = incenses.find((item) => item.id === params.id);

  if (!incense) {
    return (
      <main>
        <p>Благовоние не найдено</p>
      </main>
    );
  }
  return (
    <main>
      <p>{incense.name}</p>
    </main>
  );
}
