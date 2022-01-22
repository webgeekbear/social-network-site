const {
    Thought,
    User,
    ReactionSchema
} = require('../models');

const ThoughtController = {
    // get all Thoughts
    getAllThought(req, res) {
        Thought.find({})
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
            .then(({
                _id
            }) => {
                return User.findOneAndUpdate({
                    _id: body.userId
                }, {
                    $push: {
                        thoughts: _id
                    }
                }, {
                    new: true
                });
            })
            .then(dbUserData => {
                console.log(dbUserData);
                if (!dbUserData) {
                    res.status(404).json({
                        message: 'No user found with this id!'
                    });
                    return;
                }
                res.json(dbUserData);
            })
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
        params,
        body
    }, res) {
        Thought.findOneAndUpdate({
                _id: params.thoughtId
            }, {
                $addToSet: {
                    reactions: body
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
                    reactions: {
                        reactionId: params.reactionId
                    }
                }
        }, {
            new: true
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