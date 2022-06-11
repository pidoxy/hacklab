export default function Home() {
  return (
    <>
      <div className="App-background h-5/6 flex ">
        <div className="text-white text-left space-y-5 px-5 my-auto ">
          <h1 className="md:text-4xl text-xl font-extrabold text-white">
            PheraCAM AI |Facial Recognition
          </h1>

          <p className="md:text-2xl text-base  md:font-bold font-medium">
            AI-Based Security and protection System that uses
            <br /> facial recognition and edge computing to alert
            <br /> you when an unregistered face is detected.
          </p>

          <div className="space-x-5">
            <a
              href="/sign-up"
              className="ml-8 inline-flex items-center justify-center px-8 py-3 bg-lihb shadow-sm font-bold md:text-lg text-white "
            >
              Sign up
            </a>
            <a
              href="sign-in"
              className=" text-lihb outline outline-lihb font-bold md:text-lg px-8 py-3 hover:text-gray-900"
            >
              Log in
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
