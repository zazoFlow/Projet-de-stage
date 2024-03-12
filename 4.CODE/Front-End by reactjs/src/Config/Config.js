import { DeleteTest } from "./ActionsButtons_DisplayTests/DeleteTest";
import { EditTest } from "./ActionsButtons_DisplayTests/EditTest";
import { GetObjectTypes } from "./OptionsGeters/GetObjectTypes";
import Annuler from "./OtherBtnsActions/Annuler";
import Emprunter from "./OtherBtnsActions/Emprunter";
import Retourner from "./OtherBtnsActions/Retourner";
import Valider from "./OtherBtnsActions/Valider";

export const Config = {
  // Other Actions Buttons
  OABtns: {
    Valider: Valider,
    Annuler: Annuler,
    Retourner: Retourner,
    Emprunter: Emprunter,
  },

  // Actions Buttons Display Test
  ABDT: {
    EditTest: EditTest,
    DeleteTest: DeleteTest,
  },

  // Options Geters
  OptsGeters: {
    GETOBJECTTYPES: GetObjectTypes,
  },
};
