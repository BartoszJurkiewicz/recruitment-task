<template lang="pug">
  .col-xs-12.col-md
    .filters.d-flex.justify-content-center.justify-content-md-end.btn-group
      button.btn(
        type="button",
        v-for="filter in filters",
        :key="filter",
        :class="filter == activeFilter ? 'bg-blue' : 'btn-light'",
        @click="$emit('filterChange', filter)",
      )
        span {{filter | capitalize}}
</template>

<script>
export default {
  name: 'ListFilters',
  props: ['filters', 'activeFilter', 'handleChange'],
  filters: {
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
  },
}
</script>

<style lang="sass" scoped>
.filters 
  list-style-type: none
  .btn.bg-blue
    color: white
</style>
