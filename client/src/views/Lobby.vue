<template>
    <div>
         <nav id="navbar" class="navbar navbar-light">
            <a class="navbar-brand" href="#">
            <img src="https://p7.hiclipart.com/preview/404/818/548/5bbc233fcf90b-thumbnail.jpg" width="30" height="30" class="d-inline-block align-top" alt="" loading="lazy">
            Gambar? Tebak!
            </a>
            <button @click="logout" class="btn btn-danger">Exit</button>
        </nav>
        <div id="lobby">
            <div id="homeBox">
                <h2>Selamat Datang, {{userName}}</h2>
                <div id="roomForm">
                    <form>
                        <label for="room">Bikin ruangan baru ah..</label><br>
                        <input type="text" name="room" id="room" placeholder="ruangan baru.."><br><br>
                        <button style="margin-bottom: 10px" type="submit" class="btn btn-dark" >Bikin!</button>&nbsp;
                    </form>
                    <div id="buttonAfterRoom">
                        <button style="margin: 10px" @click="playGame" type="button" class="btn btn-warning btn-lg" >Play!</button>&nbsp;
                        <!-- <button style="margin: 10px" @click="toLeaderBoard" class="btn btn-info" type="button" >Liat leaderboard ah</button> -->
                    </div>
                </div>
            </div>
            <!-- <div id="roomPage">
                <div class="container text-center">
                    <div class="row">
                        <Room></Room>
                        <Room></Room>
                        <Room></Room>
                        <Room></Room>
                    </div>
                </div>
            </div> -->
        </div>
    </div>
</template>

<script>
import io from 'socket.io-client';
import Room from '../components/Room.vue';

const socket = io('http://localhost:3000');

export default {
  name: 'Lobby',
  components: {
    Room,
  },
  created() {
    // socket.on("gameOn", (user) => {
    //     this.$store.dispatch('addLeaderboard', user)
    // })
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
      const userScore = {
        name: localStorage.user,
        score: 0,
      };
      this.$store.dispatch('addLeaderboard', userScore);
      // socket.emit("gameOn", userScore)
      this.$router.push({ name: 'Game' });
    },
  },
};
</script>

<style>

</style>
