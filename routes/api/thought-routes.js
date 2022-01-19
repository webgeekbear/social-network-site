const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReactionToThought,
    removeReactionFromThought
} = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route("/")
    .get(getAllThought)
    .post(createThought);

// /api/thoughts/<id>
router
    .route("/:id")
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

router
    .route("/:thoughtId/reactions")
    .post(addReactionToThought)
    .delete(removeReactionFromThought)

module.exports = router;