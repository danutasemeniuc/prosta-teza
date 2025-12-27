<script>
import { Header } from '@/widgets/header'

export default {
  name: 'App',
  components: {
    Header,
  },
}
</script>

<template>
  <div id="app">
    <Header />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
@import './styles/index.css';

main {
  min-height: calc(100vh - 80px);
}
</style>
