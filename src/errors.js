class DeelError extends Error {
  constructor(message, statusCode = 500, errorCode = undefined) {
    super()
    this.message = message
    this.statusCode = statusCode
    this.errorCode = errorCode
  }
}

class DepositExceedsAmountError extends DeelError {
  constructor(
    message = "Deposit amount exceeds 25% of total sum of unpaid jobs for client",
    statusCode = 422, errorCode = 422) {
    super(message, statusCode, errorCode)
  }
}

class PayerIsNotClientError extends DeelError {
  constructor(
    message = "Payer is not a client on selected job",
    statusCode = 422, errorCode = 422) {
    super(message, statusCode, errorCode)
  }
}

class JobPaidError extends DeelError {
  constructor(
    message = "Job is already paid",
    statusCode = 422, errorCode = 422) {
    super(message, statusCode, errorCode)
  }
}

class InsufficientBalanceError extends DeelError {
  constructor(
    message = "Insufficient balance for transaction",
    statusCode = 422, errorCode = 422) {
    super(message, statusCode, errorCode)
  }
}

module.exports = { DepositExceedsAmountError, PayerIsNotClientError, JobPaidError, InsufficientBalanceError }
