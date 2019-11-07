exports.up = function(knex) {
  return knex.schema
    .createTable("species", tbl => {
      tbl.increments();
      tbl.string("name", 255).notNullable();
    })
    .createTable("animals", tbl => {
      tbl.increments();
      tbl.string("name", 255).notNullable();
      tbl
        .integer("species_id")
        .unsigned()
        .references("id")
        .inTable("species")
        // ! deleting the record from the primary key table
        // todo values: RESTRICT, NO ACTION, SET NULL
        .onDelete("RESTRICT")
        // ! changing the value of the primary key table
        // todo values:
        .onUpdate("CASCADE");
    })
    .createTable("zoos", tbl => {
      tbl.increments();
      tbl.string("name", 255).notNullable();
      tbl.string("address", 255);
    })
    .createTable("animal_zoos", tbl => {
      tbl.increments();
      tbl
        .integer("zoo_id")
        .unsigned()
        .references("id")
        .inTable("zoos")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl
        .integer("animal_id")
        .unsigned()
        .references("id")
        .inTable("zoos")
        .onDelete("RESTRICT")
        .onUpdate("CASCADE");
      tbl.date("from").notNullable();
      tbl.date("to");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("animal_zoos")
    .dropTableIfExists("zoos")
    .dropTableIfExists("animals")
    .dropTableIfExists("species");
};
