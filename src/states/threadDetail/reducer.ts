import { ActionType, detailThread } from "./action";

interface actiondetailThread {
    type: string,
    payload?: {
        threadDetail?: detailThread,
        userId?: string,
        votename?: string,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } | any,
}

function threadDetailReducer(threadDetail: detailThread | null = null, action: actiondetailThread = { type: '', payload: {} }) {
    switch (action.type) {
        case ActionType.RECEIVE_DETAIL_THREAD:
            return action.payload?.threadDetail;
        case ActionType.CLEAR_DETAIL_THREAD:
            return null;
        case ActionType.TOGGLE_DETAIL_VOTE:
            if (threadDetail !== null) {
                if (action.payload?.votename === 'up-vote') {
                    return {
                        ...threadDetail,
                        upVotesBy: threadDetail.upVotesBy.includes(action.payload.userId!) ? threadDetail.upVotesBy.filter((id) => id !== action.payload?.userId)
                            : threadDetail.upVotesBy.concat([action.payload.userId!]),
                        downVotesBy: threadDetail.downVotesBy.includes(action.payload.userId!) ? threadDetail.downVotesBy.filter((id) => id !== action.payload?.userId) : threadDetail.downVotesBy,
                    }
                } else {
                    return {
                        ...threadDetail,
                        upVotesBy: threadDetail.upVotesBy.includes(action.payload!.userId!) ? threadDetail.upVotesBy.filter((id) => id !== action.payload?.userId) : threadDetail.upVotesBy,
                        downVotesBy: threadDetail.downVotesBy.includes(action.payload!.userId!) ? threadDetail.downVotesBy.filter((id) => id !== action.payload?.userId) :
                            threadDetail.downVotesBy.concat([action.payload!.userId!]),
                    }
                }
            } else {
                return alert('thread tidak ditemukan')
            }
        default:
            return threadDetail;
    }
}

export default threadDetailReducer;