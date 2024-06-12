import mongoose from 'mongoose';
import crypto from 'crypto';

const COLLECTION = 'subscriptionPlans';

const SUBSCRIPTION_PLAN_SCHEMA = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    default: () => crypto.randomUUID() // Generate UUID
  },
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  deviceLimit: {
    type: Number,
    required: true,
  },
  ads: {
    type: Boolean,
    required: true,
  },
  download: {
    type: Boolean,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'inactive'],
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

}, {
  collection: COLLECTION,
});

const SubscriptionPlan = mongoose.model(COLLECTION, SUBSCRIPTION_PLAN_SCHEMA);

export const find_plan_by_name = async (name:any) => {
  return await SubscriptionPlan.findOne({ name });
};

export const Add_Subscription_Plan = async (planData:any) => {
    // console.log(planData);
  const plan = new SubscriptionPlan(planData);
  return await plan.save();
};

export const get_all_subscription_plans_from_db = async () => {
  return await SubscriptionPlan.find({}).select('-_id');
};

export const getSubscriptionPlanById = async (id:any) => {
  return await SubscriptionPlan.findOne({ id }).select('-_id');
};

export const updateSubscriptionPlan = async (id:any, updatedData:any) => {
  return await SubscriptionPlan.findOneAndUpdate({ id }, updatedData, { new: true });
};

export const deleteSubscriptionPlan = async (id:any) => {
  await SubscriptionPlan.findOneAndDelete({ id });
};
