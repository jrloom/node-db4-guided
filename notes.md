# Data Modeling

## Training Kit

### Data Normalization

- Each record has a primary key
- No fields are repeated
- All fields relate directly to the key data
- Each field entry contains a single data point
- There are no redundant entries

### Table Relationships

One-to-Many

- users to posts:
  - one user can have many posts
  - a single post only belongs to one user
- *Foreign Key* always goes in the Many

Many-to-Many

- bands to venues:
  - one band will play at many different venues
  - each venue will host many different bands
- Uses a third table to keep *Foreign Key* - splits it into 2 (or more) One-to-Many relationships

One-to-One

- citizens to SSNs:
  - each citizen has one SSN
  - each SSN belongs to one citizen
- See if this can be condensed into a single table - case-by-case

### Foreign Keys in Knex

knexfile.js

```js
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3'
    },
    useNullAsDefault: true,
    pool: {
      afterCreate: (conn, done) => {
        // runs after a connection is made to the sqlite engine
        conn.run('PRAGMA foreign_keys = ON', done) // turn on FK enforcement
      }
    }
  }
}
```

create_tables.js --> migration file

```js
exports.up = function(knex) {
  // 1 farm has many ranchers
  return knex.schema.createTable('farms', tbl => {
    tbl.increments()
    tbl.string('farm_name', 128).notNullable()
  })
  .createTable('ranchers', tbl => {
    tbl.increments()
    tbl.string('rancher_name', 128)
    // foreign key that points to farms table
    tbl.integer('farm_id')
      .unsigned() // integer must be positive
      .notNullable() // in most cases
      .references('id') // reference key
      .inTable('farms') // reference table
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('ranchers') // the shoe comes off first
    .dropTableIfExists('farms') // the sock comes off last
}
```

## Lecture

### Requirements

A client has hired you to build an API for managing _zoos_ and _animals_ in the _U.S._

For _zoos_:

- name
- address

For _animals_:

- name
- species
- list of all the zoos they have resided

### A good data model

- captures *all* the information the system needs
- captures *only* the information the system needs
- reflect reality (for the system's POV)
- is flexible, can evolve
- guarantees *data integrity* without sacrificing too much performance
- is driven by the way we access data

### Components of a Data Model

- entities: nouns (eg zoo, animals, etc.)
  - like a resource
  - usually map to tables
- properties: columns (fields)
- relationships: foreign keys

### Workflow

- identify entities (real and transactional)
- identify relationships
- identify properties

### Relationships

- one to one
- one to many: most common
- many to many: this is...smoke and mirrors

### Mantras

- every table *must have* a primary key
- work on *two or three* entities at a time
- *one to many* relationships are modeled using (or: require) a foreign key
  - the foreign key always goes on the many side
  - foreign key column must be the same type as the primary key it references
- *many to many* relationships are modeled using a third table
  - third table could include other columns
