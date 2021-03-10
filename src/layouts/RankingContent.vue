<template>
  <q-page class="constrain-more q-pa-md">
    <h5 class="text-center text-h5">Ranking global (top 100)</h5>

    <q-table
      :data="parsedTop100Ranking"
      :columns="columns"
      row-key="indexForTable"
      hide-bottom
    />
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'RankingContent',
  data () {
    return {
      parsedTop100Ranking: [],
      columns: [
        { name: 'indexForTable', label: '#', field: 'indexForTable', align: 'center' },
        { name: 'user', label: 'User', field: 'username', align: 'left' },
        { name: 'class', label: 'Classe', field: 'class', align: 'left' },
        { name: 'score', label: 'Pontuação', field: 'global_score', align: 'center' }
      ]
    }
  },
  methods: {
    ...mapActions(['searchGlobalRanking']),
    parseTopRanking () {
      console.log('ma oeeeeeee')
      this.globalRanking.forEach((row, index) => {
        this.parsedTop100Ranking.push({
          ...row,
          indexForTable: index + 1
        })
      })
      console.log(this.parsedTop100Ranking)
    }
  },
  computed: {
    ...mapState({
      globalRanking: state => state.rankings.globalRanking
    })
  },
  watch: {
    globalRanking: function () {
      this.parseTopRanking()
    }
  },
  mounted () {
    console.log(this.parsedTop100Ranking)
    if (this.globalRanking.length === 0) {
      this.searchGlobalRanking()
    } else {
      this.parseTopRanking()
    }
  }
}
</script>
