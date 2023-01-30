import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "./Modal";

function App() {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [input, setInput] = React.useState({
    title: "",
    author: "",
    date: "",
    notes: "",
  });

  const [list, setList] = React.useState([]);

  function handleChange(e) {
    const handleName = e.target.name;
    const handleValue = e.target.value;

    setInput((prev) => ({ ...prev, [handleName]: handleValue }));
  }

  function addItem() {
    setList((prev) => [...prev, { ...input, id: list.length, isEdit: false }]);
    setInput({
      title: "",
      author: "",
      date: "",
      notes: "",
    });
  }
  console.log(list);

  function deleteItem(id) {
    const deleteList = list.filter((li) => li.id !== id);
    setList(deleteList);
  }

  function editList(id) {
    setList((prev) =>
      prev.map((el) => (el.id === id ? { ...el, isEdit: !el.isEdit } : el))
    );
    setShow(true);
    console.log(id);
  }

  function handleEdit(event, id) {
    setList((prev) =>
      prev.map((li) =>
        li.id === id ? { ...li, input: event.target.value } : li
      )
    );
  }

  return (
    <div className="full-bg">
      <div className="main-bg">
        <h1 className="heading">My Books</h1>
        <Modal
          show={show}
          handleClose={handleClose}
          handleShow={handleShow}
          input={input}
          handleChange={handleChange}
          addItem={addItem}
          handleEdit={handleEdit}
        />
        <h2 className="heading">Read / Want to read</h2>
        {list.map((li, i) => (
          <div key={i} className="list">
            <p>{li.title}</p>
            <p>{li.author}</p>
            <p>{li.date}</p>
            <p>{li.notes}</p>
            <div className="icon-div">
              <i className="fa fa-edit icon" onClick={() => editList(li.id)}>
                &nbsp;
              </i>
              <i
                className="fa fa-trash icon"
                onClick={() => deleteItem(li.id)}
              ></i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
