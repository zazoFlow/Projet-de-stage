import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./emprunt-btn.css";

// Actions
import { SetTableData } from "../../Redux/Slices/UserSlice";

export default function Annuler({ rowData, k }) {
  const [showConfirm, SetshowConfirm] = useState(false);
  const status = rowData.Status.toLowerCase().trim();
  let MyTimeout = null;

  // Async Methods Info
  const dsp = useDispatch();
  const { CSname, UT_pk_value } = useSelector((st) => st.user);

  const HClick = async () => {
    SetshowConfirm(true);
    MyTimeout = setTimeout(() => SetshowConfirm(false), 3000);
  };

  const HConfirm = async () => {
    if (MyTimeout !== null) {
      clearTimeout(MyTimeout);
      MyTimeout = null;
    }

    SetshowConfirm(false);

    axios
      .put(`http://localhost:8000/api/Emprunt/${rowData.id_Emprunt}`, { seters: { Status: "Annuler" } })
      .then((rep) => {
        console.log(rep);

        if (rep.data.err === false) {
          const id = UT_pk_value !== null ? Object.values(UT_pk_value)[0] : "NoId";
          const UT = Object.keys(UT_pk_value).filter((k) => k.toLowerCase() === "id_admin").length > 0 ? "Admin" : "User";
          axios["get"](`http://localhost:8000/api/${UT}/${id}/Emprunts`)
            .then((rep) => {
              console.log(rep);
              if (!rep.data.err) {
                const rows = rep.data.results;
                dsp(SetTableData({ CSname, all: rows, Wiithfiltre: rows, ToShow: rows }));
              } else dsp(SetTableData({ CSname, all: [], Wiithfiltre: [], ToShow: [] }));
            })
            .catch((err) => {
              console.log(err);
              dsp(SetTableData({ CSname, all: [], Wiithfiltre: [], ToShow: [] }));
            });
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <>
      {status === "en cours de traiter" && (
        <button key={k} className={`btn emprunt-btn ${showConfirm ? "confirmer-btn" : ""}`} onClick={showConfirm ? HConfirm : HClick}>
          {showConfirm ? "Confirmer" : "Annuler"}
        </button>
      )}
      {status === "annuler" && <small key={k}>pas d'actions</small>}
    </>
  );
}
