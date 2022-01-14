const {
    Schema,
    model
} = require("mongoose");
const {
    ModuleKind
} = require("typescript");

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [validateEmail, "Not a valid email address"]
    },
    thoughts: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: "Thought"
        }]
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User"
    }]
}, {
    toJSON: {
        virtuals: true,
        getters: true
    },
    id: false
});

UserSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("user", UserSchema);

module.exports = User;