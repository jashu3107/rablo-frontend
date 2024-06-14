import '../App.css';
import { useState, useEffect } from "react";
import axios from "axios";
import Formtable from './Formtable';

axios.defaults.baseURL = "http://localhost:8080/";

function Home() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    productId : "",
    name: "",
    price: "",
    featured: "",
    rating: "",
    createdAt: "",
    company: ""
  });
  const [formDataEdit, setFormDataEdit] = useState({
    productId : "",
    name: "",
    price: "",
    featured: "",
    rating: "",
    createdAt: "",
    company: "",
    _id: ""
  });
  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);
    if (data.data.success) {
      setAddSection(false);
      alert(data.data.message);
      getFetchData();
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []); // Correct dependency array

  const handleDelete = async (id) => {
    const data = await axios.delete(`/delete/${id}`);
    if (data.data.success) {
      getFetchData();
      alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", formDataEdit);
    if (data.data.success) {
      alert(data.data.message);
      setEditSection(false)
      getFetchData();
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value
    }));
    getFetchData()
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  return (
    <div className="container">
      <button className="btn btn-add" onClick={() => setAddSection(true)}>Add</button>
      {addSection && (
        <Formtable
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          handleClose={() => setAddSection(false)}
          rest={formData}
        />
      )}
      {editSection && (
        <Formtable
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          handleClose={() => setEditSection(false)}
          rest={formDataEdit}
        />
      )}
      <div className="tableContainer">
        <table>
          <thead>
            <tr>
              <th>ProductId</th>
              <th>Name</th>
              <th>Price</th>
              <th>Featured</th>
              <th>Rating</th>
              <th>CreatedAt</th>
              <th>Company</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((el) => (
                <tr key={el._id}>
                    <td>{el.productId}</td>
                    <td>{el.name}</td>
                    <td>{el.price}</td>
                    <td>{el.featured ? "YES" : "NO"}</td>
                    <td>{el.rating}</td>
                    <td>{el.createdAt}</td>
                    <td>{el.company}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => handleEdit(el)}>Edit</button>
                    <button className="btn btn-delete" onClick={() => handleDelete(el._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>No Data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;

