/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";

// Components
import SideBar from "../Components_admin/SideBar/SideBar";

// Dashboards
import Dashboard0 from "../Components_admin/Dashboard_Gestionnaires/Dashboard";
import Dashboard1 from "../Components_admin/Dashboard_Types des Objects/Dashboard";
import Dashboard2 from "../Components_admin/Dashboard_Objects/Dashboard";
import Dashboard3 from "../Components_admin/Dashboard_Emprunts/Dashboard";

export default function View0() {
  const CSname = useSelector((st) => st.user.CSname);

  return (
    <>
      <SideBar />

      <div id="page-content" className={CSname === "" ? "vide" : ""}>
        {CSname === "" && <h1 id="no-section">No Section Selected</h1>}

        {CSname === "Gestionnaires" && <Dashboard0 />}

{CSname === "Types des Objects" && <Dashboard1 />}

{CSname === "Objects" && <Dashboard2 />}

{CSname === "Emprunts" && <Dashboard3 />}
      </div>
    </>
  );
}