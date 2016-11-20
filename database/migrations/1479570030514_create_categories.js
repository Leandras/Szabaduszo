'use strict'

const Schema = use('Schema')

class CreateCategoriesTableSchema extends Schema {

  up () {
    this.create('create_categories', (table) => {
      table.increments()

      table.string('name').notNullable()
      table.integer('numberOfJobs').defaultTo(0)
      

      table.timestamps()
    })
  }

  down () {
    this.drop('create_categories')
  }

}

module.exports = CreateCategoriesTableSchema
