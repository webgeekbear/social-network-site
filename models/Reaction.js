const {
    Schema,
    model
} = require("mongoose");

const ReactionSchema = new Schema({
    reactionId: {
        type: ObjectId,
        default: new ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxLength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateformat(createdAtVal)
    }
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
});

module.exports = ReactionSchema;