import { AppDispatch } from "..";
import api from "../../utils/api"
import { receiveLeaderboardActionCreator } from "../leaderboard/action";
import { receiveThreadsActionCreator } from "../threads/action";
import { receiveUsersActionCreator } from "../users/action";

function asyncUsersandThreads() {
    return async (dispacth: AppDispatch) => {
        try {
            const users = await api.seeAllUsers()
            const threads = await api.seeAllThreads();
            const leaderboard = await api.seeLeaderboards()
            console.log(threads)
            dispacth(receiveUsersActionCreator(users))
            dispacth(receiveThreadsActionCreator(threads))
            dispacth(receiveLeaderboardActionCreator(leaderboard))
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }
}

export { asyncUsersandThreads }