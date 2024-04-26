import { createSlice } from '@reduxjs/toolkit'

export const todoSlice = createSlice({
    name: 'todos',
    initialState: {
        value: [],
    },
    reducers: {
        addTodo: (state, action) => {
            state.value.push(action.payload)
        },
        removeTodo: (state, action) => {
            state.value = state.value.filter(todo => todo.id !== action.payload.id)
        },
        toggleTodo: (state, action) => {
            state.value = state.value.map(todo => {
                if (todo.id === action.payload) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    }
                }
                return todo
            })
        },
        editTodo: (state, action) => {
            state.value = state.value.map(todo => {
                if (todo.id === action.payload.id) {
                    return {
                        ...todo,
                        title: action.payload.title
                    }
                }
                return todo
            })
        }
    },
})

// Action creators are generated for each case reducer function
export const { addTodo, editTodo, removeTodo, toggleTodo } = todoSlice.actions

export const selectTodo = (state) => state.todos.value

export const getLastId = (state) => {
    return state.length
}

export default todoSlice.reducer
