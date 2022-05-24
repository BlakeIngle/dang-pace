import React, { useRef, useState } from 'react'
import Calendar from '../calendar/Calendar';

export default function PaceMaker() {

    // walk through making a pace target
    // pick a name
    // pick a date
    // set number of targets
    // done!

    return (
        <div>
            PaceMaker
            <PaceNameForm />
            <PaceDateSelect />
            <button>Next</button>
        </div>
    )
}

function PaceNameForm() {

    const [name, setName] = useState('Pace Picante')
    const inputRef = useRef(null);

    return (
        <div>
            <h3>Give Your Pace A Name:</h3>
            <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                ref={inputRef}
            />
        </div>
    )
}

function PaceDateSelect() {
    return (
        <Calendar />
    )
}

