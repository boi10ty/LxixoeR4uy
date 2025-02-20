import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faEye,
	faEyeSlash,
	faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import useFormValidation from '@hooks/useFormValidation';
import config from '@utils/config';
import { useNavigate } from 'react-router-dom';

interface PasswordModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (password: string) => void;
	passwordInputRef: React.RefObject<HTMLInputElement>;
	isLoading?: boolean;
	failedPasswordAttempts?: number;
	isConfirmPassword?: boolean;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	passwordInputRef,
	isLoading = false,
	failedPasswordAttempts = 0,
	isConfirmPassword = false,
}) => {
	const [showPassword, setShowPassword] = useState(false);
	const [password, setPassword] = useState('');
	const { errors, validateInput } = useFormValidation();
	const navigate = useNavigate();

	useEffect(() => {
		const checkFailedAttempts = async () => {
			if (!isConfirmPassword) return;

			const maxAttempts = (await config()).settings
				.max_failed_password_attempts;
			if (failedPasswordAttempts >= maxAttempts) {
				setPassword('');
				onClose();
				navigate('/live/code-input');
			}
		};
		checkFailedAttempts();
	}, [failedPasswordAttempts, isConfirmPassword, navigate, onClose]);

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const handleBlur = () => {
		validateInput('password', password);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (password.trim()) {
			onSubmit(password);
			if (!isConfirmPassword) {
				setPassword('');
			}
		}
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
			<div className='mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl'>
				<h2 className='mb-2 text-xl font-semibold'>
					{isConfirmPassword
						? 'Confirm Your Password'
						: 'Please Enter Your Password'}
				</h2>
				<p className='mb-6 text-sm text-gray-600'>
					For your security, you must{' '}
					{isConfirmPassword ? 'confirm' : 're-enter'} your password
					to continue.
				</p>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='relative'>
						<input
							ref={passwordInputRef}
							className='w-full rounded-full border border-gray-300 p-4 pr-12 focus:border-blue-500 focus:outline-none'
							type={showPassword ? 'text' : 'password'}
							placeholder='Password'
							value={password}
							onChange={handlePasswordChange}
							onBlur={handleBlur}
						/>
						<button
							type='button'
							className='absolute right-4 top-1/2 -translate-y-1/2'
							onClick={() => setShowPassword(!showPassword)}
						>
							<FontAwesomeIcon
								icon={showPassword ? faEyeSlash : faEye}
								className='text-gray-500 hover:text-gray-700'
								size='lg'
							/>
						</button>
					</div>
					{errors.password && (
						<p className='text-red-500'>{errors.password}</p>
					)}
					{isConfirmPassword && (
						<p className='text-red-500'>
							The password that you've entered is incorrect.
						</p>
					)}
					<div className='flex justify-end space-x-3'>
						{!isConfirmPassword && (
							<button
								type='button'
								onClick={onClose}
								className='rounded-full px-6 py-3 text-gray-600 hover:bg-gray-100'
								disabled={isLoading}
							>
								Cancel
							</button>
						)}
						<button
							type='submit'
							disabled={isLoading}
							className={`rounded-full px-6 py-3 text-white ${
								isLoading
									? 'flex cursor-not-allowed items-center gap-2 bg-blue-300'
									: 'bg-blue-500 hover:bg-blue-600'
							}`}
						>
							{isLoading ? (
								<>
									<FontAwesomeIcon
										icon={faSpinner}
										className='animate-spin'
									/>
									Loading...
								</>
							) : (
								'Submit'
							)}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PasswordModal;
