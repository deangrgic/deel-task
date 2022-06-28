const Sequelize = require("sequelize")
const { Profile, Contract, Job } = require("../model")
const { createDateFilter } = require("./utils.service")

const updateProfileBalance = async (id, balance, transaction = null) => {
  return await Profile.update({
    balance: balance,
  }, {
    where: {
      id: id,
    },
    transaction,
  })
}

const getContractorProfileByJobId = async (jobId) => {
  return await Profile.findOne({
    include: [{
      attributes: [],
      model: Contract,
      as: "Contractor",
      include: [{
        attributes: [],
        model: Job,
        as: "Jobs",
        where: { id: jobId },
      }],
    }],
  })
}

const getClientProfileByJobId = async (jobId) => {
  return await Profile.findOne({
    include: [{
      attributes: [],
      model: Contract,
      as: "Client",
      include: [{
        attributes: [],
        model: Job,
        as: "Jobs",
        where: { id: jobId },
      }],
    }],
  })
}

const getProfileById = async (id) => {
  return await Profile.findByPk(id)
}

const getBestPaidProfessions = async (start, end) => {
  const jobFilter = { paid: true }

  const dateFilter = createDateFilter(start, end)
  if (dateFilter) jobFilter.paymentDate = dateFilter

  return await Profile.findAll({
    attributes: [
      "profession",
      [Sequelize.fn("SUM", Sequelize.literal("coalesce(('Contractor->Jobs'.'price'), 0)")), "total_amount"],
    ],
    include: [{
      attributes: [],
      model: Contract,
      as: "Contractor",
      include: [{
        attributes: [],
        model: Job,
        as: "Jobs",
        where: jobFilter,
      }],

    }],
    group: ["profession"],
    order: [[Sequelize.literal("total_amount"), "DESC"]],
    subQuery: false,
    limit: 1,
    raw: true,
  })
}

const getBestClients = async (start, end, limit = 2) => {
  const jobFilter = { paid: true }

  const dateFilter = createDateFilter(start, end)
  if (dateFilter) jobFilter.paymentDate = dateFilter

  return await Profile.findAll({
    attributes: [
      "id",
      [Sequelize.literal("firstName || ' ' || lastName"), "fullname"],
      [Sequelize.fn("SUM", Sequelize.literal("coalesce(('Client->Jobs'.'price'), 0)")), "paid"],
    ],
    include: [{
      attributes: [],
      model: Contract,
      as: "Client",
      include: [{
        attributes: [],
        model: Job,
        as: "Jobs",
        where: jobFilter,
      }],
    }],
    order: [[Sequelize.literal("paid"), "DESC"]],
    group: [[Sequelize.literal("Profile.id")]],
    limit: limit,
    subQuery: false,
    raw: true,
  })
}

module.exports = {
  updateProfileBalance,
  getContractorProfileByJobId,
  getClientProfileByJobId,
  getProfileById,
  getBestPaidProfessions,
  getBestClients,
}
