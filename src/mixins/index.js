export const parseMoney = {
  filters: {
    parseMoney(amount) {
      return Number(amount).toFixed(2).replace('.', ',')
    },
  },
}
