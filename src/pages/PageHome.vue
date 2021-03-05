<template>
  <q-page class="constrain-more q-pa-md">
    <div class="v-header">
      <div class="fullscreen-video-wrap">
        <!-- VIDEO SERÁ REVISTO POR QUESTÕES DE TAMANHO -->
        <video src="../assets/video.mp4" autoplay="" loop="" muted>
      </video>
      </div>
      <div class="header-overlay bg-dark" ></div>
      <div class="header-content fixed-center">
        <div class="row justify-center">
          <img class="logoAeon q-pt-sm" src="../assets/logo-aeon-space.png" />
        </div>
        <div class="row justify-center">
          <p class="text-center q-pt-sm">Acesse e aventure-se já!</p>
        </div>
        <div class="row justify-center">
          <q-btn
            unelevated
            color="primary"
            size="lg"
            label="Baixe o game"
            class="q-ma-md"
            to="https://itch.io"
          />
          <q-btn
            unelevated
            color="primary"
            size="lg"
            label="Acessar sistema"
            class="q-ma-md"
            to="/login"
          />
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
// import firebase from 'firebase'

export default {
  name: 'PageHome'
}
</script>

<style scoped>
*{
  box-sizing: border-box;
}

.v-header{
  display:flex;
  align-items:center;
  color:#fff;
}

.fullscreen-video-wrap{
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:100vh;
  overflow:hidden;
}

.fullscreen-video-wrap video{
  min-height:100%;
  min-width:100%;
}

.header-overlay{
  height:100vh;
  position: absolute;
  top:0;
  left:0;
  width:100vw;
  z-index:1;
  opacity:0.85;
}

.header-content{
  z-index:2;
}

.header-content p{
  font-size:1.5rem;
  display:block;
  padding-bottom:2rem;
}

.logoAeon {
  width: 175%;
}

</style>
