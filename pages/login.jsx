import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const inputEmail = useRef();
  const pass1 = useRef();
  const pass2 = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    const emailValue = inputEmail.current.value;
    const pwd1 = pass1.current.value;

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailValue.match(validRegex)) {
      setMessage("Please enter a valid email address");
      // return;
    } else {
      try {
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emailValue, password: pwd1 }),
        });

        // if (!response.ok) throw new Error(`Error: ${response.status}`);
        const data = await response.json();
        setMessage(data.message);
        if (response.ok) {
          localStorage.setItem("email", inputEmail.current.value);
          inputEmail.current.value = "";
          pass1.current.value = "";
            router.push("/");
        }
      } catch (e) {
        console.log("ERROR", e);
      }
    }
  };

  return (
    <div className="register">
      <h1>Login to your account</h1>
      <form onSubmit={onSubmit} className="email_registration">
        <input ref={inputEmail} type="email" id="email" placeholder="Email" />
        <input
          ref={pass1}
          type="password"
          id="password"
          placeholder="Password"
        />
        <button type="submit" className="btn btn-primary">
          {" "}
          Login{" "}
        </button>
        <Link href="/register" passHref>
        <a className="link">register</a>
        </Link>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default RegisterPage;
