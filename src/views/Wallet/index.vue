<template lang="pug">
  .container.wallet
    app-header
    .row.align-items-center
      .col-xs-12.col-md.text-center.text-md-left.my-2
        p Your wallet's balance is 
          strong.c-blue {{balance | parseMoney}}
          | .
      .col-xs-12.col-md
        .filters.d-flex.justify-content-center.justify-content-md-end.btn-group
          button.btn(
            type="button"
            @click="activeFilter=filter"
            v-for="filter in filters"
            :key="filter"
            :class="filter == activeFilter ? 'bg-blue' : 'btn-light'"
          )
            span {{filter | capitalize}}
    .container
      .row
        ul.col-12.list-group.transactions__list
          li.row.list-group-item.transaction__item__titles.d-none.d-md-block
            span.col-12.col-md-3 Added at
            span.col-12.col-md-5 Title
            span.col-12.col-md-2 Amount
          li.row.list-group-item.list-group-item-light.transaction(
            v-for="transaction in this[activeFilter]"
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
import { mapActions, mapGetters } from 'vuex'
import AppHeader from '../../components/Header'

export default {
  name: 'Wallet',
  data() {
    return {
      activeFilter: 'all',
      filters: ['all', 'withdrawal', 'additions'],
      activeSort: '',
    }
  },
  components: { AppHeader },
  computed: {
    all() { return this.$store.state.wallet.transactions },
    ...mapGetters({
      balance: 'wallet/balance',
      withdrawal: 'wallet/withdrawalTransactions',
      additions: 'wallet/additionTransactions',
    }),
  },
  methods: {
    ...mapActions({
      getTransactions: 'wallet/getTransactions',
    }),
  },
  filters: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    parseDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
    parseMoney(amount) {
      return Number(amount).toFixed(2).replace('.', ',')
    },
  },
  created() {
    this.getTransactions()
  },
}
</script>

<style lang="sass" scoped>
  .filters 
    list-style-type: none
    .btn.bg-blue
      color: white
  .transactions__list 
    padding-left: 15px
  .transaction__item__titles 
    font-weight: bold
  .list-group-item 
    margin-top: 3px
    border: none
    &.list-group-item-light 
      background-color: #F9F9F9
  .transaction__amount 
    &.addition 
      color: green
    &.withdrawal 
      color: red
</style>
