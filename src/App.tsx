import React, {useEffect} from 'react';
import './App.css';
import {useDispatch, useSelector} from "react-redux";
import {addTodo, selectTodo} from "./todoSlice";
import ListItem from "./components/ListItem";
import DialogEdit from "./components/DialogEdit";

function App() {
    const todo = useSelector(selectTodo)
    const dispatch = useDispatch()

    const [selectedTodo, setSelectedTodo] = React.useState(null)
    const [dialogOpen, setDialogOpen] = React.useState(false)

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(response => response.json())
            .then(json => {
                let id = 0;
                json.forEach((todo: {id: number, title: string, completed: boolean}) => {
                    dispatch(addTodo({
                        id: id,
                        title: todo.title,
                        completed: todo.completed
                    }))
                    id++;
                })
            })
        }, [])

    const openDialog = () => {
        setDialogOpen(true)
    }

    const closeDialog = () => {
        setDialogOpen(false)
    }

    const setTodo = (todo: object) => {
        // @ts-ignore
        console.log(todo)
        // @ts-ignore
        setSelectedTodo(todo)
        openDialog()
    }

    const unsetTodo = () => {
        setSelectedTodo(null)
        openDialog()
    }

    return (
        <div className={"w-full p-4 max-w-custom mx-auto"}>
            <h1 className={"w-full text-2xl font-bold leading-tight text-gray-900 text-center mt-4 mb-4"}>TODO APP</h1>
            <button className={"bg-blue-500 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg fixed bottom-4 right-4"} onClick={() => {
                unsetTodo()
            }}>Add TODO</button>
            {dialogOpen && <DialogEdit todo={selectedTodo} onClose={closeDialog}/>}
            <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"}>
                {todo.map((todo : object, index: React.Key | null | undefined) => (
                    <ListItem todo={todo} key={index} onSelect={setTodo}/>
                ))}
            </div>
        </div>
    );
}

export default App;
