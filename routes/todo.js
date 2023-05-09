const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.route('/')
    .get(async (req, res)=> {
        const todos = await knex('todo').select();

        res.render('all', {todos: todos})
    })
    .post((req, res)=> {
        validateTodoRenderError(req, res, async (todo)=> {
            const ids = await knex('todo')
            .insert(todo).returning('id');
            console.log(ids)
            res.redirect(`/todos/${ids[0].id}`)
        });
    })

router.get('/new', async (req, res)=> {
    res.render('new');
});

router.route('/:id')
    .get((req, res)=> {
        const id = req.params.id;
        resposneAndRenderTodo(id, res, 'single')
    })
    .put((req, res)=> {
        validateTodoRenderError(req, res, async (todo)=> {
            await knex('todo')
            .update(todo).where('id', req.params.id);
            res.redirect(`/todos/${req.params.id}`)
        });
    })
    .delete(async (req, res)=> {
        if(validId(req.params.id)){
            await knex('todo')
                    .del()
                    .where('id', req.params.id);
            res.redirect('/todos')
        }else {
            res.status(200);
            res.render('error', {
                message: 'Invalid id'
            })
        }
    })

router.get('/:id/edit', (req, res)=> {
    const id = req.params.id;
    resposneAndRenderTodo(id, res, 'edit')
});


function validateTodoRenderError(req, res, callback){
    if(validTodo(req.body)){
        const todo = {
            title: req.body.title,
            desc: req.body.desc,
            priority: req.body.priority
        };
        callback(todo);
    }else {
        res.status(500);
        res.render('error', {
            message: 'Invalid Todo'
        })
    }
}

function validTodo(body){
    return typeof body.title === 'string' &&
            body.title.trim() !== '' &&
            body.priority != 'undefined' &&
            !isNaN(body.priority);
}

async function resposneAndRenderTodo(id, res, viewname) {
    if(!validId(id)){
        res.status(500);
        res.render('error', {
            message: 'Invalid ID'
        })
    }else{
        const todo = await knex('todo').select().where('id', id).first();
        console.log('todo', todo)
        res.render(viewname, todo);
    }
}

function validId(id){
    return !isNaN(id);
}

module.exports = router;