<template>
    <div id="leaderboard">
        <div id="leaderHeader">
            <h1>Tertinggi saat ini</h1>
            <button @click="balikLobby" class="btn btn-primary">Balik Lobby</button>
        </div>
        <div id="leaderTable">
            <table class="table table-dark">
                <thead>
                    <tr>
                    <th scope="col">Nama</th>
                    <th scope="col">Score</th>
                    </tr>
                </thead>
                <tbody>
                    <LeaderData v-for="(user, index) in $store.state.finalScore" :key="index" :score="user"></LeaderData>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import LeaderData from '../components/LeaderData.vue';

export default {
  name: 'LeaderBoard',
  components: {
    LeaderData,
  },
  methods: {
    balikLobby() {
        this.$store.commit('RESET_SCORE')
        this.$router.push({name: 'Lobby'})
    }
  }
};
</script>

<style>

</style>
