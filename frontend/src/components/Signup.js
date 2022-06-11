import { useState, useRef, useCallback } from "react";
import { Upload } from "antd";
// import ImgCrop from "antd-img-crop";
import "antd/dist/antd.css";

import addOthers from "../images/add.svg";
import faceId from "../images/faceid.svg";
import Webcam from "react-webcam";

export default function SignUp() {
  const [data, setData] = useState({
    name: "",
    email: "",
    tel: "",
    password: "",
  });
  const [next, setNext] = useState(false);
  const [checked, setChecked] = useState("Take photo");
  const [image, setImage] = useState("");

  const submit = () => {
    console.log("submitted");

    const { name, email, tel, password } = data;

    if (name && email && tel && password) {
      setNext(true);
    }
  };

  // image upload
  const [fileList, setFileList] = useState([
    // {
    //   uid: "-1",
    //   name: "image.png",
    //   status: "done",
    //   url: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    // },
  ]);

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    let src = file.url;

    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);

        reader.onload = () => resolve(reader.result);
      });
    }

    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
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
        {next ? (
          <div className="m-auto md:w-1/2 text-left bg-white p-10 flex space-y-3 flex-col">
            <h1 className="text-4xl font-bold">Sign up</h1>
            <h4 className="text-rey">Step 1 of 2</h4>
            <h2 className="text-xl text-bold">Personal Details</h2>
            <form class="flex flex-col pt-6 pb-8 space-y-5 mb-4">
              <input
                class="shadow appearance-none bg-ray border border-dar w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullname"
                type="text"
                placeholder="Full name"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
              />
              <input
                class="shadow appearance-none bg-ray border border-dar w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email address"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
              />
              <input
                class="shadow appearance-none bg-ray border border-dar w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="fullname"
                type="tel"
                placeholder="(0) 913 478 7640"
                value={data.tel}
                onChange={(e) => setData({ ...data, tel: e.target.value })}
              />
              <input
                class="shadow appearance-none bg-ray border border-dar w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <input
                class="shadow appearance-none bg-ray border border-dar w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password2"
                type="password"
                placeholder="Confirm Password"
              />
              <div className="flex justify-center w-full space-x-2">
                <button className=" text-lihb w-full outline outline-lihb font-bold md:text-lg px-8 py-3 hover:text-gray-900">
                  Cancel
                </button>
                <button
                  onClick={submit}
                  className=" w-full justify-center px-8 py-3 bg-lihb shadow-sm font-bold md:text-lg text-white "
                >
                  Next{" "}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="m-auto md:w-1/2 text-left bg-white p-10 flex space-y-3 flex-col">
            <h1 className="text-4xl font-bold">Sign up</h1>
            <h4 className="text-rey">Step 2 of 2</h4>
            <h2 className="text-xl text-bold">Setup Face ID</h2>
            {/* <form className="flex flex-col pt-6 pb-8 space-y-5 mb-4"> */}
            <div className="mt-2">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-radio"
                  name="accountType"
                  value="Take photo"
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
                  onChange={(e) => {
                    setChecked(e.target.value);
                    console.log(checked);
                  }}
                />
                <span className="ml-2">Upload photo</span>
              </label>

              {
                checked === "Upload photo" ? (
                  <>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={fileList}
                      onChange={onChange}
                      onPreview={onPreview}
                    >
                      {fileList.length < 1 && "+ Upload"}
                    </Upload>
                  </>
                ) : image == "" ? (
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
                          className="justify-center px-4 py-3 bg-lihb shadow-sm font-medium md:text-lg text-white "
                        >
                          Recapture
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            capture();
                          }}
                          className=" justify-center px-4 py-3 bg-lihb shadow-sm font-medium md:text-lg text-white "
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
                )
                // <Webcam
                //   audio={false}
                //   height={200}
                //   screenshotFormat="image/jpeg"
                //   width={220}
                //   videoConstraints={videoConstraints}
                // >
                //     <button
                //       onClick={(e) => {
                //         e.preventDefault(); capture();
                //       }}
                //     >
                //       Capture photo
                //     </button>
                //     {/* <img
                //       alt="add others"
                //       onClick={() => {
                //         const imageSrc = getScreenshot();
                //       }}
                //       role={"button"}
                //       src={faceId}
                //       className="w-1/2"
                //     /> */}
                // </Webcam>
              }
            </div>

            <h2 className="text-xl text-bold">Add others</h2>
            <img
              alt="add others"
              role={"button"}
              src={addOthers}
              className="w-10"
            />

            <div className="flex justify-center w-full space-x-2">
              <button className=" text-lihb w-full outline outline-lihb font-bold md:text-lg px-8 py-3 hover:text-gray-900">
                Cancel
              </button>
              <button
                onClick={submit}
                className=" w-full justify-center px-8 py-3 bg-lihb shadow-sm font-bold md:text-lg text-white "
              >
                Next{" "}
              </button>
            </div>
            {/* </form> */}
          </div>
        )}
      </div>
    </>
  );
}
