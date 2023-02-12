import { game } from "./game.js"
import { display } from "./display.js"
import { achievement } from "./achievement.js"

export const building = {
    name: [
        "plant",
        "plot",
        "garden",
        "park",
        "forest",
        "jungle",
        "island",
        "planet",
        "system"
    ],
    image: [
        "bambooshoot.png",
        "plot.png",
        "garden.png",
        "park.png",
        "forest.png",
        "jungle.png",
        "island.png",
        "planet.png",
        "system.png"
    ],
    cost: [
        15,
        100,
        1100,
        12000,
        130000,
        1400000,
        20000000,
        330000000,
        5100000000
    ],
    amount: [
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
    ],
    income: [
        0.1,
        1,
        8,
        47,
        260,
        1400,
        7800,
        44000,
        260000
    ],

    price: [
        "bamboo",
        "plants",
        "plots",
        "gardens",
        "parks",
        "forests",
        "jungles",
        "islands",
        "planets"
    ],

    purchase: function(index){
        if (game.bamboo >= this.cost[index]) {
            game.bamboo -= this.cost[index]
            this.amount[index]++
            this.cost[index] = Math.ceil(this.cost[index] * 1.15)
            display.updateScore()
            display.udpateShop()
            display.updateUpgrades()
            achievement.getAchievement()
        }
    }
}