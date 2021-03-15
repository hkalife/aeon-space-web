<template>
  <q-page class="constrain-more q-pa-md">
    <h5 class="text-left text-h5 titleUser">Bem-vindo(a), {{ user.username }}!</h5>

    <div class="row rowCard">
      <q-card class="q-mt-lg q-ml-md q-mr-md cardHome text-white" style="height: 100px; min-width: 277px;">
        <div class="row" style=" justify-content: space-between;">
          <div style="padding-left: 7.5%; padding-top: 20px;">
            <div class="text-left text-h6 titleUser">{{ user.current_championships.length }}</div>
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
            <div class="text-left text-h6 titleUser">{{ user.championships_won.length }}</div>
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

  </q-page>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MemberHomeContent',
  computed: {
    ...mapState({
      user: state => state.user.user
    })
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
