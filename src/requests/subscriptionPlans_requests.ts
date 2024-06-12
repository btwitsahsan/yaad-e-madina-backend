import crypto from "crypto";
import {  Add_Subscription_Plan, deleteSubscriptionPlan, find_plan_by_name, getSubscriptionPlanById, get_all_subscription_plans_from_db, updateSubscriptionPlan } from "../database/modals/subscriptionPlans";

export const create_subscription_plan = async (req:any, resp:any) => {
  try {
    // console.log(req.body);
    const { name, duration, price, deviceLimit, ads, download, status } = req.body;

    if (!name || !duration || !price || !deviceLimit || ads === undefined || download === undefined || !status) {
      return resp.status(422).send({ success: false, message: "Please provide all required fields" });
    }

    const existingPlan = await find_plan_by_name(name);

    if (existingPlan) {
      return resp.status(409).send({ success: false, message: "Subscription plan already exists" });
    }

    const id = crypto.randomUUID();
    const newPlan = await Add_Subscription_Plan({ id, name, duration, price, deviceLimit, ads, download, status });

    resp.send({
      success: true,
      subscriptionPlan: newPlan,
    });
  } catch (err:any) {
    resp.status(400).send({ success: false, message: err.message });
  }
};



export const get_all_subscription_plans = async (req:any, res:any) => {
  try {
    const plans = await get_all_subscription_plans_from_db();
    res.status(200).send({ success: true, plans });
  } catch (err:any) {
    res.status(500).send({ success: false, message: err.message });
  }
};






export const get_subscription_plan_by_id = async (req:any, res:any) => {
  try {
    const { id } = req.params;
    const plan = await getSubscriptionPlanById(id);

    if (!plan) {
      return res.status(404).send({ success: false, message: "Subscription plan not found" });
    }

    res.status(200).send({ success: true, subscriptionPlan: plan });
  } catch (err:any) {
    res.status(500).send({ success: false, message: err.message });
  }
};





export const update_subscription_plan = async (req:any, res:any) => {
  try {
    const { id } = req.params;
    const { name, duration, price, deviceLimit, ads, download, status } = req.body;

    if (!name || !duration || !price || !deviceLimit || ads === undefined || download === undefined || !status) {
      return res.status(422).send({ success: false, message: "Please provide all required fields" });
    }

    const updatedPlan = await updateSubscriptionPlan(id, { name, duration, price, deviceLimit, ads, download, status });

    if (!updatedPlan) {
      return res.status(404).send({ success: false, message: "Subscription plan not found" });
    }

    res.status(200).send({ success: true, subscriptionPlan: updatedPlan });
  } catch (err:any) {
    res.status(500).send({ success: false, message: err.message });
  }
};








export const delete_subscription_plan = async (req:any, res:any) => {
  try {
    const { id } = req.params;
    await deleteSubscriptionPlan(id);
    res.status(200).json({ message: 'Subscription plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete subscription plan', error });
  }
};
