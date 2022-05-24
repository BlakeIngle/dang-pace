import React from 'react'
import './Wizard.css'

export default function Wizard({ step, next, children }) {

    return (
        <div className="wizard-root">
            <div className="steps-container">
                {children.map((child, i) => (
                    <div key={i}
                        style={{ "--order": i - step }}>
                        {child}
                    </div>
                ))}
            </div>
        </div>
    )
}
