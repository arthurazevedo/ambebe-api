exports.up = (knex) => knex.schema.createTable('products', (table) => {
  table.increments('id');
  table.string('name').unique();
  table.integer('points').defaultTo(0);
  table.string('url_image');

  table.timestamp('created_at').defaultTo(knex.fn.now());
  table.timestamp('updated_at').defaultTo(knex.fn.now());
});

exports.down = (knex) => knex.schema.dropTable('products');
