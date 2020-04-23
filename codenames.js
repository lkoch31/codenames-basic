const newGame = () => {
	let innerHtml = ""

	let words = getWords();

	let cards = getCards(words);
	console.log(cards);

	cards.forEach((card) => {
		innerHtml += "<div class='grid-item' style='color:" + card.color +"''>" + card.word + "</div>";
	});
	console.log(innerHtml);


	document.getElementById("board").innerHTML=innerHtml;
}

const getWords = () => {
	return ['banana', 'cat', 'tree', 'table', 'chair', 
	'wine', 'mouse', 'computer', 'phone', 'book', 
	'lamp', 'bear', 'window', 'purse', 'house', 
	'speaker', 'camera', 'key', 'pen', 'eye']
}

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
		if (i < 7) {

			colors[index] = 'blue';

		} else if (i < 15) {

			if (colors[index]) {
				index = getNextOpenSpace(colors, index, 20);
			}

			colors[index] = 'red';
			
		} else if (i < 19) {

			if (colors[index]) {
				index = getNextOpenSpace(colors, index, 20);
			} 

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