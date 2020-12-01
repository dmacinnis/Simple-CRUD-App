const update = document.querySelector('#update-button')

update.addEventListener('click', __ => {
    //put request here
    fetch('/quotes',{
        method:'put',
        headers:{'content-type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader',
            quote: 'I find your lack of faith disturbing'
        })
    })
        .then(res => {
            if (res.ok) return res.json()
        })
        .then(response =>{
            console.log(response)
            window.location.reload(true)
        })
})

const deleteButton = document.querySelector('#delete-forever')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', __ => {
    fetch('/quotes', {
        method: 'delete',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            name: 'Darth Vader'
        })
    })
    .then( res => {
        if (res.ok) return res.json()
    })
    .then(response => {
        if (response === 'No quote to delete'){
            messageDiv.textContent = 'No Darth Vader quote to delete'
        } else {
            window.location.reload(true)
        }

    })
})



