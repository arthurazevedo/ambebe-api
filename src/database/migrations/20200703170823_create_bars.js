exports.up = (knex) => knex.schema.createTable('bars', (table) => {
  table.increments('id');
  table.string('email').unique();
  table.text('name');
  table.text('city');
  table.integer('checkins').defaultTo(0);

  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.dropTable('bars');
