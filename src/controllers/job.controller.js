const jobService = require("../services/job.service")
const profileService = require("../services/profile.service")
const { sequelize } = require("../model")
const { PayerIsNotClientError, JobPaidError, InsufficientBalanceError } = require("../errors")

const getUnpaidJobs = async (profileId) => {
  return await jobService.getUnpaidJobs(profileId)
}

const payJob = async (jobId, payerProfileId) => {
  const contractorProfile = await profileService.getContractorProfileByJobId(jobId)
  const clientProfile = await profileService.getClientProfileByJobId(jobId)

  if (clientProfile.id != payerProfileId) {
    throw new PayerIsNotClientError()
  }

  const job = await jobService.getJobById(jobId)

  if (job.paid === true) {
    throw new JobPaidError()
  }

  if (clientProfile.balance < job.price) {
    throw new InsufficientBalanceError()
  }

  const transaction = await sequelize.transaction()

  try {
    // deduct form client
    const clientBalance = clientProfile.balance - job.price
    await profileService.updateProfileBalance(clientProfile.id, clientBalance, transaction)

    // add to contractor
    const contractorBalance = contractorProfile.balance + job.price
    await profileService.updateProfileBalance(contractorProfile.id, contractorBalance, transaction)

    // update job
    await jobService.payJob(jobId, transaction)

    await transaction.commit()
  } catch (err) {
    await transaction.rollback()
    throw err
  }
}

module.exports = {
  getUnpaidJobs,
  payJob,
}
