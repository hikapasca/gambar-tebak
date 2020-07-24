<template>
    <div>
         <nav class="navbar navbar-light" style="background-color: green;">
            <a class="navbar-brand" href="#">
            <img src="/docs/4.5/assets/brand/bootstrap-solid.svg" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
            Gambar? Tebak!
            </a>
            <button @click="logout" class="btn btn-danger">Exit</button>
        </nav>
        <div id="lobby">
            <h2>Selamat Datang, {{userName}}</h2>
            <div id="roomForm">
                <form>
                    <label for="room">Bikin ruangan baru ah..</label><br>
                    <input type="text" name="room" id="room" placeholder="ruangan baru.."><br><br>
                    <button @click="playGame" type="button" class="btn btn-warning" >Play!</button>&nbsp;
                    <button @click="toLeaderBoard" class="btn btn-info" type="button" >Liat leaderboard ah</button>
                </form>
            </div>
            <div id="roomPage">
                <div class="container text-center">
                    <div class="row">
                        <Room></Room>
                        <Room></Room>
                        <Room></Room>
                        <Room></Room>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Room from '../components/Room.vue';

export default {
  name: 'Lobby',
  components: {
    Room,
  },
  computed: {
    userName() {
      return localStorage.user;
    },
  },
  methods: {
    toLeaderBoard() {
      this.$router.push({ name: 'LeaderBoard' });
    },
    logout() {
      localStorage.clear();
      this.$router.push({ name: 'Home' });
    },
    playGame() {
      this.$router.push({ name: 'Game' });
    },
  },
};
</script>

<style>

</style>
