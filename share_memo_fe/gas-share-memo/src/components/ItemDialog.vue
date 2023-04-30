<template>
    <v-dialog v-model="show" max-width="500px" persistent>
        <v-card>
            <v-btn @click="close" depressed icon> 
                <v-icon dark > mdi-close </v-icon>
            </v-btn>
            <v-card-title>{{ titleText }}</v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-text-field label="店名" v-model="name" :counter="50"/>
                    <!-- 日付選択 -->
                    <v-menu
                        ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date"
                        transition="scale-transition" offset-y max-width="290px" min-width="290px">
                        <template v-slot:activator="{ on }">
                            <v-text-field v-model="date" prepend-icon="mdi-calendar" v-on="on" hide-details/>
                        </template>
                        <v-date-picker v-model="date" color="green" locale="ja-jp"
                        :day-format="date => new Date(date).getDate()" no-title scrollable>
                            <v-spacer/>
                            <v-btn text color="grey" @click="menu = false">キャンセル</v-btn>
                            <v-btn text color="primary" @click="$refs.menu.save(date)">選択</v-btn>
                        </v-date-picker>
                    </v-menu>
                <v-rating :value="rating" color="green" />
                <v-text-field label="画像URL" v-model="imageUrl"/>
                <v-text-field label="食べログURL" v-model="tabelogUrl"/>
                <v-text-field label="MAPURL" v-model="mapUrl"/>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-spacer/>
                <v-btn color="green" dark @click="onClickAction"> OK </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
  export default {
    name: "ItemDialog",
    data() {
        return {
            /** ダイアログの表示状態 */
            show: false,
            /** 日付選択メニューの表示状態 */
            menu: false,
            actionType: "add",
            id: 0,
            date: "",
            name: "",
            rating: 0,
            imageUrl: "",
            tabelogUrl: "",
            mapUrl: "",

            /** 過去のデータ */
            orgData: {}
        }
    },
    computed: {
        ...mapGetters([
            "tags"
        ]),
        titleText() {
            return this.actionType === "add" ? "データ追加" : "データ編集"
        }
    },

    methods: {
        ...mapActions([
            "addMemoData",
            "updateMemoData"
        ]),
        open(actionType, item) {
            this.show = true
            this.actionType = actionType
            this.resetForm(item)
        },
        close() {
            this.show = false
        },
        /** 追加／更新がクリックされたとき */
        onClickAction () {
            const item = {
                date: this.date,
                name: this.name,
                tags: this.tags,
                rating: this.rating,
                imageUrl: null,
                tabelogUrl: null,
                mapUrl: null
            }

            if (this.actionType === "add") {
                item.id = Math.random().toString(36).slice(-8) // ランダムな8文字のIDを生成
                this.addMemoData( {item })
            } else {
                item.id = this.id
                this.updateMemoData({item})
            }
            this.show = false
        },

        resetForm( item = {}) {
            const today = new Date()
            const year = today.getFullYear()
            const month = ('0' + (today.getMonth() + 1)).slice(-2)
            const date = ('0' + today.getDate()).slice(-2)

            this.id = item.id || ""
            this.date = item.date || `${year}-${month}-${date}`
            this.name = item.name || ""
            this.rating = item.rating || 0
        }
    }
  }
</script>
