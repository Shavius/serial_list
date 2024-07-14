/* eslint-disable class-methods-use-this */

import IDataCard from "../interfaces/IDataCard";

export default class FirebaseControl {
	apiKey = "AIzaSyAq45dRJ0bhYpvQr42e0PpBq2CnMxSlq54";

	loginWithEmailPassword = async (email: string, password: string): Promise<string> => {
		const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`;
		const payload = {
			email,
			password,
			returnSecureToken: true,
		};

		const response = await fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(payload),
		});

		if (!response.ok) {
			const respo = response.json();
			console.error("Ошибка аутентификации", respo);

			return "error";
		}

		const data = await response.json();

		// Вы можете сохранить токен для дальнейшего использования
		const { idToken } = data;

		return idToken;
	};

	sendDataToDatabase = async (idToken: string, data: IDataCard[] | []): Promise<boolean> => {
		const url = `https://shava-list-default-rtdb.firebaseio.com/user.json?auth=${idToken}`;

		try {
			const response = await fetch(url, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (!response.ok) {
				throw new Error("Ошибка отправки данных");
			}

			return true;
		} catch (error) {
			console.error("Ошибка:", error);
			return false;
		}
	};

	getDataFromDatabase = async (idToken: string): Promise<IDataCard[] | null | []> => {
		const url = `https://shava-list-default-rtdb.firebaseio.com/user.json?auth=${idToken}`;

		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				throw new Error("Ошибка получения данных");
			}

			const data: IDataCard[] | [] = await response.json();

			return data;
		} catch (error) {
			console.error("Ошибка:", error);
			return null;
		}
	};
}
