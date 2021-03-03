<template>
  <q-page class="bg-black window-height window-width row justify-center items-center">
    <q-card square bordered class="q-pa-md shadow-1 loginCard">
      <div class="row justify-center q-pt-lg">
        <img class="logoAeon" src="../assets/logo-aeon-space.png" />
      </div>
      <q-card-section class="q-pt-lg">
        <q-form class="q-gutter-md">
          <q-input square filled clearable v-model="email" type="email" label="e-mail" />
          <q-input square filled clearable v-model="password" type="password" label="senha" />
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn
          @click="logUser()"
          to="/member-home"
          unelevated
          color="primary"
          size="md"
          class="full-width"
          label="Entrar"
        />
      </q-card-actions>
      <q-card-section class="text-center q-pb-sm">
        <p class="text-grey-6">Sem registro? Clique aqui e crie sua conta!</p>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    logUser () {
      console.log('login')
    }
  }
}
</script>

<style>
.loginCard {
  min-width: 250px;
  max-width: 500px;
}

.logoAeon {
  min-width: 200px;
  max-width: 400px;
}
</style>
