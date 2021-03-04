<template>
  <q-page class="window-height window-width row justify-center items-center">
    <q-card square bordered class="q-pa-xl shadow-1 loginCard">
      <div class="row justify-center q-pt-lg">
        <img class="logoAeon" src="../assets/logo-aeon-space.png" />
      </div>
      <q-card-section class="q-pt-lg">
        <q-form class="q-gutter-md">
          <q-input
            square
            filled
            clearable
            type="email"
            label="E-mail"
          />
          <q-input
            square
            filled
            clearable
            type="username"
            label="Username"
          />
          <q-input
            square
            filled
            clearable
            type="password"
            label="Senha"
          />
          <q-select
            filled
            v-model="choiceClass"
            :options="classOptions"
            label="Selecione sua classe"
          />
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn
          to="/member-home"
          unelevated
          color="primary"
          size="md"
          class="full-width"
          label="Cadastrar"
        />
      </q-card-actions>
      <q-card-section class="text-center q-pb-sm">
        <q-btn
          unelevated
          size="md"
          class="full-width text-grey-8"
          label="Voltar"
          to="/login"
        />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>

export default {
  name: 'Login',
  data () {
    return {
      // email: '',
      // password: ''
      choiceClass: null,
      classOptions: [
        'Niacoy',
        'Xeosor',
        'Vahean',
        'Saxios'
      ]
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
</style>
