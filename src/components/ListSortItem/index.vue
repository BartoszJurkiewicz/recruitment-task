<template lang="pug">
  li.row.list-group-item.transaction__item__titles.d-none.d-sm-block
    button.col-12.col-sm-3.sort-button.text-left.c-black.d-inline-flex.align-items-center(
      v-for="sortOption in sortOptions",
      :key="sortOption.slug",
      :class="[`col-md-${sortOption.width}`, `col-sm-${sortOption.width}`]",
      @click="$emit('changeSorting', sortOption.slug)",
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
</template>

<script>
export default {
  name: 'ListSortItem',
  props: ['sortOptions', 'activeSort', 'order'],
}
</script>

<style lang="sass" scoped>
@import ../../styles/vars/_colors.sass
.fade-enter-active, .fade-leave-active 
  transition: opacity .5s
.fade-enter, .fade-leave-to
  opacity: 0
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
.sort-button
  transition: color .4s
  &:hover
    color: $c-blue
</style>
