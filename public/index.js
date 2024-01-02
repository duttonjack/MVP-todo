const $listContainer = $('#listContainer')

fetch("/list")
  .then((res) => res.json())
  .then((data) => {
    for (item of data){
    const $entryDiv = $('<div class="entry"><div>')
    const $boxDiv = $('<div class="box"></div>')
    const $taskDiv = $("<p class='task'>").text(item.descr)
    
    $entryDiv.append($boxDiv)
    $entryDiv.append($taskDiv)
    $listContainer.append($entryDiv)
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error)
  })