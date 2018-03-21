var resources = {
    'wood': 1500,
    'stone': 1500,
    'food': 1500
}

function getProduction(type) {
    let tiles = document.getElementsByClassName('tile')

    let productions = {
        'wood': 0,
        'stone': 0,
        'food': 0
    }

    Array.prototype.forEach.call(tiles, function(tile) {
        if (tile.innerHTML == "Farm") {
            productions['food'] += 100/60
        }

        if (tile.innerHTML == "Mill") {
            productions['wood'] += 100/60
        }

        if (tile.innerHTML == "Query") {
            productions['stone'] += 100/60
        }
    })

    return productions[type]
}

function setupTiles() {
    let city = document.getElementById("city")
    let menu = document.getElementsByClassName('menu')[0]

    for (var i = 1; i <= 10; i++) {
        let tile = document.createElement('div')
        tile.setAttribute('class', 'tile')
        tile.setAttribute('id', 'tile_' + i)
        tile.innerHTML = "Empty"
        tile.addEventListener('click', function() {
            buyTile = parseInt(this.id.split("_")[1])
            let clicked = document.getElementById(this.id)
            menu.style.display = "block"
        })
        city.appendChild(tile)
    }
}

function addResources() {
    Object.keys(resources).forEach(function(k) {
        resources[k] += getProduction(k)
    })
}

function updateResources() {
    let wood = document.getElementById("wood")
    let stone = document.getElementById("stone")
    let food = document.getElementById("food")

    wood.innerHTML = Math.floor(parseInt(resources['wood']))
    stone.innerHTML = Math.floor(parseInt(resources['stone']))
    food.innerHTML = Math.floor(parseInt(resources['food']))
    getProduction()
}

function prepareShop() {
    let buyButtons = document.getElementsByClassName('buyButton')

    Array.prototype.forEach.call(buyButtons, function(button) {
        button.addEventListener('click', function() {
            let destination = document.getElementById('tile_' + buyTile)
            if (destination.innerHTML != "Empty") {
                return console.log("Error, tile occupied")
            }
            destination.innerHTML = button.dataset.tiletype
            resources['food'] -= button.dataset.costfood
            resources['stone'] -= button.dataset.coststone
            resources['wood'] -= button.dataset.costwood
        })
    })
}

function start() {
    let wood = document.getElementById("wood")
    let stone = document.getElementById("stone")
    let food = document.getElementById("food")

    wood.addEventListener("mouseover", function() {
        console.log('Wood Production: ' + getProduction('wood'))
    })

    stone.addEventListener("mouseover", function() {
        console.log('Stone Production: ' + getProduction('stone'))
    })

    food.addEventListener("mouseover", function() {
        console.log('Food Production: ' + getProduction('food'))
    })


    setInterval(function() {
        updateResources()
        addResources()
    }, 600)

    setupTiles()
    prepareShop()
}

start()
