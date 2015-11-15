function checkGame() {
    if (Session.get('current_interval')) {
        game_id = Games.findOne()._id;
        Meteor.call('playGame', game_id, function(error, res){
            if (res) {
                var resultdiv = document.getElementById("results")
                resultdiv.innerHTML = res.result;
                Meteor.call('resetGame', game_id);
                resultdiv.innerHTML += "<br> Inputs have been reset, you can play next round now."
            }
        });
    }
}

Template.game.events({
    "click .btn-option": function (event) {
        // Get choice based on id of button clicked
        var choice = event.currentTarget.attributes.id.value;
        // There is only one game
        game_id = Games.findOne()._id;
        Meteor.call('sendChoice', game_id, choice);
        Session.set('current_interval', Meteor.setInterval(checkGame,5000));
    }
});