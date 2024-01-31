import { AppDispatch, RootState } from ".."
import api from "../../utils/api"
import { authUserType } from "../authUser/action"


interface commentType {
    id: string,
    content: string,
    createdAt: string,
    owner: authUserType,
    upVotesBy: string[],
    downVotesBy: string[]
}

export interface detailThread {
    id: string,
    title: string,
    body: string,
    category: string,
    createdAt: string,
    owner: authUserType,
    upVotesBy: string[],
    downVotesBy: string[],
    comments: Array<commentType>
}

const ActionType = {
    RECEIVE_DETAIL_THREAD: 'RECEIVE_DETAIL_THREAD',
    CLEAR_DETAIL_THREAD: 'CLEAR_DETAIL_THREAD',
    TOGGLE_DETAIL_VOTE: 'TOGGLE_DETAIL_VOTE',
}

function receiveDetailThreadActionCreator(threadDetail: detailThread) {
    return {
        type: ActionType.RECEIVE_DETAIL_THREAD,
        payload: {
            threadDetail,
        }
    }
}

function clearThreadDetailActionCraetor() {
    return {
        type: ActionType.CLEAR_DETAIL_THREAD,
    }
}

function toggleVoteThreadDetailCreator(userId: string, votename: string) {
    return {
        type: ActionType.TOGGLE_DETAIL_VOTE,
        payload: {
            userId,
            votename,
        }
    }
}

function asyncReceiveThreadDetail(threadId: string) {
    return async (dispatch: AppDispatch) => {
        dispatch(clearThreadDetailActionCraetor());
        try {
            const threadDetail = await api.seeDetailThreads(threadId);
            dispatch(receiveDetailThreadActionCreator(threadDetail))
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }
}

function asyncToggleVoteThreadDetail(votename: string) {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { authUser, threadDetail } = getState();
        if (authUser !== null || authUser !== undefined) {
            dispatch(toggleVoteThreadDetailCreator(authUser!.id, votename))
        } else {
            alert('Silahkan Login Terlebih Dahulu')
        }

        try {
            await api.upVote(threadDetail.id)
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }
}

export {
    ActionType,
    receiveDetailThreadActionCreator,
    clearThreadDetailActionCraetor,
    toggleVoteThreadDetailCreator,
    asyncReceiveThreadDetail,
    asyncToggleVoteThreadDetail,
}