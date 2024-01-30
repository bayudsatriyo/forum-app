import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../states";
import { useEffect } from "react";
import { asyncUsersandThreads } from "../states/shared/action";
import { asyncAddThread, asyncToggleVoteThread, threadType } from "../states/threads/action";
import { ThreadInput, threadAddType } from "../components/ThreadInput";
import ThreadList from "../components/ThreadList";
import { Link } from "react-router-dom";
import CardProfile from "../components/CardProfile";


function ThreadsPage({ onSignOut }: { onSignOut: () => void }) {
    const {
        threads = [],
        users = [],
        authUser = null,
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

    console.log(threadList)


    return (
        <section className="Thread-Page relative">
            <nav id="nav-menu" className="hidden absolute py-5 bg-white shadow-lg rounded-lg max-w-[200px] w-full right-0 top-16">
                <ul className="flex flex-col gap-5 text-center">
                    <Link to='/'><li className="group">Home</li></Link>
                    {authUser === null ? <Link to='/login'><li className="group">Login</li></Link> : <button onClick={onSignOut}><li className="group">Logout</li></button>}
                </ul>
            </nav>
            <section className="Thread flex gap-10 pt-24">
                {authUser !== null && <CardProfile authUser={authUser} />}

                <div className="threadsLayout w-1/2">
                    <ThreadInput addThread={onAddThread} authUser={authUser} />
                    <ThreadList threads={threadList} authUser={authUser} onVote={onVote} />
                </div>
            </section>
        </section>
    )
}

export default ThreadsPage;