import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    searchTerm: "",
    isLoadingSearchResults: false,
    isLoadingBotResponse: false,
};

const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
      setSearchTerm: (state, { payload }) => {
        state.searchTerm = payload;
      },
      isLoadingSearchResults: (state, { payload }) => {
        state.isLoadingSearchResults = payload;
      },
      isLoadingBotResponse: (state, { payload }) => {
        state.isLoadingBotResponse = payload;
      },
    }
});

export const { setSearchTerm, isLoadingBotResponse, isLoadingSearchResults } = searchSlice.actions;
export default searchSlice.reducer;