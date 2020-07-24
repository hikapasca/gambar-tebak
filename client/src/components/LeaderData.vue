<template>
    <tr>
        <th scope="row">{{score.user}}</th>
        <td>{{score.score}}</td>
    </tr>
</template>

<script>
export default {
  name: 'LeaderData',
  props: ['score'],
};
</script>

<style>

</style>
