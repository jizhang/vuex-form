<template>
  <div class="page-non-script">
    <b-form @submit="handleSubmit">
      <b-row>
        <b-col cols="6">
          <b-form-group label="Table Name:">
            <b-form-input v-model="tableName" />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group label="Category:">
            <b-form-select v-model="tableCategory">
              <option :value="0">Choose</option>
              <option v-for="option in categoryOptions" :key="option.value"
                :value="option.value" v-text="option.text" />
            </b-form-select>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <table class="table table-sm" style="margin-top: 10px;">
            <tr>
              <th width="40%">Column Name</th>
              <th width="40%">Data Type</th>
              <th>Operation</th>
            </tr>
            <tr v-for="(column, index) in tableColumns" :key="index">
              <td>
                <b-form-input :value="column.column_name" @input="updateColumn({ index, column: { column_name: $event } })" size="sm" />
              </td>
              <td>
                <b-form-select :value="column.data_type" @input="updateColumn({ index, column: { data_type: $event } })" size="sm">
                  <option value="">Choose</option>
                  <option v-for="option in dataTypeOptions" :key="option"
                    :value="option" v-text="option" />
                </b-form-select>
              </td>
              <td>
                <b-button size="sm" variant="light" @click="deleteColumn(index)">
                  <font-awesome-icon icon="trash" style="margin-right:8px;" />Delete
                </b-button>
              </td>
            </tr>
          </table>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-button variant="light" @click="addColumn" style="margin-bottom: 20px;">
            <font-awesome-icon icon="plus" style="margin-right: 12px;" />Add Column
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'
import { createHelpers } from 'vuex-map-fields'

const { mapFields } = createHelpers({
  getterType: 'table/getField',
  mutationType: 'table/updateField',
})

export default {
  name: 'MapFields',
  mounted () {
    let id = _.get(this.$route.query, 'id')
    if (id > 0) {
      this.getTable(id)
    }
  },

  beforeDestroy () {
    this.resetTable()
  },

  computed: {
    ...mapState('table', [
      'categoryOptions',
      'dataTypeOptions',
    ]),

    ...mapFields({
      tableName: 'table.table_name',
      tableCategory: 'table.category',
    }),

    tableColumns: {
      get () {
        return this.$store.state.table.table.columns
      }
    }
  },

  methods: {
    ...mapActions('table', [
      'saveTable',
      'resetTable',
      'getTable',
      'updateTableForm',
      'addColumn',
      'deleteColumn',
      'updateColumn',
    ]),

    handleSubmit (event) {
      event.preventDefault()
      this.saveTable(this.$store.state.table.table)
      this.$router.push('/table-list')
    },
  }
}
</script>

<style scoped>
.page-non-script {
  padding: 30px;
}
</style>
