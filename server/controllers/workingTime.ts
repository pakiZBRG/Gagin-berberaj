import { Request, Response } from "express";

import WorkingTime from "../models/WorkingTime";

const create = async (req: Request, res: Response) => {
  try {
    const workTime = new WorkingTime(req.body)
    await workTime.save()
    return res.status(200).json({ message: "Radno vreme je postavljeno" })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getWorkingTime = async (req: Request, res: Response) => {
  try {
    const workTime = await WorkingTime.find()
    return res.status(200).json(workTime)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await WorkingTime.updateOne({ _id: id }, { ...req.body })
    return res.status(200).json({ message: "Radno vreme je ažurirano" })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await WorkingTime.deleteOne({ _id: id })
    return res.status(200).json({ message: "Radno vreme je obrisano" })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export default {
  create,
  getWorkingTime,
  update,
  remove
};
