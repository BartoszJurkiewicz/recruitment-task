import ls from 'local-storage'
import store from 'src/store'
import router from 'src/router'
import { STORAGE_AUTH_TOKEN } from 'src/constants'
import api from 'src/services/api'

const state = {
  transactions: []
}

const mutations = {
  SET_TRANSACTIONS (state, result) {
    state.transactions = result.data
  }
}

const actions = {
  async getTransactions ({commit}) {
    await api.get('/transactions')
    .then(res => {
      commit('SET_TRANSACTIONS', res.data)
    })
  }
}

const getters = {
  balance: state => {
    return state.transactions.map(transaction => {
      return transaction.amount
    }).reduce((prev, cur) => {
      return prev + cur
    }, 0)
  },
  withdrawalTransactions: state => {
    return state.transactions.filter(transaction => {
      return transaction.amount < 0
    })
  },
  additionTransactions: state => {
    return state.transactions.filter(transaction => {
      return transaction.amount > 0
    })
  }
}

export default {
  namespaced: 'wallet',
  state,
  mutations,
  actions,
  getters
}