import api from 'src/services/api'

const state = {
  transactions: [],
}

const mutations = {
  SET_TRANSACTIONS(state, transactions) {
    state.transactions = transactions
  },
}

const actions = {
  async getTransactions({ commit }) {
    await api.get('/transactions')
    .then(res => commit('SET_TRANSACTIONS', res.data.data))
  },
}

const getters = {
  balance(state) {
    return state.transactions
    .map(transaction => transaction.amount)
    .reduce((prev, cur) => prev + cur, 0)
  },
  withdrawalTransactions(state) {
    return state.transactions
    .filter(transaction => transaction.amount < 0)
  },
  additionTransactions(state) {
    return state.transactions
    .filter(transaction => transaction.amount > 0)
  },
}

export default {
  namespaced: 'wallet',
  state,
  mutations,
  actions,
  getters,
}
