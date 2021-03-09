<template>
  <q-page class="constrain-more q-pa-md">
    <div v-if="!editMode">
      <q-img
        :src="user.photo !== null ? user.photo : unknownUser"
        :ratio="1"
        class="imgProfile"
      />
      <h5 class="text-center text-h5 h5Username">{{ user.username }}</h5>
      <p class="text-center text-body2">{{ user.email }}</p>
      <p class="text-center text-body2">Classe: {{ user.class }}</p>
      <p class="text-center text-body2">Escore global: {{ user.global_score }}</p>
      <q-card-actions class="q-px-md">
        <q-btn
          unelevated
          color="primary"
          size="md"
          class="full-width"
          label="Editar foto"
          @click="editMode = true"
        />
      </q-card-actions>
    </div>
    <div v-if="editMode">
      <q-card-section class="q-pt-lg">
        <h5 class="q-mb-lg">Editar foto de perfil</h5>
        <q-form class="q-gutter-md q-pt-sm">
          <q-file
            square
            filled
            v-model="imageUploadInput"
            label="Nova imagem de perfil (máx. 1MB)"
            max-files="1"
            style="width: 98%;"
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
          label="Atualizar foto"
          @click="updatePhoto()"
        />
      </q-card-actions>
      <q-card-actions class="q-px-md">
        <q-btn
          unelevated
          color="primary"
          size="md"
          class="full-width"
          label="Apagar foto"
          @click="erasePhoto()"
        />
      </q-card-actions>
      <q-card-section class="text-center q-pb-sm">
        <q-btn
          unelevated
          size="md"
          class="full-width text-grey-8"
          label="Voltar"
          @click="editMode = false"
        />
      </q-card-section>
      <q-circular-progress
        v-if="showLoading"
        indeterminate
        size="50px"
        color="primary"
        class="q-ma-md loadingCircle"
      />
    </div>
    <div class="profileDivision"></div>
    <MyChampionships />
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import firebase from 'firebase'
import { uuid } from 'uuidv4'
import MyChampionships from './MyChampionships.vue'

export default {
  name: 'ProfileContent',
  data () {
    return {
      unknownUser: 'https://firebasestorage.googleapis.com/v0/b/aeon-space.appspot.com/o/unknown.png?alt=media',
      editMode: false,
      imageUploadInput: null,
      showLoading: false
    }
  },
  components: {
    MyChampionships
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    ...mapActions(['updateUser']),
    onRejectedImage () {
      this.$q.notify({
        type: 'negative',
        message: 'Imagem inválida.'
      })
    },
    updatePhoto () {
      if (this.imageUploadInput === null) {
        this.$q.notify({
          type: 'create-user-error',
          icon: 'error',
          progress: true,
          color: 'red',
          textColor: 'white',
          message: 'Por favor, envie a foto que deseja salvar.'
        })
      } else {
        this.uploadNewPhoto()
      }
    },
    erasePhoto () {
      if (this.user.photo !== null) {
        const newDataForUploadPhoto = {
          ...this.user,
          photo: null
        }
        this.updateUser(newDataForUploadPhoto).then(() => {
          this.$q.notify({
            type: 'create-user-sucess',
            icon: 'check',
            progress: true,
            color: 'primary',
            textColor: 'white',
            message: 'Foto apagada com sucesso!'
          })
        }).catch(() => {
          this.$q.notify({
            type: 'create-user-error',
            icon: 'error',
            progress: true,
            color: 'red',
            textColor: 'white',
            message: 'Houve um erro tentando apagar sua foto. Tente novamente.'
          })
        })
      } else {
        this.$q.notify({
          type: 'create-user-error',
          icon: 'error',
          progress: true,
          color: 'red',
          textColor: 'white',
          message: 'Você já não possui nenhuma foto!'
        })
      }
    },
    uploadNewPhoto () {
      const id = uuid()
      const photoName = `userphoto-${id}`
      if (this.imageUploadInput !== null) {
        const storageRef = firebase.storage().ref().child(photoName)
        storageRef.put(this.imageUploadInput)
      }

      const objNewPhoto = {
        ...this.user,
        photo: `https://firebasestorage.googleapis.com/v0/b/aeon-space.appspot.com/o/${photoName}?alt=media`
      }
      this.showLoading = true
      this.updateUser(objNewPhoto).then(() => {
        this.$q.notify({
          type: 'create-user-sucess',
          icon: 'check',
          progress: true,
          color: 'primary',
          textColor: 'white',
          message: 'Foto atualizada!'
        })
        this.showLoading = false
      }).catch(() => {
        this.$q.notify({
          type: 'create-user-error',
          icon: 'error',
          progress: true,
          color: 'red',
          textColor: 'white',
          message: 'Ocorreu um erro ao atualizar sua foto. Tente novamente.'
        })
        this.showLoading = false
      })
    }
  }
}
</script>

<style scoped>

.imgProfile {
  max-width: 10%;
  min-width: 100px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.h5Username {
  margin-top: 20px;
  margin-bottom: 20px;
}

.loadingCircle {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.profileDivision {
  height: 1px;
  background-color:#DCDCDC;
  margin-top: 40px;
}

</style>
