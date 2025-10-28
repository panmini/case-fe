import React from 'react';

const ColorTest: React.FC = () => {
	return (
		<div style={{ padding: '20px', fontFamily: 'Arial' }}>
			<h1 style={{ color: 'red', fontSize: '24px' }}>🔴 Inline Red Text - Should be red</h1>

			<div className="bg-blue-500 text-white p-4 rounded mb-4">
				Tailwind Blue Box - Should have blue background and white text
			</div>

			<div className="p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded mb-4">
				Gradient Box - Should have blue to purple gradient
			</div>

			<button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
				Green Button - Should be green and change on hover
			</button>

			{/* Test if CSS file is loaded */}
			<div style={{
				color: 'blue',
				backgroundColor: 'yellow',
				padding: '10px',
				marginTop: '10px'
			}}>
				Inline Blue Text on Yellow - Should work regardless of CSS
			</div>
		</div>
	);
};

export default ColorTest;
