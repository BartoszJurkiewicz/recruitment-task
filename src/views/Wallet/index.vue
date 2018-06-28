<template>
  <div class="container wallet">
    <p>{{balance}}</p>
    <ul>
      <li @click="activeView='all'">All</li>
      <li @click="activeView='withdrawal'">Withdrawal</li>
      <li @click="activeView='addition'">Additions</li>
    </ul>
    {{activeView}}
    <ul>
      <li v-for="transaction in this[activeView]" :key="transaction.id">
        <span>
          {{transaction.createdAt}}
        </span>
        <span>
          {{transaction.name}}
        </span>
        <span>
          {{transaction.amount}}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Wallet',
  data () {
    return {
      activeView: 'all'
    }
  },
  computed: {
    all () {
      return this.$store.state.wallet.transactions
    },
    ...mapGetters({
      balance: 'wallet/balance',
      withdrawal: 'wallet/withdrawalTransactions',
      addition: 'wallet/additionTransactions'
    })
  },
  methods: {
    ...mapActions({
      getTransactions: 'wallet/getTransactions'
    })
  },
  created () {
    this.getTransactions()
  }
}
</script>

<style lang="scss" scoped>

</style>
