/* eslint-disable class-methods-use-this */

export default class WindowAuthorization {
	body: HTMLElement | null;

	constructor() {
		this.body = document.querySelector("body");
	}

	createModal(): HTMLElement {
		const modalOverlay = document.createElement("div");
		modalOverlay.classList.add("modal-overlay");
		modalOverlay.innerHTML = `
		<div class="modal">
            <div class="modal__title">Авторизація</div>
            <form class="window-authorization" action="#" method="post">
                <label for="username">Ім'я користувача</label>
                <input type="text" id="username" name="username" required>

                <label for="password">Пароль</label>
                <input type="password" id="password" name="password" required>

                <label for="user-id">ID</label>
                <input type="text" id="user-id" name="user-id" required>

                <div class="window-authorization-button">
                    <button class="window-authorization-button__item authorization-button-yes" type="submit">Увійти</button>
                    <button class="window-authorization-button__item authorization-button-no" type="button">Відміна</button>
                </div>
            </form>
		</div>
        `;

		return modalOverlay;
	}

	closeModal(): void {
		if (this.body !== null) {
			this.body.classList.remove("body-lock");
			const modal = document.querySelector(".modal-overlay");
			modal?.remove();
		}
	}

	init(): void {
		if (this.body !== null) {
			this.body.classList.add("body-lock");
			const card = this.createModal();
			this.body.append(card);

			const buttonNo = document.querySelector(".authorization-button-no");
			if (buttonNo !== null) {
				buttonNo.addEventListener("click", () => {
					this.closeModal();
				});
			}

			const buttonYes = document.querySelector(".authorization-button-yes");
			if (buttonYes !== null) {
				buttonYes.addEventListener("click", (e) => {
					e.preventDefault();
					console.log("Button Yes");
				});
			}
		}
	}
}
