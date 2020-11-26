const mockConstants = {
  TOPIC_NAME: 'mock-topic',
  SUBSCRIPTION_NAME: 'mock-sub'
};

const mockPubSubModule = {
  PubSub: jest.fn(),
};


describe('createTopic', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });


  test('PubSub is called only once', async () => {
    jest.doMock('../constants', () => mockConstants);
    jest.doMock('@google-cloud/pubsub', () => mockPubSubModule);

    const { PubSub } = require('@google-cloud/pubsub');
    const { createTopic } = require('./pubsub');

    await createTopic();
    expect(PubSub).toHaveBeenCalledTimes(1);
  });


  test('createTopic is called only once', async () => {
    jest.doMock('../constants', () => mockConstants);
    jest.doMock('@google-cloud/pubsub', () => mockPubSubModule);

    const { PubSub } = require('@google-cloud/pubsub');

    const mockCreateTopic = {
      createTopic: jest.fn(),
    };
    // very imp: mockImplementation is replaces a constructor with the object
    PubSub.mockImplementation(() => mockCreateTopic);
    const { createTopic } = require('./pubsub');

    await createTopic();
    expect(mockCreateTopic.createTopic).toHaveBeenCalledTimes(1);
  });


  test('createTopic is called with TOPIC_NAME', async () => {
    jest.doMock('@google-cloud/pubsub', () => mockPubSubModule);
    jest.doMock('../constants', () => mockConstants);

    const { PubSub } = require('@google-cloud/pubsub');

    const mockCreateTopic = {
      createTopic: jest.fn(),
    };
    PubSub.mockImplementation(() => mockCreateTopic);

    const { createTopic } = require('./pubsub');

    await createTopic();

    expect(mockCreateTopic.createTopic).toHaveBeenCalledWith(mockConstants.TOPIC_NAME);
  });
});


describe('createSubscription', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });


  test('PubSub is called only once', async () => {
    jest.doMock('../constants', () => mockConstants);
    jest.doMock('@google-cloud/pubsub', () => mockPubSubModule);

    const { PubSub } = require('@google-cloud/pubsub');
    const { createSubscription } = require('./pubsub');

    await createSubscription();
    expect(PubSub).toHaveBeenCalledTimes(1);
  });
});