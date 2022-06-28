const contractService = require("../services/contract.service")

const getContractById = async (id, profileId) => {
  return await contractService.getContractById(id, profileId)
}

const getContracts = async (profileId) => {
  return await contractService.getContracts(profileId)
}

module.exports = {
  getContractById,
  getContracts,
}
