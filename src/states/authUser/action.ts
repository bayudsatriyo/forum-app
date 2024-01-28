
import api from "../../utils/api";
import { AppDispatch } from "..";

export interface authUserType {
    id: string,
    name: string,
    email: string,
    avatar?: string,
}

const ActionType = {
    SET_AUTH_USER: 'SET_AUTH_USER',
    UNSET_AUTH_USER: 'UNSET_AUTH_USER',
};

function setAuthUserActionCreator(authUser: authUserType | null) {
    return {
        type: ActionType.SET_AUTH_USER,
        payload: {
            authUser,
        },
    };
}

function unsetAuthUserAction() {
    return {
        type: ActionType.UNSET_AUTH_USER,
        payload: {
            authUser: null,
        }
    }
}



function asyncSetAuthUser({ email, password }: { email: string, password: string }) {
    return async (dispatch: AppDispatch) => {
        try {
            const token = await api.login({ email, password })
            api.putAccessToken(token);
            const authUser = await api.seeOwnProfile();

            dispatch(setAuthUserActionCreator(authUser))
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }
}

function asyncUnsetAuthUser() {
    return (dispatch: AppDispatch) => {
        dispatch(unsetAuthUserAction());
        api.putAccessToken('');
    }
}


export {
    ActionType,
    setAuthUserActionCreator,
    unsetAuthUserAction,
    asyncSetAuthUser,
    asyncUnsetAuthUser,
}