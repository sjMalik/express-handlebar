We'll be using:
* postgres for our database
* knex.js for our database migrations, seeds and queries.
* express.js for our routes and rendering
* handlebars.js for our server side view templates
* boostrap for our UI

## Full Stack Check List
1. Generate Express App
    - npm install express-generator -g          // If not installed
    - express --view=hbs .
2. Create database/table
    - npm i knex pg
    - knex init                                 // create knex config file
    - knexfile content
    ```
            module.exports = {
                development: {
                    client: 'postgresql',
                    connection: 'postgres://postgres:mysecretpassword@localhost/express_auth',
                    pool: {
                    min: 2,
                    max: 10
                    }
                },
                production: {
                    client: 'postgresql',
                    connection: process.env.DATABASE_URL + '?ssl=true',
                    pool: {
                    min: 2,
                    max: 10
                    }
                }
        };
    ```
    - knex migrate:make <migration file name>   // Create a migration file
    - knex migrate:latest;                      // Migrate the db
    - knex migrate:rollback                     // Drop the tables
3. Seed table with sample data
    - knex seed:make <seed file name>           // Create seed file
    - knex seed:run                             // seed the db
4. List all records with GET /todo
    - /todos
5. Add Bootstrap
    - Take styling from https://getbootstrap.com/docs/5.3/getting-started/introduction/
6. Show new form with /todo/new
    - https://getbootstrap.com/docs/5.3/forms/overview/
7. Create a record with POST /todo
    - Validate the request body or the form inputs
    - typeof todo.title == 'string' or typeof todo.priority != 'undefined'  // Checking type
    - todo.title.trim() != ''  // Checking its empty or not
    - !isNaN(body.priority) // Chcking number or not
8. Show one record with GET /todo/:id
9. Show an edit form with GET /todo/:id/edit
    - handlebar helper registration for select
    ```
    hbs.registerHelper('select', function(selected, options) {
        return options.fn(this).replace(
            new RegExp(' value=\"' + selected + '\"'),
            '$& selected="selected"');
    });
    ```
10. Update a record with PUT /todo/:id
    - According to the HTML standard, you can not. The only valid values for the method attribute are get and post, corresponding to the GET and POST HTTP methods. <form method="put"> is invalid HTML and will be treated like <form>, i.e. send a GET request.
    Show README.md for more details
11. Delete a record with DELETE /todo/:id
12. Redirect on create / update / delete 