const $listContainer = $('#listContainer')

fetch("/list")
  .then((res) => res.json())
  .then((data) => {
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