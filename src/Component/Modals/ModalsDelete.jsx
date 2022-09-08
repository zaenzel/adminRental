import React from "react";
import "./ModalsDelete.css";

const ModalsDelete = ({ setShowModal, showModal }) => {
  return (
    <>
      <div className="modal">
        <div className="content-modal">
          <img src="" alt="" />
          <h1>Apakah anda yakin ingin menghapus mobil ini?</h1>
          <div className="wrap-btn-modal">
            <button
              className="btn-modal-delete cancel"
              onClick={setShowModal(false)}
            >
              Batal
            </button>
            <button className="btn-modal-delete delete">Hapus</button>
          </div>
        </div>
      </div>
      <div className="bg"></div>
    </>
  );
};

export default ModalsDelete;
