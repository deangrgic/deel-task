const profileService = require("../services/profile.service")

const getBestProfession = async (start, end) => {
  const bestPaidProfessions = await profileService.getBestPaidProfessions(start, end)

  return { bestProfession: bestPaidProfessions[0].profession }
}

const getBestClients = async (start, end, limit) => {
  const bestClients = await profileService.getBestClients(start, end, limit)

  return bestClients
}

module.exports = {
  getBestProfession,
  getBestClients,
}
