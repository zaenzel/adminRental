import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BiShowAlt, BiHide, BiArrowBack } from "react-icons/bi";
import { auth, db } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";

const FormLogin = ({ setSuccessLogin }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [error, setError] = useState("");

  const togglePasswordShown = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      return;
    }
    setPasswordType("password");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        console.log(userCredential);
        const user = userCredential.user;
        dispatch(login(user));
        setSuccessLogin(true);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      })
      .catch((err) => {
        setError(err.message);
        console.log(err);
      });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="text-sm text-red-400">{error}</p>}
      <div className="space-y-2">
        <label className="font-medium">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="field"
          {...register("email", {
            required: "email harus diisi",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
              message: "format email harus benar",
            },
          })}
        />
        <p className="text-sm mt-1 ml-1 text-red-500">
          {errors.email?.message}
        </p>
      </div>

      <div className="space-y-2">
        <label className="font-medium">Password</label>
        <div className="relative ">
          <input
            type={passwordType}
            name="password"
            placeholder="Password"
            className="field"
            {...register("password", {
              required: "password harus diisi",
              minLength: {
                value: 6,
                message: "minimal 6 karakter",
              },
            })}
          />
          <i
            onClick={togglePasswordShown}
            className="absolute right-0 top-0 mt-3 mr-4 cursor-pointer"
          >
            {passwordType === "password" && <BiHide className="text-2xl" />}
            {passwordType === "text" && <BiShowAlt className="text-2xl" />}
          </i>
        </div>
        <p className="text-sm mt-1 ml-1 text-red-500">
          {errors.password?.message}
        </p>
      </div>
      <button
        type="submit"
        className="py-2 px-3 w-full bg-biru-primer text-white rounded-lg"
      >
        Login
      </button>
    </form>
  );
};

export default FormLogin;
