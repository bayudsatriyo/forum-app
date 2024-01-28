import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states";
import { useEffect } from "react";
import { asyncUsersandThreads } from "../states/shared/action";
import { asyncAddThread, asyncToggleVoteThread, threadType } from "../states/threads/action";
import { ThreadInput, threadAddType } from "../components/ThreadInput";
import ThreadList from "../components/ThreadList";


function ThreadsPage() {
    const {
        threads = [],
        users = [],
        authUser,
    } = useSelector((states: RootState) => states)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(asyncUsersandThreads())
    }, [dispatch])

    const onAddThread = ({ title, body, category }: threadAddType) => {
        dispatch(asyncAddThread({ title, body, category }))
    }

    const onVote = (threadId: string, votename: string | null) => {
        dispatch(asyncToggleVoteThread({ threadId, votename }))
    }

    const threadList = threads.map((thread: threadType) => ({
        ...thread,
        user: users.find((user) => user.id === thread.ownerId)
    }))

    return (
        <section className="Thread-Page">
            <ThreadInput addThread={onAddThread} authUser={authUser!} />
            <ThreadList threads={threadList} authUser={authUser!} onVote={onVote} />
        </section>
    )
}

export default ThreadsPage;