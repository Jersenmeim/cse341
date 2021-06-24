const populateList = () => {
    const nameList = document.getElementById('nameList')

    fetch('/prv10/fetchall')
        .then(res => res.json())
        .then(data => {
            // Clear the list first
            while (nameList.firstChild) nameList.firstChild.remove()

            // Repopulate the list
            for (const avenger of data.avengers) {
                const p = document.createElement('p')
                p.appendChild(document.createTextNode(avenger.name))
                nameList.appendChild(p)
            }
        })
        .catch(err => {
            console.error(err)
        })


}


const submitName = () => {
    const newName = document.getElementById('newName').value // Grab the value of our new name
    
    fetch('/prv10/insert', {
            method: 'POST', // Send a POST request
            headers: {
                // Set the Content-Type, since our server expects JSON
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newName
            })
        })
        .then(res => {
            // Clear the input
            document.getElementById('newName').value = ''

            // Repopulate the list with our new name added
            populateList()
        })
        .catch(err => {
            // Clear the input
            document.getElementById('newName').value = ''
            console.error(err)
        })
        
}
populateList()