<template>
  <q-page class="window-height window-width row justify-center items-center">
    <q-card square bordered class="q-pa-lg shadow-1 loginCard">
      <div class="row justify-center q-pt-lg">
        <img class="logoAeon" src="../assets/logo-aeon-space.png" />
      </div>
      <q-card-section class="q-pt-sm">
        <h5 class="q-mb-lg">Redefinição de senha</h5>
        <p color="grey">Digite seu e-mail que iremos lhe enviar um e-mail para redefinição de senha: </p>
        <q-form class="q-gutter-md q-pt-sm">
          <q-input
            square
            filled
            clearable
            v-model="email"
            type="email"
            label="E-mail"
          />
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn
          @click="sendEmailToRetrieve()"
          unelevated
          color="primary"
          size="md"
          class="full-width"
          label="Enviar"
        />
      </q-card-actions>
      <q-card-actions class="q-px-md">
        <q-btn
          unelevated
          size="md"
          class="full-width"
          label="Voltar"
          to="/login"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'RetrievePassword',
  data () {
    return {
      email: ''
    }
  },
  methods: {
    sendEmailToRetrieve () {
      const self = this
      firebase.auth().sendPasswordResetEmail(this.email).then(function () {
        self.triggerSuccessEmailSent()
      }).catch(() => {
        self.triggerErrorEmailSent()
      })
    },
    triggerSuccessEmailSent () {
      this.$q.notify({
        type: 'login-error',
        icon: 'e-mail',
        progress: true,
        color: 'primary',
        textColor: 'white',
        message: 'E-mail de redefinição de senha enviado. Cheque sua caixa de mensagens.'
      })
    },
    triggerErrorEmailSent () {
      this.$q.notify({
        type: 'login-error',
        icon: 'error',
        progress: true,
        color: 'red',
        textColor: 'white',
        message: 'Houve um erro ao tentar enviar o e-mail. Verifique os dados digitados ou tente novamente mais tarde.'
      })
    }
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

h5 {
  padding: 0px;
  margin: 15px 0 20px 0;
  text-align: center;
}
</style>
