import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { RiUploadLine, RiCloseFill } from "react-icons/ri";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/authSlice";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const UpdateCar = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState("");
  const [upImage, setUpImage] = useState("");
  const [data, setData] = useState({
    name: "",
    price: 0,
    capacity: 0,
    tipe: "",
    year: 0,
    desc: "",
    img: "",
  });
  const { id } = useParams();

  let preview = (
    <div className="relative flex justify-center rounded-lg">
      <button
        className="absolute -right-2 -top-3 rounded-full bg-red-500 text-white font-bold text-2xl"
        onClick={(e) => {
          setFile("");
          setData({ ...data, img: "" });
        }}
      >
        <RiCloseFill />
      </button>
      <img
        src={file && URL.createObjectURL(file)}
        alt="img"
        className="w-24 h-24 object-cover rounded-lg"
      />
    </div>
  );

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "cars", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setData(docSnap.data());
      } else {
        console.log("nothind");
      }
    };
    const uploadFile = () => {
      const newName = new Date().getTime() + file.name;
      const storageRef = ref(storage, newName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("upload is " + progress + "% done");

          switch (snapshot.state) {
            case "paused":
              setUpImage("paused");
              console.log("upload is paused");
              break;
            case "running":
              setUpImage("running");
              console.log("upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            // setData((prev) => ({ ...prev, img: downloadURL }));

            setUpImage("success");
            setData({ ...data, img: downloadURL });
            console.log("berhasil");
          });
        }
      );
    };
    file && uploadFile();
    fetchData();
  }, [file]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const ref = doc(db, "cars", id);
      const res = await updateDoc(ref, data);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container max-w-screen-sm mb-10">
      <div className="mt-28 space-y-10 ">
        <div className="relative text-center space-y-1">
          <TiArrowBack
            className="absolute left-0 -top-10 z-20 text-3xl cursor-pointer"
            onClick={(e) => {
              navigate(-1);
            }}
          />
          <h1 className="text-sm sm:text-lg">
            Isi data mobil yang ingin perbarui
          </h1>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label>Nama Mobil</label>
            <input
              type="text"
              className="field"
              required
              placeholder={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label>Harga Mobil</label>
            <input
              type="number"
              className="field"
              placeholder={data.price}
              onChange={(e) => setData({ ...data, price: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label>Kapasitas Mobil</label>
            <input
              type="number"
              className="field"
              placeholder={data.capacity}
              onChange={(e) => setData({ ...data, capacity: e.target.value })}
            />
          </div>
          <fieldset className="border space-y-2 p-3">
            <legend>Tipe Mobil</legend>
            <div className="flex space-x-10 text-sm">
              <div className="space-x-2">
                <input
                  type="radio"
                  id="manual"
                  value="manual"
                  onChange={(e) => setData({ ...data, tipe: e.target.value })}
                />
                <label>Manual</label>
              </div>
              <div className="space-x-2">
                <input
                  type="radio"
                  id="matic"
                  value="matic"
                  onChange={(e) => setData({ ...data, tipe: e.target.value })}
                />
                <label>Matic</label>
              </div>
            </div>
          </fieldset>
          <div className="space-y-2">
            <label>Tahun Keluaran Mobil</label>
            <input
              type="number"
              className="field"
              placeholder={data.year}
              onChange={(e) => setData({ ...data, year: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label>Deskripsi</label>
            <textarea
              type="text"
              className="field h-32"
              placeholder={data.desc}
              onChange={(e) => setData({ ...data, desc: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label>Foto</label>
            <div className="flex space-x-3">
              {file ? (
                preview
              ) : (
                <div
                  className="border-dashed border-2 border-gray-300 w-24 h-24 flex justify-center items-center cursor-pointer"
                  // onClick={(e) => setOpenModal(true)}
                >
                  <input
                    type="file"
                    id="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="hidden"
                  />
                  <label htmlFor="file" className="cursor-pointer">
                    <RiUploadLine />
                  </label>
                </div>
              )}
            </div>
          </div>
        <div className="space-x-2 flex justify-between items-center">
          <button
            className="w-full p-3 border border-biru-primer rounded-lg text-biru-primer text-sm font-bold hover:bg-blue-50"
            onClick={(e) => navigate(-1)}
          >
            Batal
          </button>
          <button
            type="submit"
            className={
              (upImage === "running" &&
                "w-full p-3 bg-gray-400 rounded-lg text-white text-sm font-bold hover:bg-opacity-95") ||
              "w-full p-3 bg-biru-primer rounded-lg text-white text-sm font-bold hover:bg-opacity-95"
            }
          >
            Perbaruhi Data
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCar;
