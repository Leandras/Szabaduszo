'use strict'

const Schema = use('Schema')

class CreateJobsTableSchema extends Schema {

  up () {
    this.create('create_jobs', (table) => {
      table.increments()

      table.string('name').notNullable()
      table.text('description').notNullable()
      table.integer('payment').notNullable()
      table.boolean('taken').defaultTo(false).notNullable()
      
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('city_id').unsigned().references('id').inTable('cities')
      table.integer('category_id').unsigned().references('id').inTable('categories')

      table.timestamps()
    })
  }

  down () {
    this.drop('create_jobs')
  }

}

module.exports = CreateJobsTableSchema
