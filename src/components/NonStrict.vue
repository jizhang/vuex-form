<template>
  <div class="page-non-script">
    <b-form>
      <b-row>
        <b-col cols="6">
          <b-form-group label="Table Name:">
            <b-form-input v-model="table.table_name" required />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="6">
          <b-form-group label="Category:">
            <b-form-select v-model="table.category">
              <option :value="0">Choose</option>
              <option v-for="option in categoryOptions" :key="option.value"
                :value="option.value" v-text="option.text" />
            </b-form-select>
          </b-form-group>
        </b-col>
        <b-col cols="6">
          <b-button variant="light" @click="handleAddCategory" style="margin-top: 31px;">
            <font-awesome-icon icon="plus" style="margin-right: 10px;" />Add Category
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12">
          <b-button type="submit" variant="primary">Submit</b-button>
        </b-col>
      </b-row>
    </b-form>

    <b-modal v-model="addCategoryDialog" title="Add Category" @ok="handleSaveCategory"
      no-close-on-esc no-close-on-backdrop>
      <b-form>
        <b-form-group label="Category Name:">
          <b-form-input v-model="categoryName" :state="categoryNameState" />
          <b-form-invalid-feedback v-text="categoryNameError" />
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'NonStrict',
  data () {
    return {
      addCategoryDialog: false,
      categoryName: '',
      categoryNameState: null,
      categoryNameError: ''
    }
  },

  computed: {
    ...mapState('table', [
      'table',
      'categoryOptions'
    ])
  },

  methods: {
    ...mapActions('table', [
      'addCategory'
    ]),

    handleAddCategory () {
      this.categoryName = ''
      this.categoryNameState = null
      this.addCategoryDialog = true
    },

    handleSaveCategory (event) {
      if (!this.categoryName) {
        this.categoryNameState = false
        this.categoryNameError = 'category name cannot be empty'
      } else if (_.some(this.categoryOptions, ['text', this.categoryName])) {
        this.categoryNameState = false
        this.categoryNameError = 'category name already exists'
      } else {
        this.categoryNameState = true
      }

      if (!this.categoryNameState) {
        event.preventDefault()
      } else {
        this.addCategory(this.categoryName)
      }
    }
  }
}
</script>

<style scoped>
.page-non-script {
  padding: 15px;
}
</style>
