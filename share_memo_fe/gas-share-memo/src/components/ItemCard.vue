<template>
    <v-card>
        <v-img class="white--text align-end" height="200px" src="http://drive.google.com/uc?export=view&id=1vVFiX7gOH5GsDD6Bng56Um0x3BEBNZkS">
            <v-card-title>{{ cafe.name }}</v-card-title>
        </v-img>
        <v-card-subtitle>{{ cafe.date }}</v-card-subtitle>
        <v-card-text>
            <!-- 二人の平均点にする（片方が0点の場合は片方の採点のみ） -->
            <v-rating :value="cafe.rating" :readonly="true" color="green" />
        </v-card-text>
    </v-card>
</template>

<script>
  export default {
    name: "ItemCard",
    props: {
        cafe: Object,
    },

  }
</script>
