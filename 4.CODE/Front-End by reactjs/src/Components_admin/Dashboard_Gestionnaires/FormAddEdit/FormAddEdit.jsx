import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Components
import Input from "./Input";


// Actions
import { HideForm, DisableButtonSubmit, EnableButtonSubmit } from "../../../Redux/Slices/DisplaySlice";
import { SetTableData } from "../../../Redux/Slices/UserSlice";

export default function FormAddEdit() {
  const BtnSubmitEnable = useSelector((st) => st.display.BtnSubmitEnable);

  // Async Methods Info
  const dsp = useDispatch();
  const HCancle = () => dsp(HideForm());
  const { CSname, UT_pk_value } = useSelector((st) => st.user);
  const { FormForAdd, rowInfo: { itemData, id } } = useSelector((st) => st.display); // prettier-ignore

  const HSubmit = (e) => {
    e.preventDefault();

    if (BtnSubmitEnable) {
      dsp(DisableButtonSubmit()); // disable Btn
      
      // For Add
      if (FormForAdd) {
        axios
    ["post"](`http://localhost:8000/api/Manager`, { dict: { ...itemData, ...UT_pk_value } })
    .then((rep) => {
        console.log(rep);

        if (!rep.data.err) {
            // Hide Form Add Edit Nav
            dsp(HideForm());

            // Get All Data After Add Don
            
  const id = UT_pk_value !== null ? Object.values(UT_pk_value)[0] : 'NoId';
  axios["get"](`http://localhost:8000/api/Admin/${id}/Managers`)
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
        } else {
            dsp(EnableButtonSubmit());
        }
    })
    .catch((err) => {
        console.log(err);
        dsp(EnableButtonSubmit());
    });
      }

      // For Edit
      if (!FormForAdd) {
        axios
    ["put"](`http://localhost:8000/api/Manager/${id}`, { seters: itemData })
    .then((rep) => {
        console.log(rep);

        if (!rep.data.err) {
            // Hide Form Add Edit Nav
            dsp(HideForm());

            // Get All Data After Add Don
            
  const id = UT_pk_value !== null ? Object.values(UT_pk_value)[0] : 'NoId';
  axios["get"](`http://localhost:8000/api/Admin/${id}/Managers`)
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
        } else {
            dsp(EnableButtonSubmit());
        }
    })
    .catch((err) => {
        console.log(err);
        dsp(EnableButtonSubmit());
    });
      }
    };
  };

  return (
    <form id="form-add-edit" onSubmit={HSubmit}>
      <div id="inputs">
        <Input inp={{ name: "email", alias: "Email", type: "text" }} itemData={itemData} />
      </div>

      <div id="btns">
        <div className="btn cancle" onClick={HCancle}>
          annuler
        </div>

        <button className={`btn submit ${BtnSubmitEnable ? "" : "disable"}`}>{FormForAdd ? "ajouter" : "modifier"}</button>
      </div>
    </form>
  );
}