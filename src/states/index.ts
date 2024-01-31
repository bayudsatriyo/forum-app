import { configureStore } from "@reduxjs/toolkit";
import authUserReducer from "./authUser/reducer";
import isPreloadReducer from "./isPreload/reducer";
import threadsReducer from "./threads/reducer";
import usersReducer from "./users/reducer";
import leaderboardReducer from "./leaderboard/reducer";
import threadDetailReducer from "./threadDetail/reducer";

export type AppAction = {
    type: string;
    payload: object;
};


const store = configureStore({
    reducer: {
        authUser: authUserReducer,
        isPreload: isPreloadReducer,
        threads: threadsReducer,
        users: usersReducer,
        leaderboard: leaderboardReducer,
        threadDetail: threadDetailReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export { store };