exports.up = (knex) => knex.schema.createTable('checkins', (table) => {
  table.increments('id');
  table.integer('user_id').notNullable().references('id').inTable('users');
  table.integer('bar_id').notNullable().references('id').inTable('bars');

  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.dropTable('checkins');
