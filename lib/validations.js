function validTodo(body){
    return typeof body.title === 'string' &&
            body.title.trim() !== '' &&
            body.priority != 'undefined' &&
            !isNaN(body.priority);
}

function validId(id){
    return !isNaN(id);
}

module.exports = {
    validTodo,
    validId
}