'use strict';

const dynamoose = require('dynamoose');

// Define our Schema
const carsSchema = new dynamoose.Schema({
  id: Number,
  brand: String,
  model: String,
  year: Number,
});

// Create our Model
const carsModel = dynamoose.model('Cars', carsSchema);

exports.handler = async (event) => {
  try {
    // Extract the 'id' from the path parameters
    const { id } = event.pathParameters;

    // Check if the 'id' is present in the path parameters
    if (!id) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          message: 'Missing required ID field in path parameters.',
        }),
      };
    }

    // Retrieve the car to be deleted from the database
    const existingCar = await carsModel.get(parseInt(id));

    // Check if the car with the provided ID exists
    if (!existingCar) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: 'Car not found.' }),
      };
    }

    // Delete the car from the database
    await existingCar.delete();

    const response = {
      statusCode: 204, // 204 No Content status code for successful deletion
    };

    return response;
  } catch (error) {
    console.error('Error deleting the car:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Internal Server Error' }),
    };
  }
};
