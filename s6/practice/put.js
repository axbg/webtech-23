// routes/movie.js
router.put("/", movieController.update);

// controllers/movie.js
const update = (req, res) => {
    const result = movieService.update(req.body.oldTitle, req.body.newTitle);

    if (result) {
        res.status(204).send();
    } else {
        res.status(404).send();
    }
}

// services//movie.js
const update = (oldTitle, newTitle) => {
    const index = movies.indexOf(oldTitle);

    if(index === -1) {
        return false;
    }

    movies.splice(index, 1, newTitle);
    return true;
}