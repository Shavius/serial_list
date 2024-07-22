/* eslint-disable class-methods-use-this */

export default class UserExit {
	removeUser(): void {
		localStorage.clear();
		window.location.reload();
	}

	init(): void {
		this.removeUser();
	}
}
