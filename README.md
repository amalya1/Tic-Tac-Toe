


This is a Tic-Tac-Toe Game. It uses Node.js as runtime and NestJS as
main framework

# Project Overview

- Tic-Tac-Toe Game: A classic 3x3 grid game where players take turns making moves.
The game is played in three rounds, and the player who wins two consecutive rounds is declared the overall winner.


- Bots: Two separate bots, each running in its own Node.js process, play against each other in the Tic-Tac-Toe game.
Both bots have their own winning strategies. The game process and the bots' interactions can be monitored directly from the terminal.



# API Endpoints

- POST /api/games/start

Body: { "player1": "x", "player2": "o" }


- POST /api/games/move

Body: { gameId": "","row": "", "col": "" }


- GET /api/rounds/allRounds


- GET /api/rounds/gameResults



# Getting started

- Install dependencies

```
npm install
```

- Starting the Server

```
npm run start
```

- Starting the Bots

```
npm run start-all
```


# Game Logic
- Starting the Game: A new game is created and initialized when a request is made to the /start endpoint.

- Moves: Players take turns making moves by sending requests to the /move endpoint.
 Each field can be occupied by one of two characters: "x" or "o".

- Victory: The game consists of three rounds. 
 The winner of the round is the player who first lines up three identical symbols vertically, horizontally or diagonally.
 The winner of the game is determined by the player who wins two rounds in a row.

- End of Game: If one player wins two rounds in a row, the game ends and the winner is declared.


# Running the Game

- Ensure the server is running.
 
- Use the /start endpoint to start a new game.

- Players can make moves using the /move endpoint.

- Monitor the state of the game through responses to requests and in the terminal