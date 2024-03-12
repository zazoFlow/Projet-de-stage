import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Actions
import { SetUserInfo, SetUserType } from "../Redux/Slices/UserSlice";
import { Show_CreateAccount } from "../Redux/Slices/DisplaySlice";

export default function SeConnecter() {
  const dsp = useDispatch();
  const OpenCreerCompte = () => dsp(Show_CreateAccount());
  const [Error, SetError] = useState("");

  const HSubmit = (e) => {
    e.preventDefault();

    const inpData = { type: e.target[0].value, email: e.target[1].value, password: e.target[2].value };
    axios
      .post(`http://localhost:8000/api/Login`, { inpData })
      .then((rep) => {
        console.log(rep);

        // if Error Exist in Response -> Compte Not Exist
        if (!rep.data.err) {
          dsp(SetUserType(inpData.type));
          dsp(SetUserInfo(rep.data.results));
        } else {
          SetError(`Email ou Mot de passe est incorrect.`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="authen-form-container">
      <div id="authen-form">
        {Error !== "" && <p id="error">{Error}</p>}

        <form onSubmit={HSubmit}>
          <select id="type" required className="inp">
            <option value="admin" selected>
              Administrateur
            </option>
            <option value="manager">Gestionnaire</option>
            <option value="user">Utilisatuer</option>
          </select>
          <input type="text" placeholder="Email" className="inp" required />
          <input type="password" placeholder="Password" className="inp" required />

          <button className="btn">Se Connecter</button>
        </form>

        <p id="text">
          Si vous n'aver pas un compte. <span onClick={OpenCreerCompte}>Creer Compte</span>
        </p>
      </div>
    </div>
  );
}
