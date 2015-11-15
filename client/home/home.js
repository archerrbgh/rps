Games = new Mongo.Collection('games');

Template.home.events({
    "click .creategame": function (event) {
        console.log("Clicked Create Game");
        Meteor.call('createGame', function(error, result) {
            if (result) {
                Session.set('game', result);
                Router.go("/game", {_id:result});
            }
            else {
                console.log("Error creating game");
            }
        });
    },
    "click .joingame": function (event) {
        console.log("Clicked Join Game");
        game_id = Games.findOne()._id;
        Meteor.call('joinGame', game_id, function(error, result) {
            if (result) {
                Session.set('game', game_id);
                Router.go("/game", {_id:game_id});
            }
            else {
                console.log("uh oh");
            }
        });
    }
});

Router.route("/", {name:"home", template:"home"});
Router.route("/game", {name:"game", template:"game"});