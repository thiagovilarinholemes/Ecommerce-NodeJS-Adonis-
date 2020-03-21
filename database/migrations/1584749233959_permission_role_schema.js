'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissionRoleSchema extends Schema {
  up () {
    this.create('permission_roles', (table) => {
      table.increments('id');

            table.integer('role_id').unsigned();
            table.foreign('role_id')
                    .references('id')
                    .on('roles')
                    .onDelete('cascade');

            table.integer('permission_id').unsigned();
            table.foreign('permission_id')
                    .references('id')
                    .on('permissions')
                    .onDelete('cascade');
    })
  }

  down () {
    this.dropIfExists('permission_role');
    this.drop('permission_roles')
  }
}

module.exports = PermissionRoleSchema
