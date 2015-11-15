Games = new Mongo.Collection('games');
//Meteor.subscribe("games");

Template.home.events({
    "click .creategame": function (event) {
        console.log("Clicked Create Game");
        Meteor.call('createGame', function(error, result) {
            if (error) {
                alert("Game already created!")      
            }
            else{
                Session.set('game', result);
                Router.go("/game", {_id:result});
            }
        });
    },
    "click .joingame": function (event) {
        console.log("Clicked Join Game");
        game_id = Games.findOne()._id;
        console.log(game_id);
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