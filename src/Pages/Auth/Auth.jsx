import React, { useState } from "react";
import FormLogin from "../../Component/Form/FormLogin";
import FormSignUp from "../../Component/Form/FormSignUp";
import ModalAuth from "../../Component/Modals/ModalAuth"
import "./Auth.css";

const Auth = () => {
  const [login, setLogin] = useState(true);
  const [successSignUp, setSuccessSignUp] = useState(false);
  const [successLogin, setSuccessLogin] = useState(false);
  setTimeout(() => {
    setSuccessSignUp(false);
    setSuccessLogin(false);
  }, 2000);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-[2fr_1.5fr] h-screen w-full">

      {successSignUp && <ModalAuth message={"Signup"} />}
      {successLogin && <ModalAuth message={"Login"} />}

      <div className="hidden sm:block">
        <img
          src="/images/tesla.jpg"
          alt="img"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative flex flex-col justify-center">
        <div className="max-w-[400px] w-full mx-auto p-8">
          <div className="space-y-5 shadow-xl border-2 p-3 rounded-lg">
            <div className="flex justify-between">
              <button
                className={login ? "btn active" : "btn no-active"}
                onClick={(e) => setLogin(true)}
              >
                Login
              </button>
              <button
                className={login ? "btn no-active" : "btn active"}
                onClick={(e) => setLogin(false)}
              >
                Signup
              </button>
            </div>
            {login ? (
              <FormLogin setSuccessLogin={setSuccessLogin} />
            ) : (
              <FormSignUp
                setLogin={setLogin}
                setSuccessSignUp={setSuccessSignUp}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
