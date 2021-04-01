let battleButton = document.querySelector("#battleButton")
let allFightersButton = document.querySelector("#allFightersButton")
let leaderBoardButton = document.querySelector("#leaderboardButton")
let addFighterButton = document.querySelector("#addFighterButton")

let battleContainer = document.querySelector("#battleContainer")
let allFighterContainer = document.querySelector("#allFighterContainer")
let leaderboardContainer = document.querySelector("#leaderboardContainer")
let formContainer = document.querySelector("#formContainer")

let fighterOneDiv = document.createElement('div')
fighterOneDiv.className = "fighterCardDiv"
let fighterOneName = document.createElement('p')
fighterOneName.className = "fighterCardName"
let fighterOneAvatar = document.createElement('img')
fighterOneAvatar.className = "fighterCardAvatar"
let fighterOneStats = document.createElement('p')
let fighterOneWins = document.createElement('button')

let fighterTwoDiv = document.createElement('div')
fighterTwoDiv.className = "fighterCardDiv"
let fighterTwoName = document.createElement('p')
fighterTwoName.className = "fighterCardName"
let fighterTwoAvatar = document.createElement('img')
fighterTwoAvatar.className = "fighterCardAvatar"
let fighterTwoStats = document.createElement('p')
let fighterTwoWins = document.createElement('button')

let displayFighter1 = {}
let displayFighter2 = {}
let newFighter = {}

battleButton.addEventListener('click', function(){
    leaderboardContainer.innerHTML = ""
    formContainer.innerHTML = ""
    battleContainer.innerHTML = ""
    allFighterContainer.innerHTML = ""
    fetch("http://localhost:3000/fighters")
        .then(res => res.json())
        .then(function(fightersArr){
            const randomFighter = fightersArr[Math.floor(
                Math.random() * fightersArr.length
            )]
            turnFighter1ToCard(randomFighter)
            })
})

battleButton.addEventListener('click', function(){
    fetch("http://localhost:3000/fighters")
        .then(res => res.json())
        .then(function(fightersArr){
            const randomFighter = fightersArr[Math.floor(
                Math.random() * fightersArr.length
            )]
            turnFighter2ToCard(randomFighter)
            })
})


function turnFighter1ToCard(fighter){
    displayFighter1 = fighter
    displayFighter1.id = fighter.id
    fighterOneName.innerText = fighter.name
    fighterOneAvatar.src = fighter.image  
    fighterOneWins.innerText = `${fighter.name} wins!`
    fighterOneDiv.append(fighterOneName, fighterOneAvatar, fighterOneWins)
    battleContainer.append(fighterOneDiv)
    
    fighterOneWins.addEventListener('click', function(){
        let fighterId = displayFighter1.id
        fetch(`http://localhost:3000/fighters/${fighterId}`,{
            method: "PATCH",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
            wins: displayFighter1.wins + 1,
            }),
        })
            .then((res) => res.json())
            .then(function (fighterNewWins) {
                displayFighter1 = fighterNewWins;
            })
        fetch("http://localhost:3000/fighters")
            .then(res => res.json())
            .then(function(fightersArr){
                const randomFighter = fightersArr[Math.floor(
                    Math.random() * fightersArr.length
                )]
            turnFighterObjToDiv(randomFighter)
            })
            function turnFighterObjToDiv(fighter){
                displayFighter2 = fighter
                displayFighter2.id = fighter.id
                fighterTwoName.innerText = fighter.name
                fighterTwoAvatar.src = fighter.image
                fighterTwoWins.innerText = `${fighter.name} wins!`
            }
    })
}

