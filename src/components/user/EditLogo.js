import React, { useState } from "react";
import "./editDetails.css";
import { FaCloudUploadAlt, FaStarOfLife } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { deleteLogo, editLogo } from "../../store/vendorSlice";

function EditLogo() {
  const dispatch = useDispatch();
  const { vendorInfo } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.vendor);
  const id = vendorInfo.data._id;
  const [imagePreview, setimagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleimageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setimagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const formSubmit = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert("Please select a file");
    } else {
      const img = new FormData();
      img.append("img", selectedFile);
      dispatch(editLogo({ id, img }));
      console.log(img);
    }
  };

  function handleDelLogo() {
    dispatch(deleteLogo(id));
    console.log(status);
    console.log(id);
  }

  return (
    <div className="user-profile">
      <div className="edit-logo-home pt-4">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h3 className="mb-5">تعديل اللوجو</h3>
              <div className="text-center">
                <form action="" onSubmit={formSubmit}>
                  <div className="form-group text-center">
                    <label
                      htmlFor="image-input"
                      className="image-label d-flex justify-content-center align-items-center"
                    >
                      {imagePreview ? (
                        <img src={imagePreview} alt="" srcset="" />
                      ) : (
                        <span className="fw-blod fs-4">اضغط لاضافة اللوجو</span>
                      )}
                    </label>
                    <input
                      id="image-input"
                      type="file"
                      onChange={(e) => {
                        handleimageChange(e);
                        handleFileChange(e);
                      }}
                    />
                    <div className="image-text d-flex align-items-center mb-2 pe-3">
                      <span className="required ms-2">
                        <FaStarOfLife />
                      </span>
                      <span className="ms-2 fs-4">اختر اللوجو</span>
                      <FaCloudUploadAlt className="fs-4" />
                    </div>
                    <div className="image-text d-flex gap-3 justify-content-center align-items-center flex-wrap pe-3 text-center">
                      <button class="btn-66">تعديل</button>
                    </div>
                  </div>
                </form>
                <div class="wrap-delete">
                  <button class="button-delete" onClick={() => handleDelLogo()}>
                    <span class="text">حذف اللوجو</span>
                    <span class="icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z" />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditLogo;
