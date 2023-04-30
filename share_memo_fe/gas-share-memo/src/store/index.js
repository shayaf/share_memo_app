import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  settings: {
    appName: "share-memo",
    apiUrl: "",
    authToken: "",
    strTags: "梅田, 北浜, 京都",
  },

  memoData: [
    {
      id: 'a34109ed',
      date: "2023-04-01", 
      name: "cafe1",
      tags: "北浜",
      rating: 5,
      imageUrl: "http://drive.google.com/uc?export=view&id=1vVFiX7gOH5GsDD6Bng56Um0x3BEBNZkS",
      tabelogUrl: "https://tabelog.com/osaka/A2701/A270102/27000121/",
      mapUrl: "https://goo.gl/maps/HWEa9nkKFrfUYj1A9",
    },

    {
      id: '7c8fa764',
      date: "2023-04-10", 
      name: "cafe2",
      tags: "北浜,梅田",//複数タグがくることはカフェではないかも
      rating: 5,
      imageUrl: "http://drive.google.com/uc?export=view&id=1vVFiX7gOH5GsDD6Bng56Um0x3BEBNZkS",
      tabelogUrl: "https://tabelog.com/osaka/A2701/A270102/27000121/",
      mapUrl: "https://goo.gl/maps/HWEa9nkKFrfUYj1A9",
    },
  ]
}

const mutations = {
  saveSettings (state, { settings }) {
    state.settings = { ...settings }
    document.title = state.settings.appName

    localStorage.setItem("settings", JSON.stringify(settings))
  },

  loadSettings(state) {
    const settings = JSON.parse(localStorage.getItem("settings"))
    if (settings) {
      state.settings = Object.assign(state.settings, settings)
    }
    document.title = state.settings.appName
  },

  // {"id": {id: "1", title: "", ...},..{}} でよさそう。
  setMemoData(state, { list }) {
    console.log("aaa")
    state.memoData = list
  },

  addMemoData(state, { item }) {
    const list = state.memoData
    if (list) {
      list.push(item)
    }
  },

  updateMemoData(state, {item}) {
    const list = state.memoData
    if(list) {
      const index = Object.values(list).findIndex(v => v.id === item.id)
      list.splice(index, 1, item)
    }
  },

  deleteMemoData(state, {id}) {
    const list = state.memoData
    if (list) {
      const index = list.findIndex(v => v.id === id)
      list.splice(index, 1)
    }
  }
}

const actions = {
  saveSettings({commit}, {settings}) {
    commit("saveSettings", {settings})
  },

  loadSettings({commit}) {
    commit("loadSettings")
  },

  fetchMemoData({commit}) {
    const list = [
      {
        id: 'a34109ed',
        date: "2023-04-01", 
        name: "cafe1",
        tags: "北浜",
        rating: 5,
        imageUrl: "http://drive.google.com/uc?export=view&id=1vVFiX7gOH5GsDD6Bng56Um0x3BEBNZkS",
        tabelogUrl: "https://tabelog.com/osaka/A2701/A270102/27000121/",
        mapUrl: "https://goo.gl/maps/HWEa9nkKFrfUYj1A9",
      },

      {
        id: '7c8fa764',
        date: "2023-04-10", 
        name: "cafe2",
        tags: "北浜,梅田",//複数タグがくることはカフェではないかも
        rating: 5,
        imageUrl: "http://drive.google.com/uc?export=view&id=1vVFiX7gOH5GsDD6Bng56Um0x3BEBNZkS",
        tabelogUrl: "https://tabelog.com/osaka/A2701/A270102/27000121/",
        mapUrl: "https://goo.gl/maps/HWEa9nkKFrfUYj1A9",
      },
    ]

    commit("setMemoData", { list })
  },

  addMemoData({commit}, {item}) {
    commit("addMemoData", {item})
  },

  updateMemoData({commit}, {item}) {
    commit("updateMemoData", {item})
  },

  deleteMemoData({commit}, {id}) {
    commit("deleteMemoData", {id})
  },
}

const createItems = v => v.split(",").map(v => v.trim()).filter(v => v.length !== 0)

const getters = {
  tags(state) {
    return createItems(state.settings.strTags)
  },

  
  memoById(state) {
    return id => state.memoData.find(memo => memo.id === id)
  },
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
