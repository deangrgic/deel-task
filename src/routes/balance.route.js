const balanceController = require("../controllers/balance.controller")

const depositBalance = async (req, res, next) => {
  try {
    const { params: { user_id: clientId }, profile: { id: profileId }, body: { amount } } = req

    await balanceController.depositBalance(clientId, amount)

    res.status(200).send()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  depositBalance,
}
