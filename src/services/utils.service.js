const Sequelize = require("sequelize")

const createDateFilter = (start, end) => {
  let filter = {}

  if (start) {
    filter = {
      [Sequelize.Op.gte]: start,
    }
  }

  if (end) {
    if (!start) {
      filter = {
        [Sequelize.Op.lte]: end,
      }
    } else {
      filter = {
        [Sequelize.Op.between]: [start, end],
      }
    }
  }

  return filter
}

module.exports = { createDateFilter }
