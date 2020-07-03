exports.up = (knex) => knex.schema.createTable('users', (table) => {
  table.increments('id');
  table.text('name');
  table.text('username').unique();
  table.text('email').unique();
  table.integer('points').defaultTo(0);
  table.text('city');
  table.integer('age');

  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.dropTable('users');
