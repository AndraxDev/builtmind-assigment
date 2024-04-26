import React from 'react';
import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import {addTodo, editTodo, getLastId, selectTodo} from "../todoSlice";

DialogEdit.propTypes = {
    todo: PropTypes.object || null,
    onClose: PropTypes.func.isRequired
}

// @ts-ignore
function DialogEdit({todo, onClose}) {
    const todos = useSelector(selectTodo)
    const dispatch = useDispatch()

    const [currentTitle, setCurrentTitle] = React.useState(todo !== null ? todo.title : "")

    return (
        <div className={"fixed inset-0 bg-black bg-opacity-50"}>
            <div className={"bg-white rounded-lg shadow-xl overflow-hidden p-6 m-8 max-w-custom mx-auto"}>
                <p className={"text-lg font-bold mb-2"}>{todo === null ? "Add new TODO" : "Edit TODO"}</p>
                <input className={"appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"} id={"title"} value={currentTitle} onChange={(e) => {
                    setCurrentTitle(e.target.value)
                }}/>
                <div className={"mt-4 flex justify-end space-x-4"}>
                    <button className={"bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"} onClick={() => {
                        dispatch(todo === null ? addTodo({
                            id: getLastId(todos) + 1,
                            title: (document.getElementById('title') as HTMLInputElement).value,
                            completed: false
                        }) : editTodo({
                            id: todo.id,
                            title: (document.getElementById('title') as HTMLInputElement).value,
                            completed: todo.completed
                        }))
                        onClose()
                    }}>{todo === null ? "Add TODO" : "Edit"}</button>
                    <button className={"bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"} onClick={onClose}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default DialogEdit;