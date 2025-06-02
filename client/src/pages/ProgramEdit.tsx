import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router"; 

import ProgramForm from "../components/ProgramForm";

type Program = {
  id: number;
  title: string;
  synopsis: string;
  poster: string;
  country: string;
  year: number;
  category_id: number;
};

function ProgramEdit() {
  const navigate = useNavigate();
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
      <ProgramForm
        defaultValue={program}
        onSubmit={(programData) => {
          fetch(`${import.meta.env.VITE_API_URL}/api/programs/${program.id}`, {
            method: "put",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(programData),
          }).then((response) => {
            if (response.status === 204) {
              navigate(`/programs/${program.id}`);
            }
          });
        }}
      >
        Modifier
      </ProgramForm>
    )
  );
}

export default ProgramEdit;
