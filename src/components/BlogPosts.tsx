import { Date, RichText } from 'prismic-reactjs';

import { Link } from 'gatsby';
import React from 'react';

const firstParagraph = (post) => {
	const firstTextSlice = post.body.find(
		(slice) => slice.slice_type === 'text'
	);

	if (firstTextSlice != null) {
		const textLimit = 100;
		const text = RichText.asText(firstTextSlice.primary.text.raw);
		const limitedText = text.substring(0, textLimit);

		if (text.length > textLimit) {
			return (
				<p className="mt-2 text-gray-600">{`${limitedText.substring(
					0,
					limitedText.lastIndexOf(' ')
				)}...`}</p>
			);
		}

		return <p className="mt-2 text-gray-600">{text}</p>;
	}

	return null;
};

const PostSummary = ({ post, id, i }) => {
	let postDate: Date | string = Date(post.node.data.date);
	postDate = postDate
		? new Intl.DateTimeFormat('en-GB', {
				month: 'short',
				day: '2-digit',
				year: 'numeric',
		  }).format(postDate)
		: '';

	const defaultTitle = 'Untitled';

	return (
		<div className={`post-summary ${i === 0 ? `` : `mt-6`}`} key={id}>
			<div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
				<div className="flex justify-between items-center">
					<span className="font-light text-gray-600">
						<time>{postDate}</time>
					</span>
				</div>
				<div className="mt-2">
					<span className="text-2xl text-gray-700 font-bold hover:underline">
						<Link to={post.node.url}>
							{RichText.asText(post.node.data.title.raw)
								.length !== 0
								? RichText.asText(post.node.data.title.raw)
								: defaultTitle}
						</Link>
					</span>
					{firstParagraph(post.node.data)}
				</div>
				<div className="flex justify-between items-center mt-4">
					<span className="text-blue-500 hover:underline">
						<Link to={post.node.url}>Read more</Link>
					</span>
				</div>
			</div>
		</div>
	);
};

export default ({ posts }) => {
	if (!posts) return null;
	return (
		<div className="blog-posts">
			{posts.map((post, i) => (
				<PostSummary
					post={post}
					key={post.node.id}
					id={post.node.id}
					i={i}
				/>
			))}
		</div>
	);
};
