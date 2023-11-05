// routes/movie.js
router.delete("/:id", movieController.remove);

// controllers/movie.js
const remove = (req, res) => {
    movieService.remove(req.params.id);
    res.send();
}

// services//movie.js
const remove = (id) => {
    movies.splice(id, 1);
}