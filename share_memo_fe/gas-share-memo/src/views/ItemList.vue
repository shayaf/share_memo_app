<template>
  <div>
      <v-btn dark color="green" @click="onClickAdd">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
      <v-container>
          <v-row class="justify-center">
            <v-col md=6 v-for="cafe in cafeData" v-bind:key="cafe.id">
              <router-link :to="{ name:'detail', params: { id: cafe.id }}">
                <item-card :cafe="cafe"/>
              </router-link>
            </v-col>
          </v-row>
      </v-container>

      <ItemDialog ref="itemDialog"/>
  </div>
</template>

<script>
  import ItemCard from '../components/ItemCard'
  import ItemDialog from '../components/ItemDialog'
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'List',

    components: {
      ItemCard,
      ItemDialog,
    },

    
    data() {
        return {
            cafeData: []
        }
    },

    created() {
      console.log("created")
      this.updateItems()
    },

    computed: {
      ...mapState({
        memoData: state => state.memoData
      })
    },
    methods: {
      ...mapActions([
        "fetchMemoData"
      ]),

      updateItems() {
        const list = this.memoData
        if (list.length !== 0) {
          this.cafeData = list
        } else {
          console.log("updateItems")
          this.fetchMemoData()
          this.cafeData = this.memoData
        }
      },


      onClickAdd() {
        this.$refs.itemDialog.open("add")
      }
    }
  }
</script>
