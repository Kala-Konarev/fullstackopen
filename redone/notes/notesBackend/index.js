require("dotenv").config();

const Note = require("./models/note");

const express = require("express");
const morgan = require("morgan");
// const cors = require("cors");
// app.use(cors());
const app = express();
app.use(express.static("dist"));
app.use(express.json());
app.use(morgan("short"));

// const generateId = () => {
//     const maxId =
//         notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0;
//     return String(maxId + 1);
// };
app.get("/", (request, response) => {
    response.send("<h1>Hello world</h1>");
});

app.get("/api/notes", (request, response) => {
    Note.find({}).then((notes) => response.json(notes));
});

app.get("/api/notes/:id", (request, response, next) => {
    Note.findById(request.params.id)
        .then((note) => {
            if (note) response.json(note);
            else response.status(404).end();
        })
        .catch((error) => next(error));
});

app.post("/api/notes", (request, response, next) => {
    const body = request.body;

    const note = new Note({
        content: body.content,
        important: Boolean(body.important) || false,
    });

    note.save()
        .then((savedNote) => {
            response.json(savedNote);
        })
        .catch((error) => next(error));
});

app.delete("/api/notes/:id", (request, response) => {
    Note.findByIdAndDelete(request.params.id)
        .then((result) => {
            response.status(204).end();
        })
        .catch((error) => next(error));
});

app.put("/api/notes/:id", (request, response) => {
    const { content, important } = request.body;

    Note.findByIdAndUpdate(
        request.params.id,
        { content, important },
        { new: true, runValidators: true, context: "query" }
    )
        .then((updatedNote) => {
            response.json(updatedNote);
        })
        .catch((error) => next(error));
});
const unknownEndpoint = (request, response) => {
    response.status(404).json({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
    console.error(error.message);
    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" });
    } else if (error.name === "ValidationError") {
        return response.status(400).json({
            error: error.message,
        });
    }
    next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
