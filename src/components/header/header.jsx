import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export const Header = () => {
  const router = useRouter()
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (window) setUser(localStorage.getItem("email"));
  });
  return (
    <header>
      <div>
        <div className="topNav">
          <Link href={`/`} passHref>
            <a>
              <Image
                alt="logo"
                src={"/images/logo_black.png"}
                width={50}
                height={50}
              />
            </a>
          </Link>
          <nav>
            <ul>
              <li>
                <Link href="/" passHref>
                  <a> Home</a>
                </Link>
              </li>
              <li>
                <Link href="/events" passHref>
                  <a> Events</a>
                </Link>
              </li>
              <li>
                <Link href="/about-us" passHref>
                  <a> About us</a>
                </Link>
              </li>
              <li>{user}</li>
              {
                user? <li className="link" onClick={() => {localStorage.removeItem("email"); router.reload()}}>logout</li>
                :
                <></>
              }
            </ul>
          </nav>
        </div>
        <div>
          {user ? (
            <> </>
          ) : (
            <div>
              <Link href="/register" passHref>
                <a className="btn btn-primary">Register</a>
              </Link>
              <Link href="/login" passHref>
                <a className="btn btn-outline">Login</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
