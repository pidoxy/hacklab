import { useState } from "react";

export default function Login() {
  const [loginData, setLoginData] = useState({ email: "", password: "" });

  const submit = () => {
    console.log("logged in");
  };

  return (
    <>
      <div className="flex py-10">
        <div className="m-auto md:w-1/2 text-left bg-white p-10 flex space-y-3 flex-col">
          <h1 className="text-4xl font-bold">Log in</h1>

          <form class="flex flex-col pt-6 pb-8 space-y-5 mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="email"
            >
              Email address
            </label>
            <input
              class="shadow appearance-none bg-ray border border-dar w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Dan1234@gmail.com"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none bg-ray border border-dar w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />
            <button
              onClick={submit}
              className=" flex items-center justify-center px-4 mx-8 py-3 bg-lihb shadow-sm font-bold md:text-lg text-white "
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
