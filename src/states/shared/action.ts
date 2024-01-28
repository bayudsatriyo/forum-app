import { AppDispatch } from "..";
import api from "../../utils/api"
import { receiveThreadsActionCreator } from "../threads/action";
import { receiveUsersActionCreator } from "../users/action";

function asyncUsersandThreads() {
    return async (dispacth: AppDispatch) => {
        try {
            const users = await api.seeAllUsers()
            const threads = await api.seeAllThreads();

            dispacth(receiveUsersActionCreator(users))
            dispacth(receiveThreadsActionCreator(threads))
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }
}

export { asyncUsersandThreads }