/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import Section from "./Section"; // Components
import userImg from "../../imgs/logo.png"; // Images
import { Set_UT_PK, SetDisconnect1 } from "../../Redux/Slices/UserSlice"; // Actions
import { SetDisconnect2 } from "../../Redux/Slices/DisplaySlice"; // Actions

/**
 * Side Bar
 */
export default function SideBar() {
  const dsp = useDispatch();
  const userInfo = useSelector((st) => st.user.userInfo);
  const Disconnect = () => {
    dsp(SetDisconnect1());
    dsp(SetDisconnect2());
  };

  // !! This Code Not Her But in After Login !!
  // Set Info In Redux Store
  useEffect(() => {
    dsp(Set_UT_PK("id_Admin"));
  }, []);

  return (
    <div id="side-bar">
      <div id="logo-container">
        <img src={userImg} alt="logo" />
      </div>

      <ul id="sections">
        <Section s={"Gestionnaires"} />
        <Section s={"Types des Objects"} />
        <Section s={"Objects"} />
        <Section s={"Emprunts"} />
      </ul>

      <div id="user-options">
        <img id="user-img" src={userImg} alt="user" />

        <h5 id="user-name">{userInfo["email"] ? userInfo["email"] : "No Name Exist"}</h5>

        <div id="svg-container" onClick={Disconnect}>
          <i className="fa-solid fa-right-from-bracket"></i>
        </div>
      </div>
    </div>
  );
}
