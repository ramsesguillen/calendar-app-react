import Swal from "sweetalert2";
import { fetchConToken } from "../helpers/fetch";
import { preperaEvents } from "../helpers/prepereEvents";
import { types } from "../types/types";


export const eventStartAddNew = event => {
    return async ( dispatch, getState ) => {

        const { uid, name } = getState().auth;

        try {
            const resp = await fetchConToken('events', event, 'POST');
            const body = await resp.json();

            if ( body.ok ) {
                event.id = body.evento.id;
                event.usuario = {
                    _id: uid,
                    name: name
                }
                dispatch( eventAddNew( event ) );
            }
        } catch (error) {
            console.log(error);
        }

    }
}



export const eventStartUpedate = event => {
    return async ( dispatch ) => {

        try {
            const resp = await fetchConToken(`events/${event.id}`, event, 'PUT');
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventUpdated(event) );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }

    }
}



export const eventStartDelete = event => {
    return async ( dispatch, getState ) => {

        const { id } = getState().calendar.activeEvent;

        try {
            const resp = await fetchConToken(`events/${id}`, {}, 'DELETE');
            const body = await resp.json();

            if ( body.ok ) {
                dispatch( eventDeleded() );
            } else {
                Swal.fire('Error', body.msg, 'error');
            }
        } catch (error) {
            console.log(error);
        }

    }
}



export const eventsStartLoading = () => {
    return async ( dispatch ) => {
        try {
            const resp = await fetchConToken('events');
            const body = await resp.json();

            if ( body.ok ) {
                const events = preperaEvents( body.eventos );
                dispatch( eventLoaded( events ));
            }
        } catch (error) {
            console.log(error);
        }
    }
}


export const eventSetActive = event => ({
    type: types.eventSetActive,
    payload: event
});



export const eventClearActionEvent = () => ({ type: types.eventClearActiveEvent });


export const eventLogout = () => ({ type: types.eventLogout });

const eventAddNew = event => ({
    type: types.eventAddNew,
    payload: event
});




const eventUpdated = ( event ) => ({
    type: types.eventUpDate,
    payload: event
});


const eventDeleded = () => ({ type: types.eventDeleded });



const eventLoaded = (events) => ({
    type: types.eventLoaded,
    payload: events
});