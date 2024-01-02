const $listContainer = $('#listContainer')
const $inputText = $("#inputArea")


// Creates the rows for the to do list
function createEntry(item) {
    // create elements and add attributes
    const $entryDiv = $('<div class="entry"><div class="entry-content"></div></div>')
    const $boxDiv = $('<div class="box"></div>')
    $boxDiv.attr("id", item.completed ? "box2" : "box1")
    $boxDiv.attr("data-list-id", item.listid)
    const $taskDiv = $("<p class='task'>").text(item.descr)
    const $trashBtn = $("<button class='delete-btn'>🗑️</button>")
    $trashBtn.attr("data-list-id", item.listid)

    // append in DOM TREE
    $entryDiv.find('.entry-content').append($boxDiv, $taskDiv)
    $entryDiv.append($trashBtn)
    return $entryDiv
}

//Helper function to toggle box color
function toggleBoxStatus($boxDiv){
    $boxDiv.attr("id", $boxDiv.attr("id") === "box1" ? "box2" : "box1")
}


// event delegated click handler for box div
$listContainer.on('click', '.box', function(event){
    const $clickedBox = $(this)
    const listId = $clickedBox.data('list-id')
    const newStatus = $clickedBox.attr("id") === "box1"
    toggleBoxStatus($clickedBox)
    updateDatabase(listId, newStatus)
})

// event delegated click handler for delete-btn
$listContainer.on('click', '.delete-btn', function(event) {
    const $clickedDeleteBtn = $(this)
    const listId = $clickedDeleteBtn.data('list-id')
    deleteEntry(listId)
})


// Fetch Block for GET Request
function updateList() {
    fetch('api/list')
        .then(res => {
            if (!res.ok){
                throw new Error('HTTP Error in upDate List')
            }
            return res.json()
        })
        .then(data => {
            $listContainer.empty();
            for (item of data){
                const $entryDiv = createEntry(item)
                $listContainer.append($entryDiv)
            }        
        })
        .catch((error) => {
            console.error("Error fetching data:", error)
        })
}





//Fetch block for PATCH request
function updateDatabase(listId, newStatus){
    fetch(`/api/list/${listId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: newStatus })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`)
        }
        return res.json()
    })
    .then(data => {
        console.log('Database updated successfully:', data)
    })
    .catch(error => {
        console.error("Error updating database:", error)
    })
}
document.addEventListener('DOMContentLoaded', function () {
    updateList()
});

// Fetch block for DELETE Request
function deleteEntry(listId){
    fetch(`/api/list/${listId}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`)
        }
        return res.json()
    })
    .then(data => {
        console.log('Entry Deleted', data)
        updateList()
    })
    .catch(error => console.error("Error Deleting entry: ", error))
}

// Click Event Handler for Add Task
$("#addButton").on('click', function(event){
    const input = $inputText.val().trim()
    console.log("text input:", typeof input, input)
    fetch('/api/list', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: input })
    })
    .then(res => res.json())
    .then(data => {
        console.log(data, data.message)
        updateList();
    })
    .catch(error => {
        console.error('Error adding to list: ', error)
    })
})

