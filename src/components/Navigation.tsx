
import { FaAngleDown } from "react-icons/fa";
import { authUserType } from "../states/authUser/action";

function Naviation({ authUser }: { authUser: authUserType | null }) {
    function HamburgerTogggle() {
        const hamburger = document.getElementById("hamburger");
        const NavMenu = document.querySelector("#nav-menu");

        hamburger!.classList.toggle("hamburger-active");
        NavMenu!.classList.toggle("hidden");
    }

    return (
        <div className="container py-4 px-4 bg-white">
            <div className="navigation flex justify-between">
                <div className="logos">
                    <h1 className="font-bold text-xl">Gibah Apps</h1>
                </div>
                <div className="search border py-2 px-4 border-blue-400 rounded-xl flex gap-4 justify-center align-middle">
                    <span>searching</span>
                    <input type="text" className="border border-blue-400 rounded-xl pl-3" />
                </div>
                <div className="navbar flex">
                    <div className="tool flex">
                        {authUser !== null && <img src={authUser.avatar} alt={authUser.name} title={authUser.name} className="w-10 rounded-full" />}
                        <div className="">
                            <button type="button" id="hamburger" name="hamburger" onClick={HamburgerTogggle}><span className="hamburger-line transition duration-300 ease-in-out origin-center -rotate-90 h-5"><FaAngleDown size='1.5rem' /></span></button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    )
}


/* <h2>{authUser?.name}</h2>
<h3>{authUser?.email.split('@gmail.com')}</h3> */

export default Naviation;