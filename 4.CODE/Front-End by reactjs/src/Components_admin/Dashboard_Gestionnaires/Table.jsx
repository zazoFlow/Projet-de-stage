/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

// Config
import { Config } from '../../Config/Config';

// Hepler
import { Transfer } from "../../Helpers/Transfer";

// Actions
import { SetTableData } from "../../Redux/Slices/UserSlice";
import { ShowDeleteConfirm } from "../../Redux/Slices/DisplaySlice";
import { ShowForm_ForEdit } from "../../Redux/Slices/DisplaySlice";

export default function Table() {
  const dsp = useDispatch();
  const itemData = useSelector((st) => st.display.rowInfo.itemData);
  const { CSname, tableData: { ToShow: TD_ToShow }, UT_pk_value } = useSelector((st) => st.user); // prettier-ignore

  // Show itemData On Update
  useEffect(() => {
    console.log(itemData);
  }, [itemData]);

  // Get Current Section Data From Back-End
  useEffect(() => {
    if (UT_pk_value !== null) {
      
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
    }
  }, [UT_pk_value]);

  return (
    <table id="table">
      <thead>
        <tr id="row" className="thead">
          <td id="column"><span>Email</span></td>
<td id="column"><span>Statue</span></td>
<td id="column"><span>Creer Le</span></td>

          <td id="column" className="actions"><span>Actions</span></td>
        </tr>
      </thead>

      <tbody>
        {TD_ToShow.map((row, irow) => {
          // Get Other Actions Buttons if Exist
          const Btns = [  ]
          let CBtns = Btns.map(btn => Config.OABtns && Config.OABtns[btn] ? Config.OABtns[btn] : null);
          CBtns = CBtns.filter(btn => btn !== null);

          // For All Actions Buttons
            const id = TD_ToShow[irow]["id_Manager"] ? TD_ToShow[irow]["id_Manager"] : null;
            const rowInfo = { number: irow + 1, itemData: row, id };

          // For Btn Edit
            const EditTest = true;
            const inputs = [{ name: `email`, alias: `Email`, type: `text` }];
            const HEdit = EditTest ? () => dsp(ShowForm_ForEdit({ rowInfo, inputs })) : () => {};

          // For Btn Delete
            const DeleteTest = true;
            const HDelete = DeleteTest ? () => dsp(ShowDeleteConfirm(rowInfo)) : () => {};

          return (
            <tr id="row" className="tbody" key={irow}>
              <td id="column"><span>{Transfer(row["email"], "text", null)}</span></td>
<td id="column"><span>{Transfer(row["status"], "text", null)}</span></td>
<td id="column"><span>{Transfer(row["create_time"], "datetime", null)}</span></td>
              
              
                <td id="column" className="actions">
                  <button className={`btn edit ${EditTest ? "" : "disable"}`} onClick={HEdit}>
                          <i className="fa-solid fa-pen"></i>
                        </button>
                  
                  <button className={`btn delete ${DeleteTest ? "" : "disable"}`} onClick={HDelete}>
                          <i className="fa-regular fa-trash-can"></i>
                        </button>

                  {CBtns.map(Btn => <Btn rowData={TD_ToShow[irow]} />)}
                </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}