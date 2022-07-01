const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController.js');

// /api/Users
router.route('/api/users').get(getUsers).post(createUser);

// /api/Users/:UserId
router
  .route('/api/users:UserId')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

  // /api/users/:userId/friends
router.route('/:userId/friends').post(addFriend);

// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId').delete(removeFriend);

module.exports = router;

