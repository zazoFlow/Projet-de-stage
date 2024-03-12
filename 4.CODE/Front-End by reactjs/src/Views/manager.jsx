/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";

// Components
import SideBar from "../Components_manager/SideBar/SideBar";

// Dashboards
import Dashboard0 from "../Components_manager/Dashboard_Types des Objects/Dashboard";
import Dashboard1 from "../Components_manager/Dashboard_Objects/Dashboard";
import Dashboard2 from "../Components_manager/Dashboard_Emprunts/Dashboard";

export default function View1() {
  const CSname = useSelector((st) => st.user.CSname);

  return (
    <>
      <SideBar />

      <div id="page-content" className={CSname === "" ? "vide" : ""}>
        {CSname === "" && <h1 id="no-section">No Section Selected</h1>}

        {CSname === "Types des Objects" && <Dashboard0 />}

{CSname === "Objects" && <Dashboard1 />}

{CSname === "Emprunts" && <Dashboard2 />}
      </div>
    </>
  );
}