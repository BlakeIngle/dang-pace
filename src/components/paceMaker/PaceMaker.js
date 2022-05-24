import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react'
import Calendar from '../calendar/Calendar';
import Wizard from '../wizard/Wizard';
import './PaceMaker.css'

export default function PaceMaker() {

    const [pace, setPace] = useState({
        name: 'Pace Picante',
        date: new Date(),
        targets: 100
    });
    const [stepNumber, setStepNumber] = useState(0)

    // walk through making a pace target
    // pick a name
    // pick a date
    // set number of targets
    // done!

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

    function nextStep() {
        setStepNumber(stepNumber + 1);
    }

    const nameForm = (
        <PaceNameForm
            name={pace.name}
            setName={setName}
            onSubmit={nextStep} />
    )

    const dateForm = (
        <PaceDateSelect
            date={pace.date}
            setDate={setDate}
            onSubmit={nextStep} />
    );

    const targetsForm = (
        <PaceTargetsForm
            targets={pace.targets}
            setTargets={setTargets}
            onSubmit={nextStep} />
    );

    return (
        <div className="pace-maker-root">
            <h2>{pace.name}</h2>
            <h3>Hit {pace.targets}
                {pace.targets == 1 ? ' target ' : ' targets '}
                by
                {' ' + pace.date.toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })}
            </h3>
            <Wizard step={stepNumber}
                next={nextStep}
            >
                {nameForm}
                {dateForm}
                {targetsForm}
            </Wizard>

            <button onClick={() => setStepNumber(stepNumber + 1)}>
                Next
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
        <form onSubmit={handleFormSubmit}>
            <h3>Give your Pace a name:</h3>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                ref={inputRef}
            />
        </form>
    )
}

function PaceDateSelect({ onSubmit, date, setDate }) {
    return (

        <div>
            <Calendar />
            <div>date selected:
                <span>
                    {date.toLocaleDateString(undefined, date.toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    }))}
                </span>
            </div>
        </div>
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
        <form className="targets"
            onSubmit={handleFormSubmit}>
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
