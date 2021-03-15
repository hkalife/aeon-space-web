<template>
  <q-page class="constrain-more q-pa-md q-mt-md">
    <h5 class="text-left text-h5 titleUser">Bem-vindo(a), {{ user.username }}!</h5>

    <div class="row rowCard q-mt-lg">
      <q-card class="q-mt-lg q-ml-md q-mr-md cardHome text-white" style="height: 100px; min-width: 277px;">
        <div class="row" style=" justify-content: space-between;">
          <div style="padding-left: 7.5%; padding-top: 20px;">
            <div class="text-left text-h6 titleUser">{{ user.current_championships !== undefined ? user.current_championships.length : '0' }}</div>
            <div class="text-left text-body2 titleUser">Campeonatos atuais</div>
          </div>
          <div style="padding-right: 7.5%; padding-top: 2%;">
            <q-icon style="font-size:5rem; padding-top: 2%;" name="games" class="text-white" />
          </div>
        </div>
      </q-card>
      <q-card class="q-mt-lg q-ml-md q-mr-md cardHome text-white" style="height: 100px; min-width: 277px;">
        <div class="row" style=" justify-content: space-between;">
          <div style="padding-left: 7.5%; padding-top: 20px;">
            <div class="text-left text-h6 titleUser">{{ user.championships_won !== undefined ? user.championships_won.length : '0' }}</div>
            <div class="text-left text-body2 titleUser">Campeonatos ganhos</div>
          </div>
          <div style="padding-right: 7.5%; padding-top: 2%;">
            <q-icon style="font-size:5rem; padding-top: 2%;" name="emoji_events" class="text-white" />
          </div>
        </div>
      </q-card>
      <q-card class="q-mt-lg q-ml-md q-mr-md cardHome text-white" style="height: 100px; min-width: 277px;">
        <div class="row" style=" justify-content: space-between;">
          <div style="padding-left: 7.5%; padding-top: 20px;">
            <div class="text-left text-h6 titleUser">{{ user.global_score }}</div>
            <div class="text-left text-body2 titleUser">Sua pontuação total</div>
          </div>
          <div style="padding-right: 7.5%; padding-top: 2%;">
            <q-icon style="font-size:5rem; padding-top: 2%;" name="moving" class="text-white" />
          </div>
        </div>
      </q-card>
    </div>

    <q-separator class="q-mt-xl" />

    <div class="q-mt-xl">
      <h5 class="text-left text-h5 titleUser">Seus últimos pontos</h5>
    </div>

    <q-card class="q-pa-md q-mt-lg bg-grey">
      <q-table
        grid
        card-class="bg-white text-black"
        :data="parsedScoreHistoryList"
        :columns="columns"
        row-key="name"
        :filter="filter"
        hide-header
      >
        <template v-slot:top-right>
          <q-input borderless dense debounce="300" v-model="filter" placeholder="Busca de pontos">
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </template>
      </q-table>
    </q-card>

  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import { date } from 'quasar'

export default {
  name: 'MemberHomeContent',
  data () {
    return {
      filter: '',
      columns: [
        { name: 'date', label: 'Data', field: 'parsed_date', align: 'left' },
        { name: 'game_type', label: 'Tipo de jogo', field: 'game_type', align: 'center' },
        { name: 'scenario', label: 'Cenário', field: 'scenario', align: 'center' },
        { name: 'score', label: 'Pontos adquiridos', field: 'score', align: 'center' }
      ],
      parsedScoreHistoryList: []
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  watch: {
    user: function () {
      const story = this.user.score_history
      for (let i = 0; i < story.length; i++) {
        story[i] = {
          ...story[i],
          parsed_date: date.formatDate(story[i].date, 'DD/MM/YYYY')
        }
      }
      this.parsedScoreHistoryList = story
    }
  }
}
</script>

<style scoped>

.titleUser {
  margin-top: 0px;
  margin-bottom: 0px;
}

.cardHome {
  width: 30%;
  min-width: 200px;
  background-color: #0D47A1;
}

.rowCard {
  justify-content: center;
}

.cardHomeSon {
  width: 100%;
  justify-content: space-between;
}

</style>
