import { FaSearch } from "react-icons/fa";
import { typeLeaderboard } from "../states/leaderboard/action";

function Leaderboard({ leaderboard }: { leaderboard: Array<typeLeaderboard> }) {
    return (
        <section className="w-1/4 flex flex-col gap-10">
            <div className="search border  py-2 px-4 border-effect shadow-md rounded-xl flex gap-4 align-middle">
                <span className="justify-center pt-1 text-plugins"><FaSearch /></span>
                <input type="text" className="border border-effect rounded-lg pl-3 w-full " />
            </div>
            <div className="leaderboards border rounded-lg border-effect bg-layout text-center">
                <div className="backdrop-opacity-50 backdrop-blur-lg  h-full pt-5">
                    <h2 className="font-bold text-plugins">Klasemen Pengguna Aktif</h2>
                    <ul className="flex flex-col gap-4 p-4">
                        {leaderboard.map((rank) => (
                            <li className="flex justify-between align-middle border-b border-effect pb-2">
                                <img src={rank.user.avatar} alt={rank.user.id} className="rounded-full w-10 border-2 border-effect" />
                                <span>{rank.user.name}</span>
                                <span>{rank.score}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}


export default Leaderboard;