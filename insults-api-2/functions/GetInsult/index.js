const { sendResponse, sendError} = require('../../responses/index');
const { db } = require('../../services/index');

exports.handler = async (event) => {
	try {
		const { id } = event.pathParameters;
		
		const { Item } = await db.get({
			TableName : 'insults-db',
			Key : {
				id : id
			}
		});
		
		if(Item) {
			return sendResponse(200, Item);
		} else {
			return sendError(404, 'No insult found!');
		}

	} catch(error) {
		return sendError(404, error.message);
	}
};
