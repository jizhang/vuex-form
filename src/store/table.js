import _ from 'lodash'

const types = {
  ADD_CATEGORY: 'addCategory'
}

export default {
  namespaced: true,
  state: {
    table: {
      table_name: '',
      category: 0
    },
    categoryOptions: [
      { value: 1, text: 'Sales' },
      { value: 2, text: 'Marketing' }
    ]
  },

  mutations: {
    [types.ADD_CATEGORY] (state, payload) {
      let maxId = _(state.categoryOptions).map('value').max()
      state.categoryOptions.push({
        value: maxId + 1,
        text: payload
      })
    }
  },

  actions: {
    addCategory ({ commit }, payload) {
      commit(types.ADD_CATEGORY, payload)
    }
  }
}
