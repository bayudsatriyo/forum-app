import api from "../../utils/api";
import { authUserType } from "../authUser/action";


const ActionType = {
    RECEIVE_USERS: 'RECEIVE_USERS'
}

export interface RegisterUser {
    name: string, email: string, password: string
}

function receiveUsersActionCreator(users: Array<authUserType>) {
    return {
        type: ActionType.RECEIVE_USERS,
        payload: {
            users,
        },
    };
}

function asyncregister({ name, email, password }: RegisterUser) {
    return async () => {
        try {
            await api.registerUser({ email, name, password })
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }
}

export {
    ActionType,
    receiveUsersActionCreator,
    asyncregister,
}