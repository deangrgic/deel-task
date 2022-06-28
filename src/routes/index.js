const express = require("express")
const router = express.Router()

// middlewares
const { getProfile } = require("../middleware/getProfile")

// routes
const contractRoute = require("./contract.route")
const jobRoute = require("./job.route")
const balanceRoute = require("./balance.route")
const adminRoute = require("./admin.route")

/**
 * @returns contracts  returns a list of  non terminated contracts belonging to a user (client or contractor)
 */
router.get("/contracts", getProfile, contractRoute.getContracts)

/**
 * @returns contract by id
 */
router.get("/contracts/:id", getProfile, contractRoute.getContractById)

/**
 * @returns jobs  returns a list of unpaid jobs belonging to a user (client or contractor)
 */
router.get("/jobs/unpaid", getProfile, jobRoute.getUnpaidJobs)

/**
 * @returns jobs  pays for a job
 */
router.post("/jobs/:job_id/pay", getProfile, jobRoute.payJob)

/**
 * @returns void  deposits money into balance of client
 */
router.post("/balances/deposit/:user_id", getProfile, balanceRoute.depositBalance)

/**
 * @returns bestProfession  returns the profession that earned the most money
 */
router.get("/admin/best-profession", getProfile, adminRoute.getBestProfession)

/**
 * @returns bestClients returns the clients the paid the most for jobs in the query time period
 */
router.get("/admin/best-clients", getProfile, adminRoute.getBestClients)

router.use((err, req, res, next) => {
  switch (err.statusCode) {
    case 422:
      return res.status(422).send({ error: err.message })
    default:
      console.log(err)
      return res.status(500).send({ error: "Internal server error" })
  }
})

module.exports = router
