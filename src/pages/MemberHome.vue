<template>
  <q-page class="constrain-more q-pa-md">
    <q-header class="bg-white" elevated>
      <q-toolbar>
        <q-toolbar-title>
          <img class="logoAeon q-pt-sm" src="../assets/logo-aeon-space.png" />
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          color="primary"

          @click="leftDrawerOpen = !leftDrawerOpen"
        />

      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>

        <q-avatar class="q-mt-xl q-mb-lg imgAvatar" size="150px">
          <q-img
            :src="userInfo.photo"
            :ratio="1"
          />
        </q-avatar>

        <div>
          <h5 class="text-center text-h5 h5Username">{{ userInfo.username }}</h5>
          <p class="text-center text-body2">{{ userInfo.email }}</p>
          <p class="text-center text-body2">Escore global: {{ userInfo.global_score }}</p>
        </div>

        <div class="separationLine"></div>

        <q-item-label
          header
          class="text-grey-8 text-center"
        >
          Opções
        </q-item-label>

        <q-btn
          unelevated
          color="primary"
          size="md"
          class="full-width"
          label="Inicial"
          @click="managePageComponents('memberHome')"
        />

        <q-btn
          unelevated
          color="primary"
          size="md"
          class="full-width q-mt-md"
          label="Perfil"
          @click="managePageComponents('profile')"
        />

        <q-btn
          unelevated
          color="primary"
          size="md"
          class="full-width q-mt-md"
          label="Campeonatos"
          @click="managePageComponents('championship')"
        />

        <q-btn
          unelevated
          color="primary"
          size="md"
          class="full-width q-mt-md"
          label="Rankings"
          @click="managePageComponents('ranking')"
        />

        <q-btn
          unelevated
          color="grey"
          size="md"
          class="full-width q-mt-md text-grey-8"
          label="Fechar barra de navegação"
          @click="leftDrawerOpen = false"
        />

        <q-btn
          unelevated
          color="grey"
          size="md"
          class="full-width q-mt-md text-grey-8"
          label="Sair"
          @click="logOut()"
        />

      </q-list>
    </q-drawer>

    <MemberHomeContent v-if="valuesToShowComponents[0].value" />
    <ProfileContent v-if="valuesToShowComponents[1].value" />
    <ChampionshipContent v-if="valuesToShowComponents[2].value" />
    <RankingContent v-if="valuesToShowComponents[3].value" />

  </q-page>
</template>

<script>
import MemberHomeContent from '../layouts/MemberHomeContent.vue'
import ProfileContent from '../layouts/ProfileContent.vue'
import ChampionshipContent from '../layouts/ChampionshipContent.vue'
import RankingContent from '../layouts/RankingContent.vue'
import firebase from 'firebase'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'MemberHome',
  components: {
    MemberHomeContent,
    ProfileContent,
    ChampionshipContent,
    RankingContent
  },
  data () {
    return {
      leftDrawerOpen: false,
      valuesToShowComponents: [
        {
          key: 'memberHome',
          value: true
        },
        {
          key: 'profile',
          value: false
        },
        {
          key: 'championship',
          value: false
        },
        {
          key: 'ranking',
          value: false
        }
      ],
      isAuthenticated: false,
      userInfo: {}
    }
  },
  watch: {
    user: function () {
      this.userInfo = this.user
    }
  },
  computed: {
    ...mapState({
      user: state => state.user.user
    })
  },
  methods: {
    ...mapActions(['getSpecificUserUsingMail']),
    managePageComponents (key) {
      for (let i = 0; i < this.valuesToShowComponents.length; i++) {
        if (key === this.valuesToShowComponents[i].key) {
          this.valuesToShowComponents[i].value = true
        } else {
          this.valuesToShowComponents[i].value = false
        }
      }
    },
    logOut () {
      firebase.auth().signOut()
      this.$router.push({ path: '/' })
    },
    checkIfUserIsLogged () {
      const self = this
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          self.isAuthenticated = true
          self.getSpecificUserUsingMail(user.email)
        } else {
          self.$router.push({ path: 'login' })
        }
      })
    }
  },
  mounted () {
    this.checkIfUserIsLogged()
  }
}
</script>

<style scoped>

.logoAeon {
  width: 250px;
}

.imgAvatar {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.h5Username {
  margin-top: 0px;
  margin-bottom: 5px;
}

.separationLine {
  height: 1px;
  background-color:#DCDCDC;
  margin: 20px 20px 10px 20px;
}

</style>
