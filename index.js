let battleButton = document.querySelector("#battle")
let allFighters = document.querySelector("#allFighters")
let leaderBoardButton = document.querySelector("#leaderboard")
let addFighter = document.querySelector("#addFighter")
let arena = document.querySelector("#arena")
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


battleButton.addEventListener('click', function(){
    fetch("http://localhost:3000/fighters")
        .then(res => res.json())
        .then(function(fightersArr){
            console.log(fightersArr)
            const randomFighter = fightersArr[Math.floor(
                Math.random() * fightersArr.length
            )]
            console.log(randomFighter)
            turnFighterObjToDiv(randomFighter)
            })
    function turnFighterObjToDiv(fighter){
        displayFighter1 = fighter
        displayFighter1.id = fighter.id
        fighterOneName.innerText = fighter.name
        fighterOneAvatar.src = fighter.image
        fighterOneStats.innerText = (Object.entries(fighter.stats))
        fighterOneWins.innerText = `${fighter.name} wins!`
        console.log(fighterOneWins)
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
            console.log(fightersArr)
            const randomFighter = fightersArr[Math.floor(
                Math.random() * fightersArr.length
            )]
            console.log(randomFighter)
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

allFighters.addEventListener('click', function(){
    fetch("http://localhost:3000/fighters")
        .then(res => res.json())
        .then(function(fighters){
            fighters.forEach(function(fighter){
                turnFighterObjtoDiv(fighter)
            })
        })
    
    function turnFighterObjtoDiv(fighter){
        displayFighter = fighter
        let fighterDiv = document.createElement("div")
        fighterDiv.id = fighter.name
        let fighterName = document.createElement("p")
        fighterName.innerText = fighter.name    
        let fighterAvatar = document.createElement("img")
        fighterAvatar.src = fighter.image
        fighterAvatar.alt = fighter.name
        arena.append(fighterDiv, fighterName, fighterAvatar)   
    }
})