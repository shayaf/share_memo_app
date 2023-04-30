<template>
    <v-dialog v-model="show" max-width="500px" persistent>
        <v-card>
            <v-btn @click="close" depressed icon> 
                <v-icon dark > mdi-close </v-icon>
            </v-btn>
            <v-card-title>データの削除</v-card-title>
            <v-card-text>
                <span>本当に削除しますか</span>
            </v-card-text>
            <v-card-action>
                <v-spacer/>
                <v-btn color="green" dark @click="onClickAction"> OK </v-btn>
            </v-card-action>
        </v-card>
    </v-dialog>
</template>

<script>
  export default {
    name: "ConfirmDialog",

    data() {
        return {
            /** ダイアログの表示状態 */
            show: false,
            id: 0
        }
    },
    methods: {
        open() {
            this.show = true
        },
        close() {
            this.show = false
        },

        onClickAction(id) {
            //あとで
            this.id = id
            this.show = false
        }
    }
  }

</script>