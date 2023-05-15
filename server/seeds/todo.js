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
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('todo').del();
  await knex('todo').insert([
    {
      title: 'Build a CRUD app',
      priority: 1
    },
    {
      title: 'Render a view',
      priority: 2
    }
  ]);
};
