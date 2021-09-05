const mongoose = require("mongoose");
const mongooseDelete = require("mongoose-delete");
const { STATUSVALUE, STATUS, USERTYPEKEYS } = require("../helpers/constants");

const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema(
  {
    last_login: { type: Date, default: new Date() },
    blocked: { type: Boolean, default: false },
    password: String,
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    firstName: {
      type: String,
      index: true,
    },
    lastName: {
      type: String,
      index: true,
    },
    status: { type: String, enum: STATUSVALUE, default: STATUS.ACTIVE },
    userType: {
      type: String,
      required: true,
      enum: USERTYPEKEYS,
    },
    duration: {
      type: String,
      default: null,
    },
    token: {
      type: String,
    },
    role: {
      type: String,
      default: null,
    },
    tags: [
      {
        type: ObjectId,
        index: true,
        ref: "tags",
      },
    ],
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(mongooseDelete, { deletedAt: true }, { deletedBy: true });

module.exports = mongoose.model("users", UserSchema);
