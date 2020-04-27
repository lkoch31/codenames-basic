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
		console.log(JSON.stringify(cards));

		for (i = 0; i < cards.length; i++) {
			element = document.getElementById("tile" + i);
			element.textContent = cards[i].word;
			element.style.color = cards[i].activeColor;
		}

		// save these newly generated cards back into local storage 
		saveCards();
	})

	$(".grid-item").click(function() {
		element = $(this);
		flipCard(element)
	})

	const flipCard = (element) => {
		card = getCard(element.text());
		// switch card colors (if black -> show color, if showing color -> return to black)
		activeColor = element.css('color');
		element.css('color', card.inactiveColor);
		card.activeColor = card.inactiveColor;
		card.inactiveColor = activeColor; 
	}

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
			cards.push({"word":words[i], "inactiveColor":colors[i], "activeColor":'black'})
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
		console.log('inside see colors');
		for (i = 0; i < 20; i++) {
			flipCard($("#tile" + i));
		}
	});

	const saveCards = () => {
		localStorage.setItem('cards.json', JSON.stringify(cards));
	}
});