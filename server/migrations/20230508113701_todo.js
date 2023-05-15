/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

/**
 * title - text
 * priority - integer
 * description - text
 * done - boolean
 * date - datetime
 */
exports.up = function(knex) {
  return knex.schema.createTable('todo', (table)=> {
    table.increments();
    table.text('title').notNullable();
    table.integer('priority').notNullable();
    table.text('desc');
    table.boolean('done').defaultTo(false).notNullable();
    table.datetime('date').defaultTo(knex.fn.now())
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTable('todo');
};
