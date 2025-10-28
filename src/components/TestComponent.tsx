import React from 'react';

const TestComponent: React.FC = () => {
	return (
		<div className="p-6">
			<h1 className="text-3xl font-bold text-blue-600 bg-red-100 p-4 rounded-lg">
				CSS Test - If this is styled, Tailwind is working
			</h1>
			<div className="mt-4 p-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg">
				Gradient Test
			</div>
			<button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
				Hover Test
			</button>
		</div>
	);
};

export default TestComponent;
