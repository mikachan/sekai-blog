import { Link } from 'gatsby';
import React from 'react';

export default (props) => (
	<nav className="bg-white px-6 py-4 shadow">
		<div className="flex flex-col container mx-auto md:flex-row md:items-center md:justify-between">
			<div className="flex justify-between items-center">
				<div>
					<a
						href="#"
						className="text-gray-800 text-xl font-bold md:text-2xl"
					>
						{props.title}
					</a>
				</div>
				<div>
					<button
						type="button"
						className="block text-gray-800 hover:text-gray-600 focus:text-gray-600 focus:outline-none md:hidden"
					>
						<svg
							viewBox="0 0 24 24"
							className="h-6 w-6 fill-current"
						>
							<path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"></path>
						</svg>
					</button>
				</div>
			</div>
			<div className="md:flex flex-col md:flex-row md:-mx-4 hidden">
				<span className="my-1 text-gray-800 hover:text-red-800 md:mx-4 md:my-0">
					<Link to="/">Home</Link>
				</span>

				<a
					href="https://sekai.co.uk"
					className="my-1 text-gray-800 hover:text-red-800 md:mx-4 md:my-0"
				>
					sekai.co.uk
				</a>
			</div>
		</div>
	</nav>
);
