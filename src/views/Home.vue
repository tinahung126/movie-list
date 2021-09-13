<template>
  <v-container>
    <h1 class="text-center mt-5 mb-3">
      電影資料庫
    </h1>
    <MovieList />
  </v-container>
</template>

<script>
import MovieList from './../components/MovieList.vue'
export default {
  name: 'Home',
  components: {
    MovieList
  }
}
</script>
