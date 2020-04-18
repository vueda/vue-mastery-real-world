export default value => {
  const date = new Date(value)
  return date.toLocaleString(['pt-BR'], {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  })
}
