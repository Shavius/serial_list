import CardUpdate from "./CardUpdate";
import CardMover from "./CardMover";
import CardChange from "./CardChange";
import CardDelete from "./CardDelete";
import Authorization from "./Authorization";
import DataSendToServer from "./DataSendToServer";

export default class CardControlButtons {
	headerElement: HTMLElement | null;
	mainContentElement: HTMLElement | null;

	constructor() {
		this.headerElement = document.querySelector(".header");
		this.mainContentElement = document.querySelector(".main__content");
	}

	init(): void {
		if (this.headerElement !== null) {
			this.headerElement.addEventListener("click", (event) => {
				const pageElement = event.target as HTMLElement;

				if (pageElement.classList.contains("header__authorization")) {
					const authorization = new Authorization();
					authorization.init();
				}

				if (pageElement.classList.contains("header__push-serial")) {
					const dataSendToServer = new DataSendToServer();
					dataSendToServer.init();
				}
			});
		}

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

				if (pageElement.classList.contains("serial-card__button-change")) {
					const clickedButton = event.target as HTMLElement;
					const cardElement = clickedButton.closest<HTMLElement>(".serial-card");

					if (cardElement !== null) {
						new CardChange(cardElement).init();
					}
				}

				if (pageElement.classList.contains("serial-card__button-delete")) {
					const clickedButton = event.target as HTMLElement;
					const cardElement = clickedButton.closest<HTMLElement>(".serial-card");

					if (cardElement !== null) {
						new CardDelete(cardElement).init();
					}
				}
			});
		}
	}
}
