export const DomainError = (message, status, options = {}) => {
  const error = {
    message,
    status,
    ...options,
  }

  return error
}
