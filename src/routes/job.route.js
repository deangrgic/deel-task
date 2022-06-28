const jobController = require("../controllers/job.controller")

const getUnpaidJobs = async (req, res, next) => {
  try {
    const profileId = req.profile.id

    const jobs = await jobController.getUnpaidJobs(profileId)

    res.json(jobs)
  } catch (error) {
    next(error)
  }
}

const payJob = async (req, res, next) => {
  try {
    const { params: { job_id: jobId }, profile: { id: profileId } } = req

    await jobController.payJob(jobId, profileId)

    res.status(200).send()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getUnpaidJobs,
  payJob,
}
