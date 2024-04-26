import React from 'react';
import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import {removeTodo} from "../todoSlice";

ListItem.propTypes = {
    todo: PropTypes.object.isRequired,
    onSelect: PropTypes.func.isRequired
}

// @ts-ignore
function ListItem({todo, onSelect}) {
    const dispatch = useDispatch()

    const [checked, setChecked] = React.useState(todo.completed)

    return (
        <div className={"max-w-sm rounded overflow-hidden shadow-lg bg-white w-full flex flex-col justify-between p-4"}>
            <div className={"flex flex-row justify-between items-center"}>
                <span className={"font-semibold text-lg"}>{todo.title}</span>
                <input className={"form-checkbox h-5 w-5 flex-none text-blue-600 m-2"} type={'checkbox'} checked={checked} onChange={(e) => {
                    setChecked(e.target.checked)
                }}/>
            </div>
            <div className={"card-bottom w-full flex justify-end items-center"}>
                <button className={"material-symbols-outlined p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"} onClick={() => {
                    dispatch(removeTodo(todo))
                }}>delete</button>
                <button className={"material-symbols-outlined p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"} onClick={() => {
                    onSelect(todo)
                }}>edit</button>
            </div>
        </div>
    );
}

export default ListItem;