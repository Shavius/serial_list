/* eslint-disable class-methods-use-this */

export default class CreateFormCard {
	pageBody: HTMLElement | null;
	buttonCreate: HTMLElement | null;

	constructor(pageBody: HTMLElement | null, buttonCreate: HTMLElement | null) {
		this.pageBody = pageBody;
		this.buttonCreate = buttonCreate;
	}

	createForm(): HTMLElement {
		const card = document.createElement("div");
		card.classList.add("create-card-wrapper");
		card.innerHTML = `
        <div class="card-wrapper">
			<div class="create-card">
				<div class="create-card__exit">Закрити</div>
				<div class="create-card__title">Створення картки</div>
				<div class="create-card__inputs create-card-input">
					<div class="create-card-input__item-text">Додати назву</div>
					<input id="inputCardName" class="create-card-input__item-text-input" type="text" value="Назва Серіала" />
					<div class="create-card-input__item-text">Поточна серія</div>
					<input id="inputCardCurrentSeria" class="create-card-input__item-text-input" type="number" value="0" />
					<div class="create-card-input__item-text">Всього серій</div>
					<input id="inputCardAllSeria" class="create-card-input__item-text-input" type="number" value="0" />
					<div class="create-card-input__item-text">Додати зображення</div>
					<input id="inputCardImage" class="create-card-input__item-text-input" type="text" />
				</div>
				<div class="create-card-buttons">
					<div class="create-card-buttons__item create-card-buttons__item-create">Створити</div>
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

	getCurrentDate(): string {
		const currentDate = new Date();
		const dateA = currentDate.toLocaleDateString("ua-UA", { day: "numeric", month: "numeric", year: "numeric" });
		return dateA;
	}

	activate(): void {
		if (this.pageBody !== null && this.buttonCreate != null) {
			this.buttonCreate.addEventListener("click", () => {
				const wrap = this.createBlackWrapper();
				const card = this.createForm();

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
							const inputCurrentSeria = Number(+inputCardCurrentSeria.value);
							const inputAlltSeria = Number(+inputCardAllSeria.value);

							if (inputCurrentSeria >= 0 && inputAlltSeria >= 0) {
								const cardInfo = {
									cardName: inputCardName.value,
									cardCurrentSeria: inputCurrentSeria,
									cardAllSeria: inputAlltSeria,
									cardImg: inputCardImage.value,
									dateCreate: this.getCurrentDate(),
									dateUpdate: this.getCurrentDate(),
								};

								console.table(cardInfo);

								this.closeCard(this.pageBody, card, wrap);
							} else {
								console.log("Серии не чесла и не равны 0");
							}
						}
					});
				}
			});
		}
	}
}
