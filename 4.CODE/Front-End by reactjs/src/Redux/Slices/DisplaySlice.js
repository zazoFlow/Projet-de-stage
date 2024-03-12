import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Theme
  dark: true,

  // Background For Mini Windows
  darkBG: false,

  // For Delete Nav
  showDeleteConfirm: false,

  // Row Info
  rowInfo: { number: null, itemData: {}, id: null },

  // For Form Nav
  showForm: false,
  FormForAdd: false,
  BtnSubmitEnable: true,

  // Form Create Account
  ShowCreateAccount: false,
};

// +-----------+
// |   Slice   |
// +-----------+
const DisplaySlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    // For Disconnect
    SetDisconnect2: (state) => {
      state.dark = true;
      state.darkBG = false;
      state.showDeleteConfirm = false;
      state.rowInfo = { number: null, itemData: {}, id: null };
      state.showForm = false;
      state.FormForAdd = false;
      state.BtnSubmitEnable = true;
      state.ShowCreateAccount = false;
    },

    // ShowCreateAccount Seters
    Show_CreateAccount: (state) => {
      state.ShowCreateAccount = true;
    },
    Hide_CreateAccount: (state) => {
      state.ShowCreateAccount = false;
    },

    // Dark Seters
    SwitchDarTheme: (state) => {
      state.dark = !state.dark;
    },

    // Show Delete Confirm Seters
    ShowDeleteConfirm: (state, { payload }) => {
      state.darkBG = true;
      state.showDeleteConfirm = true;
      state.rowInfo = payload;
    },
    HideDeleteConfirm: (state) => {
      state.darkBG = false;
      state.showDeleteConfirm = false;
      state.rowInfo = initialState.rowInfo;
    },

    // Show Form Seters
    SetItemData: (state, { payload }) => {
      state.rowInfo.itemData = payload;
    },
    SetEltin_ItemData: (state, { payload }) => {
      state.rowInfo.itemData[payload.name] = payload.value;
    },
    ShowForm_ForAdd: (state, { payload: inputs }) => {
      if (inputs.length > 0) {
        state.darkBG = true;
        state.showForm = true;
        state.FormForAdd = true;

        // Add Initial Data To ItemData
        const itemData = {};
        for (let inp of inputs) itemData[inp.name] = "";
        state.rowInfo = { ...initialState.rowInfo, itemData };
      }
    },
    ShowForm_ForEdit: (state, { payload: { rowInfo, inputs } }) => {
      state.darkBG = true;
      state.showForm = true;
      state.FormForAdd = false;
      state.rowInfo = rowInfo;

      // Add Initial Data To ItemData
      const itemData = {};
      for (let inp of inputs) itemData[inp.name] = rowInfo.itemData[inp.name];
      state.rowInfo.itemData = itemData;
    },
    HideForm: (state) => {
      state.darkBG = false;
      state.showForm = false;
      state.FormForAdd = false;
      state.rowInfo = initialState.rowInfo;

      // Enable BtnSubmit
      state.BtnSubmitEnable = true;
    },

    // Enable/Disable Button Submit in FormAddEdit
    EnableButtonSubmit: (state) => {
      state.BtnSubmitEnable = true;
    },
    DisableButtonSubmit: (state) => {
      state.BtnSubmitEnable = false;
    },
  },
});

export default DisplaySlice.reducer;
export const {
  // For Disconnect
  SetDisconnect2,

  // ShowCreateAccount Seters
  Show_CreateAccount,
  Hide_CreateAccount,

  SwitchDarTheme,

  // For Delete Nav
  ShowDeleteConfirm,
  HideDeleteConfirm,

  // For Form Nav
  SetItemData,
  SetEltin_ItemData,
  ShowForm_ForAdd,
  ShowForm_ForEdit,
  HideForm,

  // BtnSubmitEnable seters
  EnableButtonSubmit,
  DisableButtonSubmit,
} = DisplaySlice.actions;
