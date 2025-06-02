import { useNavigate } from "react-router"; 
import ProgramForm from "../components/ProgramForm";

function ProgramNew() {
  const navigate = useNavigate();

  const newProgram = {
    title: "",
    synopsis: "",
    poster: "",
    country: "",
    year: new Date().getFullYear(), // valeur par défaut raisonnable
    category_id: 1, // à adapter selon ton cas d'utilisation
  };

  return (
    <ProgramForm
      defaultValue={newProgram}
      onSubmit={(programData) => {
        fetch(`${import.meta.env.VITE_API_URL}/api/programs`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(programData),
        })
          .then((response) => response.json())
          .then((data) => {
            navigate(`/programs/${data.insertId}`);
          });
      }}
    >
      Ajouter
    </ProgramForm>
  );
}

export default ProgramNew;
