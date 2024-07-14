/* eslint-disable class-methods-use-this */

import type IDataCard from "../interfaces/IDataCard";
import ButtonPushControl from "./ButtonPushControl";
import DateControl from "./DateControl";
import ParseCard from "./ParseCard";

export default class CreateFormCard {
	pageBody: HTMLElement | null;
	buttonControl: ButtonPushControl;

	constructor() {
		this.pageBody = document.querySelector("body");
		this.buttonControl = new ButtonPushControl();
	}

	createForm(dataCardInfo: IDataCard | undefined = undefined): HTMLElement {
		let serialName = "Назва Серіала";
		let currentSeria = "0";
		let allSeria = "0";
		let cardImg = "";
		let cardName = "Створення картки";
		let createButton = "Створити";

		if (dataCardInfo !== undefined && dataCardInfo !== null) {
			serialName = `${dataCardInfo.serialName}`;
			currentSeria = `${dataCardInfo.currentSeria}`;
			allSeria = `${dataCardInfo.allSeria}`;
			cardImg = `${dataCardInfo.cardImg}`;
			cardName = "Змінити картку";
			createButton = "Змінити";
		}

		const modalOverlay = document.createElement("div");
		modalOverlay.classList.add("modal-overlay");
		modalOverlay.innerHTML = `
		<div class="modal">
			<div class="modal__title">${cardName}</div>
			<div class="modal__inputs modal-inputs">
				<div class="modal-inputs__item-text">Додати назву</div>
				<input id="inputCardName" class="modal-inputs__item-input" type="text" value="${serialName}" />
				<div class="modal-inputs__item-text">Поточна серія</div>
				<input id="inputCardCurrentSeria" class="modal-inputs__item-input" type="number" value="${currentSeria}" />
				<div class="modal-inputs__item-text">Всього серій</div>
				<input id="inputCardAllSeria" class="modal-inputs__item-input" type="number" value="${allSeria}" />
				<div class="modal-inputs__item-text">Додати зображення</div>
				<input id="inputCardImage" class="modal-inputs__item-input" type="text" value="${cardImg}" />
			</div>
			<div class="modal-buttons">
				<div class="modal-buttons__item modal-buttons__item-create">${createButton}</div>
				<div class="modal-buttons__item modal-buttons__item-exit">Скасувати</div>
			</div>
		</div>
        `;

		return modalOverlay;
	}

	closeCard(body: HTMLElement | null, card: HTMLElement): void {
		if (body !== null) {
			body.classList.remove("body-lock");
			card.remove();
		}
	}

	removeEmptyCard(): void {
		const emptyCard = document.querySelector(".card-info");

		if (emptyCard !== null) {
			emptyCard.remove();
		}
	}

	addCard(dataCardInfo: IDataCard | undefined = undefined, cardElement: HTMLElement | null = null): void {
		if (this.pageBody !== null) {
			let card = this.createForm();

			let createDate = `${new DateControl().getCurrentDate()}`;
			let updateDate = `${new DateControl().getCurrentDate()}`;

			if (dataCardInfo !== undefined && dataCardInfo !== null) {
				createDate = dataCardInfo.createDate;
				updateDate = dataCardInfo.updateDate;
				card = this.createForm(dataCardInfo);
			}

			this.pageBody?.classList.add("body-lock");

			this.pageBody?.append(card);

			const exit1 = card.querySelector(".modal-buttons__item-exit");

			exit1?.addEventListener("click", () => {
				this.closeCard(this.pageBody, card);
			});

			const inputCardName: HTMLInputElement | null = document.querySelector("#inputCardName");
			const inputCardCurrentSeria: HTMLInputElement | null = document.querySelector("#inputCardCurrentSeria");
			const inputCardAllSeria: HTMLInputElement | null = document.querySelector("#inputCardAllSeria");
			const inputCardImage: HTMLInputElement | null = document.querySelector("#inputCardImage");

			const createCard = document.querySelector(".modal-buttons__item-create");

			if (createCard !== null) {
				createCard.addEventListener("click", () => {
					if (
						inputCardName !== null &&
						inputCardCurrentSeria !== null &&
						inputCardAllSeria !== null &&
						inputCardImage !== null
					) {
						const inputCurrentSeria = Number(inputCardCurrentSeria.value);
						const inputAlltSeria = Number(inputCardAllSeria.value);

						if (inputCurrentSeria >= 0 && inputAlltSeria >= 0) {
							const cardInfo = {
								serialName: inputCardName.value,
								currentSeria: String(inputCurrentSeria),
								allSeria: String(inputAlltSeria),
								cardImg: inputCardImage.value,
								createDate,
								updateDate,
							};

							this.closeCard(this.pageBody, card);

							const parseCard = new ParseCard(cardInfo);

							if (dataCardInfo !== undefined && cardElement !== null) {
								parseCard.changeOneCard(cardElement);

								this.buttonControl.buttonEnable();
							} else {
								parseCard.parseOneCard();
								this.removeEmptyCard();

								this.buttonControl.buttonEnable();
							}
						} else {
							console.log("Серии не чесла и не равны 0");
						}
					}
				});
			}
		}
	}

	init(): void {
		if (this.pageBody !== null) {
			this.addCard();
		}
	}
}
