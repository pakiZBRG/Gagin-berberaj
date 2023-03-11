import { Request, Response } from "express"
import Log from '../models/Log'

export const LogInfo = async (req: Request, res: Response, description: string = '') => {
    try {
        const log = new Log({
            user: req.user,
            os: req.useragent.os,
            browser: req.useragent.browser,
            description
        })
        await log.save()
        return 
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}