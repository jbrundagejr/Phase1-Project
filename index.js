let header = document.querySelector("h1")
let battleButton = document.querySelector("#battle")
let leaderButton = document.querySelector("#leader")
let addAFighter = document.querySelector("#addFighter")
let fighterDiv = document.querySelector("#fighterDiv")
let fighterOneName = document.querySelector('p#fighterOneName')
let fighterTwoName = document.querySelector('p#fighterTwoName')
let fighterOneImage = document.querySelector('img#fighterOneAvatar')
let fighterTwoImage = document.querySelector('img#fighterTwoAvatar')
let allFighters = document.querySelector("#fighters")
let displayFighter = {}


allFighters.addEventListener("click", function (){
    fetch("http://localhost:3000/fighters")
    .then(res => res.json())
    .then(function(fighterArr){
        fighterArr.forEach(function(fighterObj){
            turnFighterObjtoDiv(fighterObj)
        })
    })
    function turnFighterObjtoDiv(fighter){
        let fighterDiv = document.createElement("div")
        fighterDiv.id = fighter.name
        let fighterName = document.createElement("p")
        fighterName.innerText = fighter.name    
        let fighterAvatar = document.createElement("img")
        fighterAvatar.src = fighter.image
        fighterAvatar.alt = fighter.name
        fighterSpan.append(fighterDiv, fighterName, fighterAvatar)   
        displayFighter = fighter
 
    }
})
function randomFighter() {
    const index = Math.floor(Math.random() * fighterArr.length),
        displayFighter = displayFighter[index]
            return displayFighter.name  
}

// battleButton.addEventListener("click", function () {
//     fetch("http://localhost:3000/fighters")
//         .then(res => res.json())
//         .then(randomFighter(fighters){
//             let p = document.createElement("p")
//             p.innerText = fighter.name

           
//     })

function randomNumber() {
    let i = Math.floor(Math.random() * (fighters.length))
    return i
}
battleButton.addEventListener("click", function(evt) {
  
    fetch(`http://localhost:3000/fighters/${fighterID}`)
    .then (res => res.json())
    .then (function(fighters){ 
       
        let fighterID = fighters[randomNumber()].id
        fighterOneName.innerText = fighter.name    
        
        fighterOneImage.src = fighter.image 
        fighterOneImage.alt = fighter.name
        fighterDiv.append( fighterOneName, fighterOneImage)   
        displayFighter = fighter
        
        
        // fighterOneName.innerText = fighters[randomNumber()].name 

        // fighterOneImage.src = fighters[randomNumber()][im]
        
      
        console.log(fighterID)
        


    
    })
})
