import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardResToken } from "../types";

interface CardListState {
  value: CardResToken[];
}

const initialState: CardListState = {
  value: [],
};
export const cardListSlice = createSlice({
  name: "cardList",
  initialState,
  reducers: {
    addCard: (state, action: PayloadAction<CardResToken>) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers.
      state.value.push(action.payload);
    },
  },
});

export const { addCard } = cardListSlice.actions;

export default cardListSlice.reducer;
