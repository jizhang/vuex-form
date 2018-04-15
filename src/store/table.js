import _ from 'lodash'

const types = {
  ADD_CATEGORY: 'addCategory',
  DELETE_TABLE: 'deleteTable',
  ADD_TABLE: 'addTable',
  UPDATE_TABLE: 'updateTable',
  UPDATE_TABLE_FORM: 'updateTableForm',
  RESET_TABLE: 'resetTable',
}

const getDefaultTable = () => {
  return {
    id: null,
    table_name: '',
    category: 0,
    columns: [],
  }
}

export default {
  namespaced: true,
  state: {
    tableList: [],
    table: getDefaultTable(),
    categoryOptions: [
      { value: 1, text: 'Sales' },
      { value: 2, text: 'Marketing' }
    ],
    dataTypeOptions: ['int', 'varchar', 'datetime']
  },

  mutations: {
    [types.ADD_CATEGORY] (state, payload) {
      let maxId = _(state.categoryOptions).map('value').max()
      state.categoryOptions.push({
        value: maxId + 1,
        text: payload
      })
    },

    [types.DELETE_TABLE] (state, payload) {
      let index = _.findIndex(state.tableList, ['id', payload])
      if (index !== -1) {
        state.tableList.splice(index, 1)
      }
    },

    [types.ADD_TABLE] (state, payload) {
      let maxId = _(state.tableList).map('id').max()
      payload.id = _.isUndefined(maxId) ? 1 : (maxId + 1)
      state.tableList = _(state.tableList)
        .concat(payload)
        .orderBy(['table_name'])
        .value()
    },

    [types.UPDATE_TABLE] (state, payload) {
      let table = _.find(state.tableList, ['id', payload.id])
      _.assign(table, payload)
    },

    [types.RESET_TABLE] (state, payload) {
      _.assign(state.table, getDefaultTable())
    },

    [types.UPDATE_TABLE_FORM] (state, payload) {
      _.assign(state.table, payload)
    },
  },

  actions: {
    addCategory ({ commit }, payload) {
      commit(types.ADD_CATEGORY, payload)
    },

    deleteTable ({ commit }, payload) {
      commit(types.DELETE_TABLE, payload)
    },

    saveTable ({ commit, state }, payload) {
      let table = _.cloneDeep(payload)
      if (table.id > 0) {
        let exists = _.some(state.tableList, ['id', payload.id])
        if (exists) {
          commit(types.UPDATE_TABLE, table)
        }
      } else {
        commit(types.ADD_TABLE, table)
      }
    },

    resetTable ({ commit }) {
      commit(types.RESET_TABLE)
    },

    getTable ({ commit, state }, payload) {
      let table = _.find(state.tableList, ['id', payload])
      if (!_.isUndefined(table)) {
        commit(types.UPDATE_TABLE_FORM, _.cloneDeep(table))
      }
    }
  }
}
