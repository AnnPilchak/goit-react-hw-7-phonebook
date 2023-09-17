  import { createSlice } from '@reduxjs/toolkit';
  import { fetchContacts, addContact, deleteContact } from 'redux/operations';

  const handlePending = state => {
    state.isLoading = true;
  };

  const handleRejected = (state, action) => {
    state.isLoading = false;
    state.error = action.payload;
  };

  const initialState = {
    items: [],
    isLoading: false,
    error: null,
  };

  const contactsSlice = createSlice({
    name: 'contacts',
    initialState,
    extraReducers: builder => {
      builder
        .addCase(fetchContacts.fulfilled, (state, action) => {
          state.isLoading = false;
          state.items = action.payload;
        })
        .addCase(addContact.fulfilled, (state, action) => {
          state.isLoading = false;
          state.items.push(action.payload);
        })
        .addCase(deleteContact.fulfilled, (state, action) => {
          state.isLoading = false;
          const index = state.items.findIndex(
            contact => contact.id === action.payload.id
          );
          state.items.splice(index, 1);
        })
        .addMatcher(action => action.type.endsWith(`pending`), handlePending)
        .addMatcher(action => action.type.endsWith(`rejected`), handleRejected);
    },
  });

  export const contactsReducer = contactsSlice.reducer;