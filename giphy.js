var myArray = ['cat', 'dog', 'lizard', 'hamster', 'guinea pig', 'koala', 'bats', 'kanagroo', 'goat'];
var giph = 'http://api.giphy.com/v1/gifs/search?&limit='
var q = '&q='; 
var key = '&api_key=dc6zaTOxFJmzC';

function makeButtons() {
	
	$('#animalbuttons').empty();

	for (var i = 0; i < myArray.length; i++) {
		var newButton = $('<button>');
		newButton.attr('class', 'btn');
		newButton.html(myArray[i]);
		var divider = $('<div>');
		divider.attr('class', 'divider');
		$('#animalbuttons').append(newButton);
		$('#animalbuttons').append(divider);
	}
	createButtonListeners();
}

function getImages(img) {
	var e = document.getElementById('max-results');
	e = e.options[e.selectedIndex].text;
	var search = giph + e + q + img + key;
	$.ajax({
		url: search,
		method: 'GET'
			})
			.done(function(response) {
			var results = response.data;
			createImages(results);
			});
}

function createImages(obj) {
	$('.animals').empty();
	for (var i = 0; i < obj.length; i++) {
		var newImage = $('<img>');
		newImage.attr({
			src: obj[i].images.fixed_width_still.url,
			'class': 'gif',
			'data-state': 'still',
			'data-still': obj[i].images.fixed_width_still.url,
			'data-animate': obj[i].images.fixed_width.url});

		var newDiv = $('<div>');
		newDiv.attr('class', 'giphy-images');
		newDiv.append('rating: ' + obj[i].rating + '<br>');
		newDiv.append(newImage);
		$('.animals').append(newDiv);
	}
	createImageListeners();
}

function changeState(img) {
	if (img.dataset.state === 'still') {
		img.dataset.state = 'animate';
		$(img).attr('src', img.dataset.animate);
	} else {
		img.dataset.state = 'still';
		$(img).attr('src', img.dataset.still);
	}
}

function createImageListeners() {
	$('.gif').on('click', function() {
		changeState(this);
	});
}

function createButtonListeners() {
	$('.btn').on('click', function() {
		getImages($(this).html());
	});
}

$(document).ready(function() {
	$('#add-animal').on('click', function() {
		var input = $('#input').val().trim();
		myArray.push(input);
		makeButtons();
	});
});

makeButtons();