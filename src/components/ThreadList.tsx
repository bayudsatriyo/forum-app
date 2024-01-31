import { authUserType } from "../states/authUser/action";

import ThreadItem from "./ThreadItem";

export interface threadItemType {
    id: string,
    title: string,
    body: string,
    category: string,
    createdAt: string,
    ownerId: string,
    upVotesBy: Array<string>,
    downVotesBy: Array<string>,
    totalComments: number,
    user: authUserType
}


function ThreadList({ threads, authUser, onVote }: { threads: Array<threadItemType>, authUser: authUserType | null, onVote: (threadId: string, votename: string | null) => void }) {

    return (
        <div className="thread-list flex flex-col gap-10">
            {threads.map((threadItem) => (

                <ThreadItem key={threadItem.id} thread={threadItem} authUser={authUser} onVote={onVote} />
            ))}
        </div>
    )
}

export default ThreadList;