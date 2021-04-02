import React from 'react';

export default () => (
	<aside>
		<div className="px-8">
			<div className="flex flex-col bg-white max-w-sm px-6 py-4 mx-auto rounded-lg shadow-md">
				<div className="text-gray-700">
					<img
						src="https://secure.gravatar.com/avatar/5ce67f17b3cb5143ebc6ba880164d1a2?size=85"
						alt="avatar"
						className="mb-4 object-cover rounded-full hidden sm:inline-block"
					/>
					<p className="mb-4">
						<strong>Sarah N</strong>
					</p>
					<p className="mb-4">Web developer from Lancashire.</p>
					<p className="mb-4">
						Usually found walking her dog, writing JavaScript,
						watching anime or listening to Weezer.
					</p>
					<p>
						<a
							href="https://sekai.co.uk"
							target="_blank"
							className="italic"
						>
							Read more &#8594;
						</a>
					</p>
				</div>
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
