import "./App.css";
import { useEffect, useState } from "react";
import Axios from "axios";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

function numberFormat(price) {
  const currency = Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  });
  return currency.format(price);
}

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState(0);

  const [nameEdit, setNameEdit] = useState("");
  const [descriptionEdit, setDescriptionEdit] = useState("");
  const [imageEdit, setImageEdit] = useState("");
  const [priceEdit, setPriceEdit] = useState(1);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (id) => setShow(id);

  const getData = () => {
    Axios({
      method: "get",
      url: "http://localhost:7777/product",
    }).then(function (res) {
      setData(res.data.data);
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    Axios({
      method: "post",
      url: "http://localhost:7777/product",
      data: {
        name: name,
        description: description,
        image: image,
        price: parseInt(price),
      },
    }).then(function (res) {
      setName("");
      setDescription("");
      setImage("");
      setPrice(1);
      getData();
    });
  };

  const handleDelete = (id) => {
    if (window.confirm(`Delete ID ${id}?`)) {
      Axios({
        method: "post",
        url: `http://localhost:7777/product/delete/${id}`,
      }).then(function (res) {
        getData();
      });
    }
  };

  const handleEdit = () => {
    Axios({
      method: "put",
      url: `http://localhost:7777/product/${show}`,
      data: {
        name: nameEdit,
        description: descriptionEdit,
        image: imageEdit,
        price: parseInt(priceEdit),
      },
    }).then(function (res) {
      handleClose();
      setNameEdit("");
      setDescriptionEdit("");
      setImageEdit("");
      setPriceEdit(1);
      getData();
    });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <form onSubmit={handleAdd}>
        <div className="mb-3">
          <label className="form-label">Nama Product</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Deskripsi</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Foto</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Harga</label>
          <input
            type="text"
            className="form-control"
            aria-describedby="emailHelp"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <table className="table table-dark">
        <thead>
          <tr>
            <th scope="col">No</th>
            <th scope="col">Name</th>
            <th scope="col">Deskripsi</th>
            <th scope="col">Foto</th>
            <th scope="col">Harga</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>
                  <img
                    src={item.image}
                    alt=""
                    className=""
                    style={{ width: "80px" }}
                  />
                </td>
                <td>{numberFormat(item.price)}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => handleShow(item.id)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={nameEdit}
                type="text"
                onChange={(e) => setNameEdit(e.target.value)}
                placeholder="Enter name"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Deskripsi</Form.Label>
              <Form.Control
                value={descriptionEdit}
                type="text"
                onChange={(e) => setDescriptionEdit(e.target.value)}
                placeholder="Enter age"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Foto</Form.Label>
              <Form.Control
                value={imageEdit}
                type="text"
                onChange={(e) => setImageEdit(e.target.value)}
                placeholder="Enter name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={priceEdit}
                type="number"
                onChange={(e) => setPriceEdit(e.target.value)}
                placeholder="Enter name"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default App;
