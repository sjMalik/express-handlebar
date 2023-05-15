const knex = require('./knex');

module.exports = {
    getAll: ()=> {
        return knex('todo').select();
    },
    create: (todo)=> {
        return knex('todo').insert(todo);
    },
    getOne: (id)=> {
        return knex('todo').select().where('id', id).first();
    },
    update: (todo, id)=> {
        return knex('todo').update(todo).where('id', id);
    },
    delete: (id)=> {
        return knex('todo').del().where('id', id);
    }
}