function turnFighter2ToCard(fighter){
    displayFighter2 = fighter
    displayFighter2.id = fighter.id
    fighterTwoName.innerText = fighter.name
    fighterTwoAvatar.src = fighter.image   
    fighterTwoWins.innerText = `${fighter.name} wins!`
    fighterTwoDiv.append(fighterTwoName, fighterTwoAvatar, fighterTwoWins)
    battleContainer.append(fighterTwoDiv)
    
    fighterTwoWins.addEventListener('click', function(){
        let fighterId = displayFighter2.id
        fetch(`http://localhost:3000/fighters/${fighterId}`,{
            method: "PATCH",
            headers: { 
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({
                wins: displayFighter2.wins + 1,
            }),
        })
            .then((res) => res.json())
            .then(function (fighterNewWins) {
                displayFighter2 = fighterNewWins;
            })
        fetch("http://localhost:3000/fighters")
            .then(res => res.json())
            .then(function(fightersArr){
                const randomFighter = fightersArr[Math.floor(
                    Math.random() * fightersArr.length
                )]
            turnFighterObjToDiv(randomFighter)
            })
            function turnFighterObjToDiv(fighter){
                displayFighter1 = fighter
                displayFighter1.id = fighter.id
                fighterOneName.innerText = fighter.name
                fighterOneAvatar.src = fighter.image
                fighterOneWins.innerText = `${fighter.name} wins!`
            }
    })
}

allFightersButton.addEventListener('click', function(){
    leaderboardContainer.innerHTML = ""
    formContainer.innerHTML = ""
    battleContainer.innerHTML = ""
    allFighterContainer.innerHTML = ""

    fetch("http://localhost:3000/fighters")
        .then(res => res.json())
        .then(function(fighters){
            fighters.forEach(function(fighter){
                let fighterCard = document.createElement("div")
                    fighterCard.id = fighter.name
                    fighterCard.class = "fighterCard"
                let fighterName = document.createElement("p")
                    fighterName.innerText = fighter.name    
                let fighterAvatar = document.createElement("img")
                    fighterAvatar.src = fighter.image
                    fighterAvatar.alt = fighter.name
                let fighterStrength = document.createElement("p")
                    fighterStrength.innerText = `Strength: ${fighter.stats.strength}`
                    fighterStrength.class = "stats"
                let fighterDefense = document.createElement("p")
                    fighterDefense.innerText = `Defense: ${fighter.stats.defense}`
                    fighterDefense.class = "stats"
                let fighterSpeed = document.createElement("p")
                    fighterSpeed.innerText = `Speed: ${fighter.stats.speed}`
                    fighterSpeed.class = "stats"
                let fighterIntelligence = document.createElement("p")
                    fighterIntelligence.innerText = `Intelligence: ${fighter.stats.intelligence}` 
                    fighterIntelligence.class = "stats"
                fighterCard.append(fighterName, fighterAvatar, fighterStrength, fighterDefense, fighterSpeed, fighterIntelligence)   
                allFighterContainer.append(fighterCard)
            })
        })
})
    
leaderBoardButton.addEventListener('click', function() {
    leaderboardContainer.innerHTML = ""
    formContainer.innerHTML = ""
    battleContainer.innerHTML = ""
    allFighterContainer.innerHTML = ""
    fetch('http://localhost:3000/fighters')
         .then(res => res.json())
         .then(function(fightersArr){
             let copyofFightersArr = [...fightersArr] 
             copyofFightersArr.sort(function(a, b){
                    return b.wins - a.wins
             })
                copyofFightersArr.forEach(fighter => {
                        displayFighter = fighter
                    let fighterCard = document.createElement("div")
                        fighterCard.id = fighter.name
                        fighterCard.class = "fighterCard"
                    let fighterName = document.createElement("p")
                        fighterName.innerText = fighter.name    
                    let fighterAvatar = document.createElement("img")
                        fighterAvatar.src = fighter.image
                        fighterAvatar.alt = fighter.name
                    let fighterWins = document.createElement("p")
                        fighterWins.innerText = `${fighter.name} has ${fighter.wins} wins!`
                    let fighterStrength = document.createElement("p")
                        fighterStrength.innerText = `Strength: ${fighter.stats.strength}`
                        fighterStrength.class = "stats"
                    let fighterDefense = document.createElement("p")
                        fighterDefense.innerText = `Defense: ${fighter.stats.defense}`
                        fighterDefense.class = "stats"
                    let fighterSpeed = document.createElement("p")
                        fighterSpeed.innerText = `Speed: ${fighter.stats.speed}`
                        fighterSpeed.class = "stats"
                    let fighterIntelligence = document.createElement("p")
                        fighterIntelligence.innerText = `Intelligence: ${fighter.stats.intelligence}` 
                        fighterIntelligence.class = "stats"
                    fighterCard.append(fighterName, fighterAvatar, fighterWins, fighterStrength, fighterDefense, fighterSpeed, fighterIntelligence)  
                    leaderboardContainer.append(fighterCard)
                })
         })
})

addFighterButton.addEventListener("click", function(e){
    leaderboardContainer.innerHTML = ""
    formContainer.innerHTML = ""
    battleContainer.innerHTML = ""
    allFighterContainer.innerHTML = ""
    let newFighterForm = document.createElement("form")
    let userFighterName = document.createElement("input")
        userFighterName.placeholder = "Fighter name"
        userFighterName.id = "userFighterNameId"
    let userFighterAvatar = document.createElement("input")
        userFighterAvatar.placeholder = "Your img URL here"
        userFighterAvatar.id = "userFighterAvatarId"
        userFighterAvatar.type = "url"
    let submitButton = document.createElement("button")
        submitButton.innerText = "Submit"
    newFighterForm.append(userFighterName, userFighterAvatar, submitButton)
    formContainer.append(newFighterForm)
    if (userFighterAvatar.type !== "url"){
        alert()
    }
    
    formContainer.addEventListener("submit", function(e){
        e.preventDefault()
        let userFighterInput = e.target.userFighterNameId.value
        let userFighterImg = e.target.userFighterAvatarId.value
        fetch(`http://localhost:3000/fighters`,{
            method: 'POST',
            headers: {
                "Content-Type" : "application/json",
                Accept: "application/json"     
            },
            body: JSON.stringify({
                name: userFighterInput,
                image: userFighterImg,
                wins: 0
            })
        })
            .then(res => res.json())
            .then(function(userNewFighter){
                newFighter = userNewFighter
            })

    })
})