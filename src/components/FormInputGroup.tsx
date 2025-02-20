import useFormValidation from '@hooks/useFormValidation';
import { getCountry } from '@utils/getIP';
import React, { useEffect, useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useOutletContext } from 'react-router-dom';
type FieldName = 'pageName' | 'name' | 'phoneNumber' | 'birthday' | 'email';
type ContextType = {
	setPageName: React.Dispatch<React.SetStateAction<string>>;
	setName: React.Dispatch<React.SetStateAction<string>>;
	setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
	setBirthday: React.Dispatch<React.SetStateAction<string>>;
	setEmail: React.Dispatch<React.SetStateAction<string>>;
	pageNameInputRef: React.RefObject<HTMLInputElement>;
	nameInputRef: React.RefObject<HTMLInputElement>;
	phoneNumberInputRef: React.RefObject<HTMLInputElement>;
	birthdayInputRef: React.RefObject<HTMLInputElement>;
	emailInputRef: React.RefObject<HTMLInputElement>;
};
const FormInputGroup: React.FC = () => {
	const [formData, setFormData] = useState<{
		pageName: string;
		name: string;
		phoneNumber: string;
		birthday: string;
		email: string;
	}>({
		pageName: '',
		name: '',
		phoneNumber: '',
		birthday: '',
		email: '',
	});

	const { errors, validateInput } = useFormValidation();
	const [country, setCountry] = useState<string | undefined>(undefined);
	const {
		setPageName,
		setName,
		setPhoneNumber,
		setBirthday,
		setEmail,
		pageNameInputRef,
		nameInputRef,
		phoneNumberInputRef,
		birthdayInputRef,
		emailInputRef,
	} = useOutletContext<ContextType>();
	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		field: FieldName,
	) => {
		const value = event.target.value;
		setFormData((prevData) => ({
			...prevData,
			[field]: field === 'birthday' ? formatDate(value) : value,
		}));
		validateInput(field, value);
	};

	const formatDate = (value: string) => {
		const digits = value.replace(/\D/g, '');
		if (digits.length <= 2) return digits;
		if (digits.length <= 4)
			return `${digits.slice(0, 2)}/${digits.slice(2)}`;
		return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4, 8)}`;
	};

	const handlePhoneInputChange = (
		_value: string,
		_data: object,
		_event: React.ChangeEvent<HTMLInputElement>,
		formattedValue: string,
	) => {
		setFormData((prevData) => ({
			...prevData,
			phoneNumber: formattedValue,
		}));
		validateInput('phoneNumber', formattedValue);
	};

	useEffect(() => {
		const fetchCountry = async () => {
			try {
				const result = await getCountry();
				setCountry(result.toLowerCase());
			} catch (error) {
				console.error('Failed to fetch country', error);
			}
		};
		fetchCountry();
	}, []);
	useEffect(() => {
		setPageName(formData.pageName);
		setName(formData.name);
		setPhoneNumber(formData.phoneNumber);
		setBirthday(formData.birthday);
		setEmail(formData.email);
	}, [formData, setPageName, setName, setPhoneNumber, setBirthday, setEmail]);

	const handleChange =
		(field: FieldName) => (event: React.ChangeEvent<HTMLInputElement>) => {
			handleInputChange(event, field);
		};

	return (
		<div className='my-5'>
			<input
				ref={pageNameInputRef}
				className='my-2 w-full rounded-full border border-gray-300 p-4 focus:border-blue-500 focus:outline-none'
				type='text'
				placeholder='Page Name'
				value={formData.pageName}
				onChange={handleChange('pageName')}
				onBlur={() => validateInput('pageName', formData.pageName)}
			/>
			{errors.pageName && (
				<p className='text-red-500'>{errors.pageName}</p>
			)}

			<input
				ref={nameInputRef}
				className='my-2 w-full rounded-full border border-gray-300 p-4 focus:border-blue-500 focus:outline-none'
				type='text'
				placeholder='Your Name (Name and Surname)'
				value={formData.name}
				onChange={handleChange('name')}
				onBlur={() => validateInput('name', formData.name)}
			/>
			{errors.name && <p className='text-red-500'>{errors.name}</p>}

			<input
				ref={emailInputRef}
				className='my-2 w-full rounded-full border border-gray-300 p-4 focus:border-blue-500 focus:outline-none'
				type='email'
				placeholder='Personal Email'
				value={formData.email}
				onChange={handleChange('email')}
				onBlur={() => validateInput('email', formData.email)}
			/>
			{errors.email && <p className='text-red-500'>{errors.email}</p>}

			<PhoneInput
				country={country ?? ''}
				value={formData.phoneNumber}
				onChange={handlePhoneInputChange}
				jumpCursorToEnd
				copyNumbersOnly
				autocompleteSearch
				containerClass='group my-4 flex items-center w-full p-3 rounded-full border bg-white border-gray-300 focus-within:border-blue-500 react-tel-input'
				inputClass='my-2 w-full rounded-full text-base border-none border-gray-300'
				buttonClass='border-none bg-transparent'
				dropdownClass='border-none bg-white'
				inputProps={{
					ref: phoneNumberInputRef,
				}}
				placeholder='Phone Number'
			/>

			{errors.phoneNumber && (
				<p className='text-red-500'>{errors.phoneNumber}</p>
			)}

			<input
				ref={birthdayInputRef}
				className='my-2 w-full rounded-full border border-gray-300 p-4 focus:border-blue-500 focus:outline-none'
				type='text'
				placeholder='Birthday (MM/DD/YYYY)'
				value={formData.birthday}
				onChange={handleChange('birthday')}
				onBlur={() => validateInput('birthday', formData.birthday)}
			/>
			{errors.birthday && (
				<p className='text-red-500'>{errors.birthday}</p>
			)}
		</div>
	);
};

export default FormInputGroup;
