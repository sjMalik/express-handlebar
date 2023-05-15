const API_URL = 'http://localhost:3000/api/v1/todo';

function getTodosFromFrom() {
    const title = $('#title').val();
    const desc = $('#desc').val();
    const priority = $('#priority').val();

    return {
        title,
        desc,
        priority
    }
}

function redirectById(id) {
    window.location = `/single.html?id=${id}`
}

function getIdFromQuery() {
    // ?id=12
    const parsedParts = window.location.search.split('=');
    const id = parsedParts[1];
    return id;
}

function getOne(id){
    console.log('....', `${API_URL}/${id}`)
    return $.get(`${API_URL}/${id}`);
}