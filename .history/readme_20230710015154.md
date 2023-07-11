
# Naval Battle

This is an Naval Battle Make For To Learning Object Oriented Programming, For Poe Course at Universidad del Valle.


## Authors

- [@Jhon Steven Gonzales Aricapa ](https://www.github.com/jenestiven)
- [@Jhonatan David Castaño Calero](https://www.github.com/manjlo)


## Tech Stack

**Client:** Javascript, HTML, CSS

**Server:** None


## Features


#### Each player has a fleet of 9 ships of different sizes, so each one will occupy a given number of squares on the board:
  
* 1 aircraft carrier: occupies 4 squares
- 2 submarines: occupy 3 squares each.
- 3 destroyers: occupy 2 squares each
- 4 frigates: occupy 1 square each
#### Each ship can be placed horizontally or vertically on the position board.


### Terminology and movements:
- Water: when firing on a square where no ship is placed enemy. An X will appear on the player's main board. The turn passes to your opponent.
- Hit: when firing on a square where an enemy ship is located that occupies 2 or more squares and only part of the ship is destroyed. on the board of player will appear that part of the ship with a mark indicating that it has been touched. The player shoots again.
- Sunk: if you fire on a square where a frigate (1 square) or another ship with the rest of the squares touched, it will have sunk, that is, it has removed that ship from play. It will appear on the player's main board, the ship complete with the mark indicating that she has been scuttled. The player can return to shoot, as long as you haven't sunk their enemy's entire fleet, in which case will have won.


