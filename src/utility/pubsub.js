import { PubSub } from "@google-cloud/pubsub";
import {
  TOPIC_NAME,
  SUBSCRIPTION_NAME,
} from "../constants"


export const createTopic = async () => {
  const pubSubClient = new PubSub();

  try {
  await pubSubClient.createTopic(TOPIC_NAME);
  console.log(`Topic ${TOPIC_NAME} created`);
  } catch(e) {
    if(e.code === 6) {
      console.log(e.details);
    }
  }
}


export const createSubscription = async () => {
  const pubSubClient = new PubSub();

  try {
    await pubSubClient.topic(TOPIC_NAME).createSubscription(SUBSCRIPTION_NAME);
    console.log(`Subscription ${SUBSCRIPTION_NAME} created`);
  } catch(e) {
    if(e.code === 6) {
      console.log(e.details);
    }
  }
}


export const publishMessage = async (data) => {
  const pubSubClient = new PubSub();

  const dataBuffer = Buffer.from(JSON.stringify(data));

  try {
    const messageID = await pubSubClient.topic(TOPIC_NAME).publish(dataBuffer);
    console.log(`Message with ID: ${messageID} published`);
  } catch(e) {
    console.log(e.message);
  }
}
