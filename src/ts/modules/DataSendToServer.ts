/* eslint-disable class-methods-use-this */

import IDataCard from "../interfaces/IDataCard";
import IUserData from "../interfaces/IUserData";
import CardChange from "./CardChange";
import FirebaseControl from "./FirebaseControl";
import Modal from "./Modal";

export default class DataSendToServer {
	getCardsFromPage(): HTMLElement[] | null {
		const cards = document.querySelectorAll(".serial-card");

		if (cards.length > 0) {
			const cardsList = [...cards] as HTMLElement[];

			return cardsList;
		}

		return null;
	}

	getDataFromCards(): IDataCard[] | null {
		const cardList: HTMLElement[] | null = this.getCardsFromPage();
		const cardData: IDataCard[] = [];

		if (cardList !== null && cardList.length > 0) {
			cardList.forEach((card) => {
				const data: IDataCard | undefined = new CardChange(card).getDataCard();
				if (data !== undefined) {
					cardData.push(data);
				}
			});

			return cardData;
		}

		return null;
	}

	getUserData(): IUserData | null {
		const userDataString: string | null = localStorage.getItem("userData");

		if (userDataString !== null) {
			const userData: IUserData = JSON.parse(userDataString);
			return userData;
		}

		return null;
	}

	async pushToServer(userData: IUserData, dataCard: IDataCard[] | []): Promise<void> {
		const modal = new Modal();
		modal.addModalToPage();
		modal.modalLoad("Зачекайте іде відправка даних");

		const firebase = new FirebaseControl();
		const token = await firebase.loginWithEmailPassword(userData.email, userData.password, userData.id);

		if (token !== "error") {
			const responseToServer = await firebase.sendDataToDatabase(token, dataCard);

			if (responseToServer) {
				console.log("Отправил!");
				modal.removeModalToPage();
			} else {
				console.error("Не отправил");
				modal.modalError("Вибачте щось пішло не так, спробуйте вийти та авторізуватися знов");
			}
		} else {
			modal.modalError("Вибачте щось пішло не так, спробуйте вийти та авторізуватися знов");
		}
	}

	init(): void {
		const userData: IUserData | null = this.getUserData();
		const cardData: IDataCard[] | null = this.getDataFromCards();

		if (userData !== null && cardData !== null) {
			this.pushToServer(userData, cardData);
		}

		if (userData !== null && cardData === null) {
			this.pushToServer(userData, []);
		}
	}
}
