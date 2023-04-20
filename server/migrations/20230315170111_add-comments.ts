import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTableIfNotExists('comments',table =>{
        table.increments('id').primary();
        table.string('text').notNullable();
        table.decimal('rating').notNullable();
        table.datetime('published_on').notNullable();
        table.integer('user_id').references('id').inTable('users').onDelete('CASCADE');
        table.integer('movie_id').references('id').inTable('movies').onDelete('CASCADE');
    })
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('comments');
}


