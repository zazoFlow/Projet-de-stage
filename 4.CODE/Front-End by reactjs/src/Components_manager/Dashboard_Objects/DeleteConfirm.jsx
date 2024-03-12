import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Actions
import { HideDeleteConfirm } from "../../Redux/Slices/DisplaySlice";
import { SetTableData } from "../../Redux/Slices/UserSlice";

export default function DeleteConfirm() {
  const dsp = useDispatch();
  const { CSname, UT_pk_value } = useSelector((st) => st.user);
  const { number, id } = useSelector((st) => st.display.rowInfo);

  // Events
  const HCancle = () => dsp(HideDeleteConfirm());
  const HDelete = () => {
    axios["delete"](`http://localhost:8000/api/Object/${id}`)
    .then((rep) => {
        console.log(rep);

        if (!rep.data.err) {
            // Hide Confirmation Nav
            dsp(HideDeleteConfirm());

            // Get All Data After Delete Don
            
  const id = UT_pk_value !== null ? Object.values(UT_pk_value)[0] : 'NoId';
  axios["get"](`http://localhost:8000/api/Admin/${id}/Objects`)
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
    .catch((err) => console.log(err));
  };

  return (
    <div id="delete-confirm">
      <p id="text">Supprimer Definitivement La Ligne Numero {number}</p>

      <div id="delete-confirm-btns">
        <button className="btn cancle" onClick={HCancle}>
          annuler
        </button>
        <button className="btn delete" onClick={HDelete}>
          supprimer
        </button>
      </div>
    </div>
  );
}