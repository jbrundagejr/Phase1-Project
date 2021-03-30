let header = document.querySelector("h1")
let battleButton = document.querySelector("#battle")
let leaderButton = document.querySelector("#leader")
let addAFighter = document.querySelector("#addFighter")
let fighterSpan = document.querySelector("#fighterSpan")
let displayFighter = {}

function randomFighter(fighters) {
    const index = Math.floor(Math.random() * fighters.length),
        fighter = fighters[index]
        return fighter
}
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
    fighterSpan.append(fighterDiv, fighterName, fighterAvatar)   
}
    


