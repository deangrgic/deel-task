const Sequelize = require("sequelize")
const { Contract } = require("../model")

const getContractById = async (id, profileId) => {
  return await Contract.findOne({
    where: {
      id: id,
      [Sequelize.Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    },
  })
}

const getContracts = async (profileId) => {
  return await Contract.findAll({
    where: {
      status: { [Sequelize.Op.ne]: "terminated" },
      [Sequelize.Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
    },
  })
}

module.exports = {
  getContractById,
  getContracts,
}
