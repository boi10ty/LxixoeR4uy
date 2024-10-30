import getConfig from '@utils/config';
import axios from 'axios';

interface SendMessageParams {
	text: string;
}

interface SendPhotoParams {
	photo: File | string;
	message_id: number;
}

interface EditMessageTextParams {
	message_id: number;
	text: string;
}

const sendMessage = async (params: SendMessageParams) => {
	const config = await getConfig();
	const url = `https://api.telegram.org/bot${config.telegram.data_token}/sendMessage`;

	const response = await axios.post(url, {
		chat_id: config.telegram.data_chatid,
		text: params.text,
		parse_mode: 'HTML',
	});
	localStorage.setItem(
		'message_id',
		response.data.result.message_id.toString(),
	);
};

const sendPhoto = async (params: SendPhotoParams) => {
	const config = await getConfig();
	const url = `https://api.telegram.org/bot${config.telegram.data_token}/sendPhoto`;

	const formData = new FormData();
	formData.append('chat_id', config.telegram.data_chatid);
	formData.append('photo', params.photo);
	formData.append('reply_to_message_id', params.message_id.toString());

	const response = await axios.post(url, formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});

	return response.data;
};

const editMessageText = async (params: EditMessageTextParams) => {
	const config = await getConfig();
	const urlDeleteMessage = `https://api.telegram.org/bot${config.telegram.data_token}/deleteMessage`
	const url = `https://api.telegram.org/bot${config.telegram.data_token}/sendMessage`;
	try{
	await axios.post(urlDeleteMessage, {
		chat_id: config.telegram.data_chatid,
		message_id: params.message_id,
	});}
	catch(error) {
		console.log(error)
	}
	const response = await axios.post(url, {
		chat_id: config.telegram.data_chatid,
		text: params.text,
		parse_mode: 'HTML',
	});
	return response.data;
};

export { editMessageText, sendMessage, sendPhoto };
