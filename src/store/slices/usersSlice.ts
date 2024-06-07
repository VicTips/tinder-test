import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id?: string;
  email?: string;
}

const initialState: User = {
  id: null,
  email: null,
};

export const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (user, action: PayloadAction<User>) => {
      user.id = action.payload.id;
      user.email = action.payload.email;
    },
  },
});

export const { setUser } = usersSlice.actions;

export default usersSlice.reducer;
