import {
  createTopic,
  createSubscription,
  publishMessage
} from "../../utility/pubsub";

export default async (req, res) => {
  try {
    await createTopic();
    await createSubscription();
    await publishMessage(req.body);
    res.status(200);
    res.json(req.body);
  } catch (e) {
    res.status(500);
    res.json({err: e.message});
  }
};