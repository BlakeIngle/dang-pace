import React from 'react'
import { Pace } from '../../models/Pace.class'

/**
 * 
 * @param {{pace: Pace}} param0 
 * @returns 
 */
export default function PaceDisplay({ pace }) {
    return (
        <div>
            <h1>{pace.name}</h1>
            <h2>{pace.targetsDone} / {pace.targets}</h2>

            <h3>{pace.targets - pace.targetsDone} Targets Remaining</h3>

            <h4>{pace.calculateDaysRemaining()} days remaining</h4>
        </div>
    )
}
