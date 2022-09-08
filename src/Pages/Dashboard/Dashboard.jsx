import { getAuth, signOut } from "firebase/auth";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CarListing from "../../Component/CardListing/CardListing";
import { logout } from "../../redux/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleLogout = async (e) => {
    const auth = getAuth()
    signOut(auth)
      .then(() => {
        dispatch(logout());
        navigate("/")
        console.log("berhasil logout")
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <nav className="header-fixed">
        <div className="container px-5 py-1 max-w-screen-lg">
          <div className="flex items-center justify-between relative">
            <div className="px-4">
              <button className="font-bold font-['Cinzel'] text-lg text-biru-primer block py-3 tracking-widest cursor-pointer">
                Logo
              </button>
            </div>
            <button
              className="py-2 px-5 cursor-pointer bg-white border-2 border-biru-primer font-semibold text-biru-primer text-sm rounded-md"
              onClick={handleLogout}
            >
              Keluar
            </button>
          </div>
        </div>
      </nav>
      <div className="pt-10 lg:pt-0 bg-gradient-to-t from-indigo-200 ">
        <div className="container justify-center items-center flex">
          <div className="flex flex-wrap">
            <div className="w-full self-center px-5 lg:w-1/2 ">
              <h1 className={"text-lg sm:text-xl font-bold mb-5"}>
                Selamat datang,
                <span className="block mt-3 text-3xl sm:text-5xl text-biru-sekunder">
                  Ardi Ariaputra Jaelani
                </span>
              </h1>
              <p className="text-sm text-slate-500 font-medium leading-relaxed mb-10">
                Semoga harimu menyenangkan !
              </p>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="relative">
                {/* <a href="http://www.freepik.com">Designed by Freepik</a> */}
                <a href="http://www.freepik.com">
                  <img
                    src={"/images/hi.png"}
                    alt="foto"
                    className="max-w-full mx-auto"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CarListing />
    </div>
  );
};

export default Dashboard;
