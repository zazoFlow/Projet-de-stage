import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import "./emprunt-btn.css";

// Actions
import { SetTableData } from "../../Redux/Slices/UserSlice";

export default function Emprunter({ rowData, k }) {
  // Async Methods Info
  const dsp = useDispatch();
  const { CSname, UT_pk_value } = useSelector((st) => st.user);

  // Prepare Dict
  const dict = { id_User: UT_pk_value.id_User, id_Object: rowData.id_Object };

  const HClick = async () => {
    axios
      .post("http://localhost:8000/api/Emprunt", { dict })
      .then((rep) => {
        console.log(rep);

        if (rep.data.err === false) {
          axios["get"](`http://localhost:8000/api/Object`)
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

  return rowData.emprunted.toLowerCase() === "disponible" ? (
    <button key={k} className="btn emprunt-btn" onClick={HClick}>
      Emprunter
    </button>
  ) : (
    <small key={k}>dejat Emprunter</small>
  );
}
