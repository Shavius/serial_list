/* eslint-disable class-methods-use-this */

import FirebaseControl from "./FirebaseControl";
import ModalAuthorization from "./ModalAuthorization";

interface userDataText {
	userEmail: string;
	userPassword: string;
	userId: string;
}

export default class Authorization {
	modal: ModalAuthorization;

	constructor() {
		this.modal = new ModalAuthorization();
	}

	getDataFromModal(): userDataText | null {
		const userEmailText: HTMLInputElement | null = document.querySelector(".modal-authorization__email");
		const userPasswordText: HTMLInputElement | null = document.querySelector(".modal-authorization__password");
		const userIdText: HTMLInputElement | null = document.querySelector(".modal-authorization__user-id");

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
		this.modal.modalLoad("Йде перевірка зачикайте");
		try {
			const firebase = new FirebaseControl();
			const token = await firebase.loginWithEmailPassword(email, password, id);
			if (token !== "error") {
				const data = JSON.stringify(token);
				localStorage.setItem("userToken", data);
				this.modal.modalYes("Перевірка пройшла вдало!");
			} else {
				this.modal.modalError("В доступі відмовлено!");
			}
		} catch (e) {
			console.error(e);
			this.modal.modalError("В доступі відмовлено!");
		}
	}

	init(): void {
		this.modal.addModalToPage();

		const buttonNo = document.querySelector(".modal__buttons-no");
		if (buttonNo !== null) {
			buttonNo.addEventListener("click", () => {
				this.modal.removeModalToPage();
			});
		}

		const buttonYes = document.querySelector(".modal__buttons-yes");
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
