const $listContainer = $('#listContainer')
const $inputText = $("#inputArea")

function updateList() {
    fetch('/list')
        .then(res => {
            if (!res.ok){
                throw new Error('HTTP Error in upDate List')
            }
            return res.json()
        })
        .then(data => {
            $listContainer.empty();
            for (item of data){
                const $entryDiv = $('<div class="entry"><div>')
                const $boxDiv = $('<div class="box"></div>')
                $boxDiv.on('click', function(event){
                    if ($boxDiv.attr("id") === "box1"){
                        $boxDiv.attr("id", "box2")
                    } else {
                        $boxDiv.attr("id", "box1")
                    }
                })
                const $taskDiv = $("<p class='task'>").text(item.descr)
                $entryDiv.append($boxDiv, $taskDiv)
                $listContainer.append($entryDiv)
                }        
        })
        .catch((error) => {
            console.error("Error fetching data:", error)
        })
}

document.addEventListener('DOMContentLoaded', function () {
    // Code that runs after the DOM is fully loaded
    updateList()
});

// Event Listeners
$("#addButton").on('click', function(event){
    // fetch request to server
    const input = $inputText.val().trim()
    console.log("text input:", typeof input, input)
    fetch('/list', {
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
    // update page so new item displays
})

// Fetch Blocks
