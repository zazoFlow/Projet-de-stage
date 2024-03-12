import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./emprunt-btn.css";

// Actions
import { SetTableData } from "../../Redux/Slices/UserSlice";

export default function Valider({ rowData, k }) {
  const [showConfirm, SetshowConfirm] = useState(false);
  const display = rowData.Status.toLowerCase().trim() === "en cours de traiter";
  let MyTimeout = null;

  // Async Methods Info
  const dsp = useDispatch();
  const { CSname, UT_pk_value } = useSelector((st) => st.user);

  const HClick = () => {
    SetshowConfirm(true);
    MyTimeout = setTimeout(() => SetshowConfirm(false), 3000);
  };

  const HConfirm = () => {
    if (MyTimeout !== null) {
      clearTimeout(MyTimeout);
      MyTimeout = null;
    }

    SetshowConfirm(false);

    axios
      .put(`http://localhost:8000/api/Emprunt/${rowData.id_Emprunt}`, { seters: { Status: "Valider" } })
      .then((rep) => {
        console.log(rep);

        if (rep.data.err === false) {
          const id = UT_pk_value !== null ? Object.values(UT_pk_value)[0] : "NoId";
          axios["get"](`http://localhost:8000/api/Admin/${id}/Emprunts`)
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
    Object.keys(UT_pk_value)[0].toLowerCase() !== "id_user" &&
    display && (
      <button key={k} className={`btn emprunt-btn ${showConfirm ? "confirmer-btn" : ""}`} onClick={showConfirm ? HConfirm : HClick}>
        {showConfirm ? "Confirmer" : "Valider"}
      </button>
    )
  );
}
