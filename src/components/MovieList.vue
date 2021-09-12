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
          dark
          height="40px"
          color="teal accent-4"
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
      :initial-total-page="totalPage"
      :initial-current-page="currentPage"
      @change-page="handleChangePage"
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
      errorMsg: '',
      totalPage: 0,
      currentPage: 1
    }
  },
  created () {
    const { keyword, page } = this.$route.query
    if (keyword) {
      this.keyword = keyword
      this.currentPage = Number(page)
      this.fetchMovie(keyword, page)
    }
  },
  methods: {
    searchMovie () {
      if (!this.keyword || !this.keyword.trim()) {
        this.errorMsg = '請輸入搜尋關鍵字'
        this.hasError = true
        return
      }
      this.$router.push({ name: 'Home', query: { keyword: this.keyword } })
      this.fetchMovie(this.keyword)
    },
    async fetchMovie (keyword, page = 1) {
      try {
        const { data } = await MovieAPI.getMovies(keyword, page)
        console.log(data)
        if (data.Response === 'False') {
          this.hasError = true
          this.movieslist = []
          this.errorMsg = data.Error
          return
        }
        this.hasError = false
        this.movieslist = data.Search
        this.totalPage = Number(data.totalResults)
      } catch (error) {
        this.hasError = true
        this.movieslist = []
        console.log('error from catch', error)
      }
    },
    handleChangePage (data) {
      this.fetchMovie(this.keyword, data)
      this.currentPage = data
      this.$router.push({ name: 'Home', query: { keyword: this.keyword, page: data } })
    }
  }

}
</script>
