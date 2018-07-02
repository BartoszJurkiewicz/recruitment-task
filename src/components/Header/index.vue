<template lang="pug">
  header.row.header.align-items-center
    .col-6.col-sm-4.col-md-3
      img.header__logo(src="~assets/logo_sm.svg", alt="Wallet: InventiStudio recruitment task")
    .col-6.col-sm-8.col-md-9.text-right
      button.c-black.header__button(
        @click="logOut()"
        type="button"
      )
        span Sign out
</template>

<script>
export default {
  name: 'Header',
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout')
    },
  },
}
</script>

<style lang="sass" scoped>
  @import ../../styles/vars/_colors.sass
  .header 
    margin-top: 20px
    margin-bottom: 58px
    .header__button
      transition: color .4s
      &:hover
        color: $c-blue
</style>
