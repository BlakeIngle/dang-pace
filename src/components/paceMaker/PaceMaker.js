import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router';
import { Pace } from '../../models/Pace.class';
import { useLocalStorage } from '../../services/localStorage.service';
import Calendar from '../calendar/Calendar';
import Wizard from '../wizard/Wizard';
import './PaceMaker.css'

export default function PaceMaker() {

    const navigate = useNavigate();
    const localStorageService = useLocalStorage();

    let tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const [pace, setPace] = useState({
        name: 'Pace Picante',
        date: tomorrow,
        targets: 100
    });
    const maxSteps = 3;
    const [stepNumber, setStepNumber] = useState(0)

    function setName(newName) {
        setPace({
            ...pace,
            name: newName
        })
    }
    function setTargets(newTargetNum) {
        newTargetNum = Number(newTargetNum);
        if (isNaN(newTargetNum)) {
            return;
        } else {
            setPace({
                ...pace,
                targets: newTargetNum
            })
        }
    }
    function setDate(newDate) {
        setPace({
            ...pace,
            date: newDate
        });
    }

    const canGoForward = stepNumber < maxSteps - 1;
    const canGoBack = stepNumber > 0;

    function stepForward() {
        if (canGoForward) {
            setStepNumber(stepNumber + 1);
        }
    }

    function stepBack() {
        if (canGoBack) {
            setStepNumber(stepNumber - 1);
        }
    }

    function createPace() {
        if (pace.name && pace.targets > 0) {
            // create pace
            console.log("making pace")

            localStorageService.addPace(new Pace(pace))
            // TODO: animate
            navigate('/');
        } else {
            // something is not right
        }
    }

    const nameForm = (
        <PaceNameForm
            name={pace.name}
            setName={setName}
            onSubmit={stepForward} />
    );

    const dateForm = (
        <Calendar onDaySelected={date => setDate(date)} />
    );

    const targetsForm = (
        <PaceTargetsForm
            targets={pace.targets}
            setTargets={setTargets}
            onSubmit={stepForward} />
    );

    return (
        <div className="pace-maker-root">
            <h2>{pace.name || "Pace Picante"}</h2>
            <h3>Hit {pace.targets}
                {pace.targets == 1 ? ' target ' : ' targets '}
                before
                <br />
                {' ' + pace.date.toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </h3>
            <hr />
            <Wizard step={stepNumber}
                next={stepForward}
            >
                {nameForm}
                {dateForm}
                {targetsForm}
            </Wizard>
            <div className="step-buttons">
                <button onClick={stepBack}
                    disabled={!canGoBack}>
                    Back
                </button>
                <button onClick={stepForward}
                    disabled={!canGoForward}>
                    Next
                </button>
            </div>

            <button onClick={createPace}
                disabled={canGoForward}>
                Create
            </button>
        </div>
    )
}

function PaceNameForm({ name, setName, onSubmit }) {

    const inputRef = useRef(null);

    function handleFormSubmit(e) {
        e.preventDefault();
        if (onSubmit) {
            onSubmit();
        }
    }

    return (
        <form className="pace-name-form" onSubmit={handleFormSubmit}>
            <h3>Pick(ante) a name:</h3>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                ref={inputRef}
            />
        </form>
    )
}

function PaceTargetsForm({ onSubmit, targets, setTargets }) {

    function handleFormSubmit(e) {
        e.preventDefault();
        if (onSubmit) {
            onSubmit();
        }
    }

    return (
        <form className="pace-targets-form"
            onSubmit={handleFormSubmit}>
            <h3>How Many Targets?</h3>
            <button type="button"
                onClick={() => { setTargets(targets - 1) }}
                disabled={targets < 1}>
                <FontAwesomeIcon icon={faMinus} />
            </button>
            <input type="number"
                value={targets}
                onChange={e => setTargets(Number(e.target.value))} />
            <button type="button"
                onClick={() => { setTargets(targets + 1) }}>
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </form>
    )
}
