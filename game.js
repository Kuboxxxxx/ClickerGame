import { building } from "./building.js"
import { display } from "./display.js"

export const game = {
    bamboo: 0,
    totalBamboo: 0,
    totalClicks: 0,
    clickingPower: 1,
    totalCoins: 0,
    version: 0.2,
    addBamboo: function(){
        this.bamboo += this.clickingPower
        this.totalBamboo += this.clickingPower
        display.updateScore()
    },
    getBambooPerSecond: function(){
        let bambooPerSecond = 0
        for (let i=0; i < building.name.length; i++) {
            bambooPerSecond += building.income[i] * building.amount[i]
        }
        bambooPerSecond = Math.round(bambooPerSecond * 10) / 10
        return bambooPerSecond
    }
}