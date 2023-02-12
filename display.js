import { building } from "./building.js"
import { upgrade } from "./upgrade.js"
import { game } from "./game.js"
import { achievement } from "./achievement.js"
import { bambooScoreDisplay, bambooPerSecondDisplay, versionDisplay } from "./selectors.js"

export const display = {
    updateScore: function(){
        bambooScoreDisplay.innerHTML = (Math.round(game.bamboo * 10) / 10).toLocaleString()
        //document.title = `${Math.round(game.bamboo * 10) / 10} bamboo - Bamboo clicker`
        bambooPerSecondDisplay.innerHTML = game.getBambooPerSecond()
    },
    udpateShop: function(){
        shopContainer.innerHTML = ""
        for (let i=0; i < building.name.length; i++){
            shopContainer.innerHTML += `<table id="${building.name[i]}" class="unselectable" index="${i}"><tr index="${i}"><td class="image" index="${i}"><img src="./img/${building.image[i]}" index="${i}"></td><td index="${i}">Bamboo ${building.name[i]}</td><td index="${i}">[<span index="${i}">${building.cost[i].toLocaleString()}</span> bamboo]:</td><td index="${i}"><span index="${i}">${building.amount[i].toLocaleString()}</span></td></tr></table>`
        }
    },
    updateUpgrades: function(){
        upgradeContainer.innerHTML = ""
        for (let i=0; i < upgrade.name.length; i++){
            if (!upgrade.purchased[i]) {
                if (upgrade.type[i] == "building" && building.amount[upgrade.buildingIndex[i]] >= upgrade.requirement[i]){
                    upgradeContainer.innerHTML += `<img src="./img/${upgrade.image[i]}" class="upgradeTile" title="${upgrade.name[i]} &#10; ${upgrade.description[i]} &#10; ${upgrade.cost[i].toLocaleString()} bamboo" index="${i}">`
                }
                else if (upgrade.type[i] == "click" && game.totalClicks >= upgrade.requirement[i]){
                    upgradeContainer.innerHTML += `<img src="./img/${upgrade.image[i]}" class="upgradeTile" title="${upgrade.name[i]} &#10; ${upgrade.description[i]} &#10; ${upgrade.cost[i].toLocaleString()} bamboo" index="${i}">`
                }
            }
        }
    },
    updateAchievement: function(){
        achievementContainer.innerHTML = ""
        for (let i=0; i < achievement.name.length; i++){
            if (achievement.achieved[i]){
                achievementContainer.innerHTML += `<img src="./img/${achievement.image[i]}" title="${achievement.name[i]} &#10; ${achievement.description[i]}">`
            }
            else {
                achievementContainer.innerHTML += `<img src="./img/questionmark.png">`
            }
        }
    },
    updateVersion: function(){
        versionDisplay.innerHTML = `V. ${game.version}`
    }
}