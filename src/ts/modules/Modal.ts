/* eslint-disable class-methods-use-this */

export default class Modal {
	body: HTMLElement | null;

	constructor() {
		this.body = document.querySelector("body");
	}

	createModalOverlay(): HTMLElement {
		const modalOverlay = document.createElement("div");
		modalOverlay.classList.add("modal-overlay");

		return modalOverlay;
	}

	createModalAuthorization(): HTMLElement {
		const modalOverlay = this.createModalOverlay();
		modalOverlay.innerHTML = `
        <div class="modal">
            <div class="modal__title">Авторизація</div>
            <form class="modal-authorization" action="#" method="post">
                <label for="email">Пошта користувача</label>
                <input type="email" class="modal-authorization__email" id="email" name="email" required>

                <label for="password">Пароль</label>
                <input type="password" class="modal-authorization__password" id="password" name="password" required>

                <label for="user-id">ID</label>
                <input type="text" class="modal-authorization__user-id" id="user-id" name="user-id" required>

                <div class="modal-buttons">
                    <button class="modal-buttons__item modal__buttons-yes" type="submit">Увійти</button>
                    <button class="modal-buttons__item modal__buttons-no" type="button">Відміна</button>
                </div>
            </form>
		</div>
        `;

		return modalOverlay;
	}

	addModalToPage(): void {
		if (this.body !== null) {
			this.body.classList.add("body-lock");
			this.body.append(this.createModalAuthorization());
		}
	}

	removeModalToPage(): void {
		const body = document.querySelector("body");
		const modal = document.querySelector(".modal-overlay");
		if (modal !== null && body !== null) {
			modal.remove();
			body.classList.remove("body-lock");
		}
	}

	modalLoad(modalText = "you text"): void {
		const modal = document.querySelector(".modal");
		if (modal !== null) {
			modal.innerHTML = `
			<div class="modal__title">${modalText}</div>
			<div class="modal__loader"></div>
			`;
		}
	}

	modalYes(buttonText = "You text"): void {
		const modal = document.querySelector(".modal");
		if (modal !== null) {
			modal.innerHTML = `
			<div class="modal__title">${buttonText}</div>
			<div class="modal-buttons">
                    <button class="modal-buttons__item modal__buttons-yes" type="button">Закрити</button>
                </div>
			`;
		}

		const button: HTMLElement | null = document.querySelector(".modal__buttons-yes");
		if (button !== null) {
			button.addEventListener("click", () => {
				this.removeModalToPage();
			});
		}
	}

	modalError(buttonText = "You text"): void {
		const modal = document.querySelector(".modal");
		if (modal !== null) {
			modal.innerHTML = `
			<div class="modal__title modal__title--error">${buttonText}</div>
			<div class="modal-buttons">
                    <button class="modal-buttons__item modal__buttons-yes" type="button">Закрити</button>
                </div>
			`;
		}

		const button: HTMLElement | null = document.querySelector(".modal__buttons-yes");
		if (button !== null) {
			button.addEventListener("click", () => {
				this.removeModalToPage();
			});
		}
	}
}
