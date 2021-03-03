<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container class="bg-grey-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',
  data () {
    return {
    }
  }
}
</script>

<style lang="css" scoped>

.my-card {
  margin-top: 10%;
  background-color:blue;
  max-width: 500px;
}

</style>
