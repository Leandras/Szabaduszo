'use strict'

const Schema = use('Schema')

class JobsTableSchema extends Schema {

  up () {
    this.create('jobs', (table) => {
      table.increments()

      table.string('name').notNullable()
      table.text('description').notNullable()
      table.integer('payment').notNullable()
       table.boolean('taken')

      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('city_id').unsigned().references('id').inTable('cities')
      table.integer('category_id').unsigned().references('id').inTable('categories')

      table.timestamps()
    })
  }

  down () {
    this.drop('jobs')
  }

}

module.exports = JobsTableSchema
