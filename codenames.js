
// create a new game and put a word in every tile
const newGame = () => {
	let innerHtml = ""

	let words = getWords();

	let cards = getCards(words);
	console.log(cards);

	for (i = 0; i < cards.length; i++) {
		document.getElementById("tile" + i).textContent = cards[i].word;
	}
}

// change color of tile text based on the color of the card during initalization
const flipCard = (element) => {
	card = getCard(element.textContent);
	document.getElementById(element.id).style.color = card.color;
}

// find the specific card in the cards array by the 'word' value
const getCard = (word) => {
	return cards.find(card => card.word === word);
}

// currently unused....
const changeColor = (card) => {
	console.log(card.color);
}

// get static list of words
const getWords = () => {
	return ['banana', 'cat', 'tree', 'table', 'chair', 
	'wine', 'mouse', 'computer', 'phone', 'book', 
	'lamp', 'bear', 'window', 'purse', 'house', 
	'speaker', 'camera', 'key', 'pen', 'eye']
}

// create random set of 20 word
const getCards = (words) => {
	cards = []
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