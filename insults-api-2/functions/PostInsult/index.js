const { sendResponse, sendError} = require('../../responses/index');
const { db } = require('../../services/index');
const { v4 : uuid } = require('uuid');

exports.handler = async (event) => {
	const { insult, play } = JSON.parse(event.body);
	if(insult && play) {
		try {
			const id = uuid().substring(0, 5);

			await db.put({
				TableName : 'insults-db',
				Item : {
					id : id,
					insult : insult,
					play : play
				}
			});

			return sendResponse(200, { success : true });

		} catch(error) {
			return sendError(404, { success : false, message : error.message });
		}
	} else {
		return sendError(404, { success : false, message : 'Could not add insult' });
	}
};
