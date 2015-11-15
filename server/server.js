Games = new Mongo.Collection("games");

Meteor.methods({
    createGame: function () {
        if (this.userId) {
            game_id = Games.insert({owner:this.userId, owner_name:"Player1", guest:null, guest_name:null, game_status:"waiting", owner_wins:0, guest_wins:0, ties:0, total_games:0, owner_selection:null, guest_selection:null});
            return game_id;
        }
    },
    joinGame: function (game_id) {
        // In simplest implementation, there is only one game
        game = Games.findOne({_id:game_id});
        // Allow incoming user to join if there is no other guest already playing the owner
        if (game.guest === null) {
            Games.update({_id:game_id}, {$set:{guest:this.userId, guest_name:"Player2", game_status:"started"}});
            return true;
        }
        return false;
    },
    sendChoice: function (game_id, selection) {
        game = Games.findOne({_id:game_id});
        // Set choice for Player 1
        if (this.userId == game.owner) {
            Games.update({_id:game_id}, {$set:{owner_selection:selection}});
        }
        //Set choice for Player 2
        else {
            Games.update({_id:game_id}, {$set:{guest_selection:selection}});
        }
    },
    playGame: function (game_id) {
        game = Games.findOne({_id:game_id});
        // First check if both players have made selection
        // If not, keep waiting until both selections are in
        if (game.owner_selection == null || game.guest_selection == null) {
            return false;
        }
        // Case where we have a tie
        if (game.owner_selection == game.guest_selection) {
            //Increment ties and count of games played
            Games.update({_id:game_id}, {$inc:{ties:1,total_games:1}});
            return {result: "It's a tie!"};
        }
        // The next part is hardcoded
        // List out all conditions where player 1 wins
        if ((game.owner_selection == "rock" && game.guest_selection == "scissors") || (game.owner_selection == "scissors" && game.guest_selection == "paper") || (game.owner_selection == "paper" && game.guest_selection == "rock")) {
            Games.update({_id:game_id}, {$inc:{owner_wins:1,total_games:1}});
            return {result: "Player 1 wins!"};
        }
        // Otherwise player 2 won
        else {
            Games.update({_id:game_id}, {$inc:{guest_wins:1,total_games:1}});
            return {result: "Player 2 wins!"};
        }
    },
    // Function to reset selections of both players to null so they can start next round
    resetGame: function (game_id) {
        Games.update({_id:game_id}, {$set:{owner_selection:null, guest_selection: null}});
    }
})