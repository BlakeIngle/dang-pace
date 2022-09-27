export class Pace {

    name;       // string
    targetDate; // date
    targets;    // number

    targetsDone;// number
    history;    // History[]

    dailyGoal;  // number

    currentDay; // date -> updates when opening app
    todaysGoal; // number
    targetsDoneToday; // number

    dailyRequired;

    constructor(obj) {
        obj.date = new Date(obj.date);
        obj.date.setHours(0, 0, 0, 0)

        Object.assign(this, obj);

        if (obj.date) {
            this.targetDate = new Date(obj.date);
        }

        if (!this.targetsDone) {
            this.targetsDone = 0;
        }
        if (obj.history) {
            // deep copy of history objects
            this.history = [...obj.history.map(h => {
                return { ...h }
            })];
        }
        if (!this.dailyGoal) {
            this.dailyGoal = Math.ceil(this.calculateDailyRequirement());
        }
        if (obj.currentDay) {
            this.currentDay = new Date(this.currentDay);
        }
    }

    calculateDailyRequirement() {

        // get days remaining
        let daysRemaining = this.calculateDaysRemaining();

        let requiredPace = (this.targets - this.targetsDone) / daysRemaining;
        console.log(requiredPace);
        return requiredPace;
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

        return Number(weekdaysBetween);
    }

    initToday() {
        if (this.currentDay) {
            // log history
            this.history.push({
                date: new Date(this.currentDay),
                goal: this.todaysGoal,
                targetsDone: this.targetsDoneToday
            });
        }

        // first day
        this.currentDay = new Date();
        this.currentDay.setHours(0, 0, 0, 0);

        this.todaysGoal = this.dailyGoal;
        this.targetsDoneToday = 0;

        // and update daily requirement
        this.dailyRequired = this.calculateDailyRequirement();
    }

    isUpToDate() {
        if (!this.currentDay) {
            return false;
        }
        let today = new Date();
        today.setHours(0, 0, 0, 0);

        this.currentDay.setHours(0, 0, 0, 0);
        if (this.currentDay.getTime() == today.getTime()) {
            return true;
        }

        return false;
    }
}

class Target {
    name; // string
    detail; // string
    hint; // string
    type; // 'boss' 'enemy' 'achievement' 'event'
}