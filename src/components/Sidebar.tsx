import React from 'react';

export default () => (
	<aside>
		<div className="px-8">
			<div className="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md">
				<span className="flex items-center">
					<img
						src="https://secure.gravatar.com/avatar/5ce67f17b3cb5143ebc6ba880164d1a2?size=35"
						alt="avatar"
						className="mx-4 w-10 h-10 object-cover rounded-full hidden sm:block"
					/>
					<span className="text-gray-700 font-bold">Sarah</span>
				</span>
			</div>
		</div>
		{/* <div className="mt-10 px-8">
			<h1 className="mb-4 text-xl font-bold text-gray-700">Tags</h1>
			<div className="flex flex-col bg-white px-4 py-6 max-w-sm mx-auto rounded-lg shadow-md">
				<ul>
					<li>
						<a
							href="#"
							className="text-gray-700 font-bold mx-1 hover:text-gray-600 hover:underline"
						>
							Web development
						</a>
					</li>
				</ul>
			</div>
		</div> */}
	</aside>
);
