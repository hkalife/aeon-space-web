<template>
  <q-page class="window-height window-width row justify-center items-center">
    <q-card square bordered class="q-pa-xl shadow-1 loginCard">
      <div class="row justify-center q-pt-lg">
        <img class="logoAeon" src="../assets/logo-aeon-space.png" />
      </div>
      <q-card-section class="q-pt-lg">
        <h5 class="q-mb-lg">Crie sua conta</h5>
        <q-form class="q-gutter-md">
          <q-input
            square
            filled
            clearable
            type="email"
            label="E-mail"
            v-model="email"
            error-message="Campo obrigatório"
            :error="!isValid"
          />
          <q-input
            square
            filled
            clearable
            type="username"
            label="Username"
            v-model="username"
            error-message="Campo obrigatório"
            :error="!isValid"
          />
          <q-input
            square
            filled
            clearable
            type="password"
            label="Senha"
            v-model="password"
            error-message="Campo obrigatório"
            :error="!isValid"
          />
          <q-select
            square
            filled
            v-model="choiceClass"
            :options="classOptions"
            label="Selecione sua classe"
            error-message="Campo obrigatório"
            :error="!isValid"
          />
          <q-file
            square
            filled
            v-model="imageUploadInput"
            style="width: 95.75%;"
            label="Imagem de perfil (máx. 1MB)"
            max-files="1"
            accept="image/jpg, image/jpeg, image/png"
            @rejected="onRejectedImage"
          />
        </q-form>
      </q-card-section>
      <q-card-actions class="q-px-md">
        <q-btn
          unelevated
          color="primary"
          size="md"
          class="full-width"
          label="Cadastrar"
          @click="validationForCreation()"
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
import firebase from 'firebase'
import { mapState, mapActions } from 'vuex'
import { uuid } from 'uuidv4'

export default {
  name: 'CreateAccount',
  data () {
    return {
      email: '',
      username: '',
      password: '',
      choiceClass: null,
      classOptions: [
        'Niacoy',
        'Xeosor',
        'Vahean',
        'Saxios'
      ],
      imageUploadInput: null,
      blobImageToSend: null,
      isValid: true
    }
  },
  watch: {
    imageUploadInput: function () {
      this.blobImageToSend = new Blob([this.imageUploadInput], { type: 'image/*' })
    }
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  },
  methods: {
    ...mapActions(['createUser']),
    createUserForAuthentication () {
      const self = this
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          self.createUserInDatabase()
        })
        .catch((error) => {
          self.$q.notify({
            type: 'create-user-error',
            icon: 'error',
            progress: true,
            color: 'red',
            textColor: 'white',
            message: `Ocorreu um erro. Verifique os dados digitados ou tente novamente mais tarde. (${error.code})`
          })
        })
    },
    createUserInDatabase () {
      const id = uuid()
      const metadata = {
        token: id
      }
      const photoName = `userphoto-${id}`
      if (this.imageUploadInput !== null) {
        const storageRef = firebase.storage().ref().child(photoName)
        storageRef.put(this.imageUploadInput, metadata)
      }

      const objCreateUser = {
        current_championships: [],
        passed_championships: [],
        username: this.username,
        global_score: 0,
        email: this.email,
        championships_won: [],
        class: this.choiceClass,
        score_history: [],
        photo: this.imageUploadInput !== null ? `https://firebasestorage.googleapis.com/v0/b/aeon-space.appspot.com/o/${photoName}?alt=media` : this.imageUploadInput
      }

      this.createUser(objCreateUser).then(() => {
        this.$q.notify({
          type: 'create-user-sucess',
          icon: 'success',
          progress: true,
          color: 'primary',
          textColor: 'white',
          message: 'Usuário criado. Verifique seu e-mail e confirme sua inscrição.'
        })
        this.$router.push({ path: '/login' })
      }).catch((error) => {
        this.$q.notify({
          type: 'create-user-error',
          icon: 'error',
          progress: true,
          color: 'red',
          textColor: 'white',
          message: `Ocorreu um erro. Verifique os dados digitados ou tente novamente mais tarde. (${error.code})`
        })
      })
    },
    onRejectedImage () {
      this.$q.notify({
        type: 'negative',
        message: 'Imagem inválida.'
      })
    },
    validationForCreation () {
      if (this.email === '' || this.password === '' || this.username === '' || this.choiceClass === '') {
        this.isValid = false
        this.$q.notify({
          type: 'negative',
          message: 'Por favor, preencha os campos obrigatórios.'
        })
      } else {
        this.isValid = true
        this.createUserForAuthentication()
      }
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
  margin: 0 0 35px 0;
  text-align: center;
}
</style>
