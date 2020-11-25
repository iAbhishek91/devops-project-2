import upload from "./";


describe('upload controller', () => {
  let mockRequest = {};
  let mockResponse = {};

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn(),
      json: jest.fn()
    }
  });


  test(('status method is called with status 200'), () => {
    const expectedCallValue = 200;

    upload(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledWith(expectedCallValue);
  });


  test(('status method is called only once'), () => {
    const expectedCallTimes = 1;

    upload(mockRequest, mockResponse);

    expect(mockResponse.status).toHaveBeenCalledTimes(expectedCallTimes);
  });


  test(('response.body is same as request.body'), () => {
    mockRequest = {
      body: {
        test: "I am testing",
        nestedObject : {
          key1: "value1",
          key2: "value2"
        }
      }
    }

    upload(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledWith(mockRequest.body);
  });


  test(('status method is called only once'), () => {
    const expectedCallTimes = 1;

    upload(mockRequest, mockResponse);

    expect(mockResponse.json).toHaveBeenCalledTimes(expectedCallTimes);
  });
});