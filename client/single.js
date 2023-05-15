$(()=> {
    const id = getIdFromQuery();
    
    getOne(id).then(todo=> {
        console.log(todo)
        $('#title').text(todo.title);
        $('#desc').text(todo.desc);
        $('#priority').text(todo.priority);
        $('#date').text(todo.date);
        $('#editButton').attr('href', `edit.html?id=${id}`);
    });

    $('#deleteButton').click(deleteTodo);

    function deleteTodo(){
        $.ajax({
            type: 'DELETE',
            dataType: 'json',
            url: `${API_URL}/${id}`
        }).then(res=> {
            console.log(res)
            window.location = '/'
        })
    }
})