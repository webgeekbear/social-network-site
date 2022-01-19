const {
    Thought,
    Reaction
} = require('../models');

const ThoughtController = {
    // get all Thoughts
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({
                _id: -1
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get one Thought by id
    getThoughtById({
        params
    }, res) {
        Thought.findOne({
                _id: params.id
            })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // createThought
    createThought({
        params,
        body
    }, res) {
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },

    // update Thought by id
    updateThought({
        params,
        body
    }, res) {
        Thought.findOneAndUpdate({
                _id: params.id
            }, body, {
                new: true,
                runValidators: true
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: 'No Thought found with this id!'
                    });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    // delete Thought
    deleteThought({
        params
    }, res) {
        Thought.findOneAndDelete({
                _id: params.id
            })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => res.json(err));
    },
    addReactionToThought({
        params
    }, res) {
        let reaction = new Reaction({});
        Thought.findOneAndUpdate({
                _id: params.thoughtId
            }, {
                $push: {
                    reactions: reaction
                }
            }, {
                new: true,
                runValidators: true
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No thought found with this id!'
                    });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));

    },
    removeReactionFromThought({
        params
    }, res) {
        Thought.findOneAndUpdate({
                _id: params.thoughtId
            }, {
                $pull: {
                    reactions: params.reactionId
                }
            }, {
                new: true,
                runValidators: true
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No thought found with this id!'
                    });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));

    }
};

module.exports = ThoughtController;