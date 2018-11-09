const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
	if (lockBoard) return;
	if (this === firstCard) return;
	this.classList.toggle('flip');

	if (!hasFlippedCard) {
		//first card  
		hasFlippedCard = true;
		firstCard = this;

		return;
	}
	//second card
	hasFlippedCard = false;
	secondCard = this;

	checkForMatch();
}


function checkForMatch() {
	//verify if the cards match
	if (firstCard.dataset.image === secondCard.dataset.image) {
		disableCards();
	} else {
		unflipCards();
	}
}

function disableCards() {
	firstCard.removeEventListener('click', flipCard);
	secondCard.removeEventListener('click', flipCard)
	resetBoard();
}

function unflipCards() {
	lockBoard = true;
	setTimeout(() => {
		firstCard.classList.remove('flip');
		secondCard.classList.remove('flip');

		lockBoard = false;
	}, 1500);

}

function resetBoard() {
	[hasFlippedCard, lockBoard] = [false, false];
	[firstCard, secondCard] = [null, null]

}



(function shuffle() {
	cards.forEach(card => {
		let randomPosition = Math.floor(Math.random() * 16);
		card.style.order = randomPosition;
	});
})();

cards.forEach(card => card.addEventListener('click', flipCard));