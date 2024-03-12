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
  }, [UT_pk_value]);

  return (
    <table id="table">
      <thead>
        <tr id="row" className="thead">
          <td id="column"><span>Nom D'Object</span></td>
<td id="column"><span>Email D'utilisateur</span></td>
<td id="column"><span>Statue</span></td>
<td id="column"><span>Emprunter Le</span></td>

          <td id="column" className="actions"><span>Actions</span></td>
        </tr>
      </thead>

      <tbody>
        {TD_ToShow.map((row, irow) => {
          // Get Other Actions Buttons if Exist
          const Btns = [ "Valider","Annuler","Retourner" ]
          let CBtns = Btns.map(btn => Config.OABtns && Config.OABtns[btn] ? Config.OABtns[btn] : null);
          CBtns = CBtns.filter(btn => btn !== null);

          

          

          

          return (
            <tr id="row" className="tbody" key={irow}>
              <td id="column"><span>{Transfer(row["nom"], "undefined", null)}</span></td>
<td id="column"><span>{Transfer(row["email"], "undefined", null)}</span></td>
<td id="column"><span>{Transfer(row["Status"], "undefined", null)}</span></td>
<td id="column"><span>{Transfer(row["create_time"], "datetime", null)}</span></td>
              
              
                <td id="column" className="actions">
                  
                  
                  

                  {CBtns.map(Btn => <Btn rowData={TD_ToShow[irow]} />)}
                </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}