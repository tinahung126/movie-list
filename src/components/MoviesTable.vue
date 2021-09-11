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
      @page-count="pageCount = $event"
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
                      <v-icon small>
                        mdi-account-group
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">
                        演員：{{ movieItem.Actors | emptyContent }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mx-4" />
                  <v-list-item>
                    <v-list-item-icon class="mr-2">
                      <v-icon small>
                        mdi-movie-open
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">
                        類型：{{ movieItem.Genre | emptyContent }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mx-4" />
                  <v-list-item>
                    <v-list-item-icon class="mr-2">
                      <v-icon small>
                        mdi-file-document-multiple
                      </v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title class="text-wrap">
                        故事內容簡介：<br> {{ movieItem.Plot | emptyContent }}
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
                color="indigo"
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
        v-show="pageCount"
        v-model="page"
        :length="pageCount"
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
    }
  },
  data: () => ({
    dialog: false,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    dialogDelete: false,
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

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    initialMoviesList (newValue) {
      this.moviesList = newValue
    }
  },

  created () {

  },

  methods: {
    initialize () {
      this.moviesList = this.initialMoviesList
    },
    async readMore (item) {
      this.editedIndex = item.imdbID
      const { data } = await MovieAPI.getDetail(item.imdbID)
      console.log(data)
      this.movieItem = Object.assign({}, data)
      this.dialog = true
      console.log(this.movieItem)
    }

  }
}
</script>
