/* eslint-disable class-methods-use-this */
import CreateFormCard from "./CreateFormCard";

export default class CardDelete {
	cardElement: HTMLElement | null;

	constructor(cardElement: HTMLElement | null) {
		this.cardElement = cardElement;
	}

	createDeleteWindow(): HTMLElement | null {
		if (this.cardElement !== null) {
			const deleteWindow = document.createElement("div");
			deleteWindow.classList.add("delete-window");
			const serialName = this.cardElement.querySelector(".serial-card__title")?.innerHTML;

			deleteWindow.innerHTML = `
        <div class="delete-window__title">Видалити серіал ?</div>
			<div class="delete-window__title-serial">${serialName}</div>
			<div class="delete-window__buttons">
				<div class="delete-window__buttons-item delete-window__buttons-yes">Так</div>
				<div class="delete-window__buttons-item delete-window__buttons-no">Ні</div>
		</div>
        `;

			return deleteWindow;
		}

		return null;
	}

	init(): void {
		if (this.cardElement !== null) {
			const body = document.querySelector("body");
			if (body !== null) {
				const createFormCard = new CreateFormCard(null, body);
				const wrap = createFormCard.createBlackWrapper();
				const deleteWindow = this.createDeleteWindow();

				if (deleteWindow !== null) {
					body.classList.add("body-blocked");
					body.append(wrap);
					body.append(deleteWindow);

					const buttonDelete = deleteWindow.querySelector(".delete-window__buttons-yes");
					const buttonNoDelete = deleteWindow.querySelector(".delete-window__buttons-no");

					if (buttonDelete !== null && buttonNoDelete !== null) {
						buttonDelete.addEventListener("click", () => {
							this.cardElement?.remove();
							createFormCard.closeCard(body, deleteWindow, wrap);
						});

						buttonNoDelete.addEventListener("click", () => {
							createFormCard.closeCard(body, deleteWindow, wrap);
						});
					}
				}
			}
		}
	}
}
