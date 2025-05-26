// Some data to make the trick

const categories = [
    {
      id: 1,
      name: "Comédie",
    },
    {
      id: 2,
      name: "Science-Fiction",
    },
  ];

  import type { RequestHandler } from "express";

  const browse: RequestHandler = (req, res) => {
    if (req.query.q != null) {
      const filteredPrograms = categories.filter((categories) =>
        categories.name.includes(req.query.q as string)
      );

      res.json(filteredPrograms);
    } else {
      res.json(categories);
    }
  };

  //*****************************************************

  const read: RequestHandler = (req, res) => {
    const parsedId = Number.parseInt(req.params.id);

    const program = categories.find((p) => p.id === parsedId);

    if (program != null) {
      res.json(program);
    } else {
      res.sendStatus(404);
    }
  };

//*****************************************************

  // Export it to import it somewhere else

  export default { browse, read };
