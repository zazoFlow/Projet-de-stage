import { useSelector } from "react-redux";

// Components
import DeleteConfirm from "./DeleteConfirm";
import FormAddEdit from "./FormAddEdit/FormAddEdit";
import Header from "./Header";
import Table from "./Table";

export default function Dashboard0() {
  const showDeleteConfirm = useSelector((st) => st.display.showDeleteConfirm);
  const showForm = useSelector((st) => st.display.showForm);

  return (
    <div id="dashboard">
      {showDeleteConfirm && <DeleteConfirm />}

      {showForm && <FormAddEdit />}

      <Header />

      <Table />
    </div>
  );
}