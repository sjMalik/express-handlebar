const express = require('express');
const router = express.Router();
const {validTodo, validId} = require('../lib/validations');
const setStatusRenderError = require('../lib/setStatusRenderError');
const queries = require('../db/queries');

router.route('/')
    .get(async (req, res)=> {
        try{
            const todos = await queries.getAll();
            res.render('all', {todos: todos})
        }catch(e){
            setStatusRenderError(res, 500, 'Get todos failed')
        }
    })
    .post((req, res)=> {
        validateTodoRenderError(req, res, async (todo)=> {
            try{
                const ids = await queries.create(req.body).returning('id');
                res.redirect(`/todos/${ids[0].id}`)
            }catch(e){
                setStatusRenderError(res, 500, 'Create todo failed')
            }
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
        console.log(1);
        validateTodoRenderError(req, res, async (todo)=> {
            try{
                console.log(2)
                await queries.update(todo, req.params.id);
                res.redirect(`/todos/${req.params.id}`)
            }catch(e){
                setStatusRenderError(res, 500, 'update todo failed')
            }
        });
    })
    .delete(async (req, res)=> {
        if(validId(req.params.id)){
            try{
                await queries.delete(req.params.id);
                res.redirect('/todos')
            }catch(e){
                setStatusRenderError(res, 500, 'delete todo failed')
            }
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
        setStatusRenderError(res, 500, 'Invalid Todo')
    }
}

async function resposneAndRenderTodo(id, res, viewname) {
    if(!validId(id)){
        setStatusRenderError(res, 500, 'Invalid ID')
    }else{
        const todo = await queries.getOne(id);
        res.render(viewname, todo);
    }
}


module.exports = router;