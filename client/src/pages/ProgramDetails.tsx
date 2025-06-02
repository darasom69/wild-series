import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import ProgramDeleteForm from "../components/ProgramDeleteForm";

type Category = {
  id: number;
  name: string;
};

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category: Category;
};

function ProgramDetails() {
  const { id } = useParams();
  const [program, setProgram] = useState<Program | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/programs/${id}`)
      .then((response) => response.json())
      .then((data: Program) => {
        setProgram(data);
      });
  }, [id]);

  return (
    program && (
      <>
        <hgroup className="details-hgroup">
          <h1>{program.title}</h1>
          <Link to={`/programs/${program.id}/edit`}>Modifier</Link>
          <ProgramDeleteForm id={program.id}>Supprimer</ProgramDeleteForm>
        </hgroup>

        <img src={program.poster} alt={program.title} />
        <p><strong>Synopsis:</strong> {program.synopsis}</p>
        <p><strong>Pays:</strong> {program.country}</p>
        <p><strong>Année:</strong> {program.year}</p>
        <p>
          <strong>Catégorie:</strong>{" "}
          <Link to={`/categories/${program.category.id}`}>
            {program.category.name}
          </Link>
        </p>
      </>
    )
  );
}

export default ProgramDetails;
