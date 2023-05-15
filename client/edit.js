$(()=> {
    const id = getIdFromQuery();

    getOne(id).then(todo=> {
        $('#title').val(todo.title);
        $('#desc').val(todo.desc);
        $(`option[value=${todo.priority}]`).attr('selected', 'selected')
    });

    $('form').submit((event)=> {
        event.preventDefault();

        const todo = getTodosFromFrom();
        $.ajax({
            type: 'PUT',
            dataType: 'json',
            url: `${API_URL}/${id}`,
            data: todo
        }).then(data=> {    
            redirectById(id)
        })
    })
})