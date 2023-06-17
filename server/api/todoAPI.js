const express = require('express');
const router = express.Router();

const queries = require('../db/queries');
const {validTodo, validId} = require('../lib/validations');

/**
 * @openapi
 *      components:
 *          schema:
 *              todo:
 *                  type: object
 *                  properties: 
 *                      title: 
 *                          type: string
 *                      desc:
 *                          type: string
 *                      priority:
 *                          type: integer
 */

/**
 * @openapi
 * /api/v1/todo:
 *   get:
 *     description: Get All Todos
 *     responses:
 *       200:
 *         description: Return the array of todos.
 */
router.get('/', async (req, res)=> {
    let rows = await queries.getAll();
    res.json(rows);
});


/**
 * @openapi
 * /api/v1/todo:
 *   post:
 *      description: Create a new Todo
 *      requestBody: 
 *              required: true
 *              description: this api is used to create a new todo
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schema/todo'
 *      responses:
 *          200:
 *              description: Return succes status.
 */
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

/**
 * @openapi
 * /api/v1/todo/{id}:
 *   get:
 *      description: Get All Todos
 *      parameters: 
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Numeric ID Required
 *              schema:
 *                  type: integer
 *      responses:
 *          200:
 *              description: Return the array of todos.
 */
/**
 * @openapi
 * /api/v1/todo/{id}:
 *   put:
 *      description: Get All Todos
 *      parameters: 
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Numeric ID Required
 *              schema:
 *                  type: integer
 *      requestBody: 
 *              required: true
 *              description: this api is used to create a new todo
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#components/schema/todo'
 *      responses:
 *          200:
 *              description: Return the array of todos.
 */
/**
 * @openapi
 * /api/v1/todo/{id}:
 *   delete:
 *      description: Get All Todos
 *      parameters: 
 *          -   in: path
 *              name: id
 *              required: true
 *              description: Numeric ID Required
 *              schema:
 *                  type: integer
 *      responses:
 *          200:
 *              description: Return the array of todos.
 */
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