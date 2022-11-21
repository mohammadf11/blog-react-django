import "./write.css";
import { useState } from "react";
import { usePostCreateMutation } from "../../services/postApi";
import { useNavigate } from "react-router-dom";

export default function Write() {
  const [photo, setPhoto] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [serverError, setServerError] = useState("");

  const [postCreate] = usePostCreateMutation();
  const navigate = useNavigate();

  const clearData = () => {
    setPhoto(null);
    setTitle("");
    setBody("");
  };

  const postCreateHandler = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("author", 1);
    formData.append("photo", photo);
    formData.append("title", title);
    formData.append("body", body);
    const res = await postCreate(formData);
    if (res.error) {
      const errors = res.error.data;
      for (const error in errors) {
        if (error === "title") setTitle(errors[error]);
        if (error === "body") setBody(errors[error]);
      }
    }
    if (res.data) {
      clearData();
      navigate("/");
    }
  };

  return (
    <div className="write">
      <img
        className="writeImg"
        src="https://images.pexels.com/photos/6685428/pexels-photo-6685428.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
        alt=""
      />
      <form className="writeForm" onSubmit={postCreateHandler}>
        {serverError.title ? (
          <div className="error">
            <span>{serverError.title[0]}</span>
          </div>
        ) : (
          ""
        )}
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fas fa-plus"></i>
          </label>
          <input
            id="fileInput"
            onChange={(e) => setPhoto(e.target.files[0])}
            type="file"
            style={{ display: "none" }}
          />

          <input
            className="writeInput"
            placeholder="Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus={true}
          />
        </div>
        {serverError.body ? (
          <div className="error">
            <span>{serverError.body[0]}</span>
          </div>
        ) : (
          ""
        )}
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Tell your story..."
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            autoFocus={true}
          />
        </div>
        <button className="writeSubmit" type="submit">
          Publish
        </button>
      </form>
    </div>
  );
}
