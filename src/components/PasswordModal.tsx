import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface PasswordModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSubmit: (password: string) => void;
	passwordInputRef: React.RefObject<HTMLInputElement>;
	password: string;
	setPassword: (value: string) => void;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
	isOpen,
	onClose,
	onSubmit,
	passwordInputRef,
	password,
	setPassword,
}) => {
	const [showPassword, setShowPassword] = useState(false);

	if (!isOpen) return null;

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (password.trim()) {
			onSubmit(password);
		}
	};

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50'>
			<div className='mx-4 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl'>
				<h2 className='mb-2 text-xl font-semibold'>
					Please Enter Your Password
				</h2>
				<p className='mb-6 text-sm text-gray-600'>
					For your security, you must re-enter your password to
					continue.
				</p>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='relative'>
						<input
							ref={passwordInputRef}
							className='w-full rounded-full border border-gray-300 p-4 pr-12 focus:border-blue-500 focus:outline-none'
							type={showPassword ? 'text' : 'password'}
							placeholder='Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
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
					<div className='flex justify-end space-x-3'>
						<button
							type='button'
							onClick={onClose}
							className='rounded-full px-6 py-3 text-gray-600 hover:bg-gray-100'
						>
							Cancel
						</button>
						<button
							type='submit'
							className='rounded-full bg-blue-500 px-6 py-3 text-white hover:bg-blue-600'
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default PasswordModal;
