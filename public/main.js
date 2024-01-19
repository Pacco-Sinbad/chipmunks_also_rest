

// document.querySelectorAll('.delete').forEach(button =>{ button.addEventListener('click', _ => {
//     const currentUser = document.body.dataset.currentUser;
//     const dateTime = button.dataset.dateTime;
//     console.log(document.body.dataset.currentUser);
//     console.log(button.dataset.dateTime);
//     fetch(`/api/remove_observation`, {
//         method: 'DELETE',
//         headers: {'Content-Type': 'application/json'},
//         body: JSON.stringify({
//             currentUser: currentUser,
//             dateTime: dateTime
//     })
//     .then(()=>{
//         window.location.reload(true)
//     })
// })
// })
// })

document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', _ => {
        const currentUser = document.body.dataset.currentUser;
        const dateTime = button.dataset.dateTime;
        console.log(document.body.dataset.currentUser);
        console.log(dateTime);
        fetch('/api/remove_observation', {
            method: 'Delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                currentUser: currentUser,
                dateTime: dateTime
            })
        })
        .then(res =>{
            window.location.reload()
        })
    })
}) 