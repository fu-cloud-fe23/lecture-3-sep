const { sendResponse, sendError} = require('../../responses/index');
const { db } = require('../../services/index');

exports.handler = async (event) => {
	const {insult, play} = JSON.parse(event.body);
	const { id } = event.pathParameters;
	

	if(insult && play) {
		try {
			await db.update({
				TableName: 'insults-db',
				Key: { id: id },
				ReturnValues: 'ALL_NEW',
				UpdateExpression: 'set insult = :insult, play = :play',
				ExpressionAttributeValues: {
				':insult': insult,
				':play' : play
				}
	
			}).promise();

			return sendResponse(200, { success : true });
		} catch(error) {
			return sendError(404, { success : false, message : error.message });
		}
		
	} else {
		return sendError(404, 'Could not update insult!');
	}
	
};