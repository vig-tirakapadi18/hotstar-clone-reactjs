import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import disneyLogo from "../assets/images/logo.svg";
import { FaHome, FaPlus, FaStar } from "react-icons/fa";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { RiMovie2Fill } from "react-icons/ri";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { provider } from "../firebase";
import {
  signInWithPopup,
  onAuthStateChanged,
  getAuth,
  signOut,
} from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const navigator = useNavigate();
  const username = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);

  const auth = getAuth();

  const setUser = useCallback(
    (user) => {
      dispatch(
        setUserLoginDetails({
          name: user.displayName,
          email: user.email,
          photo: user.photoUrl,
        })
      );
    },
    [dispatch]
  );

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        navigator("/home");
      }
    });
  }, [auth, navigator, setUser, username]);

  const handleAuth = () => {
    if (!username) {
      signInWithPopup(auth, provider)
        .then((res) => {
          setUser(res.user);
        })
        .catch((err) => alert(err.message));
    } else {
      signOut(auth)
        .then(() => {
          dispatch(setSignOutState());
          navigator("/");
        })
        .catch((err) => {
          alert(err.message);
        });
    }
  };

  return (
    <Nav>
      <Logo>
        <img
          src={disneyLogo}
          alt="Disney+"
        />
      </Logo>
      {!username ? (
        <Login onClick={handleAuth}>Login</Login>
      ) : (
        <>
          <NavMenu>
            <a href="/home">
              <FaHome size={18} />
              <span>HOME</span>
            </a>
            <a href="/home">
              <BsFillSearchHeartFill size={16} />
              <span>SEARCH</span>
            </a>
            <a href="/home">
              <FaPlus size={16} />
              <span>WATCHLIST</span>
            </a>
            <a href="/home">
              <FaStar size={16} />
              <span>ORIGINALS</span>
            </a>
            <a href="/home">
              <RiMovie2Fill size={18} />
              <span>MOVIES</span>
            </a>
            <a href="/home">
              <MdOutlineOndemandVideo size={18} />
              <span>SERIES</span>
            </a>
          </NavMenu>
          <SignOut>
            <UserImg
              src={userPhoto}
              alt={username}
            />
            <DropDown>
              <span onClick={handleAuth}>Sign out</span>
            </DropDown>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    FaHome {
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      margin-left: 7px;
      color: rgb(249, 249, 249);
      font-size: 15px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px 0px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scale(0);
        transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scale(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 200ms ease-out;
  cursor: pointer;

  &:hover {
    background-color: #f9f9f9;
    color: black;
    border-color: transparent;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
