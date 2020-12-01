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
})