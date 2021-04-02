import React from 'react';

export default (props) => (
	<div className="mt-8">
		<div className="flex">
			<a
				href="#"
				className="mx-1 px-3 py-2 bg-white text-gray-500 font-medium rounded-md cursor-not-allowed"
			>
				previous
			</a>

			<a
				href="#"
				className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md"
			>
				1
			</a>

			<a
				href="#"
				className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md"
			>
				2
			</a>

			<a
				href="#"
				className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md"
			>
				3
			</a>

			<a
				href="#"
				className="mx-1 px-3 py-2 bg-white text-gray-700 font-medium hover:bg-blue-500 hover:text-white rounded-md"
			>
				Next
			</a>
		</div>
	</div>
);
