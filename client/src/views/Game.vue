<template>
    <div id="gameRoom">
        <div id="question">
            <h3>Coba jawab nih..</h3>
            <button class="btn btn-warning btn-sm">Leave Room</button>
            <div id="image">
                <img src="https://ggwp.id/media/wp-content/uploads/2020/04/tebak-gambar-1-396x400.jpg" alt="ini gambar.">
            </div>
        </div>
        <div id="answerForm">
            <form>
                <input style="width: 400px;" type="text" name="answer" id="answer" placeholder="Jawabanmu...">
                &nbsp;<button class="btn btn-success" type="submit">Jawab!</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Game',
};
</script>

<style>

</style>