<template>
  <v-container>
    <v-row justify="center">
      <v-col
        cols="3"
        class="pr-0"
      >
        <v-text-field
          v-model="keyword"
          label="search something..."
          solo
          dense
          flat
          outlined
          height="40px"
          hide-details="true"
        />
      </v-col>
      <v-col cols="2">
        <v-btn
          depressed
          height="40px"
          color="primary"
          @click.stop.prevent="searchMovie"
        >
          Search
        </v-btn>
      </v-col>
    </v-row>
    <v-alert

      :value="hasError"
      border="right"
      color="orange"
      type="error"
      class="mt-5 mx-auto"
      width="40%"
      transition="scale-transition"
    >
      查無資料，請重新輸入
    </v-alert>
    <Movies
      class="mt-8"
      :initial-movies-list="movieslist"
    />
  </v-container>
</template>

<script>
import Movies from './MoviesTable.vue'
import MovieAPI from './../apis/movie'
export default {
  name: 'MovieList',
  components: {
    Movies
  },
  data () {
    return {
      keyword: '',
      movieslist: [],
      hasError: false
    }
  },
  created () {
    this.fetchMovie('test')
  },
  methods: {
    searchMovie () {
      this.fetchMovie(this.keyword)
    },
    async fetchMovie (keyword) {
      try {
        const { data } = await MovieAPI.getMovies(keyword)
        this.hasError = false
        this.movieslist.push(...data.Search)
        console.log(data)
      } catch (error) {
        this.hasError = true
        console.log('error from catch', error)
      }
    }
  }

}
</script>
