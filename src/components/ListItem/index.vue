<template lang="pug">
  li.row.list-group-item.list-group-item-light.transaction.py-20
    p.col-12.col-sm-3.col-md-3.transaction__date.d-block.d-sm-inline-flex.m-sm-0 {{transaction.createdAt | parseDate}}
    p.col-12.col-sm-6.col-md-6.transaction__name.d-block.d-sm-inline-flex.m-sm-0 {{transaction.name}}
    p.col-12.col-sm-3.col-md-2.transaction__amount.d-block.d-sm-inline-flex.m-sm-0(
      v-bind:class="transaction.amount > 0 ? 'c-green' : 'c-red'",
    ) {{transaction.amount | parseMoney}}
    p.col-12.col-md-1.text-right.d-none.d-md-inline-flex.justify-content-end.m-sm-0
      button
        img(src="~assets/more.svg", alt="More button")
</template>

<script>
import moment from 'moment'
import { parseMoney } from '../../mixins'

export default {
  name: 'ListItem',
  props: ['transaction'],
  mixins: [parseMoney],
  filters: {
    parseDate(date) {
      return moment(date).format('YYYY-MM-DD')
    },
  },
}
</script>

<style lang="sass" scoped>
.list-group-item-light 
    background-color: #F9F9F9
.transaction__amount 
  &.addition 
    color: green
  &.withdrawal 
    color: red
</style>
