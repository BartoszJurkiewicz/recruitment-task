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
            type="button",
            @click="activeFilter=filter",
            v-for="filter in filters",
            :key="filter",
            :class="filter == activeFilter ? 'bg-blue' : 'btn-light'",
          )
            span {{filter | capitalize}}
    .container
      .row
        ul.col-12.list-group.transactions__list
          li.row.list-group-item.transaction__item__titles.d-none.d-sm-block
            button.col-12.col-sm-3.sort-button.text-left.c-black.d-inline-flex.align-items-center(
              v-for="sortOption in sortOptions",
              :key="sortOption.slug",
              :class="[`col-md-${sortOption.width}`, `col-sm-${sortOption.width}`]",
              @click="sort(sortOption.slug)",
              type="button",
            ) 
              strong {{sortOption.name}}
              transition(
                name="fade",
              )
                span.chevron(
                  v-if="activeSort == sortOption.slug",
                  :class="order ? 'chevron--down' : 'chevron--up'",
                )
          li.row.list-group-item.list-group-item-light.transaction.py-20(
            v-for="transaction in this[activeFilter]",
            :key="transaction.id",
          )
            p.col-12.col-sm-3.col-md-3.transaction__date.d-block.d-sm-inline-flex.py-2 {{transaction.createdAt | parseDate}}
            p.col-12.col-sm-6.col-md-6.transaction__name.d-block.d-sm-inline-flex {{transaction.name}}
            p.col-12.col-sm-3.col-md-2.transaction__amount.d-block.d-sm-inline-flex(
              v-bind:class="transaction.amount > 0 ? 'c-green' : 'c-red'",
            ) {{transaction.amount | parseMoney}}
            p.col-12.col-md-1.text-right.d-none.d-md-inline-flex.justify-content-end
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
      sortOptions: [
        { slug: 'createdAt', name: 'Added at', width: 3 },
        { slug: 'name', name: 'Title', width: 6 },
        { slug: 'amount', name: 'Amount', width: 3 },
      ],
      activeSort: 'createdAt',
      order: true,
    }
  },
  components: { AppHeader },
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
  @import ../../styles/vars/_colors.sass
  .fade-enter-active, .fade-leave-active 
    transition: opacity .5s
  .fade-enter, .fade-leave-to
    opacity: 0
  .filters 
    list-style-type: none
    .btn.bg-blue
      color: white
  .transactions__list 
    padding-left: 15px
    .chevron
      width: 0
      height: 0
      margin-left: 1rem
      border-left: 5px solid transparent
      border-right: 5px solid transparent
      border-bottom: 5px solid black
      transition: .2s
      &.active 
        border-color: blue
      &.chevron--down
        transform: rotate(180deg)
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
  .sort-button
    transition: color .4s
    &:hover
      color: $c-blue
</style>
