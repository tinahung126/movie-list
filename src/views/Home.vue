<template>
  <v-container>
    <h1 class="text-center mt-5 mb-3">
      電影資料庫
    </h1>
    <v-row justify="center">
      <v-col
        cols="12"
        sm="4"
        class="pr-0"
      >
        <v-text-field
          v-model="keyword"
          label="請輸入電影關鍵字..."
          solo
          dense
          flat
          outlined
          clearable
          height="40px"
          hide-details="true"
        />
      </v-col>
      <v-col
        cols="12"
        sm="2"
        class="d-flex justify-center justify-sm-start"
      >
        <v-btn
          depressed
          height="40px"
          class="white--text"
          color="teal accent-4"
          :disabled="isLoading"
          :loading="isLoading"
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
      min-width="250px"
      width="50%"
      transition="scale-transition"
    >
      {{ errorMsg }}
    </v-alert>
    <MoviesTable
      class="mt-8"
      :initial-movies-list="movieslist"
      :initial-total-page="totalPage"
      :initial-current-page="currentPage"
      :is-loading="isLoading"
      @change-page="handleChangePage"
    />
  </v-container>
</template>

<script>
import MoviesTable from './../components/MoviesTable.vue'
import MovieAPI from './../apis/movie'
export default {
  name: 'Home',
  components: {
    MoviesTable
  },
  data () {
    return {
      keyword: '',
      movieslist: [],
      hasError: false,
      errorMsg: '',
      totalPage: 0,
      currentPage: 1,
      isLoading: false
    }
  },
  beforeRouteUpdate (to, from, next) {
    const { keyword, page } = to.query
    this.currentPage = page ? Number(page) : 1
    this.keyword = keyword
    this.fetchMovie(keyword, this.currentPage)
    next()
  },
  created () {
    const { keyword, page } = this.$route.query
    if (keyword) {
      this.keyword = keyword
      this.currentPage = page ? Number(page) : 1
      this.fetchMovie(keyword, this.currentPage)
    }
  },
  methods: {
    searchMovie () {
      this.isLoading = true
      if (!this.keyword || !this.keyword.trim()) {
        this.errorMsg = '請輸入搜尋關鍵字'
        this.hasError = true
        return
      }
      this.$router.push({ name: 'Home', query: { keyword: this.keyword } }).catch(() => {})
      this.fetchMovie(this.keyword)
    },
    async fetchMovie (keyword, page = 1) {
      try {
        this.isLoading = true
        const { data } = await MovieAPI.getMovies(keyword, page)
        // Error handle
        if (data.Response === 'False') {
          console.log(data)
          this.hasError = true
          this.isLoading = false
          this.movieslist = []
          this.errorMsg = data.Error
          this.totalPage = 0
          return
        }
        this.isLoading = false
        this.hasError = false
        this.movieslist = data.Search
        this.totalPage = Number(data.totalResults)
      } catch (error) {
        this.hasError = true
        this.isLoading = false
        this.movieslist = []
        console.log('Error from fetch movies', error)
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
