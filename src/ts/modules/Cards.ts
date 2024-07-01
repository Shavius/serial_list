/* eslint-disable class-methods-use-this */

export default class Cards {
	createCardLoad(): HTMLElement {
		const cardLoad: HTMLElement = document.createElement("div");
		cardLoad.classList.add("card-load");
		cardLoad.innerHTML = `
        <div class="card-load__title">Зачекайте йде завантаженя</div>
        <div class="loader">
            <div class="loader__item"></div>
        </div>
        `;

		return cardLoad;
	}

	createEmptyCard(): HTMLElement {
		const emptyCard: HTMLElement = document.createElement("div");
		emptyCard.classList.add("card-load");
		emptyCard.innerHTML = `
        <div class="card-load__title">Ваш список порожний</div>
        `;

		return emptyCard;
	}

	addCard(card: HTMLElement | null): HTMLElement | null {
		const mainContent = document.querySelector(".main__content");

		if (mainContent !== null && card !== null) {
			mainContent.innerHTML = "";
			mainContent.append(card);

			return card;
		}

		return null;
	}
}
