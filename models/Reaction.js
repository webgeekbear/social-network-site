const {
    Schema,
    Types,
    // model,
} = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        // ref: "Reaction",
        default: () => new Types.ObjectId()
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
        get: createdAtVal => dateFormat(createdAtVal)
    }
}, {
    toJSON: {
        virtuals: true,
        getters: true,
    },
    id: false
});

module.exports = ReactionSchema;