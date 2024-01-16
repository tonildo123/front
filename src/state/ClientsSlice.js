import { createSlice } from '@reduxjs/toolkit'

export const ClientsSlice = createSlice({
  name: 'clients',
  initialState: {
    clients: []
  },
  reducers: {
    clientAddOk: (state, action) => {
      state.clients.push({
        name:action.payload.name,
        lastname:action.payload.lastname,
        brithdate:action.payload.brithdate,
        cuit:action.payload.cuit,
        address:action.payload.address,
        phone:action.payload.phone,
        email:action.payload.email,
      });
    },
    clientStateFailure: (state, action) => {

      return state
    },
    clientsClean: (state, action) => {

      state.clients = [];
    },
    clientRemoveItem: (state, action) => {
      const idToRemove = action.payload;
      state.clients = state.clients.filter((client) => client.id !== idToRemove);
    },
    clientRemoveItemByName: (state, action) => {
      const nameToRemove = action.payload;
      state.clients = state.clients.filter((client) => client.name !== nameToRemove);
    }

  },
})
export const { clientAddOk, clientStateFailure, clientsClean, clientRemoveItem, clientRemoveItemByName } = ClientsSlice.actions
export default ClientsSlice.reducer;