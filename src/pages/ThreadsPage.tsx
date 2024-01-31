import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states";
import { useEffect } from "react";
import { asyncUsersandThreads } from "../states/shared/action";
import { asyncAddThread, asyncToggleVoteThread, threadType } from "../states/threads/action";
import { ThreadInput, threadAddType } from "../components/ThreadInput";
import ThreadList from "../components/ThreadList";
import CardProfile from "../components/CardProfile";
import Leaderboard from "../components/Leaderboards";



function ThreadsPage() {
    const {
        threads = [],
        users = [],
        authUser = null,
        leaderboard = []
    } = useSelector((states: RootState) => states)

    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(asyncUsersandThreads())
    }, [dispatch])

    const onAddThread = ({ title, body, category }: threadAddType) => {
        dispatch(asyncAddThread({ title, body, category }))
    }

    const onVote = (threadId: string, votename: string | null) => {
        console.log('klik vote')
        dispatch(asyncToggleVoteThread({ threadId, votename }))
    }


    const threadList = threads.map((thread: threadType) => ({
        ...thread,
        user: users.find((user) => user.id === thread.ownerId)
    }))


    return (
        <section className="Thread-Page flex gap-10 pt-24">
            <CardProfile authUser={authUser} />

            <div className="threadsLayout w-1/2">
                <ThreadInput addThread={onAddThread} authUser={authUser} />
                <ThreadList threads={threadList} authUser={authUser} onVote={onVote} />
            </div>
            <Leaderboard leaderboard={leaderboard} />
        </section>

    )
}

export default ThreadsPage;