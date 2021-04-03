import { OutboundLink } from 'gatsby-plugin-google-gtag';
import React from 'react';

export default () => (
	<footer className="px-6 py-2 bg-purple-900 text-gray-100">
		<div className="flex flex-col justify-between items-center container mx-auto md:flex-row">
			<p className="mt-2 md:mt-0 italic text-sm">&copy; 2021</p>
			<div className="flex -mx-2 mt-4 mb-2 md:mt-0 md:mb-0">
				<OutboundLink
					href="https://github.com/mikachan"
					target="_blank"
					rel="noreferrer"
					className="mx-2 text-gray-100 hover:text-gray-400 icon fa-github"
				>
					<span className="label">GitHub</span>
				</OutboundLink>

				<OutboundLink
					href="https://www.linkedin.com/in/sarahnorris88"
					target="_blank"
					rel="noreferrer"
					className="mx-2 text-gray-100 hover:text-gray-400 icon fa-linkedin"
				>
					<span className="label">LinkedIn</span>
				</OutboundLink>

				<OutboundLink
					href="https://www.twitter.com/mikachan_"
					target="_blank"
					rel="noreferrer"
					className="mx-2 text-gray-100 hover:text-gray-400 icon fa-twitter"
				>
					<span className="label">Twitter</span>
				</OutboundLink>

				<OutboundLink
					href="https://unsplash.com/@mikachan_"
					target="_blank"
					rel="noreferrer"
					className="mx-2 text-gray-100 hover:text-gray-400 icon fa-camera"
				>
					<span className="label">Unsplash</span>
				</OutboundLink>

				<OutboundLink
					href="https://last.fm/user/mikachan_"
					target="_blank"
					rel="noreferrer"
					className="mx-2 text-gray-100 hover:text-gray-400 icon fa-lastfm"
				>
					<span className="label">Last.fm</span>
				</OutboundLink>

				<OutboundLink
					href="https://www.instagram.com/mikachan_/"
					target="_blank"
					rel="noreferrer"
					className="mx-2 text-gray-100 hover:text-gray-400 icon fa-instagram"
				>
					<span className="label">Instagram</span>
				</OutboundLink>
			</div>
		</div>
	</footer>
);
