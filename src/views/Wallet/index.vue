<template lang="pug">
  .container.wallet
    app-header
    .row.align-items-center
      .col-xs-12.col-md
        p Your wallet's balance is 
          strong.c-blue {{balance}}
      .col-xs-12.col-md
        .filters.d-flex.justify-content-end.btn-group
          button.btn.btn-light(
            type="button"
            @click="activeView='all'"
          )
            span.c-black All
          button.btn.btn-light(
            type="button"
            @click="activeView='withdrawal'"
          )
            span.c-black Withdrawal
          button.btn.btn-light(
            type="button"
            @click="activeView='addition'"
          )
            span.c-black Addition
    .container
      .row
        ul.col-12.list-group.transactions__list
          li.row.list-group-item
            span.col-12.col-md-3 Added at
            span.col-12.col-md-5 Title
            span.col-12.col-md-2 Amount
          li.row.list-group-item.list-group-item-light.transaction(
            v-for="transaction in this[activeView]"
            :key="transaction.id"
          )
            span.col-12.col-md-3.transaction__date {{transaction.createdAt | parseDate}}
            span.col-12.col-md-5.transaction__name {{transaction.name}}
            span.col-12.col-md-3.transaction__amount(
              v-bind:class="transaction.amount > 0 ? 'c-green' : 'c-red'"
            ) {{transaction.amount | parseMoney}}
            span.col-12.col-md-1.text-right
              button
                img(src="~assets/more.svg", alt="Wallet: InventiStudio recruitment task")
</template>

<script>
import moment from 'moment'
import AppHeader from '../../components/Header'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Wallet',
  data () {
    return {
      activeView: 'all'
    }
  },
  components: { AppHeader },
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
  filters: {
    parseDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    parseMoney (amount) {
      return Number(amount).toFixed(2).replace('.', ',')
    }
  },
  created () {
    this.getTransactions()
  }
}
</script>

<style lang="scss" scoped>
.filters {
  list-style-type: none;
}
.transactions__list {
  padding-left: 15px;
}
.transaction__amount {
  &.addition {
    color: green;
  }
  &.withdrawal {
    color: red;
  }
}
</style>
