'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SubcategorySchema extends Schema {
  up () {
    this.create('subcategories', (table) => {
      table.increments()
      table.string('name', 50).notNullable()
      table.text('description').notNullable()
      table.integer('categories_id').unsigned()
      table.foreign('categories_id')
            .references('id')
            .on('categories')
            .onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('subcategories')
  }
}

module.exports = SubcategorySchema
