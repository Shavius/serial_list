import CardUpdate from "./CardUpdate";
import CardMover from "./CardMover";

export default class CardControlButtons {
	mainContentElement: HTMLElement | null;

	constructor(mainContentElement: HTMLElement | null) {
		this.mainContentElement = mainContentElement;
	}

	update(): void {
		if (this.mainContentElement !== null) {
			this.mainContentElement.addEventListener("click", (event) => {
				const pageElement = event.target as HTMLElement;

				if (pageElement.classList.contains("card-buttons__item-up")) {
					const clickedButton = event.target as HTMLElement;
					const cardElement = clickedButton.closest<HTMLElement>(".serial-card");

					if (cardElement !== null) {
						new CardUpdate(cardElement).seriesUpdate("up");
					}
				}

				if (pageElement.classList.contains("card-buttons__item-down")) {
					const clickedButton = event.target as HTMLElement;
					const cardElement = clickedButton.closest<HTMLElement>(".serial-card");

					if (cardElement !== null) {
						new CardUpdate(cardElement).seriesUpdate("down");
					}
				}

				if (pageElement.classList.contains("serial-card__button-up")) {
					const clickedButton = event.target as HTMLElement;
					const cardElement = clickedButton.closest<HTMLElement>(".serial-card");

					if (cardElement !== null) {
						new CardMover(cardElement).moveUp();
					}
				}

				if (pageElement.classList.contains("serial-card__button-down")) {
					const clickedButton = event.target as HTMLElement;
					const cardElement = clickedButton.closest<HTMLElement>(".serial-card");

					if (cardElement !== null) {
						new CardMover(cardElement).moveDown();
					}
				}
			});
		}
	}
}
