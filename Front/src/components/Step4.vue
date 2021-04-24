<template>
<div id="step4">
   <div id="text">Merci d'avoir rempli notre formulaire !</div>
  <v-img id="plane" v-on:click="show = !show"
  size="large"
            max-height="300"
  max-width="303"
          src="../assets/paperplane.png"
        ></v-img>
        <transition name="fade">
  </transition>
 
</div>


</template>

<script>
export default {
    name: "Step4",
  data() {
    return {
show:true
    }
  },
  
}
</script>

<style>
#text{
  font-weight: bold;
  font-size: 25px;
  margin-left:10rem;
  display: flex !important;
  justify-content:space-around;
  font-family: 'Karla', sans-serif;
  max-width: 100%;
    height: auto;
}
#plane{
margin-left: 5rem;
margin-top: 2rem;
max-width: 100%;
    height: auto;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>


