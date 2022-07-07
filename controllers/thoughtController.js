const Thought = require('../models/Thought');

module.exports = {
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.status(500).json(err));
  },
  // Delete a thought and associated apps
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : Application.deleteMany({ _id: { $in: thought.applications } })
      )
      .then(() => res.json({ message: 'Thought deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Add an reaction to a thought
  addReaction({ params, body }, res) {
    console.log('You are adding a reaction');
    console.log(params.thoughtId);
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $addToSet: { reactions: body } },
      { runValidators: true, new: true }
    )
      .then(thought => {
        if (!thought) {
          res
            .status(404)
            .json({ message: 'No thought found with that ID :(' })
          return;
        }
        res.json(thought)
      })
      .catch((err) => res.status(500).json(err));
  },
  // Remove reaction from a thought
  removeReaction({ params, body }, res) {
  Thought.findOneAndUpdate(
    { _id: params.thoughtId },
    { $pull: { reactions: { reactionId: params.reactionId } } },
    { runValidators: true, new: true }
  )
    .then(thought => {
      if (!thought) {
        res
          .status(404)
          .json({ message: 'No thought found with that ID :(' })
        return;
      }
      res.json(thought)
    })
    .catch((err) => res.status(500).json(err));
},
};

