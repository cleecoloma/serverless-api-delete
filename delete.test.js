'use strict';

const { handler } = require('./index.js');

describe('Testing the deleteCar lambda function', () => {
  test('Should delete an existing car and return a 204 status code', async () => {
    // Specify the ID of the existing car you want to delete
    const carId = 1;

    const event = {
      pathParameters: { id: carId }, // Specify the existing car's ID as a path parameter
    };

    let response = await handler(event);
    expect(response.statusCode).toEqual(204); // 204 No Content status code
  });

  test('Should return a 404 status code for deleting a non-existing car', async () => {
    // Specify an ID that doesn't correspond to an existing car
    const nonExistingCarId = 999; // A non-existing ID

    const event = {
      pathParameters: { id: nonExistingCarId }, // Specify a non-existing ID as a path parameter
    };

    let response = await handler(event);
    expect(response.statusCode).toEqual(404); // 404 Not Found status code
  });

  test('Should return a 400 status code for missing ID field in path parameters', async () => {
    // Omit the ID field in the path parameters
    const event = {
      pathParameters: {}, // No 'id' field provided
    };

    let response = await handler(event);
    expect(response.statusCode).toEqual(400); // 400 Bad Request status code
  });
});
