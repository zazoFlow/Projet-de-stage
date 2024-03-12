/* eslint-disable eqeqeq */
import { useDispatch, useSelector } from "react-redux";

// Actions
import { SetTableData_ToShow } from "../../Redux/Slices/UserSlice";
import { ShowForm_ForAdd } from "../../Redux/Slices/DisplaySlice";

export default function Header() {
  const dsp = useDispatch();

  // For Btn Add Item
    const inputs = [{ name: `id_ObjectType`, alias: `Type D'object`, tagName: `SELECT`, OptionsGeterName: `GETOBJECTTYPES`, OnlyForForm: `true` },{ name: `nom`, alias: `Nom`, type: `text` }];
    const HAddItem = () => dsp(ShowForm_ForAdd(inputs));
  
  // For Search Bar
  const TD_Wiithfiltre = useSelector((st) => st.user.tableData.Wiithfiltre);
  const HChange = (e) => {
    let [inpValue, result] = [e.target.value, TD_Wiithfiltre];
    if (inpValue !== "") result = TD_Wiithfiltre.filter((c) => Object.values(c).filter((e) => e == inpValue).length > 0);
    dsp(SetTableData_ToShow(result));
  };

  return (
    <>
      <div id="nav-bar" className="withowt-switcher">
        <h1 id="page-content-title">Objects</h1>

        <button id="add-item" className="btn" onClick={HAddItem}>Ajouter</button>
      </div>

      <div id="search-and-sorte">
        <input type="text" placeholder="Search..." className="inp" onChange={HChange} />
      </div>
    </>
  );
}