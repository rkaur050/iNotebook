import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
    const host="http://localhost:4000"
  const notesInitial = [
  ];
  const [notes, setNotes] = useState(notesInitial);

  //get all note
  const getNotes = async () => {
    //Api call
    const url=`${host}/api/notes/fetchallnotes`;
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setNotes(data);
    } catch (error) {
        console.error("Failed to fetch notes:", error);
        // Optionally, update the UI to show an error message
    }
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    
    //Api call
    const url=`${host}/api/notes/addnote`;
    const response=await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
        body: JSON.stringify({title,description,tag})
    }); 
    const note=await response.json();
    setNotes(notes.concat(note));
  };

  //Delete a note
  const deleteNote = async(id) => {
    //API Call
    const url=`${host}/api/notes/deletenote/${id}`;
    const response=await fetch(url,{
        method:'DELETE',
        headers:{
            'Content-Type':'application/json',
            'auth-token':localStorage.getItem('token')
        },
    });
       await response.json();   
    if (!response.ok) {
        throw new Error(`Failed to delete note with status ${response.status}`);
    }else{
    const newNotes = notes.filter(note => note._id !== id);
      setNotes(newNotes);  // Assuming you have a setNotes function to update your state
      
    }
  };

  //Edit a note
  const editNote = async (id, title, description, tag) => {
    //API call
    const url=`${host}/api/notes/updatenote/${id}`;
    try {
        const response = await fetch(url, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'auth-token':localStorage.getItem('token')
            
          },
          body: JSON.stringify({ title, description, tag })
        });
         await response.json();
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        

    //logic to update notes
    let newNotes = notes.map(note => {
        if (note._id === id) {
          return { ...note, title, description, tag };
        }
        return note;
      });
      setNotes(newNotes);
    } catch (error) {
      console.error("Failed to update note:", error);
    }
  };
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
