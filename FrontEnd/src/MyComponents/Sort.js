import React, { useEffect, useState } from 'react'
function Sort(props) {
    return (
        <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
            <strong className="d-block py-2">{props.len} {props.cat} found </strong>
            <div className="ms-auto">
                <select className="form-select d-inline-block w-auto border pt-1">
                    <option value="0">Best match</option>
                    <option value="1">Chepest</option>
                    <option value="2">Newly added</option>
                    <option value="3">High rated</option>
                    <option value="4">Nearest</option>
                </select>
            </div>
        </header>
    )
}
export default Sort