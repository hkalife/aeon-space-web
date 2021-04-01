<template>
  <q-page class="window-height window-width row justify-center items-center">
    <q-circular-progress
      v-if="loading"
      indeterminate
      size="50px"
      color="primary"
      class="q-ma-md"
    />
    <q-card square bordered class="q-pa-lg shadow-1 loginCard" v-if="!loading">
      <div class="row justify-center q-pt-lg">
        <img class="logoAeon" src="../assets/logo-aeon-space.png" />
      </div>
      <q-card-section class="q-pt-lg">
        <q-form class="q-gutter-md">
          <q-input
            square
            filled
            clearable
            v-model="email"
            type="email"
            label="E-mail"
          />
          <q-input
            square
            filled
            clearable
            v-model="password"
            type="password"
            label="Senha"
          />
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn
          @click="logUser()"
          unelevated
          color="primary"
          size="md"
          class="full-width"
          label="Entrar"
        />
      </q-card-actions>
      <q-card-section class="text-center q-pb-sm">
        <q-btn
          unelevated
          class="text-grey-8"
          size="md"
          label="Crie sua conta"
          to="/create-account"
        />
        <q-btn
          unelevated
          class="q-ml-lg text-grey-8"
          size="md"
          label="Esqueceu sua senha?"
          to="/retrieve-password"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      loading: true
    }
  },
  methods: {
    logUser () {
      const self = this
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then()
        .catch((error) => {
          var errorCode = error.code
          self.triggerErrorLogin(errorCode)
        })
    },
    triggerErrorLogin (code) {
      let showErrorMessage = ''
      if (code === 'auth/too-many-requests') {
        showErrorMessage = 'Você tentou logar muitas vezes. Aguarde alguns minutos e tente novamente.'
      } else {
        showErrorMessage = 'Houve um erro ao tentar logar. Verifique os dados inseridos e tente novamente.'
      }
      this.$q.notify({
        type: 'login-error',
        icon: 'error',
        progress: true,
        color: 'red',
        textColor: 'white',
        message: showErrorMessage
      })
    }
  },
  beforeMount () {
    const self = this
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        self.$router.push({ path: '/member-home' })
      } else {
        self.loading = false
      }
    })
  }
}
</script>

<style scoped>
.loginCard {
  min-width: 250px;
  max-width: 500px;
}

.logoAeon {
  min-width: 200px;
  max-width: 400px;
}
</style>
