const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes using: GET "/api/notes/getnotes". Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    console.log("Fetching notes for user:", req.user.id);
const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error occured");
  }
});

//ROUTE 2: Add a new note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body(
      "description",
      "Description must be atleast 5 characters long"
    ).isLength({ min: 5 }),
  ],
  fetchUser,
  async (req, res) => {
    //if there are errors return bad request and errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server error occured");
    }
  }
);

//ROUTE 3:Update an existing note: PUT "api/notes/updatenote/id".Login required
router.put(
  "/updatenote/:id",
  fetchUser,

  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //Create new note object
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }

      //Find the note to be updated and then update it
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
      }

      note = await Notes.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server error occured");
    }
  }
);

//ROUTE 4:Delete an exosting note: DELETE "/api/notes/deletenote".Login required
router.delete(
  "/deletenote/:id",
  fetchUser,

  async (req, res) => {
    try {

      //Find the note to be deleted and delete it
      let note = await Notes.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not found");
      }
      //Allow deletion only if user owns it
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not allowed");
      }

      note = await Notes.findByIdAndDelete(req.params.id);
      res.json({ Success: "Note has been delete", note });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server error occured");
    }
  }
);

module.exports = router;
