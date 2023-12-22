const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    startDate: { type: Number, required: false, default: null },
    endDate: { type: Number, required: false, default: null },
    status: {
      type: String,
      enum: ['to-do', 'in-progress', 'completed'],
      required: true,
      default: 'to-do',
    },
    dueDate: { type: Number, required: false, default: null },
    assignTo: [
      {
        type: Schema.Types.ObjectId,
        ref: 'user',
      },
    ],
    projectId: {
      type: Schema.Types.ObjectId,
      ref: 'project',
      required: true,
    },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model('task', taskSchema);
