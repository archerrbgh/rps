# rps
A website that allows two players to play rock paper scissors. The website was made using Meteor.

The implementation of this assignment is very minimalist. There are two pages to this website, the home page and the game page. In the home page, a user can either create a new game or join an existing game.

When a user creates a game, he/she is taken to the game page, which has buttons to make a choice of rock, paper, or scissors. The choice can be locked in, but will not be evaluated until another player joins the game and makes a selection. The user who creates the game is denoted as the "owner" of the game, as well as "Player1".

When a user joins an existing game, he/she is taken to the game page, and can also make a selection. The user who joins an existing game is denoted as the "guest", as well as "Player2". If the guest makes a selection but the owner has not, then the game will wait for the owner to make a selection.

Once both players have made a selection, then the game will evaluate the inputs and determine the winner. A message is displayed below the buttons to say what the outcome was (tie, Player 1 win, or Player 2 win). The game is also reset automatically so the players can choose again.

At the moment, statistics on how many times each player has won, as well as number of ties, is being kept track of but not utilized.
