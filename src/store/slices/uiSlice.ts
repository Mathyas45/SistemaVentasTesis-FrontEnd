import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface UiState {
  isSidebarOpen: boolean;
}

const initialState: UiState = {
  isSidebarOpen: true,
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
  },
});

export const { toggleSidebar, setSidebarOpen } = uiSlice.actions;
export default uiSlice.reducer;
