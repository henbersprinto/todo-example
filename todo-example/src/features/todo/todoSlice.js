import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    data: [],
    addTodoForm: {
      description: ''
    }
};

// First, create the thunk
export const loadTodos = createAsyncThunk(
  'todo/loadTodos',
  async () => {
    const response = await fetch("https://6076b42e1ed0ae0017d69993.mockapi.io/todos");
    const data = await response.json();

    return data;
  }
)

export const postTodo = createAsyncThunk(
  'todo/postTodo',
  async (todo) => {
    const response = await fetch("https://6076b42e1ed0ae0017d69993.mockapi.io/todos",  {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
    const createdTodo = await response.json();

    return createdTodo;
  }
)

// Then, handle actions in your reducers:
const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    updateSortBy(state, action) {
        state.sortBy = action.payload;
    },
    setDescription(state, action) {
      state.addTodoForm.description = action.payload;
    }
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [loadTodos.fulfilled]: (state, action) => {
      // Add user to the state array
      state.data = action.payload;
    },
    [postTodo.fulfilled]: (state, action) => {
      // Add user to the state array
      state.data.push(action.payload);
      state.addTodoForm = initialState.addTodoForm;
    }
  }
})

export const { updateSortBy, setDescription } = todoSlice.actions;
export default todoSlice.reducer;