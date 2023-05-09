import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios'
import toast from "react-hot-toast";

export const contactMaster = createSlice({
  name: "contactMaster",
  initialState: {
    contactList: [
      {
        id: 1,
        firstName: "anit",
        lastName: "dhadve",
        status: "active",
      },
      { id: 2, firstName: "rupesh", lastName: "dhadve", status: "inactive" },
    ],
    loader: true,
    totalPages: 0,
    selected: null,
  },
  reducers: {
    selectContact: (state, action) => {
      if (action.payload === null) {
        state.selected = null;
      } else {
        state.selected = action.payload;
      }
    },
    setLoader: (state, action) => {
      state.loader = action.payload;
    },
    addContact: (state, action) => {
      state.contactList = [...state.contactList, action.payload];
    },
    editContact: (state, action) => {
      console.log("action.payload", action.payload);
      state.contactList = action.payload;
    },
    deleteContact: (state, action) => {
      state.contactList = action.payload;
    },
    setSearch: (state, action) => {
      state.params = { ...state.params, search: action.payload };
    },
  },
});

export const {
  selectContact,
  addContact,
  editContact,
  deleteContact,
  setLoader,
  setPageNo,
  setPageSize,
  setSearch,
} = contactMaster.actions;

export default contactMaster.reducer;
