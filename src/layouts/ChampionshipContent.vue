<template>
  <q-page class="constrain-more q-pa-md">
    <h5 class="text-center text-h5">Campeonatos atuais</h5>

    <div class="row col-md-10 offset-md-2 wholeChampionships">
      <div class="col-md-2 mapChampionships" v-for="championship in allCurrent" :key="championship.id">
        <q-card class="championshipCard">
          <q-img
            :src="championship.championship_photo"
            :ratio="1"
            class="imgProfile"
          />
          <q-card-section>
            <div class="text-h6 text-center">{{ championship.championship_name }}</div>
          </q-card-section>

          <q-separator />

          <q-card-section>
            <div class="text-p text-center">Começo: {{ parseDate(championship.start_date) }}</div>
            <div class="text-p text-center">Fim: {{ parseDate(championship.end_date) }}</div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'ChampionshipContent',
  computed: {
    ...mapState({
      user: state => state.user.user,
      currentChampionships: state => state.championship.currentChampionships,
      passedChampionships: state => state.championship.passedChampionships,
      championshipsWon: state => state.championship.championshipsWon,
      allCurrent: state => state.championship.allCurrent
    })
  },
  methods: {
    ...mapActions(['searchByState']),
    parseDate (milliseconds) {
      return date.formatDate(milliseconds, 'DD/MM/YYYY')
    }
  },
  mounted () {
    this.searchByState('current')
  }
}
</script>

<style scoped>
.championshipCard {
  width: 200px;
}

.mapChampionships {
  margin: 10px;
  text-align: -webkit-center;
}

.wholeChampionships {
  display: flex;
  justify-content: center;
}
</style>
