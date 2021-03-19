import React from 'react'
import { useDispatch } from 'react-redux';
import { eventStartDelete } from '../../actions/events';

export const EventDeleteFab = () => {

    const dispatch = useDispatch();



    const handleClick = () => {
        dispatch( eventStartDelete() );
    }


    return (
        <button
            className="btn btn-danger fab-danger"
            onClick={ handleClick }
        >
            <i className="fa fa-trash"></i>
            <span> Borrar evento</span>
        </button>
    )
}
