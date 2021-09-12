<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="moviesList"
      sort-by="calories"
      class="elevation-1"
      :page.sync="page"
      :items-per-page="itemsPerPage"
      hide-default-footer
      :loading="loading"
      loading-text="Loading... Please wait"
    >
      <template v-slot:top>
        <v-dialog
          v-model="dialog"
          max-width="700px"
        >
          <v-card>
            <v-card-title>
              {{ movieItem.Title }}
            </v-card-title>
            <v-divider class="mx-4" />

            <v-card-text class="ml-0 pl-0">
              <v-container class="d-flex">
                <div class="flex-grow-1">
                  <v-list-item>
                    <v-list-item-icon class="mr-2">
                      <v-icon
                        small
                        color="blue darken-1"
                      >
                        mdi-account-group
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">
                        <strong>演員：</strong>
                        {{ movieItem.Actors | emptyContent }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mx-4" />
                  <v-list-item>
                    <v-list-item-icon class="mr-2">
                      <v-icon
                        small
                        color="blue darken-1"
                      >
                        mdi-movie-open
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">
                        <strong>類型：</strong>
                        {{ movieItem.Genre | emptyContent }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mx-4" />
                  <v-list-item>
                    <v-list-item-icon class="mr-2">
                      <v-icon
                        small
                        color="blue darken-1"
                      >
                        mdi-file-document-multiple
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">
                        <strong>故事內容簡介：</strong>
                        <br> {{ movieItem.Plot | emptyContent }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </div>
                <div
                  v-if="movieItem.Poster !== 'N/A'"
                  class="img"
                >
                  <v-img
                    width="200px"
                    rounded-sm
                    :src="movieItem.Poster"
                  />
                </div>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer />
              <v-btn
                dark
                color="blue darken-1"
                @click="dialog = false"
              >
                OK
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-btn
          color="blue-grey"
          class="ma-2 white--text"
          :loading="btnLoading && (editedIndex === item.imdbID)"
          :disabled="btnLoading && (editedIndex === item.imdbID)"
          @click="readMore(item)"
        >
          詳細資料
        </v-btn>
      </template>

      <template v-slot:no-data>
        <span>請搜尋電影</span>
      </template>
    </v-data-table>
    <div class="my-5">
      <v-pagination
        v-model="page"
        color="teal accent-4"
        :length="totalPage"
        @input="next"
      />
    </div>
  </div>
</template>
<script>
import MovieAPI from './../apis/movie'
import { emptyContentFilter } from './../utils/mixins'
export default {
  name: 'MovieTable',
  mixins: [emptyContentFilter],
  props: {
    initialMoviesList: {
      type: Array,
      default () {
        return []
      }
    },
    initialTotalPage: {
      type: Number,
      default: 0
    },
    initialCurrentPage: {
      type: Number,
      default: 1
    }
  },
  data: () => ({
    dialog: false,
    page: 1,
    pageCount: 0,
    totalPage: 0,
    itemsPerPage: 10,
    dialogDelete: false,
    loading: true,
    btnLoading: false,
    headers: [
      {
        text: '名稱',
        align: 'start',
        sortable: false,
        value: 'Title'
      },
      { text: '類型', value: 'Type' },
      { text: '年份', value: 'Year' },
      { text: '', value: 'actions', sortable: false }
    ],
    moviesList: [],
    editedIndex: -1,
    movieItem: {
      Title: '',
      Type: 0,
      Year: 0,
      Actor: ''

    },
    defaultItem: {
      Title: '',
      Type: 0,
      Year: 0
    }
  }),
  watch: {
    initialMoviesList (newValue) {
      console.log(this.loading)
      this.moviesList = newValue
      this.loading = false
      console.log(this.loading)
    },
    initialTotalPage (newValue) {
      this.totalPage = Math.ceil(newValue / this.itemsPerPage)
    },
    initialCurrentPage (newValue) {
      this.page = newValue
    }

  },
  created () {
    this.loading = true
    const { page } = this.$route.query
    this.page = Number(page)
  },
  methods: {
    async readMore (item) {
      this.btnLoading = true
      this.editedIndex = item.imdbID
      const { data } = await MovieAPI.getDetail(item.imdbID)
      this.btnLoading = false
      this.movieItem = Object.assign({}, data)
      this.dialog = true
    },
    next (page) {
      this.$emit('change-page', page)
      this.loading = true
    }

  }
}
</script>
