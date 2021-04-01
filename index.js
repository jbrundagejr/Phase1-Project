let battleButton = document.querySelector("#battleButton")
let allFightersButton = document.querySelector("#allFightersButton")
let leaderBoardButton = document.querySelector("#leaderboardButton")
let addFighterButton = document.querySelector("#addFighterButton")

let battleContainer = document.querySelector("#battleContainer")
let allFighterContainer = document.querySelector("#allFighterContainer")
let leaderboardContainer = document.querySelector("#leaderboardContainer")
let formContainer = document.querySelector("#formContainer")

let fighterOneName = document.querySelector('#fighterOneName')
let fighterOneAvatar = document.querySelector("#fighterOneAvatar")
let fighterOneStats = document.querySelector("#fighterOneStats")
let fighterOneWins = document.querySelector("#fighterOneWins")

let fighterTwoName = document.querySelector('#fighterTwoName')
let fighterTwoAvatar = document.querySelector("#fighterTwoAvatar")
let fighterTwoStats = document.querySelector("#fighterTwoStats")
let fighterTwoWins = document.querySelector("#fighterTwoWins")

let displayFighter1 = {}
let displayFighter2 = {}
let newFighter = {}


battleButton.addEventListener('click', function(){
    allFighterContainer.innerHTML = ""
    leaderboardContainer.innerHTML = ""
    formContainer.innerHTML = ""
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
        fighterOneStats.innerText = (Object.entries(fighter.stats))
        fighterOneWins.innerText = `${fighter.name} wins!`
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
                    fighterTwoStats.innerText = (Object.entries(fighter.stats))
                    fighterTwoWins.innerText = `${fighter.name} wins!`
                }
        })
    }
})

battleButton.addEventListener('click', function(){
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
        fighterTwoStats.innerText = (Object.entries(fighter.stats))
        fighterTwoWins.innerText = `${fighter.name} wins!`
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
                    fighterOneStats.innerText = (Object.entries(fighter.stats))
                    fighterOneWins.innerText = `${fighter.name} wins!`
                }
        })
    }
})

allFightersButton.addEventListener('click', function(){
    battleContainer.innerHTML = ""
    leaderboardContainer.innerHTML = ""
    formContainer.innerHTML = ""
    fetch("http://localhost:3000/fighters")
        .then(res => res.json())
        .then(function(fighters){
            fighters.forEach(function(fighter){
                displayFighter = fighter
                let fighterDiv = document.createElement("div")
                fighterDiv.id = fighter.name
                fighterDiv.class = "fighterCard"
                let fighterName = document.createElement("p")
                fighterName.innerText = fighter.name    
                let fighterAvatar = document.createElement("img")
                fighterAvatar.src = fighter.image
                fighterAvatar.alt = fighter.name
                newFighter = fighter
                let fighterStats = document.createElement("p")
                fighterStats.innerText = (Object.entries(fighter.stats))
                allFighterContainer.append(fighterName, fighterAvatar, fighterStats)
            })
        })
})
    


addFighterButton.addEventListener("click", function(){
    battleContainer.innerHTML = ""
    leaderboardContainer.innerHTML = ""
    allFighterContainer.innerHTML = ""
    let newFighterForm = document.createElement("form")
    let userFighterName = document.createElement("input")
        userFighterName.placeholder = "Fighter name"
        userFighterName.id = "userFighterNameId"
    let userFighterAvatar = document.createElement("input")
        userFighterAvatar.placeholder = "Your img URL here"
        userFighterAvatar.id = "userFighterAvatarId"
    let submitButton = document.createElement("button")
        submitButton.innerText = "Submit"
    newFighterForm.append(userFighterName, userFighterAvatar, submitButton)
    formContainer.append(newFighterForm)
    
    formContainer.addEventListener("submit", function(e){
        e.preventDefault()
        let userFighterInput = e.target.userFighterNameId.value
        console.log(userFighterInput)
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
                turnFighterObjToCard(userNewFighter)
                console.log(userNewFighter)
            })

    })
})

leaderBoardButton.addEventListener('click', function() {
    battleContainer.innerHTML = ""
    allFighterContainer.innerHTML = ""
    formContainer.innerHTML = ""
    fetch('http://localhost:3000/fighters')
         .then(res => res.json())
         .then(function(fightersArr){
             let copyofFightersArr = [...fightersArr] 
             copyofFightersArr.sort(function(a, b){
                    return b.wins - a.wins
             })
                copyofFightersArr.forEach(fighter => {
                    displayFighter = fighter
                    let fighterDiv = document.createElement("div")
                    fighterDiv.id = fighter.name
                    let fighterName = document.createElement("p")
                    fighterName.innerText = fighter.name    
                    let fighterAvatar = document.createElement("img")
                    fighterAvatar.src = fighter.image
                    fighterAvatar.alt = fighter.name
                    let fighterWins = document.createElement("p")
                    fighterWins.innerText = `${fighter.name} has ${fighter.wins} wins!`
                    newFighter = fighter 
                    leaderboardContainer.append(fighterName, fighterAvatar, fighterWins)
                })
         })
})