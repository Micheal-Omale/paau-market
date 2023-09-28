import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Modal from "./utilities/Modal";
import { ModalContext } from "../App";

import { authenticated } from "./authenticationSlice";

import { useCreateUserAccountMutation } from "./serviceAPI/jsonServerApi";

function Register() {
  const [createUserAccount, { data, isLoading, isSuccess }] =
    useCreateUserAccountMutation();

  const [user, setUser] = useState({
    surname: "",
    firstName: "",
    loginId: "",
    pwd: "",
    confirmPwd: "",
  });
  const { isModal, setIsModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const { isLoggedIn, info } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const onChangedRegisterValue = (ev) => {
    let name = ev.target.name,
      value = ev.target.value;

    setUser((preState) => {
      return { ...preState, [name]: value };
    });
  };

  async function onSubmitRegisterHandler(ev) {
    ev.preventDefault();

    const { surname, firstName, loginId, pwd, confirmPwd } = user;

    if (surname && firstName && loginId && pwd) {
      if (pwd !== confirmPwd) {
        console.log("Sign Up");
        setIsModal({
          open: true,
          content: "Password mismatch!",
        });
      } else {
        const { data } = await createUserAccount(user);

        if (data.status === "failed") {
          setIsModal({ open: true, content: data.message });
        } else {
          dispatch(
            authenticated({ isLoggedIn: data.isLoggedIn, info: data.user })
          );
          setUser({
            surname: "",
            firstName: "",
            loginId: "",
            pwd: "",
            confirmPwd: "",
          });
          navigate("/");
        }
      }
    } else {
      setIsModal({
        open: true,
        content: "Please enter require fields!",
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
      <h1>Sign Up</h1>
      {isModal.open && <Modal content={isModal.content} />}
      <form method="post">
        <div>
          <label htmlFor="surname">Surname</label>
          <br />
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            id="surname"
            value={user.surname}
            onChange={(ev) => onChangedRegisterValue(ev)}
          />
        </div>

        <div>
          <label htmlFor="firstName">First Name</label>
          <br />
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            id="firstName"
            value={user.firstName}
            onChange={(ev) => onChangedRegisterValue(ev)}
          />
        </div>

        <div>
          <label htmlFor="userPassId">Email address or Phone number</label>
          <br />
          <input
            type="text"
            name="loginId"
            placeholder="Enter your Email address or Phone Number"
            id="userPassId"
            value={user.loginId}
            onChange={(ev) => onChangedRegisterValue(ev)}
          />
        </div>

        <div>
          <label htmlFor="pwd">Password</label> <br />
          <input
            type="password"
            name="pwd"
            placeholder="Create Password"
            id="pwd"
            value={user.pwd}
            onChange={(ev) => onChangedRegisterValue(ev)}
          />
        </div>

        <div>
          <label htmlFor="confirmPwd">Confirm Password</label> <br />
          <input
            type="password"
            name="confirmPwd"
            placeholder="Confrim Password"
            id="confirmPwd"
            value={user.confirmPwd}
            onChange={(ev) => onChangedRegisterValue(ev)}
          />
        </div>

        <div>
          <input
            type="submit"
            onClick={(ev) => onSubmitRegisterHandler(ev)}
            value="Register"
          />
        </div>
        <p>
          Already have an <Link to="/login">Log In</Link>
        </p>
      </form>
    </section>
  );
}

export default Register;
