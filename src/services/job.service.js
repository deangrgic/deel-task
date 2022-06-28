const Sequelize = require("sequelize")
const { Job, Contract, Profile } = require("../model")

const getJobById = async (id) => {
  const job = await Job.findOne({
    where: {
      id: id,
    },
  })

  return job
}

const getUnpaidJobs = async (profileId) => {
  const jobs = await Job.findAll({
    where: {
      paid: false,
    },
    include: [{
      attributes: [],
      model: Contract,
      as: "Contract",
      where: {
        [Sequelize.Op.or]: [{ ClientId: profileId }, { ContractorId: profileId }],
        status: "in_progress",
      },
    }],
  })

  return jobs
}

const payJob = async (id, transaction = null) => {
  return await Job.update(
    {
      paid: true,
      paymentDate: new Date(),
    },
    {
      where: {
        id: id,
      },
      transaction,
    },
  )
}

const getSumAmountOfUnpaidJobsByClient = async (clientId, transaction = null) => {
  return await Job.sum("price", {
    where: {
      paid: false,
    },
    include: [{
      attributes: [],
      model: Contract,
      as: "Contract",
      where: {
        ClientId: clientId,
        status: { [Sequelize.Op.ne]: "terminated" },
      },
    }],
    transaction,
  })
}

module.exports = {
  getUnpaidJobs,
  getJobById,
  getSumAmountOfUnpaidJobsByClient,
  payJob,
}
