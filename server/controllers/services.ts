import { Request, Response } from "express";

import Service from "../models/Service";

const create = async (req: Request, res: Response) => {
  if (!req.body.name || req.body.name === '') {
    return res.status(422).json({ message: "Unesite naziv usluge" })
  } else if (!req.body.price || req.body.price === '') {
    return res.status(422).json({ message: "Unesite cenu usluge" })
  } else if (!req.body.duration || req.body.duration === '') {
    return res.status(422).json({ message: "Unesite dužinu trajanja usluge" })
  }

  try {
    const service = new Service(req.body)
    await service.save()
    return res.status(200).json({ message: "Usluga je kreirana" })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const getServices = async (req: Request, res: Response) => {
  try {
    const services = await Service.find()
    return res.status(200).json(services)
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const update = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await Service.updateOne({ _id: id }, { ...req.body })
    return res.status(200).json({ message: "Usluga je ažurirana" })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

const remove = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    await Service.deleteOne({ _id: id })
    return res.status(200).json({ message: "Usluga je obrisana" })
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
}

export default {
  create,
  getServices,
  update,
  remove
};
