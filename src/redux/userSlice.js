import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        id: null,
        name: null,
        role_id: null,
        email: null,
        campaign_id: null,
        gender: null,
    },
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        storeUserDetails: (state, action) => {
            let update = {
                id: action.payload.id,
                name: action.payload.name,
                role_id: action.payload.role_id,
                email: action.payload.email,
                campaign_id: action.payload.campaign_id,
                gender: action.payload.gender,
            };
            state.userData = update;
        },
    },
});

export const { storeUserDetails } = userSlice.actions;

export default userSlice.reducer;
