'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PermissionSchema extends Schema {
  up () {
    this.create('permissions', (table) => {
      table.increments('id');
      table.string('name', 50); // Nome da permissão
      table.string('label', 100); // Descrição da permissão
      table.timestamps();
    })
  }

  down () {

    this.drop('permissions')
  }
}

module.exports = PermissionSchema
