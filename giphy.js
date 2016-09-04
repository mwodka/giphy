var myArray = ['cat', 'dog', 'lizard', 'hamster', 'guinea pig', 'koala', 'bats', 'kanagroo', 'goat'];
var giph = 'http://api.giphy.com/v1/gifs/search?limit=10&q=';
var key = '&api_key=dc6zaTOxFJmzC';
function makeButtons() {

	$('#animalbuttons').empty();

	for (var i = 0; i < myArray.length; i++) {
		var newButton = $('<button>');
		newButton.html(myArray[i]);
		$('#animalbuttons').append(newButton);
	}
}

function getImages(img) {
	var search = giph + img + key;
	$.ajax({
		url: search,
		method: 'GET'
			})
			.done(function(response) {
			var results = response.data;
}

makeButtons();

// http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC   