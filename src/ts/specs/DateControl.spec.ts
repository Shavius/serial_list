import DateControl from "../modules/DateControl";

describe("DateControl", () => {
	it("getCurrentDate", () => {
		const myCurrentDate = new Date();
		const myCurrentData = myCurrentDate.toLocaleDateString("ua-UA", {
			day: "numeric",
			month: "numeric",
			year: "numeric",
		});

		const dateControl = new DateControl();
		const currentData = dateControl.getCurrentDate();

		expect(currentData).toBe(myCurrentData);
	});
});
