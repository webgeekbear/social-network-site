const {
    Schema,
    model
} = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },
    username: {
        type: String,
        required: true
    },
    reactions: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Reaction"
        }]
    }
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

ThoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thought = model("thought", ThoughtSchema);

module.exports = Thought;