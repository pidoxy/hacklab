import { useState, useRef, useCallback } from "react";
import { Button, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import "antd/dist/antd.css";

import addOthers from "../images/add.svg";
import Webcam from "react-webcam";
import openNotificationWithIcon from "./notification";
import { useEffect } from "react";
import apiServices from "../services/apiServices";

export default function SignUp() {
  const [data, setData] = useState({
    name: "",
    email: "",
    tel: "",
    password: "",
    confirmPassword: "",
  });

  const { Dragger } = Upload;

  const [next, setNext] = useState(1);
  const [checked, setChecked] = useState("Take photo");
  const [image, setImage] = useState("");
  const [emailResult, setEmailResult] = useState({ text: "", color: "" });

  const [fileList, setFileList] = useState([]);
  const [uploading, setUploading] = useState(false);

  // email validation
  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  // persist data on refreshing
  const reload = localStorage.getItem("next");

  const pageAccessedByReload =
    (window.performance.navigation &&
      window.performance.navigation.type === 1) ||
    window.performance
      .getEntriesByType("navigation")
      .map((nav) => nav.type)
      .includes("reload");

  useEffect(() => {
    if (pageAccessedByReload && JSON.stringify(reload) === 2) {
      setNext(2);
    }

    if (pageAccessedByReload && !JSON.stringify(reload)) {
      setNext(1);
    }

    if (pageAccessedByReload === "true" && JSON.stringify(reload) === 3) {
      setNext(3);
    }
  }, [pageAccessedByReload, reload]);

  const validate = () => {
    setEmailResult({ ...emailResult, text: "" });

    if (validateEmail(data.email)) {
      setEmailResult({
        ...emailResult,
        text: data.email + " is valid :)",
        color: "green",
      });
    } else {
      setEmailResult({
        ...emailResult,
        text: "Email is not valid :(",
        color: "red",
      });
    }
    return false;
  };

  // file handling
  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append("image", file);
      formData.append("name", data.name);
      console.log(formData);
      console.log(file);
    });
    setUploading(true); // You can use any AJAX library you like

    apiServices
      .uploadImages(formData)
      .then((res) => console.log(res))
      .then(() => {
        setFileList([]);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
      })
      .finally(() => {
        setUploading(false);
      });
  };

  const props = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

  // 1st next button
  const submit = (e) => {
    e.preventDefault();
    console.log("submitted");

    const { name, email, tel, password, confirmPassword } = data;

    if (name === "") {
      openNotificationWithIcon("error", "Please Input Full Name");
    } else if (email === "") {
      openNotificationWithIcon("error", "Please Input Email address");
    } else if (tel === "") {
      openNotificationWithIcon("error", "Please Input Telephone No");
    } else if (password === "") {
      openNotificationWithIcon("error", "Please Input ");
    } else if (validate === false) {
      openNotificationWithIcon("error", "Invalid Email ");
    } else if (password !== confirmPassword) {
      openNotificationWithIcon("error", "Paswords do not match");
    } else {
      if (name && email && tel && password && next === 1) {
        setNext(2);
        localStorage.setItem("next", 2);
        openNotificationWithIcon("success", "");
      }
    }

    // data submission
    apiServices
      .createUser({
        username: data.name,
        email: data.email,
        first_name: data.name,
        last_name: data.name,
        password: data.password,
      })
      .then((res) => {
        console.log(res);
        // window.location.href = "/login";
      });
  };

  function dataURItoBlob(dataURI) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    var byteString;
    if (dataURI.split(",")[0].indexOf("base64") >= 0)
      byteString = atob(dataURI.split(",")[1]);
    else byteString = unescape(dataURI.split(",")[1]);

    // separate out the mime component
    var mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    // write the bytes of the string to a typed array
    var ia = new Uint8Array(byteString.length);
    for (var i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], { type: mimeString });
  }

  // 2nd next button
  const submit2 = (e) => {
    e.preventDefault();
    console.log("submitted");

    if (image) {
      setNext(3);
      localStorage.setItem("next", 3);
      openNotificationWithIcon("success", "");
    } else if (!image && checked === "Take photo") {
      openNotificationWithIcon("error", "Please take a photo");
    } else if (!image && checked === "Upload photo") {
      setNext(3);
    }

    if (image) {
      let blob = dataURItoBlob(image);
      let fd = new FormData();
      fd.append("image", blob);
      fd.append("name", data.name);


      setUploading(true); // You can use any AJAX library you like'

      apiServices
        .uploadImages(fd)
        .then((res) => console.log(res))
        .then(() => {
          setFileList([]);
          message.success("upload successfully.");
        })
        .catch(() => {
          message.error("upload failed.");
        })
        .finally(() => {
          setUploading(false);
        });
    }
  };

  const cancel = () => {
    console.log("cancelled");
    setNext(1);
    localStorage.setItem("next", 1);
  };

  const webcamRef = useRef(null);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
    console.log(imageSrc);
  }, [webcamRef]);

  const videoConstraints = {
    width: 1280,
    height: 720,
    facingMode: "user",
  };

  return (
    <>
      <div className="flex py-10">
        {next === 1 ? (
          <div className="m-auto md:w-1/2 text-left bg-white p-10 flex space-y-3 flex-col">
            <h1 className="text-4xl font-bold">Sign up</h1>
            <h4 className="text-rey">Step 1 of 2</h4>
            <h2 className="text-xl text-bold">Personal Details</h2>
            <form className="flex flex-col pt-6 pb-8 space-y-5 mb-4">
              <input
                className="shadow appearance-none bg-ray border border-dar w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullname"
                type="text"
                placeholder="Full name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              <input
                className="shadow appearance-none bg-ray border border-dar w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email address"
                value={data.email}
                onInput={validate}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <p className="font-bold" style={{ color: emailResult.color }}>
                {emailResult.text}
              </p>
              <input
                className="shadow appearance-none bg-ray border border-dar w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="telephone"
                type="number"
                placeholder="(0) 913 478 7640"
                value={data.tel}
                onChange={(e) => setData({ ...data, tel: e.target.value })}
              />
              <input
                className="shadow appearance-none bg-ray border border-dar w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="0000"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <input
                className="shadow appearance-none bg-ray border border-dar w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password2"
                type="password"
                placeholder="0000"
                value={data.confirmPassword}
                onChange={(e) =>
                  setData({ ...data, confirmPassword: e.target.value })
                }
              />
              <div className="flex justify-center w-full space-x-2">
                <button
                  onClick={() => (window.location.href = "/")}
                  className=" text-lihb w-full outline outline-lihb font-bold md:text-lg px-8 py-3 hover:text-gray-900"
                >
                  Cancel
                </button>
                <button
                  onClick={(e) => {
                    submit(e);
                  }}
                  className=" w-full justify-center px-8 py-3 bg-lihb shadow-sm font-bold md:text-lg text-white "
                >
                  Next{" "}
                </button>
              </div>
            </form>
          </div>
        ) : next === 2 ? (
          <div className="m-auto md:w-1/2 text-left bg-white p-10 flex space-y-3 flex-col">
            <h1 className="text-4xl font-bold">Sign up</h1>
            <h4 className="text-rey">Step 2 of 3</h4>
            <h2 className="text-xl text-bold">Setup Face ID</h2>
            {/* <form className="flex flex-col pt-6 pb-8 space-y-5 mb-4"> */}
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="accountType"
                  value="Take photo"
                  checked={checked === "Take photo" ? true : false}
                  onChange={(e) => {
                    setChecked(e.target.value);
                    console.log(checked);
                  }}
                />
                <span className="ml-2">Take photo</span>
              </label>
              <label className="inline-flex items-center ml-6">
                <input
                  type="radio"
                  className="form-radio"
                  name="accountType"
                  value="Upload photo"
                  checked={checked === "Upload photo" ? true : false}
                  onChange={(e) => {
                    setChecked(e.target.value);
                    console.log(checked);
                  }}
                />
                <span className="ml-2">Upload photo</span>
              </label>

              {checked === "Upload photo" ? (
                <>
                  <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">
                      Click or drag file to this area to upload
                    </p>
                    <p className="ant-upload-hint">
                      Support for svg images doesn't exist. Support for a single
                      or bulk upload. Strictly prohibit from uploading company
                      data or other band files
                    </p>
                  </Dragger>
                  <Button
                    type="primary"
                    onClick={handleUpload}
                    disabled={fileList.length === 0}
                    loading={uploading}
                    style={{
                      marginTop: 16,
                    }}
                  >
                    {uploading ? "Uploading" : "Start Upload"}
                  </Button>
                </>
              ) : image === "" ? (
                <>
                  <Webcam
                    audio={false}
                    height={200}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={220}
                    videoConstraints={videoConstraints}
                  />
                  <div className="flex">
                    {image ? (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setImage("");
                        }}
                        className="justify-center px-4 py-3 my-2 bg-lihb shadow-sm font-medium md:text-lg text-white "
                      >
                        Capture Image
                      </button>
                    ) : (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          capture();
                        }}
                        className=" justify-center px-4 py-3 my-2 bg-lihb shadow-sm font-medium md:text-lg text-white "
                      >
                        Recapture
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <img src={image} alt="uploaded user" />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setImage("");
                    }}
                    className="webcam-btn"
                  >
                    Retake Image
                  </button>
                </>
              )}
            </div>

            <h2 className="text-xl text-bold">Add others</h2>
            <img
              alt="add others"
              role={"button"}
              src={addOthers}
              className="w-10"
            />

            <div className="flex justify-center w-full space-x-2">
              {next === 1 ? (
                <>
                  <button
                    onClick={cancel}
                    className=" text-lihb w-full outline outline-lihb font-bold md:text-lg px-8 py-3 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submit}
                    className=" w-full justify-center px-8 py-3 bg-lihb shadow-sm font-bold md:text-lg text-white "
                  >
                    Next
                  </button>
                </>
              ) : next === 2 ? (
                <button
                  onClick={() => setNext(1)}
                  className=" text-lihb w-full outline outline-lihb font-bold md:text-lg px-8 py-3 hover:text-gray-900"
                >
                  Back
                </button>
              ) : next === 3 ? (
                <button
                  onClick={() => setNext(2)}
                  className=" text-lihb w-full outline outline-lihb font-bold md:text-lg px-8 py-3 hover:text-gray-900"
                >
                  Back
                </button>
              ) : null}
              <button
                onClick={submit2}
                className=" w-full justify-center px-8 py-3 bg-lihb shadow-sm font-bold md:text-lg text-white "
              >
                Next
              </button>
            </div>
            {/* </form> */}
          </div>
        ) : next === 3 ? (
          <div className="m-auto md:w-1/2 text-left bg-white p-10 flex space-y-5 flex-col">
            <h1 className="text-4xl font-bold">Sign up</h1>
            <h4 className="text-rey">Step 3 of 3</h4>
            <h2 className="text-3xl text-bold">Select a category</h2>
            <h4 className="text-xl ">Total number of members 3</h4>
            <h4 className="text-xl">What would you like to secure today?</h4>
            {/* <form className="flex flex-col pt-6 pb-8 space-y-5 mb-4"> */}
            <div className="flex flex-col space-y-5">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="accountType"
                  value="My Phone"
                  onChange={(e) => {
                    setChecked(e.target.value);
                    console.log(checked);
                  }}
                />
                <span className="ml-2 text-xl">My Phone</span>
              </label>
              <label className="inline-flex  items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="accountType"
                  value="My Vehicle"
                  onChange={(e) => {
                    setChecked(e.target.value);
                    console.log(checked);
                  }}
                />
                <span className="ml-2 text-xl">My Vehicle</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="accountType"
                  value="My Smarthome"
                  onChange={(e) => {
                    setChecked(e.target.value);
                    console.log(checked);
                  }}
                />
                <span className="ml-2 text-xl">My Smarthome</span>
              </label>
            </div>

            <div className="flex justify-center w-full space-x-2">
              {!next ? (
                <>
                  <button
                    onClick={cancel}
                    className=" text-lihb w-full outline outline-lihb font-bold md:text-lg px-8 py-3 hover:text-gray-900"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submit2}
                    className=" w-full justify-center px-8 py-3 bg-lihb shadow-sm font-bold md:text-lg text-white "
                  >
                    Next
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setNext(false)}
                  className=" text-lihb w-full outline outline-lihb font-bold md:text-lg px-8 py-3 hover:text-gray-900"
                >
                  Back
                </button>
              )}
              <button
                onClick={()=>window.location.href="/login"}
                className=" w-full justify-center px-8 py-3 bg-lihb shadow-sm font-bold md:text-lg text-white "
              >
                Sign Up
              </button>
            </div>
            {/* </form> */}
          </div>
        ) : null}
      </div>
    </>
  );
}
