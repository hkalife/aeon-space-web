<template>
  <q-page class="constrain-more q-pa-md">
    <div class="bodyCurrentChampionships" v-if="!showSpecificChampionship  && showPassedChampionships === false">
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

            <q-card-section>
              <div class="text-p text-center">Começo: {{ parseDate(championship.start_date) }}</div>
              <div class="text-p text-center">Fim: {{ parseDate(championship.end_date) }}</div>
            </q-card-section>

            <q-separator />

            <q-card-section>
              <q-btn
                flat
                color="primary"
                label="Ver detalhes"
                size="md"
                class="full-width"
                @click="checkDetailedChampionship(championship)"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
      <div class="q-mt-lg">
        <q-card-section>
          <q-btn
            flat
            color="primary"
            label="Ver campeonatos passados"
            size="md"
            class="full-width"
            @click="showPassedChampionships = true"
          />
        </q-card-section>
      </div>
    </div>
    <DetailedChampionship
      v-if="showSpecificChampionship && showPassedChampionships === false"
      v-bind:championshipToDetail="championshipToDetail"
      @dontShowDetailChampionship="dontShowDetailChampionship"
    />
    <div class="q-pa-md" v-if="showPassedChampionships">
      <q-btn
        flat
        color="primary"
        label="Voltar"
        size="md"
        @click="showPassedChampionships = false"
      />
      <h5 class="text-center text-h5">Campeonatos passados</h5>
      <q-table
        grid
        card-class="bg-primary text-white"
        :data="parsedPassed"
        :columns="columns"
        row-key="name"
        :filter="filter"
        hide-header
        hide-bottom
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Busca">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import { date } from 'quasar'
import DetailedChampionship from './DetailedChampionship'

export default {
  name: 'ChampionshipContent',
  components: {
    DetailedChampionship
  },
  data () {
    return {
      showSpecificChampionship: false,
      championshipToDetail: null,
      columns: [
        { name: 'championship_name', label: 'Nome do Campeonato', field: 'championship_name', align: 'left' },
        { name: 'start_date', label: 'Data de início', field: 'start_date', align: 'center' },
        { name: 'end_date', label: 'Data de fim', field: 'end_date', align: 'center' },
        { name: 'champion_name', label: 'Campeão', field: 'champion_name', align: 'center' },
        { name: 'champion_class', label: 'Pontuação do Campeão', field: 'champion_class', align: 'center' },
        { name: 'champion_score', label: 'Pontuação do Campeão', field: 'champion_score', align: 'center' }
      ],
      parsedPassed: [],
      filter: '',
      showPassedChampionships: false
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user,
      currentChampionships: state => state.championship.currentChampionships,
      passedChampionships: state => state.championship.passedChampionships,
      championshipsWon: state => state.championship.championshipsWon,
      allCurrent: state => state.championship.allCurrent,
      allPassed: state => state.championship.allPassed
    })
  },
  methods: {
    ...mapActions(['searchByState']),
    parseDate (milliseconds) {
      return date.formatDate(milliseconds, 'DD/MM/YYYY')
    },
    checkDetailedChampionship (championship) {
      this.championshipToDetail = championship
      this.showSpecificChampionship = true
    },
    dontShowDetailChampionship (valueToSpecific) {
      this.showSpecificChampionship = valueToSpecific
      this.championshipToDetail = null
    }
  },
  mounted () {
    this.searchByState('current')
    this.searchByState('passed')
  },
  watch: {
    allPassed: function () {
      for (const passed of this.allPassed) {
        const newStartDate = this.parseDate(passed.start_date)
        const newEndDate = this.parseDate(passed.end_date)

        const objToPush = {
          ...passed,
          start_date: newStartDate,
          end_date: newEndDate,
          champion_name: passed.champion.username,
          champion_class: passed.champion.class,
          champion_score: passed.champion.score
        }

        this.parsedPassed.push(objToPush)
      }
    }
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
  justify-content: space-evenly;
}
</style>
