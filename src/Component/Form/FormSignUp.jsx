import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BiShowAlt, BiHide, BiArrowBack } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

const FormSignUp = ({ setLogin, setSuccessSignUp }) => {
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
      name: "",
      no_wa: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      console.log(user);
      setSuccessSignUp(true);
      setLogin(true);
    } catch (error) {
      setError(error.message);
      console.log(error);
    }
  };

  return (
    <>
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {error && <p className="text-sm text-red-400">{error}</p>}
        {/* <div className="space-y-2">
          <label>Nama</label>
          <input
            type="text"
            placeholder="Name"
            className="field"
            {...register("name", {
              required: "Nama harus diisi",
            })}
          />
          <p className="text-sm text-red-500">{errors.name?.message}</p>
        </div> */}

        {/* <div className="space-y-2">
          <label>No Whatsapp</label>
          <input
            type="number"
            placeholder="+62"
            className="field"
            {...register("no_wa", {
              required: "Nomor wa harus diisi",
              valueAsNumber: "harus angka",
            })}
          />
          <p className="text-sm text-red-500">{errors.no_wa?.message}</p>
        </div> */}

        <div className="space-y-2">
          <label>Email</label>
          <input
            type="email"
            placeholder="Email"
            className="field"
            {...register("email", {
              required: "Email harus diisi",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i,
                message: "format email harus benar",
              },
            })}
          />
          <p className="text-sm text-red-500">{errors.email?.message}</p>
        </div>

        <div className="space-y-2">
          <label>Password</label>
          <div className="relative">
            <input
              type={passwordType}
              placeholder="Password"
              className="field"
              {...register("password", {
                required: "Password harus diisi",
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
              {passwordType === "password" && <BiHide />}
              {passwordType === "text" && <BiShowAlt />}
            </i>
          </div>
          <p className="text-sm text-red-500">{errors.password?.message}</p>
        </div>

        <button
          className="py-2 px-3 w-full bg-biru-primer text-white rounded-lg"
          type="submit"
        >
          Signup
        </button>
      </form>
    </>
  );
};

export default FormSignUp;
