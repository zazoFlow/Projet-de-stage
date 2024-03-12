import axios from "axios";

export async function GetObjectTypes(UT_pk_value) {
  try {
    const id = UT_pk_value !== null ? Object.values(UT_pk_value)[0] : "NoId";
    const rep = await axios.get(`http://localhost:8000/api/Admin/${id}/ObjectTypes`);
    console.log(rep);
    const res = rep.data.results ? rep.data.results.map((e) => ({ text: e.nom, value: e.id_ObjectType })) : [];
    return res;
  } catch (error) {
    console.log(error);
  }
}
