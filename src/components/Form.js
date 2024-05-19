import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTimeslots } from '../reducers/timeslotSlice';
import Arrow from '../public/image/chevron-right.svg';
import Calender from './inputs/Calender';
import Inputcomp from './inputs/Inputcomp';
import NoData from '../public/image/nodata.svg';
import Mail from '../public/image/mail.svg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.timeslot);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [selectedTimeslot, setSelectedTimeslot] = useState(null);
    const [formError, setFormError] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        dispatch(fetchTimeslots());
    }, [dispatch]);

    useEffect(() => {
        if (isSubmitted) {
            const timer = setTimeout(() => {
                resetForm();
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isSubmitted]);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedVariant(null);
        setSelectedTimeslot(null);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Submit button clicked');
        setFormError(null);
        if (!selectedVariant || !selectedTimeslot) {
            const errorMessage = "Please select a variant and a timeslot.";
            setFormError(errorMessage);
            toast.error(errorMessage);
            return false;
        }

        setTimeout(() => {
            console.log('Form submitted', { selectedDate, selectedVariant, selectedTimeslot });
            setIsSubmitted(true);
        }, 1000);
    };

    const resetForm = () => {
        setSelectedDate(new Date());
        setSelectedVariant(null);
        setSelectedTimeslot(null);
        setFormError(null);
        setIsSubmitted(false);
    };

    const availableDates = data.map(slot => new Date(slot.date));
    const selectedDaySlots = data.find(slot => new Date(slot.date).toDateString() === selectedDate.toDateString());

    // Grouping unique variants
    const variants = selectedDaySlots ? [...new Set(selectedDaySlots.slots.map(slot => {
        const start = new Date(slot.start_time);
        const end = new Date(slot.end_time);
        return Math.floor((end - start) / (1000 * 60));
    }))] : [];

    // Filter time slots based on selected variant
    const filteredSlots = selectedDaySlots ? selectedDaySlots.slots.filter(slot => {
        const start = new Date(slot.start_time);
        const end = new Date(slot.end_time);
        return Math.floor((end - start) / (1000 * 60)) === parseInt(selectedVariant);
    }) : [];

    const timeSlots = filteredSlots.map(slot => {
        const start = new Date(slot.start_time).toLocaleTimeString();
        const end = new Date(slot.end_time).toLocaleTimeString();
        return `${start} - ${end}`;
    });

    if (isSubmitted) {
        return (
            <div className="booking_section">
                <div className='success_block'>
                    <img
                        src={Mail}
                        width={300}
                        alt='booked'
                        style={{
                            maxWidth: '100%',
                            marginBottom: '2rem'
                        }}
                    />
                    <h2>Your appointment has been booked</h2>
                    <p>Thank you for scheduling your appointment with us.</p>
                </div>
            </div>
        );
    }

    return (
        <form className='booking_section' onSubmit={handleSubmit}>
            <div className='booking_main'>
                <div className='left_panel'>
                    <div className='header_panel'>
                        <h2>Test Service</h2>
                        <p><span>Timezone:</span> Asia/Calcutta</p>
                    </div>
                    <div className='calender_panel'>
                        <Calender selectedDate={selectedDate} onChange={handleDateChange} availableDates={availableDates} />
                    </div>
                </div>
                <div className='right_panel'>
                    {selectedDaySlots && selectedDaySlots.slots.length > 0 ? (
                        <>
                            <Inputcomp
                                label="Select FROM Variants"
                                type="select"
                                options={variants}
                                onChange={(e) => setSelectedVariant(e.target.value)}
                                defaultValue={selectedVariant || variants[0]}
                            />
                            <hr className='border_line' />
                            <Inputcomp
                                label={`${selectedDate.toDateString()} - Available Slots`}
                                type="timeslots"
                                options={timeSlots}
                                onChange={(e) => setSelectedTimeslot(e.target.value)}
                            />
                        </>
                    ) : (
                        <div className='no_timeslots'>
                            <img
                                src={NoData}
                                width={'200'}
                                alt='No data'
                                style={{
                                    maxWidth: '100%'
                                }}
                            />
                            <p>No time slots are available on the selected date.</p>
                        </div>
                    )}
                </div>
            </div>
            {formError && <div className="error_message">{formError}</div>}
            <div className='footer'>
                <p>Powered By <span><a href='https://apps.shopify.com/appointo-appointments-and-bookings'>Appointo</a></span></p>
                <button
                    className='footer_button'
                    type="submit"
                    disabled={!selectedDaySlots || selectedDaySlots.slots.length === 0}
                >Next <img src={Arrow} width='20' alt='arrow' /></button>
            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </form>
    );
}

export default Form;
