/* eslint-disable class-methods-use-this */

import type IDataCard from "../interfaces/IDataCard";
import DateControl from "./DateControl";
import ParseCard from "./ParseCard";

export default class CreateFormCard {
	pageBody: HTMLElement | null;
	buttonCreate: HTMLElement | null;

	constructor(pageBody: HTMLElement | null, buttonCreate: HTMLElement | null) {
		this.pageBody = pageBody;
		this.buttonCreate = buttonCreate;
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

		const card = document.createElement("div");
		card.classList.add("create-card-wrapper");
		card.innerHTML = `
        <div class="card-wrapper">
			<div class="create-card">
				<div class="create-card__exit">Закрити</div>
				<div class="create-card__title">${cardName}</div>
				<div class="create-card__inputs create-card-input">
					<div class="create-card-input__item-text">Додати назву</div>
					<input id="inputCardName" class="create-card-input__item-text-input" type="text" value="${serialName}" />
					<div class="create-card-input__item-text">Поточна серія</div>
					<input id="inputCardCurrentSeria" class="create-card-input__item-text-input" type="number" value="${currentSeria}" />
					<div class="create-card-input__item-text">Всього серій</div>
					<input id="inputCardAllSeria" class="create-card-input__item-text-input" type="number" value="${allSeria}" />
					<div class="create-card-input__item-text">Додати зображення</div>
					<input id="inputCardImage" class="create-card-input__item-text-input" type="text" value="${cardImg}" />
				</div>
				<div class="create-card-buttons">
					<div class="create-card-buttons__item create-card-buttons__item-create">${createButton}</div>
					<div class="create-card-buttons__item create-card-buttons__item-exit">Скасувати</div>
				</div>
			</div>
		</div>
        `;

		return card;
	}

	createBlackWrapper(): HTMLElement {
		const blackWrapper = document.createElement("div");
		blackWrapper.classList.add("black-wrapper");

		return blackWrapper;
	}

	closeCard(body: HTMLElement | null, card: HTMLElement, wrap: HTMLElement): void {
		if (body !== null) {
			body.classList.remove("body-blocked");
			card.remove();
			wrap.remove();
		}
	}

	init(dataCardInfo: IDataCard | undefined = undefined, cardElement: HTMLElement | null = null): void {
		if (this.pageBody !== null) {
			const wrap = this.createBlackWrapper();
			let card = this.createForm();

			let createDate = `${new DateControl().getCurrentDate()}`;
			let updateDate = `${new DateControl().getCurrentDate()}`;

			if (dataCardInfo !== undefined && dataCardInfo !== null) {
				createDate = dataCardInfo.createDate;
				updateDate = dataCardInfo.updateDate;
				card = this.createForm(dataCardInfo);
			}

			this.pageBody?.classList.add("body-blocked");

			this.pageBody?.append(wrap, card);

			const exit1 = card.querySelector(".create-card__exit");
			const exit2 = card.querySelector(".create-card-buttons__item-exit");

			exit1?.addEventListener("click", () => {
				this.closeCard(this.pageBody, card, wrap);
			});

			exit2?.addEventListener("click", () => {
				this.closeCard(this.pageBody, card, wrap);
			});

			const inputCardName: HTMLInputElement | null = document.querySelector("#inputCardName");
			const inputCardCurrentSeria: HTMLInputElement | null = document.querySelector("#inputCardCurrentSeria");
			const inputCardAllSeria: HTMLInputElement | null = document.querySelector("#inputCardAllSeria");
			const inputCardImage: HTMLInputElement | null = document.querySelector("#inputCardImage");

			const createCard = document.querySelector(".create-card-buttons__item-create");

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

							this.closeCard(this.pageBody, card, wrap);

							const parseCard = new ParseCard(cardInfo);

							if (dataCardInfo !== undefined && cardElement !== null) {
								parseCard.changeOneCard(cardElement);
							} else {
								parseCard.parseOneCard();
							}
						} else {
							console.log("Серии не чесла и не равны 0");
						}
					}
				});
			}
		}
	}

	buttonInit(): void {
		if (this.pageBody !== null && this.buttonCreate !== null) {
			this.buttonCreate.addEventListener("click", () => {
				this.init();
			});
		}
	}
}
