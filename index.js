module.exports = {
    startWorkingHour: 9,
    endWorkingHour: 17,
    workWeekLastDay: 5,

    isWorkingHours(date) {
        const hour = date.getHours();
        return hour > this.startWorkingHour && hour < this.endWorkingHour;
    },

    isWeekEnd(date) {
        const day = date.getDay();
        return day === 6 || day === 0;
    },

    minsUntilEndOfDay(date) {
        const submitMins = date.getMinutes();
        const submitHours = date.getHours() * 60;
        return (this.endWorkingHour * 60) - (submitMins + submitHours);
    },

    getDueDate(date, sumMinsToAdd) {
        const newMin = date.getMinutes() + sumMinsToAdd;
        let dueDate = new Date(date.setMinutes(newMin));
        const dayOfDueDate = dueDate.getDay();
        if (dayOfDueDate === 6) {
            dueDate.setMinutes(dueDate.getMinutes() + (48 * 60));
        }
        if (dayOfDueDate === 0) {
            dueDate.setMinutes(dueDate.getMinutes() + (24 * 60));
        }
        return dueDate.toLocaleString();
    },

    calculateDueDate(submitDate, turnAroundTime) {
        if (!this.isWorkingHours(submitDate) || this.isWeekEnd(submitDate)) {
            console.error("This bug's submission date is not valid");
            return false;
        }

        const workingHoursLength = this.endWorkingHour - this.startWorkingHour;
        const turnAroundTimeInMins = turnAroundTime * 60;
        const minsUntilEndOfDay = this.minsUntilEndOfDay(submitDate);
        const minsLeftFromTurnAroundTime = Math.max(turnAroundTimeInMins - minsUntilEndOfDay, 0);
        const daysLeftFromTurnAroundTimeInMins = Math.floor((minsLeftFromTurnAroundTime / 60) / workingHoursLength);
        const wholeDaysInMins = (daysLeftFromTurnAroundTimeInMins * 8) * 60;
        const leftOverMins = turnAroundTimeInMins - wholeDaysInMins;

        const hoursBetweenWorkDays = daysLeftFromTurnAroundTimeInMins || turnAroundTimeInMins > minsUntilEndOfDay
            ? (24 - this.endWorkingHour) + this.startWorkingHour : 0;
        const hoursToAdd = ((24 * daysLeftFromTurnAroundTimeInMins) + hoursBetweenWorkDays) * 60;
        const sumMinsToAdd = leftOverMins + hoursToAdd;
        const result = this.getDueDate(submitDate, sumMinsToAdd);
        return result;
    }
}