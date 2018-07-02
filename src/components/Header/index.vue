<template lang="pug">
  header.row.header.align-items-center
    .col-3
      img.header__logo(src="~assets/logo_sm.svg", alt="Wallet: InventiStudio recruitment task")
    .col-9.text-right
      button(
        @click="logOut()"
        type="button"
      )
        span.c-black Sign out
</template>

<script>
import logo from '../../assets/logo.svg'
export default {
  name: 'Header',
  methods: {
    logOut () {
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>

<style lang="scss" scoped>
  .header {
    margin-top: 20px;
    margin-bottom: 58px
  }
</style>
