const mockUtilityPubSub = {
  createTopic: jest.fn(),
  createSubscription: jest.fn(),
  publishMessage: jest.fn()
}


const mockUtilityPubSubWithExp = {
  createTopic: jest.fn(() => {
    console.log("mock create topic function is called");
    throw new Error("mock create topic function throwing exception");
  }),
  createSubscription: jest.fn(() => {throw new Error("mock create subscription function throwing exception")}),
  publishMessage: jest.fn(() => {throw new Error("mock publish message function throwing exception")}),
}



describe("google pub/sub utility functions are called", () => {
  let mockRequest = {};
  let mockResponse = {
    status: jest.fn(),
    json: jest.fn()
  };


  beforeAll(async () => {
    jest.doMock('../../utility/pubsub', () => mockUtilityPubSub);
    const upload = require('./');

    await upload.default(mockRequest, mockResponse);
  })


  test('CreateTopic() is invoked', async () => {
    expect(mockUtilityPubSub.createTopic).toHaveBeenCalledTimes(1);
  });


  test('CreateSubscription() is invoked', async () => {
    expect(mockUtilityPubSub.createSubscription).toHaveBeenCalledTimes(1);
  });


  test('publishMessage() is invoked', async () => {
    expect(mockUtilityPubSub.publishMessage).toHaveBeenCalledTimes(1);
  });
});



describe('upload controller WITHOUT exception', () => {
  let mockRequest = {};
  let mockResponse = {};

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn(),
      json: jest.fn()
    }
  });

  test(('status method is called with status 200 when no exception'), async () => {
    jest.doMock('../../utility/pubsub', () => mockUtilityPubSub);
    const upload = require('./');

    await upload.default(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(200);
  });


  test(('status method is called only once'), async () => {
    const upload = require('./');

    await upload.default(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledTimes(1);
  });


  test(('response.body is same as request.body'), async () => {
    const upload = require('./');
    mockRequest = {
      body: {
        test: "I am testing",
        nestedObject : {
          key1: "value1",
          key2: "value2"
        }
      }
    }

    await upload.default(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(mockRequest.body);
  });


  test(('status method is called only once'), async () => {
    const upload = require('./');
    
    await upload.default(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledTimes(1);
  });
});



describe('upload controller WITH exception', () => {
  let mockRequest = {};
  let mockResponse = {};

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn(),
      json: jest.fn()
    }
  });

  test(('status method is called with status 500 when there is exception in createTopic'), async () => {
    jest.doMock('../../utility/pubsub', () => mockUtilityPubSub);
    const {
      createTopic,
    } = require('../../utility/pubsub');

    createTopic.mockImplementation(() => {
      throw new Error("mock create topic function throwing exception");
    });

    const upload = require('./');

    await upload.default(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });


  test(('status method is called with status 500 when there is exception in createSubscription'), async () => {
    jest.doMock('../../utility/pubsub', () => mockUtilityPubSub);
    const {
      createSubscription,
    } = require('../../utility/pubsub');

    createSubscription.mockImplementation(() => {
      throw new Error("mock create subscription function throwing exception");
    });

    const upload = require('./');

    await upload.default(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });


  test(('status method is called with status 500 when there is exception in publishMessage'), async () => {
    jest.doMock('../../utility/pubsub', () => mockUtilityPubSub);
    const {
      publishMessage,
    } = require('../../utility/pubsub');

    publishMessage.mockImplementation(() => {
      throw new Error("mock publish message function throwing exception");
    });

    const upload = require('./');

    await upload.default(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(500);
  });

  test(('response.body is same as request.body'), async () => {
    const upload = require('./');
    mockRequest = {
      body: {
        test: "I am testing",
        nestedObject : {
          key1: "value1",
          key2: "value2"
        }
      }
    }

    await upload.default(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith({"err": "mock create topic function throwing exception"});
  });
});
