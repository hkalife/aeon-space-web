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
          size="md"
          class="full-width text-grey-8"
          label="Crie sua conta"
          to="/create-account"
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
      console.log('login')
      const self = this
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          console.log('logou')
          console.log(user)
        })
        .catch((error) => {
          var errorCode = error.code
          console.log(errorCode)
          var errorMessage = error.message
          console.log(errorMessage)
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
        console.log('logado')
        console.log(user)
        self.$router.push({ path: '/member-home' })
      } else {
        // No user is signed in.
        console.log('não logado')
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
