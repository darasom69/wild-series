import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import CategoryDeleteForm from "../components/CategoryDeleteForm";

type Program = {
  id: number;
  title: string;
};

type Category = {
  id: number;
  name: string;
  programs: Program[];
};

function CategoryDetails() {
  const { id } = useParams();
  const [category, setCategory] = useState(null as null | Category);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/categories/${id}`)
      .then((response) => response.json())
      .then((data: Category) => {
        setCategory(data);
      });
  }, [id]);

  return (
    category && (
      <>
        <hgroup className="details-hgroup">
          <h1>{category.name}</h1>
          <Link to={`/categories/${category.id}/edit`}>Modifier</Link>
          <CategoryDeleteForm id={category.id}>Supprimer</CategoryDeleteForm>
        </hgroup>
        <ul>
          {category.programs.map((program) => (
            <li key={program.id}>
              <Link to={`/programs/${program.id}`}>{program.title}</Link>
            </li>
          ))}
        </ul>
      </>
    )
  );
}

export default CategoryDetails;
