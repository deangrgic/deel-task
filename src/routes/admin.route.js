const adminController = require("../controllers/admin.controller")

const getBestProfession = async (req, res, next) => {
  try {
    const { start, end } = req.query

    const bestProfession = await adminController.getBestProfession(start, end)

    res.json(bestProfession)
  } catch (error) {
    next(error)
  }
}

const getBestClients = async (req, res, next) => {
  try {
    const { start, end, limit } = req.query

    const bestClients = await adminController.getBestClients(start, end, limit)

    res.json(bestClients)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getBestProfession,
  getBestClients,
}
