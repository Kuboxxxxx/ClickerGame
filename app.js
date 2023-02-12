//Importing modules
import { building } from "./building.js"
import { achievement } from "./achievement.js"
import { upgrade } from "./upgrade.js"
import { game } from "./game.js"
import { display } from "./display.js"
import { bambooImage, coll } from "./selectors.js"

//Mechanical variables
let bambooScore = 0
let plantAmount = 0 
let clickingPower = 1

//Saving game

const saveGame = () => {
    const gameSave = {
        bamboo: game.bamboo,
        totalBamboo: game.totalBamboo,
        totalClicks: game.totalClicks,
        clickingPower: game.clickingPower,
        totalCoins: game.totalCoins,
        version: game.version,
        buildingAmount: building.amount,
        buildingIncome: building.income,
        buildingCost: building.cost,
        upgradePurchased: upgrade.purchased,
        achievementAchieved: achievement.achieved
    }
    localStorage.setItem("gameSave", JSON.stringify(gameSave))
}

//Loading game

const loadGame = () => {
    let savedGame = JSON.parse(localStorage.getItem("gameSave"))
    if (localStorage.getItem("gameSave") !== null){
        if (typeof savedGame.bamboo !== "undefined") {game.bamboo = savedGame.bamboo}
        if (typeof savedGame.totalBamboo !== "undefined") {game.totalBamboo = savedGame.totalBamboo}
        if (typeof savedGame.totalClicks !== "undefined") {game.totalClicks = savedGame.totalClicks}
        if (typeof savedGame.clickingPower !== "undefined") {game.clickingPower = savedGame.clickingPower}
        if (typeof savedGame.totalCoins !== "undefined") {game.totalCoins = savedGame.totalCoins}
        if (typeof savedGame.version !== "undefined") {game.version = savedGame.version}
        if (typeof savedGame.buildingAmount !== "undefined") {
            for (let i=0; i < savedGame.buildingAmount.length; i++){
                building.amount[i] = savedGame.buildingAmount[i]
            }
        }
        if (typeof savedGame.buildingIncome !== "undefined") {
            for (let i=0; i < savedGame.buildingIncome.length; i++){
                building.income[i] = savedGame.buildingIncome[i]
            }
        }
        if (typeof savedGame.buildingCost !== "undefined") {
            for (let i=0; i < savedGame.buildingCost.length; i++){
                building.cost[i] = savedGame.buildingCost[i]
            }
        }
        if (typeof savedGame.upgradePurchased !== "undefined") {
            for (let i=0; i < savedGame.upgradePurchased.length; i++){
                upgrade.purchased[i] = savedGame.upgradePurchased[i]
            }
        }
        if (typeof savedGame.achievementAchieved !== "undefined") {
            for (let i=0; i < savedGame.achievementAchieved.length; i++){
                achievement.achieved[i] = savedGame.achievementAchieved[i]
            }
        }
    }
}

//Reseting game

const resetGame = () => {
    if (confirm("Are you sure you want to reset your game?")){
        let gameSave = {}
        localStorage.setItem("gameSave", JSON.stringify(gameSave))
        location.reload()
    }
}

//Event Listeners

    //Main bamboo button - adding score and counting clicks
    bambooImage.addEventListener("click", function(){
        game.addBamboo()
        game.totalClicks++
    })

    //Shop listener - triggers a purchase funtcion with correct index
    shopContainer.addEventListener("click", event => {
        building.purchase(event.target.getAttribute("index"))
    })

    //Upgrade listener = triggers a pruchase function of upgrade with correct id
    upgradeContainer.addEventListener("click", event => {
        upgrade.purchase(event.target.getAttribute("index"))
    })

    document.querySelector("#reset").addEventListener("click", event => {
        resetGame()
    })

//Adding bamboo every second to a score
setInterval(() => {
    game.bamboo += Math.round(game.getBambooPerSecond() * 10) / 10
    game.totalBamboo += Math.round(game.getBambooPerSecond() * 10) / 10
    display.updateScore()
}, 1000)

//Executes every 1 second - Saves game and udates all displays
setInterval(() => {
    display.updateUpgrades()
    display.updateScore()
    display.udpateShop()
    display.updateAchievement()
    achievement.getAchievement()
    saveGame()
}, 1000)

//Loading everything on refresh
window.onload = function(){
    loadGame()
    display.udpateShop()
    display.updateScore()
    display.updateUpgrades()
    display.updateAchievement()
    display.updateVersion()
}

for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        } else {
            content.style.display = "block";
        }
    });
}