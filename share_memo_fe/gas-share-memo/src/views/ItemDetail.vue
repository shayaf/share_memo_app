<template>
    <div>
        <v-card>
        <v-img height="200px" :src="imageUrl"/>
        <v-card-title>{{ cafe.name }}</v-card-title>
        <v-card-subtitle>{{ cafe.date }}</v-card-subtitle>
        <v-card-actions>
          <v-spacer/>
          <v-btn dark icon color="green" @click="onClickEdit">
            <v-icon>mdi-pencil</v-icon>
          </v-btn>
          <v-btn dark icon color="green" @click="onClickDelete">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </v-card-actions>
        <v-card-text>
            <v-container>
              <v-col>
                <!-- 二人の平均点にする（片方が0点の場合は片方の採点のみ） -->
                <v-rating :value="cafe.rating" :readonly="true" color="green" />
              </v-col>
              <v-col>
                <span>
                  <a :href="tabelogUrl" target="_blank">食べログ</a>
                </span>
              </v-col>
              <v-col>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4775.330730075758!2d135.50505443338957!3d34.69151983485027!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e6dde0a50a87%3A0x3c9d82f1aa40088c!2z5YyX5rWc44Os44OI44Ot!5e0!3m2!1sja!2sus!4v1682699790353!5m2!1sja!2sus" width="400" height="200" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
              </v-col>
            </v-container>
        </v-card-text>
    </v-card>

    <ItemDialog ref="itemDialog"/>
    <ConfirmDialog ref="confirmDialog"/>
    </div>
</template>

<script>
  import ItemDialog from '../components/ItemDialog'
  import ConfirmDialog from '../components/ConfirmDialog'

  export default {
    name: 'detail',

    components: {
      ItemDialog,
      ConfirmDialog,
    },

    data() {
      return {
        imageUrl: "http://drive.google.com/uc?export=view&id=1vVFiX7gOH5GsDD6Bng56Um0x3BEBNZkS",
        tabelogUrl: "https://tabelog.com/osaka/A2701/A270102/27000121/",
        mapUrl: "https://goo.gl/maps/HWEa9nkKFrfUYj1A9",
      }
    },

    computed: {
        id() {
          return this.$route.params.id
        },
        cafe() {
          return this.$store.getters.memoById(this.id)
        },
    },

    methods: {
      onClickEdit() {
        this.$refs.itemDialog.open("edit", this.cafe)
      },

      onClickDelete() {
        this.$refs.confirmDialog.open(this.id)
      }
    }
  }
</script>