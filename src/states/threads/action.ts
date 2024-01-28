import { Dispatch } from "@reduxjs/toolkit";
import api from "../../utils/api";
import { AppDispatch, RootState } from "..";



const ActionType = {
    RECEIVE_THREADS: 'RECEIVE_THREADS',
    ADD_THREAD: 'ADD_THREADS',
    TOGGLE_VOTE: 'TOGGLE_VOTE',
};

// interface Appstate {
//     authUser: { id: string, name: string, email: string },
//     isPreload: boolean
// }

export interface threadType {
    id: string,
    title: string,
    body: string,
    category: string,
    createdAt: string,
    ownerId: string,
    upVoteBy: Array<string>,
    downVoteBy: Array<string>,
    totalComments: number
}

function receiveThreadsActionCreator(threads: Array<threadType>) {
    return {
        type: ActionType.RECEIVE_THREADS,
        payload: {
            threads,
        }
    }
}

function addThreadActionCreator(thread: threadType) {
    return {
        type: ActionType.ADD_THREAD,
        payload: {
            thread
        },
    };
}

function toggleVoteThreadActionCreator({ threadId, votename, userId }: { threadId: string, votename: string | null, userId: string | null }) {
    return {
        type: ActionType.TOGGLE_VOTE,
        payload: {
            threadId,
            votename,
            userId,
        }
    }
}

function asyncAddThread({ title, body, category }: { title: string, body: string, category: string }) {
    return async (dispatch: Dispatch) => {
        try {
            const thread = await api.createThreads({ title, body, category });
            dispatch(addThreadActionCreator(thread))
        } catch (error) {
            if (error instanceof Error) {
                alert(error.message)
            }
        }
    }
}

function asyncToggleVoteThread({ threadId, votename }: { threadId: string, votename: string | null }) {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const { authUser } = getState();

        if (authUser === null || authUser === undefined) {
            return (alert('Silahkan Login terlebih dahulu'))
        } else {
            dispatch(toggleVoteThreadActionCreator({ threadId, votename, userId: authUser.id }));
        }
        const userId = authUser.id

        try {
            switch (votename) {
                case 'up-vote':
                    return await api.upVote(threadId);
                case 'down-vote':
                    return await api.downVote(threadId);
                default:
                    return await api.neutralizeVote(threadId);
            }
        } catch (error) {
            if (error instanceof Error) {
                await api.neutralizeVote(threadId)
                dispatch(toggleVoteThreadActionCreator({ threadId, votename: 'neutral-vote', userId }))
            }
        }
    }
}

export {
    ActionType,
    receiveThreadsActionCreator,
    addThreadActionCreator,
    toggleVoteThreadActionCreator,
    asyncAddThread,
    asyncToggleVoteThread
}