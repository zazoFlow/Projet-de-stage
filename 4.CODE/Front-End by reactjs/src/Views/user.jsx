/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from "react-redux";

// Components
import SideBar from "../Components_user/SideBar/SideBar";

// Dashboards
import Dashboard0 from "../Components_user/Dashboard_Objects/Dashboard";
import Dashboard1 from "../Components_user/Dashboard_Emprunts/Dashboard";

export default function View2() {
  const CSname = useSelector((st) => st.user.CSname);

  return (
    <>
      <SideBar />

      <div id="page-content" className={CSname === "" ? "vide" : ""}>
        {CSname === "" && <h1 id="no-section">No Section Selected</h1>}

        {CSname === "Objects" && <Dashboard0 />}

{CSname === "Emprunts" && <Dashboard1 />}
      </div>
    </>
  );
}