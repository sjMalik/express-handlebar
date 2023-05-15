const express = require('express');
const router = express.Router();

const queries = require('../db/queries');
const {validTodo, validId} = require('../lib/validations');

router.get('/', async (req, res)=> {
    let rows = await queries.getAll();
    res.json(rows);
});

router.post('/', async (req, res)=> {
    if(validTodo(req.body)){
        const todo = {
            title: req.body.title,
            desc: req.body.desc,
            priority: req.body.priority
        };

        const ids = await queries.create(todo).returning('id');
        res.json({id: ids[0].id})
    }else {
        res.status(500);
        res.json({
            message: 'Invalid Todo'
        })
    }
})

router.route('/:id')
.get(async (req, res)=> {
    const id = req.params.id;
    if(validId(id)){
        const todo = await queries.getOne(id);
        res.json(todo);
    }else{
        res.status(500);
        res.json({
            message: 'Invalid ID'
        })
    }
}).put(async (req, res)=> {
    const id = req.params.id;
    if(validId(id)){
        const todo = {
            title: req.body.title,
            desc: req.body.desc,
            priority: req.body.priority
        };
        await queries.update(todo, id);
        res.json({
            message: 'Success'
        })
    }else {
        res.status(500);
        res.json({
            message: 'Invalid ID'
        })
    }
}).delete(async (req, res)=> {
    const id = req.params.id;
    
    if(validId(id)){
        await queries.delete(id);
        res.json({
            message: 'Success'
        })
    }else {
        res.status(500);
        res.json({
            message: 'Invalid id'
        })
    }
});

module.exports = router;