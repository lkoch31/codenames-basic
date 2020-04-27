$(document).ready(function () {

	var cards = JSON.parse(localStorage.getItem('cards.json'))

	if (cards) {
		for (i = 0; i < cards.length; i++) {
			document.getElementById("tile" + i).textContent = cards[i].word;
		}
	}

	$("#newgamebutton").click(function() {
		Math.seedrandom($("#seed"));
		let words = getWords();

		cards = getCards(words);

		for (i = 0; i < cards.length; i++) {
			document.getElementById("tile" + i).textContent = cards[i].word;
		}

		// save these newly generated cards back into local storage 
		localStorage.setItem('cards.json', JSON.stringify(cards));
	})

	$(".grid-item").click(function() {
		element = $(this);
		console.log(element.text());
		card = getCard(element.text());
		// this is a stupid addition because npm is converting my string colors to rgb
		if (($(this).css('color') == 'black' || $(this).css('color') == 'rgb(0, 0, 0)') ?
			$(this).css('color', card.color) :
			$(this).css('color', 'black'));
	})

	// find the specific card in the cards array by the 'word' value
	const getCard = (word) => {
		return cards.find(card => card.word === word);
	}

	// currently unused....
	const changeColor = (card) => {
		console.log(card.color);
	}

	// get random list of words from an array of possible words
	const getWords = () => {
		let possibleWords = ['banana', 'cat', 'tree', 'table', 'chair',
		'wine', 'mouse', 'computer', 'phone', 'book',
		'lamp', 'bear', 'window', 'purse', 'house',
		'speaker', 'camera', 'key', 'pen', 'eye',
		'boat', 'snake', 'castle', 'dog', 'monkey',
		'cloud', 'calendar', 'house', 'lion', 'mountain',
		'beer', 'snow', 'television', 'farm', 'car'];

		possibleWords.sort(() => Math.random() - 0.5);

		return possibleWords.slice(0,20);
	}

	// create random set of 20 word
	const getCards = (words) => {
		cards = [];
		colors = getRandomColors();
		for (i = 0; i < words.length; i++) {
			cards.push({"word":words[i], "color":colors[i]})
		}

		return cards;
	}

	const getRandomColors = () => {
		let colors = [];

		for (i = 0; i < 19; i++) {
			index = Math.floor(Math.random() * 20);
			if (colors[index]) {
				index = getNextOpenSpace(colors, index, 20);
			}

			if (i < 7) {

				colors[index] = 'blue';

			} else if (i < 15) {

				colors[index] = 'red';

			} else if (i < 19) {

				colors[index] = 'brown';
			}
		}

		// once all other colors have been assigned,
		// put the assassin in the remaining space
		for (i = 0; i < 20; i++) {
			if (!colors[i]) {
				colors[i] = 'pink';
				break;
			}
		}

		return colors;

	}

	const getNextOpenSpace = (colorsArray, currentIndex, gridSize) => {
		for (j = currentIndex; j < currentIndex + gridSize; j++) {
			nextOpenSpace = j % gridSize;
			if (!colorsArray[nextOpenSpace]) {
				return nextOpenSpace;
			}
		}
	}


	//this function shows the user the answers
	$("#seecolors").click(function() {
		for (i = 0; i < 20; i++) {
			flipCard(document.getElementById("tile" + i));
		}
	});
});