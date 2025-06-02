import type { ReactNode } from "react";

type ProgramData = {
  name: string;
};

interface ProgramFormProps {
  children: ReactNode;
  defaultValue: ProgramData;
  onSubmit: (category: ProgramData) => void;
}

function ProgramForm({ children, defaultValue, onSubmit }: ProgramFormProps) {
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);

        const name = formData.get("name") as string;

        onSubmit({
          name,
        });
      }}
    >
      <input type="text" name="name" defaultValue={defaultValue.name} />
      <button type="submit">{children}</button>
    </form>
  );
}

export default ProgramForm;
