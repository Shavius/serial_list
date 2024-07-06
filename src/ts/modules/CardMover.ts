import ButtonPushControl from "./ButtonPushControl";

/* eslint-disable class-methods-use-this */
export default class CardMover {
	cardElement: HTMLElement | null;

	constructor(cardElement: HTMLElement | null) {
		this.cardElement = cardElement;
	}

	moveUp(): void {
		const currentCard = this.cardElement;
		const previousCard = currentCard?.previousElementSibling as HTMLElement;

		if (currentCard !== null && previousCard !== null && previousCard.classList.contains("serial-card")) {
			previousCard.before(currentCard);

			ButtonPushControl.init();
		}
	}

	moveDown(): void {
		const currentCard = this.cardElement;
		const nextCard = currentCard?.nextElementSibling as HTMLElement;

		if (currentCard !== null && nextCard !== null && nextCard.classList.contains("serial-card")) {
			nextCard.after(currentCard);

			ButtonPushControl.init();
		}
	}
}
