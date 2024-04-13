import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";


export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  const [note,setNote]=useState({id:"",etitle:"",edescription:"",etag:""});
  const ref = useRef(null);
  const refClose=useRef(null);

  useEffect(() => {
    getNotes();
    // eslint-disable-next-line
  }, []);
  
  const updateNote = (currNote) => {
    ref.current.click();
    setNote({id:currNote._id,etitle:currNote.title, edescription:currNote.description, etag:currNote.tag});
  };

  const handleClick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag);
   refClose.current.click();
   props.showAlert("Updated successfully","success");
  };
  const onChange= (e) =>{
    setNote({...note,[e.target.name]:e.target.value});
  }
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
            <div className="container my-3">
        <h2>Add a note</h2>
        <div className="my-3">
          <label htmlFor="etitle" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            id="etitle"
            name="etitle"
            value={note.etitle}
            onChange={onChange}
            minLength={5} required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edescription" className="form-label">
            Description
          </label>
          <input
            type="text"
            id="edescription"
            name="edescription"
            className="form-control"
            value={note.edescription}
            onChange={onChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="etag" className="form-label">
            Tag
          </label>
          <input
            type="text"
            id="etag"
            name="etag"
            className="form-control"
            value={note.etag}
            onChange={onChange}
            minLength={5} required
          />
        </div>
        </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick} disabled={note.etitle.length<5 || note.edescription.length<5}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container mx-1">
        {notes.length===0 && 'No notes to display'}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
          );
        })}
      </div>
    </>
  );
}
