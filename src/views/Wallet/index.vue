<template lang="pug">
  .container.wallet
    app-header
    .row.align-items-center
      .col-xs-12.col-md.text-center.text-md-left.my-2
        p Your wallet's balance is 
          strong.c-blue {{balance | parseMoney}}
          | .
      list-filters(
        :filters="filters",
        :active-filter="activeFilter",
        @filterChange="filter => activeFilter = filter"
      )
    .container
      .row
        ul.col-12.list-group.transactions__list
          list-sort-item(
            :sort-options="sortOptions"
            :active-sort="activeSort"
            :order="order"
            @changeSorting="sort"
          )
          list-item(
            v-for="transaction in this[activeFilter]",
            :key="transaction.id",
            :transaction="transaction"
          )
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import { parseMoney } from '../../mixins'
import AppHeader from '../../components/Header'
import ListItem from '../../components/ListItem'
import ListSortItem from '../../components/ListSortItem'
import ListFilters from '../../components/ListFilters'

export default {
  name: 'Wallet',
  data() {
    return {
      activeFilter: 'all',
      filters: ['all', 'withdrawal', 'additions'],
      sortOptions: [
        { slug: 'createdAt', name: 'Added at', width: 3 },
        { slug: 'name', name: 'Title', width: 6 },
        { slug: 'amount', name: 'Amount', width: 3 },
      ],
      activeSort: 'createdAt',
      order: true,
    }
  },
  mixins: [parseMoney],
  components: { AppHeader, ListSortItem, ListItem, ListFilters },
  computed: {
    all: {
      get() { return this.$store.state.wallet.transactions },
      set(transactions) {
        this.$store.commit('wallet/SET_TRANSACTIONS', transactions)
      },
    },
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
    sort(sort) {
      const localTransactions = this.all.slice(0)
      const sortAsc = (a, b) => a[sort] > b[sort]
      const sortDesc = (a, b) => a[sort] < b[sort]
      localTransactions.sort(this.order ? sortAsc : sortDesc)
      this.all = localTransactions
      this.order = !this.order
      this.activeSort = sort
    },
  },
  created() {
    this.getTransactions()
  },
}
</script>

<style lang="sass" scoped>
.transactions__list 
  padding-left: 15px
.transaction__item__titles 
  font-weight: bold
.list-group-item
  margin-top: 3px
  padding: 1rem 
  border: none

</style>
