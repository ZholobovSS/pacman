import Game from './js/game/Game'
import Enemy from './js/game/Enemy'
import GameTable from './js/game/GameTable'
import Hero from './js/game/Hero'
import gameMaps from './js/game/gameMaps'
import Coins from './js/game/Coins'
import GameSettings from './js/game/gameSettings'
import './css/sizing.css'
import './css/animations.css'
import './css/style.css'
import Ee from './js/game/Ee'
import GamePanel from './js/game/GamePanel'

import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'

const game = new Game({
  Enemy, GameTable, Hero, gameMaps, Coins, GameSettings, Ee, GamePanel,
})

game.start()
