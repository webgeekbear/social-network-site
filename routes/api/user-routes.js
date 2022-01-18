const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriendToUser,
    deleteFriendFromUser
} = require('../../controllers/user-controller');

// /api/users
router
    .route("/")
    .get(getAllUser)
    .post(createUser);

// /api/users/<id>
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/users/<userId>/friends/<friendId>
router
    .route("/:userId/friends/:friendId")
    .post(addFriendToUser)
    .delete(deleteFriendFromUser)

module.exports = router;