const populateList = () => {
    const nameList = document.getElementById('nameList')

    fetch('/prv10/fetchall')
        .then(res => res.json())
        .then(data => {
            // Clear the list first
            while (nameList.firstChild) nameList.firstChild.remove()

            // Repopulate the list
            for (const avenger of data.avengers) {
                const div = document.createElement('div');
                div.setAttribute('class', 'group')
                const p = document.createElement('p');
                const p2 = document.createElement('p');

                p2.appendChild(document.createTextNode(avenger.power))
                p.appendChild(document.createTextNode(avenger.name))
                div.appendChild(p)
                div.appendChild(p2)
                nameList.appendChild(div)
            }
        })
        .catch(err => {
            console.error(err)
        })


}


const submitName = () => {
    const newName = document.getElementById('newName').value // Grab the value of our new name
    const newPower = document.getElementById('newPower').value // Grab the value of our new name
  
        fetch('/prv10/insert', {
            method: 'POST', // Send a POST request
            
            headers: {
                // Set the Content-Type, since our server expects JSON
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                newName,
                newPower
            })
        })
        .then(res => {
            // Clear the input
            document.getElementById('newName').value = '';
            document.getElementById('newPower').value = '';

            // Repopulate the list with our new name added
            populateList()
        })
        .catch(err => {
            // Clear the input
            document.getElementById('newName').value = '';
            document.getElementById('newPower').value = '';
            console.error(err)
        })
    }

populateList()