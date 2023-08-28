import { redirect } from "next/dist/server/api-utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState, useRef } from "react";

const RegisterPage = () => {
  const router = useRouter()
  const [message, setMessage] = useState("");
  const inputEmail = useRef();
  const pass1 = useRef();
  const pass2 = useRef();

  const onSubmit = async (e) => {
    e.preventDefault();
    const emailValue = inputEmail.current.value;
    const pwd1 = pass1.current.value;
    const pwd2 = pass2.current.value;

    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!emailValue.match(validRegex)) {
      setMessage("Please enter a valid email address");
      // return;
    } else if (pwd1 !== pwd2) {
      setMessage("Passwords do not match");
      // return;
    } else {
      try {
        const response = await fetch("/api/register", {
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
          inputEmail.current.value = "";
          pass1.current.value = "";
          pass2.current.value = "";
          router.push('/login')
        }
      } catch (e) {
        console.log("ERROR", e);
      }
    }
  };

  return (
    <div className="register">
      <h1>Create an account</h1>
      <form onSubmit={onSubmit} className="email_registration">
        <input ref={inputEmail} type="email" id="email" placeholder="Email" />
        <input
          ref={pass1}
          type="password"
          id="password"
          placeholder="Password"
        />
        <input
          ref={pass2}
          type="password"
          id="password"
          placeholder="Repeat password"
        />
        <button type="submit" className="btn btn-primary">
          {" "}
          Register{" "}
        </button>
        <Link href="/login" passHref>
        <a className="link">Login</a>
        </Link>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default RegisterPage;
