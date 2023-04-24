import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTableIfNotExists('likes', table => {
      table.increments('id').primary();
      table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
      table.integer('movie_id').references('id').inTable('movies').onDelete('CASCADE');
      table.date('created_at').notNullable();
    });
  }
  
  
  export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('likes');
  }