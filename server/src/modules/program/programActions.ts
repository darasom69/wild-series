import programRepository from "./programRepository";
import type { RequestHandler } from "express";
import Joi from "joi";

// Validation schema for a program
const programSchema = Joi.object({
  title: Joi.string().max(255).required().messages({
    "any.required": "The title is required.",
    "string.empty": "The title is required.",
    "string.max": "The title must be less than 255 characters.",
  }),
  synopsis: Joi.string().required().messages({
    "any.required": "The synopsis is required.",
    "string.empty": "The synopsis is required.",
  }),
  poster: Joi.string().uri().allow(null, "").optional().messages({
    "string.uri": "The poster must be a valid URL.",
  }),
  country: Joi.string().max(100).required().messages({
    "any.required": "The country is required.",
    "string.empty": "The country is required.",
    "string.max": "The country must be less than 100 characters.",
  }),
  year: Joi.number().integer().min(1800).max(new Date().getFullYear()).required().messages({
    "any.required": "The year is required.",
    "number.base": "The year must be a number.",
    "number.min": "The year is not valid.",
    "number.max": "The year cannot be in the future.",
  }),
  category_id: Joi.number().integer().required().messages({
    "any.required": "The category is required.",
    "number.base": "The category ID must be a number.",
  }),
});

// Middleware for validating request body with Joi
const validate: RequestHandler = (req, res, next) => {
  const { error } = programSchema.validate(req.body, { abortEarly: false });

  if (!error) return next();

  const validationErrors = error.details.map((err) => ({
    field: err.path[0] as string,
    message: err.message,
  }));

  res.status(400).json({ validationErrors });
};

// Browse all programs
const browse: RequestHandler = async (req, res, next) => {
  try {
    const programs = await programRepository.readAll();
    res.json(programs);
  } catch (err) {
    next(err);
  }
};

// Read one program with its category
const read: RequestHandler = async (req, res, next) => {
  try {
    const programId = Number(req.params.id);
    const program = await programRepository.read(programId);

    if (!program) {
      res.sendStatus(404);
    } else {
      res.json(program);
    }
  } catch (err) {
    next(err);
  }
};

// Add a new program
const add: RequestHandler = async (req, res, next) => {
  try {
    const newProgram = req.body;
    const insertId = await programRepository.create(newProgram);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// Edit a program
const edit: RequestHandler = async (req, res, next) => {
  try {
    const program = {
      id: Number(req.params.id),
      ...req.body,
    };

    const affectedRows = await programRepository.update(program);

    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

// Delete a program
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const programId = Number(req.params.id);
    await programRepository.delete(programId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

// Export actions
export default { browse, read, add, edit, destroy, validate };

