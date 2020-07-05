exports.up = (knex) => knex.schema.createTable('orders', (table) => {
  table.increments('id');
  table.integer('id_checkin').notNullable().references('id').inTable('checkins');

  table.integer('id_product').notNullable().references('id').inTable('products');

  table.integer('quantity').notNullable();
});

exports.down = (knex) => knex.schema.dropTable('orders');
