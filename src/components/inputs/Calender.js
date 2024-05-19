import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getYear, getMonth } from "date-fns";
import Right from '../../public/image/cal/right.svg';
import Left from '../../public/image/cal/left.svg';

const Calendar = ({ selectedDate, onChange, availableDates }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <DatePicker
      dateFormat="yyyy/MM/dd"
      selected={selectedDate}
      onChange={onChange}
      calendarClassName="calendar"
      renderCustomHeader={({
        date,
        decreaseMonth,
        increaseMonth,
        prevMonthButtonDisabled,
        nextMonthButtonDisabled,
      }) => (
        <div className='calendar_header'>
          <button onClick={(e) => { e.preventDefault(); decreaseMonth(); }} disabled={prevMonthButtonDisabled}>
            <img src={Left} alt='arrow' />
          </button>
          <div className='calendar_header_month_year'>
            <p>{months[getMonth(date)]}</p>
            <p>{getYear(date)}</p>
          </div>
          <button onClick={(e) => { e.preventDefault(); increaseMonth(); }} disabled={nextMonthButtonDisabled}>
            <img src={Right} alt='arrow' />
          </button>
        </div>
      )}
      inline
      fixedHeight
      filterDate={date => availableDates.some(availableDate => availableDate.toDateString() === date.toDateString())}
    />
  );
}

export default Calendar;
