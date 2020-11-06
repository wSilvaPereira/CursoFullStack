import mongoose from 'mongoose';

const accountsSchema = mongoose.Schema(
  {
    // _id: { type: mongoose.Types.ObjectId, required: true },
    agencia: { type: Number, required: true },
    conta: { type: Number, required: true },
    name: { type: String, required: true },
    balance: { type: Number, required: true, min: 0 },
  },
  { versionKey: false }
);

const accountsModel = mongoose.model('accounts', accountsSchema, 'accounts');

export { accountsModel };
