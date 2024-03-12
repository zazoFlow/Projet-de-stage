import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Actions
import { Hide_CreateAccount } from "../Redux/Slices/DisplaySlice";

export default function CreateAccount() {
  const dsp = useDispatch();
  const [Email, SetEmail] = useState("");
  const [Password, SetPassword] = useState("");
  const [Error, SetError] = useState("");
  const CloseCreerCompte = () => dsp(Hide_CreateAccount());

  const HSubmit = (e) => {
    e.preventDefault();

    const inpData = { type: e.target[0].value, email: e.target[1].value };
    axios
      .post(`http://localhost:8000/api/CreateAccount`, { inpData })
      .then((rep) => {
        console.log(rep);

        if (!rep.data.err) {
          SetEmail(rep.data.results.email);
          SetPassword(rep.data.results.password);
          SetError("");
        } else if (rep.data.err_msg === "email already active") {
          SetError(`Email ${inpData.email} dejat Active.`);
        } else if (rep.data.err_msg === "email not exist") {
          SetError(`Email ${inpData.email} n'exist pas dans le systhem.`);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div id="authen-form-container">
      <div id="authen-form">
        {Error !== "" && <p id="error">{Error}</p>}

        {Password === "" ? (
          <form onSubmit={HSubmit}>
            <select id="type" className="inp" required>
              <option value="admin" selected>
                Administrateur
              </option>
              <option value="manager">Gestionnaire</option>
              <option value="user">Utilisatuer</option>
            </select>
            <input type="text" placeholder="Email" className="inp" required />

            <button className="btn">Creer Compte</button>
          </form>
        ) : (
          <p id="details">
            <h1 id="title">Votre Cordonner De Connection</h1>
            <div id="data">
              <span id="label">Email:</span> <span id="value">{Email}</span>
              <span id="label">Mot De Pass:</span> <span id="value">{Password}</span>
            </div>
          </p>
        )}

        <p id="text">
          Si vous aver dejat un compte. <span onClick={CloseCreerCompte}>Se Connecter</span>
        </p>
      </div>
    </div>
  );
}
