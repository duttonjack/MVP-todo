const $listContainer = $('#listContainer')
const $inputText = $("#inputArea")

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
                const $entryDiv = $('<div class="entry"><div class="entry-content"></div></div>')
                const $boxDiv = $('<div class="box"></div>')
                $boxDiv.attr("id", item.completed ? "box2" : "box1")
                $boxDiv.attr("data-list-id", item.listid)
                
                $boxDiv.on('click', function(event){
                    const listId = $(this).data("list-id");
                    const newStatus = $(this).attr("id") === "box1";
                    toggleBoxStatus($(this));
                    updateDatabase(listId, newStatus)
                })
                const $taskDiv = $("<p class='task'>").text(item.descr)
                const $trashBtn = $("<button class='delete-btn'>🗑️</button>")
                // Want to add an event listener for the $trashbuttons here
                $entryDiv.find('.entry-content').append($boxDiv, $taskDiv)
                $entryDiv.append($trashBtn)
                $listContainer.append($entryDiv)
            }        
        })
        .catch((error) => {
            console.error("Error fetching data:", error)
        })
}

function toggleBoxStatus($boxDiv){
    $boxDiv.attr("id", $boxDiv.attr("id") === "box1" ? "box2" : "box1")
}

function updateDatabase(listId, newStatus){
    console.log("listID: ", listId)
    fetch(`/api/list/${listId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: newStatus })
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

