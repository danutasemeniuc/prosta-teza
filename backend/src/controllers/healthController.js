import { getHealthStatus } from '../services/healthService.js'
import { successResponse } from '../utils/response.js'

export async function getHealth(req, res, next) {
  try {
    const healthStatus = await getHealthStatus()
    res.json(successResponse(healthStatus, 'Health check successful'))
  }
  catch (error) {
    next(error)
  }
}
