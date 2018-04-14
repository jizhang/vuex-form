<template>
  <div class="page-non-script">
    <b-form>
      <b-form-group label="Table Name:">
       <b-row>
          <b-col cols="6">
            <b-form-input v-model="table.table_name" required />
          </b-col>
        </b-row>
      </b-form-group>
      <b-form-group label="Category:">
        <b-row>
          <b-col cols="6">
            <b-form-select v-model="table.category" :options="categoryOptions" />
          </b-col>
          <b-col cols="6">
            <b-button variant="light">
              <font-awesome-icon icon="plus" style="margin-right: 10px;" />Add Category
            </b-button>
          </b-col>
        </b-row>
      </b-form-group>
      <b-button type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
export default {
  name: 'NonStrict',
  data () {
    return {
      table: {
        table_name: '',
        category: 0
      },
      categoryOptions: [
        { value: 0, text: 'Choose' },
        { value: 1, text: 'Sales' },
        { value: 2, text: 'Marketing' }
      ]
    }
  }
}
</script>

<style scoped>
.page-non-script {
  padding: 15px;
}
</style>
