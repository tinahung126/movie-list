<template>
  <v-container>
    <v-form>
      <v-row justify="center">
        <v-col
          cols="3"
          class="pr-0"
        >
          <v-text-field
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
          >
            Search
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-container>
</template>

<script>
export default {
  name: 'MovieList'

}
</script>
