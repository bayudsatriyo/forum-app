import { authUserType } from "../states/authUser/action";

function CardProfile({ authUser }: { authUser: authUserType | null }) {
    console.log(authUser)
    if (authUser !== null) {
        return (
            <div className="cardProfile  border border-effect h-fit w-1/5 backdrop-filter rounded-xl bg-[#DCF2F1]">
                <div className="card flex flex-col text-center gap-4 h-full pt-5 pb-10 rounded-xl  backdrop-blur-xl ">
                    <div className="profile">
                        <img src={authUser.avatar} alt={authUser.id} className="w-1/2 mx-auto rounded-full border-effect border" />
                    </div>

                    <h4 className="text-xl font-bold text-plugins">{authUser.name}</h4>
                    <div className="cardname flex flex-col">
                        <div className="nameuser bg-slate-50 mx-5 py-5 text-sm rounded-lg shadow-lg text-plugins">
                            <p>{authUser.email}</p>
                            <p>{authUser.id}</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="cardProfile  border border-effect h-fit w-1/5 backdrop-filter rounded-xl bg-[#DCF2F1]">
            <div className="card flex flex-col text-center gap-4 h-full pt-5 pb-10 rounded-xl  backdrop-blur-xl ">
                <div className="profile">
                    <img src="../../public/profile.jpg" alt='defaultProfile' className="w-1/2 mx-auto rounded-full border-effect border" />
                </div>

                <h4 className="text-xl font-bold text-plugins">Guest User</h4>
                <div className="cardname flex flex-col">
                    <div className="nameuser bg-slate-50 mx-5 py-5 text-sm rounded-lg shadow-lg text-plugins">
                        <p>guestuser@gmail.com</p>
                        <p>guest-user</p>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CardProfile;