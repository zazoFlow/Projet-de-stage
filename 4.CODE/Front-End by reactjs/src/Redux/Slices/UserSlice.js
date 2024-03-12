import { createSlice } from "@reduxjs/toolkit";

// +-----------+
// |   State   |
// +-----------+
const initialState = {
  userInfo: null,
  userType: "",
  UT_pk_value: null,
  CSname: "",
  tableData: { all: [], Wiithfiltre: [], ToShow: [] },
};

// +-----------+
// |   Slice   |
// +-----------+
const UserSlice = createSlice({
  name: "state",
  initialState,
  reducers: {
    // User Info Seters
    SetUserInfo: (state, { payload }) => {
      state.userInfo = payload;
    },
    Set_UT_PK: (state, { payload }) => {
      state.UT_pk_value = payload ? { [payload]: state.userInfo[payload] } : null;
    },

    // For Disconnect
    SetDisconnect1: (state) => {
      state.userInfo = null;
      state.userType = "";
      state.UT_pk_value = null;
      state.CSname = "";
      state.tableData = initialState.tableData;
    },

    // CSname Seters
    SetUserType: (state, { payload }) => {
      state.userType = payload;
    },

    // CSname Seters
    SetCSname: (state, { payload }) => {
      if (payload !== state.CSname) {
        state.CSname = payload;
        state.tableData = initialState.tableData;
      }
    },

    // Table Data Seters
    SetTableData: (state, { payload }) => {
      console.log(payload);
      if (payload.CSname === state.CSname) {
        delete payload.CSname;
        state.tableData = payload;
      }
    },
    SetTableData_ToShow: (state, { payload }) => {
      state.tableData.ToShow = payload;
    },
  },
});

export default UserSlice.reducer;
export const { SetUserInfo, Set_UT_PK, SetDisconnect1, SetCSname, SetUserType, SetTableData, SetTableData_ToShow } = UserSlice.actions;
