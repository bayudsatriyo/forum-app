import api from "../../utils/api"
import { setAuthUserActionCreator } from "../authUser/action";
import { AppDispatch } from "..";


// export type AppThunk = ThunkAction<void, RootState, unknown, AppAction>;

const ActionType = {
    SET_IS_PRELOAD: 'SET_IS_PRELOAD'
}

function setIsPreloadAction(isPreload: boolean) {
    return {
        type: ActionType.SET_IS_PRELOAD,
        payload: {
            isPreload,
        }
    }
}

function asyncPreloadProcess() {
    return async (dispatch: AppDispatch) => {
        try {
            //  preload process

            const authUser = await api.seeOwnProfile();
            dispatch(setAuthUserActionCreator(authUser))
        } catch (error) {
            dispatch(setAuthUserActionCreator(null));
        } finally {
            dispatch(setIsPreloadAction(false))
        }
    }
}

export {
    ActionType,
    setIsPreloadAction,
    asyncPreloadProcess
}