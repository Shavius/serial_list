/* eslint-disable class-methods-use-this */

import FirebaseControl from "./FirebaseControl";

interface userDataText {
	userEmail: string;
	userPassword: string;
	userId: string;
}

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
                <label for="email">Пошта користувача</label>
                <input type="email" class="window-authorization__email" id="email" name="email" required>

                <label for="password">Пароль</label>
                <input type="password" class="window-authorization__password" id="password" name="password" required>

                <label for="user-id">ID</label>
                <input type="text" class="window-authorization__user-id" id="user-id" name="user-id" required>

                <div class="window-authorization-button">
                    <button class="window-authorization-button__item authorization-button-yes" type="submit">Увійти</button>
                    <button class="window-authorization-button__item authorization-button-no" type="button">Відміна</button>
                </div>
            </form>
		</div>
        `;

		return modalOverlay;
	}

	modalLoad(): void {
		const modal = document.querySelector(".modal");
		if (modal !== null) {
			modal.innerHTML = `
			<div class="modal__title">Зачекайте йде переаірка</div>
			<div class="modal__loader"></div>
			`;
		}
	}

	modalYes(): void {
		const modal = document.querySelector(".modal");
		if (modal !== null) {
			modal.innerHTML = `
			<div class="modal__title">Перевірка пройшла вдало</div>
			<div class="window-authorization-button">
                    <button class="window-authorization-button__item" type="button">Закрити</button>
                </div>
			`;
		}

		const button: HTMLElement | null = document.querySelector(".window-authorization-button__item");
		if (button !== null) {
			button.addEventListener("click", () => {
				this.closeModal();
			});
		}
	}

	modalError(): void {
		const modal = document.querySelector(".modal");
		if (modal !== null) {
			modal.innerHTML = `
			<div class="modal__title modal__title--error">В доступі відмовленно!</div>
			<div class="window-authorization-button">
                    <button class="window-authorization-button__item" type="button">Закрити</button>
                </div>
			`;
		}

		const button: HTMLElement | null = document.querySelector(".window-authorization-button__item");
		if (button !== null) {
			button.addEventListener("click", () => {
				this.closeModal();
			});
		}
	}

	closeModal(): void {
		if (this.body !== null) {
			this.body.classList.remove("body-lock");
			const modal = document.querySelector(".modal-overlay");
			modal?.remove();
		}
	}

	getDataFromModal(): userDataText | null {
		const userEmailText: HTMLInputElement | null = document.querySelector(".window-authorization__email");
		const userPasswordText: HTMLInputElement | null = document.querySelector(".window-authorization__password");
		const userIdText: HTMLInputElement | null = document.querySelector(".window-authorization__user-id");

		if (userEmailText !== null && userPasswordText !== null && userIdText !== null) {
			return {
				userEmail: userEmailText.value,
				userPassword: userPasswordText.value,
				userId: userIdText.value,
			};
		}

		return null;
	}

	async complite(email: string, password: string, id: string): Promise<void> {
		this.modalLoad();
		try {
			const firebase = new FirebaseControl();
			const token = await firebase.loginWithEmailPassword(email, password, id);
			if (token !== "error") {
				const data = JSON.stringify(token);
				localStorage.setItem("userToken", data);
				this.modalYes();
			} else {
				this.modalError();
			}
		} catch (e) {
			console.error(e);
			this.modalError();
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
					const userData: userDataText | null = this.getDataFromModal();

					if (
						userData !== null &&
						userData.userEmail !== "" &&
						userData.userPassword !== "" &&
						userData.userId !== ""
					) {
						this.complite(userData.userEmail, userData.userPassword, userData.userId);
					}
				});
			}
		}
	}
}
