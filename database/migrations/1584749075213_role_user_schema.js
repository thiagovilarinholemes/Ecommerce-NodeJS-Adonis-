'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RoleUserSchema extends Schema {
  up () {
    this.create('role_users', (table) => {
      table.increments('id');

            table.integer('user_id').unsigned();
            table.foreign('user_id')
                    .references('id')
                    .on('users')
                    .onDelete('cascade');

            table.integer('role_id').unsigned();
            table.foreign('role_id')
                    .references('id')
                    .on('roles')
                    .onDelete('cascade');
    })
  }

  down () {
    this.drop('role_user ');
    this.drop('role_users')
  }
}

module.exports = RoleUserSchema
