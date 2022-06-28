const contractControllers = require("../controllers/contract.controller")

const getContractById = async (req, res) => {
  try {
    const { params: { id }, profile: { id: profileId } } = req

    const contract = await contractControllers.getContractById(id, profileId)

    if (!contract) return res.status(404).end()

    res.json(contract)
  } catch (error) {
    next(error)
  }
}

const getContracts = async (req, res) => {
  try {
    const profileId = req.profile.id

    const contracts = await contractControllers.getContracts(profileId)

    res.json(contracts)
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getContractById,
  getContracts,
}
