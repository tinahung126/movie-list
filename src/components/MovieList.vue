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
      {{ errorMsg }}
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
      hasError: false,
      errorMsg: ''
    }
  },
  created () {
    const { keyword } = this.$route.query
    if (keyword) {
      this.fetchMovie(keyword)
    }
  },
  methods: {
    searchMovie () {
      this.$router.push({ name: 'Home', query: { keyword: this.keyword } })
      this.fetchMovie(this.keyword)
    },
    async fetchMovie (keyword) {
      try {
        const { data } = await MovieAPI.getMovies(keyword)
        console.log(data)
        if (data.Response === 'False') {
          this.hasError = true
          this.movieslist = []
          this.errorMsg = data.Error
          return
        }
        this.hasError = false

        this.movieslist = data.Search
      } catch (error) {
        this.hasError = true
        this.movieslist = []
        console.log('error from catch', error)
      }
    }
  }

}
</script>
