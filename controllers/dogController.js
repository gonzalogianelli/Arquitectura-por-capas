import { Dog } from "../models/dog.js";

export const getAllDogs = async (req, res) => {
  const allDogs = await Dog.find();
  return res.status(200).json(allDogs);
};

export const getDogById = async (req, res) => {
  const { id } = req.params;
  const dog = await Dog.findById(id);
  return res.status(200).json(dog);
};

export const createDog = async (req, res) => {
  const newDog = new Dog({ ...req.body });
  const insertedDog = await newDog.save();
  return res.status(201).json(insertedDog);
};

export const updateDog = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedDog = await Dog.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedDog) {
      return res.status(404).json({ mensaje: "Perro no encontrado" });
    }
    return res.status(200).json({
      mensaje: "Perro actualizado exitosamente",
      perro: updatedDog
    });
  } catch (error) {
    return res.status(500).json({ mensaje: "Error al actualizar" });
  }
};

export const deleteDog = async (req, res) => {
  const { id } = req.params;
  const deletedDog = await Dog.findByIdAndDelete(id);
  return res.status(200).json(deletedDog);
};