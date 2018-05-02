const index = require("./index");

const submitDates = [
    new Date("2018.05.07. 02:00 PM"),
    new Date("2018.05.08. 03:00 PM"),
    new Date("2018.05.09. 04:50 PM"),
    new Date("2018.05.10. 10:40 AM"),
    new Date("2018.05.11. 04:00 PM")
];
const turnAroundTimes = [3, 5, 24, 8, 32, 12, 2, 40];
console.log(index.calculateDueDate(submitDates[1], turnAroundTimes[0]));