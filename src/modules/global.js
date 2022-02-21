const state = {
    margintop : "", // to maintain the balance when 'search bar' is fixed
    citycode : "",
}
const getters = {
    marginTop : state => state.margintop,
    cityCode : state => state.citycode,
}

const actions = {}

const mutations = {
    addMarginTop(state,value) {
        state.margintop = value
    },
    addCityCode(state,value) {
        state.citycode = value
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}