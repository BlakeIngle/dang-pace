import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Pace } from '../../models/Pace.class';
import HardW from '../hardW/HardW';
import './PaceDashboard.css';

/**
 * 
 * @param {{pace: Pace}} param0 
 * @returns 
 */
export default function PaceDashboard({ pace }) {

    let streamingDays = pace.calculateDaysRemaining();

    useEffect(() => {
        if (!pace.isUpToDate()) {
            pace.initToday();
            // localStorageService.addPace(pace);
        } else {
            console.log(pace.todaysGoal, pace.currentDay, pace.targetsDoneToday)
        }
    }, [])

    return (
        <div className="dashboard-root">
            <DashboardNav />
            <div className="dash-card">

                <h1>{pace.name}</h1>
                <h2>{pace.targetsDone} / {pace.targets}</h2>

                <h3>{pace.targets - pace.targetsDone} Targets Remain</h3>

                <h4>{streamingDays} streaming days remain</h4>

                <progress value={pace.targetsDone} max={pace.targets}> 32% </progress>
            </div>
            <div className="dash-card">

                <h2>Today:</h2>

                <h4>Required: {pace.dailyRequired.toFixed(2)}</h4>
                <h4>Goal: {pace.todaysGoal}</h4>
                <h4>Done: {pace.targetsDoneToday}</h4>
                <progress value={pace.targetsDoneToday}
                    max={pace.todaysGoal} />
            </div>
            <HardW />
        </div>
    )
}

/**
 * 
 * @param {{pace: Pace}} param0 
 * @returns 
 */
function DashboardNav({ pace }) {
    return (
        <nav>
            <Link to="/" >
                Home
            </Link>
        </nav>
    )
}
