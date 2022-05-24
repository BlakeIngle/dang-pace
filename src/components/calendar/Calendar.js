import React, { createContext, useEffect, useState } from 'react'
import './Calendar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons';

var Context = createContext(null);

export default function Calendar() {
    var [date, setDate] = useState(new Date());
    var [today, setToday] = useState(new Date());
    var [visibleMonth, setVisibleMonth] = useState([]); // empty []

    function generateMonth() {
        let first = new Date(date);
        first.setDate(1);
        first.setDate(first.getDate() - first.getDay());
        // this is the last day of the previous month now
        // ex: selected date = August 14 -> first = July 31

        // 5 weeks with 7 days
        var newMonth = [...Array(5 * 7)].map((week, i) => {
            let newDate = new Date(first);
            newDate.setDate(first.getDate() + i);
            return newDate;
        });

        // check if there is a 6th week
        let last = newMonth[5 * 7 - 1]; // 5th week 7th day

        if (last.getDate() < 7) {
            // last day in the 'month' array
            // this means the last day of last month ended
            // in the same week
        } else {
            // also check if last day in 'month' is actually the last day
            let d = new Date(last);
            d.setDate(d.getDate() + 1);
            if (d.getDate() != 1) {
                // there are still days to add to the calendar month
                //generate a week
                let i = 5 * 7;
                for (let j = 0; j < 7; j++) {
                    //generate a day
                    let newDate = new Date(first);
                    newDate.setDate(first.getDate() + i + j);
                    newMonth.push(newDate);
                }
            }
        }

        setVisibleMonth(newMonth);
    }

    function adjustMonthWithArrows(monthOffset) {
        let newDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
        newDate.setMonth(newDate.getMonth() + monthOffset);

        onNewDateSelected(newDate);
    }

    function onNewDateSelected(newDate) {
        if (newDate.getTime() < today.getTime()) {
            newDate = new Date(today);
        }

        setDate(newDate);
    }

    useEffect(() => {
        generateMonth();
    }, []);

    useEffect(() => {
        // console.log(visibleMonth);
    }, [visibleMonth]);

    useEffect(() => {
        generateMonth();
    }, [date]);

    const isNavBackDisabled =
        date.getFullYear() <= today.getFullYear() &&
            date.getMonth() <= today.getMonth()
            ? true
            : false;

    return (
        <Context.Provider
            value={{ selectedDate: date, setSelectedDate: setDate, today }}
        >
            <div className="calendar-root">
                <div className="navigation">
                    <button
                        onClick={() => {
                            adjustMonthWithArrows(-1);
                        }}
                        className={`month-pick ${isNavBackDisabled ? "dark" : ""}`}
                        disabled={isNavBackDisabled}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <div>
                        {date.toLocaleDateString("en-GB", {
                            year: "numeric",
                            month: "long"
                        })}
                    </div>
                    <button
                        onClick={() => {
                            adjustMonthWithArrows(1);
                        }}
                        className="month-pick"
                    >
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>
                <div className="day-abbr">
                    <div>Su</div>
                    <div>M</div>
                    <div>Tu</div>
                    <div>W</div>
                    <div>Th</div>
                    <div>F</div>
                    <div>Sa</div>
                </div>
                <div className="calendar">

                    {visibleMonth.map((d, i) => (
                        <Day key={i} date={d} />
                    ))}
                </div>
            </div>
        </Context.Provider>
    );

}

function Day({ date, name }) {
    var { selectedDate, setSelectedDate, today } = React.useContext(Context);

    function onDayClicked() {
        if (!active && !isInPast) {
            setSelectedDate(date);
        }
    }

    const active = doDatesMatch(date, selectedDate) ? true : false;
    const isInOtherMonth = !doMonthsMatch(date, selectedDate) ? true : false;
    const isInPast = isDateBeforeAnotherDate(date, today) ? true : false;

    return (
        <div
            onClick={onDayClicked}
            className={`day-root 
						${active ? "active" : ""}
						${isInOtherMonth ? "other-month" : ""}
						${isInPast ? "past" : ""}`}
        >
            {date.getDate()}
        </div>
    );
};

// helper functions
function doYearsMatch(a, b) {
    return a.getFullYear() == b.getFullYear();
}

function doMonthsMatch(a, b) {
    return doYearsMatch(a, b) && a.getMonth() == b.getMonth();
}

function doDatesMatch(a, b) {
    return doMonthsMatch(a, b) && a.getDate() == b.getDate();
}

function isDateBeforeAnotherDate(a, b) {
    // return if a is before b
    return a.getTime() < b.getTime() && !doDatesMatch(a, b);
}