<template>
  <div id="homepage">
    <div class="boxHome">
      <h1>GAMBAR? TEBAK!</h1>
      <div id="userJoin">
        <form @submit.prevent="addUser">
          <label for="name">Siapa namanya?</label>
          <br />
          <input v-model="user" type="text" name="name" id="name" placeholder="namamu.." />
          <br />
          <br />
          <button class="btn btn-dark" type="submit">Masook!</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
// import Swal from 'sweetalert2';

export default {
  name: "Home",
  data() {
    return {
      user: "",
    };
  },
  methods: {
    addUser() {
      const sound =
        "http://soundbible.com/mp3/Elevator Ding-SoundBible.com-685385892.mp3";
      if (sound) {
        const audio = new Audio(sound);
        audio.play();
      }
      this.$store.commit("ADD_USER", this.user);
      localStorage.setItem("user", this.user);
      this.$router.push({ name: "Lobby" });
    },
  },
};
</script>

<style>
</style>
