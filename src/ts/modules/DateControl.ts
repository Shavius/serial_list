/* eslint-disable class-methods-use-this */
export default class DateControl {
	getCurrentDate(): string {
		const currentDate = new Date();
		const date = currentDate.toLocaleDateString("ua-UA", { day: "numeric", month: "numeric", year: "numeric" });
		return date;
	}
}
