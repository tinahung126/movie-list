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
          max-width="500px"
        >
          <v-card>
            <v-card-title>
              {{ movieItem.Title }}
            </v-card-title>
            <v-divider class="mx-4" />

            <v-card-text class="ml-0 pl-0">
              <v-container>
                <v-list-item>
                  <v-list-item-icon class="mr-2">
                    <v-icon small>
                      mdi-account-group
                    </v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="text-wrap">
                      演員：{{ movieItem.Actors }}
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
                      類型：{{ movieItem.Genre }}
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
                      故事內容簡介：<br> {{ movieItem.Plot }}
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
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

export default {
  name: 'MovieTable',
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
      { text: 'Actions', value: 'actions', sortable: false }
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
    },

    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
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
