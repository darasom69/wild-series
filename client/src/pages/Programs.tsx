import { useEffect, useState } from "react";

type Program = {
    id: number;
    title: string;
    synopsis: string;
    poster: string;
    country: string;
    year: number;
  };

function Programs() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/programs")
      .then((res) => res.json())
      .then((data) => setPrograms(data))
      .catch((err) => console.error("Erreur lors du fetch", err));
  }, []);

  return (
    <section>
<ul>
  {programs.map((p) => (
    <li key={p.id}>
      <img src={p.poster} alt={p.title} />
      <section>
        <h2>{p.title} ({p.year})</h2>
        <p>{p.country}</p>
        <p >{p.synopsis}</p>
      </section>
    </li>
  ))}
</ul>
    </section>
  );
}

export default Programs;
