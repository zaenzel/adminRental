import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CardProduct.css";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import ModalsDelete from "../Modals/ModalsDelete";

const CardProduct = ({ data, setShowModal }) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "cars", id));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="border-2 p-3 shadow-md rounded-sm hover:scale-105 transition-all">
      <Link to={`detail/:id`}>
        <div className="relative w-full rounded-lg ">
          <img
            src={data.img}
            className="rounded-lg w-full max-h-36 object-cover"
            alt="img"
          />
          <div className="absolute z-10 px-5 py-2 bottom-0 text-white bg-gradient-to-tr from-black w-full rounded-b-lg">
            <h1 className="font-semibold">{data.name}</h1>
            <h2 className="text-sm">
              {" "}
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
              }).format(data.price)}{" "}
              / hari
            </h2>
          </div>
        </div>
      </Link>

      <div className="flex space-x-2 mt-2 justify-between">
        <button
          className="btn-edit flex justify-center items-center"
          onClick={(e) => navigate(`update/${data.id}`)}
        >
          <FaEdit className="text-base mr-2" />
          Edit
        </button>
        <button className="btn-delete flex justify-center items-center">
          <MdDelete
            className="text-lg mr-2"
            onClick={(e) => handleDelete(data.id)}
          />
          Delete
        </button>
      </div>
    </div>
  );
};

export default CardProduct;
