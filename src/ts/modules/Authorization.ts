/* eslint-disable class-methods-use-this */

import IUserData from "../interfaces/IUserData";
import FirebaseControl from "./FirebaseControl";
import ModalAuthorization from "./ModalAuthorization";

export default class Authorization {
	modal: ModalAuthorization;

	constructor() {
		this.modal = new ModalAuthorization();
	}

	getDataFromModal(): IUserData | null {
		const userEmailText: HTMLInputElement | null = document.querySelector(".modal-authorization__email");
		const userPasswordText: HTMLInputElement | null = document.querySelector(".modal-authorization__password");
		const userIdText: HTMLInputElement | null = document.querySelector(".modal-authorization__user-id");

		if (userEmailText !== null && userPasswordText !== null && userIdText !== null) {
			return {
				email: userEmailText.value,
				password: userPasswordText.value,
				id: userIdText.value,
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
				const userData: IUserData = { email, password, id };
				const userDataText = JSON.stringify(userData);
				localStorage.setItem("userData", userDataText);

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
				const userData: IUserData | null = this.getDataFromModal();

				if (userData !== null && userData.email !== "" && userData.password !== "" && userData.id !== "") {
					this.complite(userData.email, userData.password, userData.id);
				}
			});
		}
	}
}
