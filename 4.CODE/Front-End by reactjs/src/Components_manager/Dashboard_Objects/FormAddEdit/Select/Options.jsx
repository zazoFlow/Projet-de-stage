/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

// Config
import { Config } from '../../../../Config/Config';

export default function Options({ v, OGN }) {
  const UT_pk_value = useSelector((st) => st.user.UT_pk_value);
  const [Options, SetOptions] = useState([]);

  useEffect(() => {
    async function go() {
      try {
        const FCT = Config.OptsGeters && Config.OptsGeters[OGN] ? Config.OptsGeters[OGN] : () => {} ;
        const Opts = await FCT(UT_pk_value);
        SetOptions(Opts);
      } catch (error) {
        console.log(error)
      }
    }
    go();
  }, []);

  return Options.map((op, i) => (
    <option value={op.value} key={i} selected={v === op.value}>
      {op.text}
    </option>
  ));
}