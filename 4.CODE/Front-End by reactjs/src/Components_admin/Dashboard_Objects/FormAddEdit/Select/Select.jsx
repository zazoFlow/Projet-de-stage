import { useDispatch } from "react-redux";

// Actions
import { SetEltin_ItemData } from "../../../../Redux/Slices/DisplaySlice";
import Options from "./Options";

export default function Select({ inp, itemData }) {
  const { name, alias, OGN } = inp;
  const dsp = useDispatch();
  const HChange = (e) => dsp(SetEltin_ItemData({ name, value: e.target.value }));

  return (
    <select
      required
      className="inp inp-form"
      name={alias}
      placeholder={alias}
      title={alias}
      value={itemData[name] !== undefined && itemData[name] !== null ? itemData[name] : ""}
      onChange={HChange}
    >
      <option value={""}>Selectionner votre choix</option>
      <Options v={itemData[name]} OGN={OGN} />
    </select>
  );
}