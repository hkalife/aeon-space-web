<template>
  <q-page class="constrain-more q-pa-md">
    <q-btn
      flat
      color="primary"
      label="Voltar"
      size="md"
      @click="goBackToChampionships()"
    />
    <h5 class="text-center text-h5 col-md-10 col-sm-10 titleChampionship">
      {{ championshipToDetail.championship_name }}
    </h5>

    <div class="row col-md-10 offset-md-2 wholeChampionships">
      <q-card class="championshipCard col-md-10 col-sm-10">
        <q-img
          :src="championshipToDetail.championship_photo"
          :ratio="16/9"
          class="imgProfile"
        />
      </q-card>

      <q-card class="championshipCard col-md-10 col-sm-10">
        <div class="divButton" v-if="!userIsSubscribed">
          <q-btn
            color="primary"
            size="md"
            label="Inscrever"
            class="full-width q-mt-xl"
            @click="subscribeUserToChampionship(championshipToDetail)"
          />
        </div>
        <div class="divButton" v-if="userIsSubscribed">
          <q-btn
            color="red"
            size="md"
            label="Desinscrever"
            class="full-width q-mt-xl"
            @click="unsubscribeUserToChampionship(championshipToDetail)"
          />
        </div>
        <h5 class="text-center text-h6">Começo: {{ parseDate(championshipToDetail.start_date) }}</h5>
        <h5 class="text-center text-h6">Fim: {{ parseDate(championshipToDetail.end_date) }}</h5>
      </q-card>
    </div>

  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'DetailedChampionship',
  props: {
    championshipToDetail: Object
  },
  data () {
    return {
      userIsSubscribed: false,
      payloadUser: {}
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    ...mapActions(['subscribe', 'unsubscribe', 'updateUser', 'getSpecificUserUsingMail']),
    goBackToChampionships () {
      this.$emit('dontShowDetailChampionship', false)
    },
    parseDate (milliseconds) {
      return date.formatDate(milliseconds, 'DD/MM/YYYY')
    },
    subscribeUserToChampionship (paramChampionship) {
      var mapParamsToSubscribe = new Map()
      mapParamsToSubscribe.set('user', this.payloadUser)
      mapParamsToSubscribe.set('championship', paramChampionship)
      this.subscribe(mapParamsToSubscribe).then(() => {
        const userCurrentChampionships = this.user.current_championships
        userCurrentChampionships.push({
          championship_id: this.championshipToDetail.id,
          score: 0
        })
        const newUserChampionships = {
          ...this.user,
          current_championships: userCurrentChampionships
        }
        this.updateUser(newUserChampionships).then(() => {
          this.$q.notify({
            type: 'create-user-sucess',
            icon: 'check',
            progress: true,
            color: 'primary',
            textColor: 'white',
            message: 'Inscrição feita com sucesso!'
          })
          this.userIsSubscribed = true
          this.getSpecificUserUsingMail(this.user.email)
        }).catch(() => {
          this.$q.notify({
            type: 'negative',
            icon: 'error',
            message: 'Ocorreu um erro. Tente novamente.'
          })
        })
      }).catch(() => {
        this.$q.notify({
          type: 'negative',
          icon: 'error',
          message: 'Ocorreu um erro. Tente novamente.'
        })
      })
    },
    unsubscribeUserToChampionship (paramChampionship) {
      var mapParamsToSubscribe = new Map()
      mapParamsToSubscribe.set('user', this.payloadUser)
      mapParamsToSubscribe.set('championship', paramChampionship)
      this.unsubscribe(mapParamsToSubscribe).then(() => {
        const userCurrentChampionships = this.user.current_championships
        let index = 0
        for (const championship of userCurrentChampionships) {
          if (championship.championship_id === this.championshipToDetail.id) {
            userCurrentChampionships.splice(index, 1)
          }
          index++
        }
        const newUserChampionships = {
          ...this.user,
          current_championships: userCurrentChampionships
        }
        this.updateUser(newUserChampionships).then(() => {
          this.$q.notify({
            type: 'create-user-sucess',
            icon: 'check',
            progress: true,
            color: 'primary',
            textColor: 'white',
            message: 'Inscrição cancelada!'
          })
          this.userIsSubscribed = false
        })
      }).catch(() => {
        this.$q.notify({
          type: 'negative',
          icon: 'error',
          message: 'Ocorreu um erro. Tente novamente.'
        })
      })
    }
  },
  mounted () {
    for (const player of this.championshipToDetail.players) {
      if (player.user_id === this.user.id) {
        this.userIsSubscribed = true
      }
    }

    this.payloadUser = {
      user_id: this.user.id,
      username: this.user.username
    }
  }
}
</script>

<style scoped>
.titleChampionship {
  margin: 0px 0px 20px 0px;
}

.championshipCard {
  width: 500px;
}

.lineCards {
  min-width: 300px;
  background-color:red;
}

.cardInfo {
  max-width:280px;
}

.wholeChampionships {
  display: flex;
  justify-content: center;
}

.divButton {
  margin: 2.5% 20% 0 20%;
}

</style>
