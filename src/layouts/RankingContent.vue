<template>
  <q-page class="constrain-more q-pa-md">
    <h5 class="text-center text-h4 titleRanking">Ranking {{currentMenu}}</h5>

    <q-card-actions class="q-pb-lg row justify-center">
      <q-btn
        unelevated
        color="primary"
        size="md"
        label="Global"
        class="q-mb-sm"
        @click="currentMenu = 'Global'"
      />
      <q-btn
        unelevated
        color="primary"
        size="md"
        label="Niacoy"
        class="q-mb-sm"
        @click="currentMenu = 'Niacoy'"
      />
      <q-btn
        unelevated
        color="primary"
        size="md"
        label="Xeosor"
        class="q-mb-sm"
        @click="currentMenu = 'Xeosor'"
      />
      <q-btn
        unelevated
        color="primary"
        size="md"
        label="Vahean"
        class="q-mb-sm"
        @click="currentMenu = 'Vahean'"
      />
      <q-btn
        unelevated
        color="primary"
        size="md"
        label="Saxios"
        class="q-mb-sm"
        @click="currentMenu = 'Saxios'"
      />
    </q-card-actions>

    <q-table
      :data="parsedTopRanking"
      :columns="columns"
      row-key="indexForTable"
      hide-bottom
      v-if="currentMenu === 'Global' && parsedTopRanking.length > 0"
    />
    <q-card
      v-if="currentMenu === 'Global' && parsedTopRanking.length === 0 && loading === false"
    >
      <q-card-section class="cardSection">
        <q-icon name="warning" class="text-red" style="font-size: 12rem;" />
      </q-card-section>
      <h5 class="text-center text-h5 titleRanking q-pb-lg">Houve um erro ao carregar a lista. Tente novamente.</h5>
    </q-card>

    <div class="row items-center justify-center">
      <q-circular-progress
        indeterminate
        size="50px"
        color="primary"
        class="q-ma-md"
        v-if="loading"
      />
    </div>

    <q-table
      :data="parsedNiacoyRanking"
      :columns="columns"
      row-key="indexForTable"
      hide-bottom
      v-if="currentMenu === 'Niacoy' && parsedNiacoyRanking.length > 0"
    />
    <q-card
      v-if="currentMenu === 'Niacoy' && parsedNiacoyRanking.length === 0 && loading === false"
    >
      <q-card-section class="cardSection">
        <q-icon name="warning" class="text-red" style="font-size: 12rem;" />
      </q-card-section>
      <h5 class="text-center text-h5 titleRanking q-pb-lg">Houve um erro ao carregar a lista. Tente novamente.</h5>
    </q-card>

    <q-table
      :data="parsedXeosorRanking"
      :columns="columns"
      row-key="indexForTable"
      hide-bottom
      v-if="currentMenu === 'Xeosor' && parsedXeosorRanking.length > 0"
    />
    <q-card
      v-if="currentMenu === 'Xeosor' && parsedXeosorRanking.length === 0 && loading === false"
    >
      <q-card-section class="cardSection">
        <q-icon name="warning" class="text-red" style="font-size: 12rem;" />
      </q-card-section>
      <h5 class="text-center text-h5 titleRanking q-pb-lg">Houve um erro ao carregar a lista. Tente novamente.</h5>
    </q-card>

    <q-table
      :data="parsedVaheanRanking"
      :columns="columns"
      row-key="indexForTable"
      hide-bottom
      v-if="currentMenu === 'Vahean' && parsedVaheanRanking.length > 0"
    />
    <q-card
      v-if="currentMenu === 'Vahean' && parsedVaheanRanking.length === 0 && loading === false"
    >
      <q-card-section class="cardSection">
        <q-icon name="warning" class="text-red" style="font-size: 12rem;" />
      </q-card-section>
      <h5 class="text-center text-h5 titleRanking q-pb-lg">Houve um erro ao carregar a lista. Tente novamente.</h5>
    </q-card>

    <q-table
      :data="parsedSaxiosRanking"
      :columns="columns"
      row-key="indexForTable"
      hide-bottom
      v-if="currentMenu === 'Saxios' && parsedSaxiosRanking.length > 0"
    />
    <q-card
      v-if="currentMenu === 'Saxios' && parsedSaxiosRanking.length === 0 && loading === false"
    >
      <q-card-section class="cardSection">
        <q-icon name="warning" class="text-red" style="font-size: 12rem;" />
      </q-card-section>
      <h5 class="text-center text-h5 titleRanking q-pb-lg">Houve um erro ao carregar a lista. Tente novamente.</h5>
    </q-card>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'RankingContent',
  data () {
    return {
      parsedTopRanking: [],
      parsedNiacoyRanking: [],
      parsedXeosorRanking: [],
      parsedVaheanRanking: [],
      parsedSaxiosRanking: [],
      columns: [
        { name: 'indexForTable', label: '#', field: 'indexForTable', align: 'left' },
        { name: 'user', label: 'User', field: 'username', align: 'left' },
        { name: 'class', label: 'Classe', field: 'class', align: 'center' },
        { name: 'championships_won', label: 'Qde. campeonatos ganhos', field: 'amountOfWonChampionships', align: 'center' },
        { name: 'current_championships', label: 'Qde. campeonatos atuais', field: 'amountOfCurrentChampionships', align: 'center' },
        { name: 'passed_championships', label: 'Qde. participação em campeonatos', field: 'amountOfPassedChampionships', align: 'center' },
        { name: 'score', label: 'Pontuação', field: 'global_score', align: 'center' }
      ],
      currentMenu: 'Global',
      loading: true
    }
  },
  methods: {
    ...mapActions(['searchGlobalRanking', 'searchNiacoyRanking', 'searchXeosorRanking', 'searchVaheanRanking', 'searchSaxiosRanking']),
    parseRanking (currentMenu) {
      this.loading = true
      if (currentMenu === 'Niacoy') {
        this.niacoyRanking.forEach((row, index) => {
          this.parsedNiacoyRanking.push({
            ...row,
            amountOfWonChampionships: row.championships_won.length,
            amountOfCurrentChampionships: row.current_championships.length,
            amountOfPassedChampionships: row.passed_championships.length,
            indexForTable: index + 1
          })
        })
      } else if (currentMenu === 'Xeosor') {
        this.xeosorRanking.forEach((row, index) => {
          this.parsedXeosorRanking.push({
            ...row,
            amountOfWonChampionships: row.championships_won.length,
            amountOfCurrentChampionships: row.current_championships.length,
            amountOfPassedChampionships: row.passed_championships.length,
            indexForTable: index + 1
          })
        })
      } else if (currentMenu === 'Vahean') {
        this.vaheanRanking.forEach((row, index) => {
          this.parsedVaheanRanking.push({
            ...row,
            amountOfWonChampionships: row.championships_won.length,
            amountOfCurrentChampionships: row.current_championships.length,
            amountOfPassedChampionships: row.passed_championships.length,
            indexForTable: index + 1
          })
        })
      } else if (currentMenu === 'Saxios') {
        this.saxiosRanking.forEach((row, index) => {
          this.parsedSaxiosRanking.push({
            ...row,
            amountOfWonChampionships: row.championships_won.length,
            amountOfCurrentChampionships: row.current_championships.length,
            amountOfPassedChampionships: row.passed_championships.length,
            indexForTable: index + 1
          })
        })
      } else {
        this.globalRanking.forEach((row, index) => {
          this.parsedTopRanking.push({
            ...row,
            amountOfWonChampionships: row.championships_won.length,
            amountOfCurrentChampionships: row.current_championships.length,
            amountOfPassedChampionships: row.passed_championships.length,
            indexForTable: index + 1
          })
        })
      }
      this.loading = false
    }
  },
  computed: {
    ...mapState({
      globalRanking: state => state.rankings.globalRanking,
      niacoyRanking: state => state.rankings.niacoyRanking,
      xeosorRanking: state => state.rankings.xeosorRanking,
      vaheanRanking: state => state.rankings.vaheanRanking,
      saxiosRanking: state => state.rankings.saxiosRanking
    })
  },
  watch: {
    globalRanking: function () {
      this.parseRanking()
    }
  },
  mounted () {
    if (this.globalRanking.length === 0) {
      this.searchGlobalRanking().then(() => {
        this.parseRanking('Global')
      })
    } else {
      this.parseRanking('Global')
    }

    if (this.niacoyRanking.length === 0) {
      this.searchNiacoyRanking().then(() => {
        this.parseRanking('Niacoy')
      })
    } else {
      this.parseRanking('Niacoy')
    }

    if (this.xeosorRanking.length === 0) {
      this.searchXeosorRanking().then(() => {
        this.parseRanking('Xeosor')
      })
    } else {
      this.parseRanking('Xeosor')
    }

    if (this.vaheanRanking.length === 0) {
      this.searchVaheanRanking().then(() => {
        this.parseRanking('Vahean')
      })
    } else {
      this.parseRanking('Vahean')
    }

    if (this.saxiosRanking.length === 0) {
      this.searchSaxiosRanking().then(() => {
        this.parseRanking('Saxios')
      })
    } else {
      this.parseRanking('Saxios')
    }
  }
}
</script>

<style scoped>
.titleRanking {
  margin-top: 20px;
  margin-bottom: 20px;
}
.cardSection {
  display:flex;
  justify-content: center;
}
</style>
