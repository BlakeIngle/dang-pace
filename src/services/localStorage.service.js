const { Pace } = require("../models/Pace.class");

function addPace(pace) {
    localStorage.setItem('pace', JSON.stringify(pace))
}

function getPace() {
    let localValue = localStorage.getItem('pace');
    let localObj = JSON.parse(localValue)
    let pace = new Pace(localObj);
    console.log(localValue, localObj, pace);
    return pace;
}

exports.useLocalStorage = () => {
    return {
        addPace,
        getPace
    }
}