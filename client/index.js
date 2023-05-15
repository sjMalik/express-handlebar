$(()=> {
    $.get(API_URL).then(todos=> {
        let $todos = $('.todos');
        todos.forEach(todo=> {
            $todos.append(`<a href="/single.html?id=${todo.id}" class="list-group-item">${todo.title}</a>`)
        })
    }).catch(err=> console.log(err))
})