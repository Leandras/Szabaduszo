'use strict'

const Schema = use('Schema')

class CreateCitiesTableSchema extends Schema {

  up () {
    this.create('create_cities', (table) => {
      table.increments()

       table.string('name').notNullable()
      table.integer('numberOfJobs').defaultTo(0)
      
      table.timestamps()
    })
  }

  down () {
    this.drop('create_cities')
  }

}

module.exports = CreateCitiesTableSchema
