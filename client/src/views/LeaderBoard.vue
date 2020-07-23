<template>
    <div id="leaderboard">
        <div id="leaderHeader">
            <h1>Tertinggi saat ini</h1>
            <button class="btn btn-primary">Balik Lobby</button>
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
                    <LeaderData></LeaderData>
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
    LeaderData
  }
};
</script>

<style>

</style>