/* eslint-disable class-methods-use-this */

interface IOneCard {
	cardName: string;
	cardCurrentSeria: number;
	cardAllSeria: number;
	cardImg: string;
	dateCreate: string;
	dateUpdate: string;
}

export default class ParseCard {
	pageMainContent: HTMLElement | null;
	oneCard: IOneCard;

	constructor(oneCard: IOneCard) {
		this.pageMainContent = document.querySelector(".main__content");
		this.oneCard = oneCard;
	}

	createCard(): HTMLElement {
		const name = this.oneCard.cardName;
		const img = this.oneCard.cardImg;
		const currentSeria = this.oneCard.cardCurrentSeria;
		const allSeria = this.oneCard.cardAllSeria;

		const card = document.createElement("div");
		card.classList.add("serial-card");

		card.innerHTML = `
        <div class="serial-card__top-buttons top-buttons">
            <div class="top-buttons__item serial-card__button-delete">Видалити</div>
        </div>
        <div class="serial-card__container">
            <div class="serial-card__img-wrapper"></div>
            <div class="serial-card__content-wrapper">
                <div class="serial-card__title">${name}</div>
                <div class="serial-card__serial-info serial-info">
                    <div class="serial-info__item serial-info__number-current">
                        Поточна серія: <span>${currentSeria}</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="card-buttons">
            <div class="card-buttons__item">+</div>
            <div class="card-buttons__item">-</div>
        </div>
        <div class="card-date">
            <div class="card-date__item">Створенно: <span>${this.oneCard.dateCreate}</span></div>
            <div class="card-date__item">Оновленно: <span>${this.oneCard.dateUpdate}</span></div>
        </div>
        `;

		if (img.length > 0) {
			const imgElement = card.querySelector(".serial-card__img-wrapper");
			if (imgElement !== null) {
				imgElement.innerHTML = `
                <img
                    class="serial-card__img"
                    src="${img}"
                    alt="Зображення"
                 />
                `;
			}
		}

		if (allSeria !== 0 && allSeria >= currentSeria) {
			const serialInfoElement = card.querySelector(".serial-card__serial-info");
			if (serialInfoElement !== null) {
				const allSeriaElement = document.createElement("div");
				allSeriaElement.className = "serial-info__item serial-info__number-all";
				allSeriaElement.innerHTML = `Всього серій: <span>${allSeria}</span>`;

				const leftSeriaElement = document.createElement("div");
				leftSeriaElement.className = "serial-info__item serial-info__number-left";
				leftSeriaElement.innerHTML = `Залишилось сериій: <span>${allSeria - currentSeria}</span>`;

				serialInfoElement.append(allSeriaElement);
				serialInfoElement.append(leftSeriaElement);
			}
		}

		return card;
	}

	parseOneCard(): void {
		if (this.pageMainContent !== null) {
			this.pageMainContent.append(this.createCard());
		}
	}
}
