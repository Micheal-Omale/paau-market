import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Modal from "./utilities/Modal";
import { ModalContext } from "../App";

import { authenticated } from "./authenticationSlice";

import { useGetUserMutation } from "./serviceAPI/jsonServerApi";

function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({ loginId: "", pwd: "" });
  const { isModal, setIsModal } = useContext(ModalContext);
  const [getUser] = useGetUserMutation();

  const { isLoggedIn, info } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onChangedLoginValue = (ev) => {
    let name = ev.target.name,
      value = ev.target.value;

    setUser((preState) => {
      return { ...preState, [name]: value };
    });
  };

  async function onSubmitLoginHandler(ev) {
    ev.preventDefault();

    if (user.loginId && user.pwd) {
      console.log("Logged In");
      const { data } = await getUser(user);

      if (data.status === "failed") {
        setIsModal({ open: true, content: data.message });
      } else {
        dispatch(
          authenticated({ isLoggedIn: data.isLoggedIn, info: data.user })
        );
        setUser({ loginId: "", pwd: "" });

        location.state === null || location.state.background.pathname === "/"
          ? navigate("/")
          : navigate(location.state.background.pathname);
      }
    } else {
      setIsModal({
        open: true,
        content: "Please enter your email  or phone number & password!",
      });
    }
  }

  useEffect(() => {
    if (isLoggedIn && info.id) {
      navigate("/");
    }
  }, []);

  return (
    <section>
      <h1>Log In</h1>
      {isModal.open && <Modal content={isModal.content} />}
      <form method="post">
        <div>
          <label htmlFor="userPassId">Email address or Phone number</label>
          <br />
          <input
            type="text"
            name="loginId"
            placeholder="Enter your Email address or Phone Number"
            id="userPassId"
            value={user.loginId}
            onChange={(ev) => onChangedLoginValue(ev)}
          />
        </div>

        <div>
          <label htmlFor="pwd">Password</label> <br />
          <input
            type="password"
            name="pwd"
            placeholder="Enter Password"
            id="pwd"
            value={user.pwd}
            onChange={(ev) => onChangedLoginValue(ev)}
          />
        </div>

        <div>
          <input
            type="submit"
            onClick={(ev) => onSubmitLoginHandler(ev)}
            value="Log In"
          />
        </div>
      </form>
      <p>
        I don't have an account <Link to="/register">Register</Link>
      </p>
    </section>
  );
}

export default Login;
