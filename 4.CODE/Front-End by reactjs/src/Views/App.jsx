import { useSelector } from "react-redux";

// Components
import View1 from "./admin";
import View2 from "./manager";
import View3 from "./user";
import SeConnecter from "../Authentification/SeConnecter";
import CreateAccount from "../Authentification/CreateAccount";

export default function App() {
  const { darkBG, ShowCreateAccount } = useSelector((st) => st.display);
  const UT = useSelector((st) => st.user.userType);

  return (
    <>
      {darkBG && <div id="black-bg"></div>}

      {UT === "admin" && <View1 />}
      {UT === "manager" && <View2 />}
      {UT === "user" && <View3 />}
      {!ShowCreateAccount && UT === "" && <SeConnecter />}
      {ShowCreateAccount && <CreateAccount />}
    </>
  );
}
