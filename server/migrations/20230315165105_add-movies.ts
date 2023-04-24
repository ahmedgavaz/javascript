import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTableIfNotExists("movies", (table) => {
      table.increments("id").primary();
      table.string("title").notNullable();
      table.date("release_date").notNullable();
      table.string("description").notNullable();
      table.integer("budget").notNullable();
      table.string("stars").notNullable();
      table.string("director").notNullable();
      table.string("language").notNullable();
      table.string("country_of_origin").notNullable();
      table.integer("creator_id").references("id").inTable("users").onDelete("CASCADE");
    });
  }
  
  export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists("movies");
  }