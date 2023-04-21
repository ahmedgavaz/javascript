import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    await knex.schema.table('users', table => {
        table.index('id');
    });
   // await knex.schema.table('likes', table => {
    //    table.index('user_id');
    //    table.index('movie_id');
    //});
    await knex.schema.table('movies', table => {
        table.index('release_date');
    });
    await knex.schema.table('comments', table => {
        table.index('user_id');
        table.index('movie_id');
        table.index('published_on');
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.table('comments', table => {
        table.dropIndex('published_on');
        table.dropIndex('movie_id');
        table.dropIndex('user_id');
        });
        
        await knex.schema.table('movies', table => {
        table.dropIndex('release_date');
        });
        
        /*await knex.schema.table('likes', table => {
        table.dropIndex('movie_id');
        table.dropIndex('user_id');
        });*/
        
        await knex.schema.table('users', table => {
        table.dropIndex('id');
        });
}