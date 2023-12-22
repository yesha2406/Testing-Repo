const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema(
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
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } }
);

module.exports = mongoose.model('project', projectSchema);
