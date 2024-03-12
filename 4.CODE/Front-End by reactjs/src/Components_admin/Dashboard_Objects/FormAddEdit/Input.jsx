import { useDispatch } from "react-redux";

// Actions
import { SetEltin_ItemData } from "../../../Redux/Slices/DisplaySlice";

export default function Input({ inp, itemData }) {
  const { name, alias, type } = inp;
  const dsp = useDispatch();
  const HChange = (e) => dsp(SetEltin_ItemData({ name, value: e.target.value }));

  return (
    <input
      required
      className="inp inp-form"
      type={type === "floot" ? "number" : type}
      step={type === "floot" ? 0.1 : 1}
      name={alias}
      placeholder={alias}
      title={alias}
      value={itemData[name] !== undefined && itemData[name] !== null ? itemData[name] : ""}
      onChange={HChange}
    />
  );
}