import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navbar } from '../ui/Navbar';
import { Calendar  ,momentLocalizer } from 'react-big-calendar';
import { messages } from '../../helpers/calendar-messages';

import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'moment/locale/es';

import { CalendarEvent } from './CalendarEvent';
import { CalendarModal } from './CalendarModal';
import { uiOpenModal } from '../../actions/ui';
import { eventClearActionEvent, eventSetActive, eventsStartLoading } from '../../actions/events';
import { AddNewFab } from '../ui/AddNewFab';
import { EventDeleteFab } from '../ui/EventDeleteFab';




moment.locale('es');

const localizer = momentLocalizer(moment) // or globalizeLocalizer




export const CalendarScreen = () => {

    const [lastView, setLastView] = useState( localStorage.getItem('lastView') || 'month');

    const { events, activeEvent } = useSelector(state => state.calendar);
    const { uid  } = useSelector(state => state.auth);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch( eventsStartLoading() );
    }, [dispatch ]);

    const onDoubleClick = e => {
        dispatch( uiOpenModal() );
    }


    const onSelectEvent = e => {
        dispatch( eventSetActive(e) );
    }


    const onViewChange = e => {
        setLastView(e);
        localStorage.setItem('lastView', e);
    }



    const onSelectSlot = e => {
        dispatch( eventClearActionEvent() );
    }


    const eventStyleGetter = ( e, start, end, isSelected ) => {

        const style = {
            backgroundColor: ( uid === e.usuario._id) ? '#367CF7' : '#465660',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        };

        return {
            style
        }
    }


    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClick }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                view={ lastView }
                components={{
                    event: CalendarEvent
                }}
            />


            <AddNewFab />

            {
                ( activeEvent ) && <EventDeleteFab />
            }

            <CalendarModal />
        </div>
    )
}
