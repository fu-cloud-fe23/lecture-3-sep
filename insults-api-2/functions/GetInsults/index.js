const { sendResponse, sendError} = require('../../responses/index');
const { db } = require('../../services/index');

exports.handler = async (event) => {
	try {
		const { Items } = await db.scan({
			TableName : 'insults-db',
			FilterExpression : 'attribute_exists(#DYNOBASE_insult)',
			ExpressionAttributeNames : {
				'#DYNOBASE_insult' : 'insult'
			}
		}).promise();

		if(Items) {
			return sendResponse(200, Items);
		} else {
			sendError(404, { success : false, message : 'No insults found!' });
		}
		
	} catch(error) {
		return sendError(404, { success : false, message : error.message });
	}
};
