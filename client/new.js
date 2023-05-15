$(()=> {
    $('form').submit((event)=> {
        event.preventDefault();
        const todo = getTodosFromFrom();
        
        $.post(API_URL, todo).then(result=> {
            console.log(result)
            redirectById(result.id);
        }).catch(err=> {
            const $errorMessage = $('#errorMessage');
            $errorMessage.text(err.responseJSON.message);
            $errorMessage.css('display', '')
        })
    })
})