/* eslint-disable class-methods-use-this */

export default class FirebaseControl {
	loginWithEmailPassword = async (email: string, password: string, apiKey: string): Promise<string> => {
		const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
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
		console.log("Успешная аутентификация:", data);

		// Вы можете сохранить токен для дальнейшего использования
		const { idToken } = data;
		console.log(idToken);

		return idToken;
	};
}
