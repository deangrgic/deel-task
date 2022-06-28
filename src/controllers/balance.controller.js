const jobService = require("../services/job.service")
const profileService = require("../services/profile.service")
const { sequelize } = require("../model")

const { DepositExceedsAmountError } = require("../errors")

const depositBalance = async (clientId, amount) => {
  const client = await profileService.getProfileById(clientId)
  const totalUnpaidAmount = await jobService.getSumAmountOfUnpaidJobsByClient(clientId)

  if (amount > totalUnpaidAmount * 0.25) {
    throw new DepositExceedsAmountError()
  }

  await profileService.updateProfileBalance(clientId, client.balance + amount)
}

module.exports = {
  depositBalance,
}
