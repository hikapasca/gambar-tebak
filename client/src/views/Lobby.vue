<template>
    <div id="lobby">
        <h2>Selamat Datang, Nama</h2>
        <div id="roomForm">
            <form>
                <label for="room">Bikin ruangan baru ah..</label><br>
                <input type="text" name="room" id="room" placeholder="ruangan baru.."><br><br>
                <button type="submit" class="btn btn-warning" >Bikin!</button>&nbsp;
                <button class="btn btn-info" type="button" >Liat leaderboard ah</button>
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
</template>

<script>
import Room from '../components/Room.vue';

export default {
  name: 'Lobby',
  components: {
    Room
  }
};
</script>

<style>

</style>
