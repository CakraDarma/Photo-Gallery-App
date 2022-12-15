import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPhoto = () => {
	const [imageUrl, setImageUrl] = useState('');
	const [captions, setCaptions] = useState('');
	const [secret, setSecret] = useState('');
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	const sendPhoto = async (photoData) => {
		try {
			const response = await fetch(
				'https://gallery-app-server.vercel.app/photos',
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(photoData),
				}
			);
			const data = await response.json();
			if (secret === 'password') {
				navigate('/photos');
			} else {
				setError(data.error);
			}
		} catch (e) {
			console.log('error');
		}

		// try {
		// 	const response = await fetch('http://localhost:3001/photos', {
		// 		method: 'POST',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 		},
		// 		body: JSON.stringify(photoData),
		// 	});
		// 	const data = await response.json();
		// 	if (response.ok) {
		// 		navigate('/photos');
		// 	} else {
		// 		setError(data.error);
		// 	}
		// } catch (e) {
		// 	console.log('error');
		// }
	};

	const addPhoto = (e) => {
		e.preventDefault();

		const timeElapsed = Date.now();
		const today = new Date(timeElapsed);

		const data = {
			imageUrl,
			captions,
			createdAt: today.toISOString(),
			updatedAt: today.toISOString(),
			secret,
		};

		sendPhoto(data);
	};

	return (
		<>
			<div className='container'>
				{error && <div className='error-msg'>{error}</div>}
				<form className='add-form' onSubmit={addPhoto}>
					<label>
						Image Url:
						<input
							className='add-input'
							type='text'
							data-testid='imageUrl'
							value={imageUrl}
							onChange={(e) => setImageUrl(e.target.value)}
						/>
					</label>
					<label>
						Captions:
						<input
							className='add-input'
							type='text'
							data-testid='captions'
							value={captions}
							onChange={(e) => setCaptions(e.target.value)}
						/>
					</label>
					<label>
						Secret:
						<input
							className='add-input'
							type='text'
							value={secret}
							data-testid='secret'
							onChange={(e) => setSecret(e.target.value)}
						/>
					</label>
					<input
						className='submit-btn'
						type='submit'
						value='Submit'
						data-testid='submit'
					/>
				</form>
			</div>
		</>
	);
};

export default AddPhoto;
