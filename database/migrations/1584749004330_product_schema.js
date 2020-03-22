'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments('id')
      table.string('name', 50).notNullable()
      table.text('description').notNullable()
      table.decimal('price', 10.2).notNullable()
      table.integer('subcategories_id').unsigned()
      table.foreign('subcategories_id')
            .references('id')
            .on('subcategories')
            .onDelete('cascade')
      table.string('path', 50)
      table.timestamps()
    })
  }


  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
