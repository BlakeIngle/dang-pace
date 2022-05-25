export class Pace {

    name;       // string
    targetDate; // date
    targets;    // number

    targetsDone;// number
    history;    // History[]

    dailyGoal;  // number

    constructor(obj) {
        obj.date = new Date(obj.date);
        obj.date.setHours(0, 0, 0, 0)

        Object.assign(this, obj);

        if (!this.targetsDone) {
            this.targetsDone = 0;
        }
        if (!this.history) {
            this.history = [];
        }
        if (!this.dailyGoal) {
            this.dailyGoal = Math.ceil(this.calculateDailyRequirement());
            console.log("daily required: ", this.dailyGoal);
        }
    }

    calculateDailyRequirement() {
        // get days remaining
        let daysRemaining = this.calculateDaysRemaining();

        let requiredPace = (this.targets - this.targetsDone) / daysRemaining;
        console.log(requiredPace)
        return requiredPace
    }

    calculateDaysRemaining() {
        // target date - today
        let date = new Date(this.targetDate);
        date.setHours(0, 0, 0, 0);
        let today = new Date();
        today.setHours(0, 0, 0, 0);

        // let msBetween = (date.getTime() - today.getTime())
        // let daysBetween = msBetween / (1000 * 60 * 60 * 24);

        let pointer = new Date(today);

        let count = 0;
        // loop while day ! same day as target day
        do {
            let dayNum = pointer.getDay();
            // if saturday or sunday
            if (dayNum == 6 || dayNum == 0) {
                // nothing
            } else {
                count++; // how many days are not weekends
            }

            pointer.setDate(pointer.getDate() + 1);
        } while (pointer.getDay() != date.getDay());

        // once 'today' points to same day as target
        // days between without weekends is = (d * 5/7)
        let msBetween = (date.getTime() - pointer.getTime())
        let daysBetween = msBetween / (1000 * 60 * 60 * 24);

        let weekdaysBetween = (daysBetween * (5 / 7)) + count;


        // console.log(daysBetween, " days between")
        // console.log(weekdaysBetween, " streaming days between")

        return +weekdaysBetween;

    }
}

class History {
    date;       // date
    targets;    // number
    targetsDone;// number
}