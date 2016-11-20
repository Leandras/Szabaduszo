'use strict'

const Schema = use('Schema')

class CategoriesTableSchema extends Schema {

  up () {
    this.create('categories', (table) => {
      table.increments()

      table.string('name').notNullable()
      table.integer('numberOfJobs').defaultsTo(0)
     

      table.timestamps()
    })
  }

  down () {
    this.drop('categories')
  }

}

module.exports = CategoriesTableSchema
