import React, { useEffect, useState } from "react";
import { TiArrowBack } from "react-icons/ti";
import { RiUploadLine, RiCloseFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../../redux/authSlice";
import { addDoc, collection } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const AddCar = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [status, setStatus] = useState(false);
  const user = useSelector(getUser);
  const [perc, setPerc] = useState(null);
  const [upImage, setUpImage] = useState("");
  const [data, setData] = useState({
    name: "",
    price: 0,
    capacity: 0,
    no_tlp: 0,
    tipe: "",
    year: 0,
    desc: "",
    img: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await addDoc(collection(db, "cars"), data);
      setStatus(true);
      navigate(-1);
    } catch (error) {
      console.log(error);
    }
    console.log(data);
  };

  /*
  const onInsertFile = (e) => {
    const file = e.target.files;
    const fileArray = Array.from(file);

    const imagesArray = fileArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setImages((previousImages) => previousImages.concat(imagesArray));
  };
  */

  /*
  let preview = images.map((image, index) => {
    return (
      <div
        key={image.preview}
        className="relative flex justify-center rounded-lg"
      >
        <button
          className="absolute -right-2 -top-3 rounded-full bg-red-500 text-white font-bold text-2xl"
          onClick={(e) => {
            setImages(images.filter((e) => e !== image));
            setData({ ...data, img: "" });
          }}
        >
          <RiCloseFill />
        </button>
        <img
          src={image.preview}
          alt="img"
          className="w-24 h-24 object-cover rounded-lg"
        />
      </div>
    );
  });
*/

  const [file, setFile] = useState("");

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

  const [url, setUrl] = useState("");

  useEffect(() => {
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

          setPerc(progress);
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
  }, [file]);

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
            Isi data mobil yang ingin direntalkan
          </h1>
        </div>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label>Nama Mobil</label>
            <input
              type="text"
              className="field"
              required
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label>Harga Mobil</label>
            <input
              type="number"
              className="field"
              required
              onChange={(e) => setData({ ...data, price: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label>Kapasitas Mobil</label>
            <input
              type="number"
              className="field"
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
              required
              onChange={(e) => setData({ ...data, year: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <label>Deskripsi</label>
            <textarea
              type="text"
              className="field"
              required
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
                    required
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
        </form>

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
            onClick={handleSubmit}
          >
            Pasang Iklan
          </button>
        </div>
      </div>
      {openModal && <div className="opacity-75 fixed inset-0 bg-black"></div>}
    </div>
  );
};

export default AddCar;
