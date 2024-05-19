import React, { useEffect } from 'react';
import Circle from '../../public/image/circle-check.svg';

const Inputcomp = ({ label, type, options, onChange, defaultValue }) => {
    useEffect(() => {
        if (type === "select" && options.length > 0 && onChange) {
            // Set the default value on mount
            onChange({ target: { value: options[0] } });
        }
    }, [type, options, onChange]);

    return (
        <div className='input_component'>
            <label>{label ? label : "Enter label"}</label>
            {
                type === "select" &&
                (
                    <div className='form_control'>
                        <select value={defaultValue} onChange={onChange}>
                            {options.map((data, index) => (
                                <option key={index} value={data}>{data} Mins</option>
                            ))}
                        </select>
                    </div>
                )
            }
            {
                type === "timeslots" && (
                    <div className='timeSlot'>
                        {options.map((data, index) => (
                            <div className='input_radio' key={index}>
                                <input
                                    type="radio"
                                    id={`timeslot-${index}`}
                                    name="timeslot"
                                    value={data}
                                    onChange={onChange}
                                />
                                <label htmlFor={`timeslot-${index}`}>{data}</label>
                                <img src={Circle} alt='circle' className='icon' />
                            </div>
                        ))}
                    </div>
                )
            }
        </div>
    );
}

export default Inputcomp;
