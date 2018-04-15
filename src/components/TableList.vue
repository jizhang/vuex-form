<template>
  <div class="page-table-list">
    <b-table :fields="fields" :items="tableList">
      <template slot="columns" slot-scope="data">
        {{data.item.columns.length}}
      </template>
      <template slot="operation" slot-scope="data">
        <b-button variant="primary" size="sm" :to="{ path: '/non-strict', query: { id: data.item.id } }">Edit</b-button>
        <b-button variant="danger" size="sm" @click="handleDeleteTable(data.item)">Delete</b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'TableList',
  computed: {
    ...mapState('table', [
      'tableList'
    ]),
  },

  data () {
    return {
      fields: [
        { key: 'id', label: 'ID' },
        { key: 'table_name', label: 'Table Name' },
        { key: 'category', label: 'Category' },
        { key: 'columns', label: 'Column Count' },
        { key: 'operation', label: 'Operation' },
      ]
    }
  },

  methods: {
    ...mapActions('table', [
      'deleteTable',
    ]),

    handleDeleteTable (table) {
      if (window.confirm('Are you sure?')) {
        this.deleteTable(table.id)
      }
    }
  }
}
</script>

<style scoped>
.page-table-list {
  padding: 30px;
}
</style>
