"use client";
import { useState, useCallback } from "react";
import Input from "../components/Input";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useCurrentUser from "../hooks/useCurrentUser";

const auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setname] = useState("");
  const [loading, setLoading] = useState(false)

  const [variant, setVariant] = useState("login");

  const { data: user, isLoading } = useCurrentUser();


  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    try {
      setLoading(true)
      await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      }).then((callback) => {
        if (callback?.ok) {
          console.log("Login successful");
        }
        if (callback?.error) {
          console.log("login error");
        }
      }).finally(()=>{
        setLoading(false)
        router.push('/profiles')
      })
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      axios.post("/api/register", {
        email,
        name,
        password,
      });
      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Netflix logo" className="h-10" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full ">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign In" : "Register"}
            </h2>{" "}
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="username"
                  label="Username"
                  onChange={(e: any) => {
                    setname(e.target.value);
                  }}
                  type="text"
                  value={name}
                />
              )}

              <Input
                id="email"
                label="Email"
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                type="email"
                value={email}
              />
              <Input
                id="password"
                label="Password"
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                type="password"
                value={password}
              />
            </div>
            <button
              onClick={() => {
                variant === "login" ? login() : register();
              }}
              className="bg-red-600 text-white py-3 rounded-md w-full mt-6 hover:bg-red-700 transition "
              disabled={loading}
            >
              {variant === "login" ? "Login in" : "Register"}
            </button>
            <div className="flex flex-row items-center mt-8 gap-4 justify-center">
              <div
                onClick={() => signIn("google", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn("github", { callbackUrl: "/profiles" })}
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className="text-neutral-500 mt-10">
              {variant === "login"
                ? "First time using Netflix?"
                : "Already have an account?"}
              <span
                className="text-white ml-2  hover:underline cursor-pointer "
                onClick={() => toggleVariant()}
              >
                {variant === "login" ? "Register" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default auth;
