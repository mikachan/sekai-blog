import { Date, RichText } from 'prismic-reactjs';

import { Link } from 'gatsby';
import React from 'react';

// Function to retrieve a small preview of the post's text
const firstParagraph = (post) => {
	// // Find the first text slice of post's body
	const firstTextSlice = post.body.find(
		(slice) => slice.slice_type === 'text'
	);

	if (firstTextSlice != null) {
		// Set the character limit for the text we'll show in the homepage
		const textLimit = 100;
		const text = RichText.asText(firstTextSlice.primary.text.raw);
		const limitedText = text.substring(0, textLimit);

		if (text.length > textLimit) {
			// Cut only up to the last word and attach '...' for readability
			return (
				<p>{`${limitedText.substring(
					0,
					limitedText.lastIndexOf(' ')
				)}...`}</p>
			);
		}
		// If it's shorter than the limit, just show it normally
		return <p>{text}</p>;
	}
	// If there are no slices of type 'text', return nothing
	return null;
};

const PostSummary = ({ post, id }) => {
	let postDate: Date | string = Date(post.date);
	postDate = postDate
		? new Intl.DateTimeFormat('en-GB', {
				month: 'short',
				day: '2-digit',
				year: 'numeric',
		  }).format(postDate)
		: '';

	const defaultTitle = 'Untitled';
	return (
		<div className="post-summary" key={id}>
			<h2>
				<Link to={post.node.url}>
					{RichText.asText(post.node.data.title.raw).length !== 0
						? RichText.asText(post.node.data.title.raw)
						: defaultTitle}
				</Link>
			</h2>
			<p className="blog-post-meta">
				<time>{postDate}</time>
			</p>
			{firstParagraph(post.node.data)}
		</div>
	);
};

export default ({ posts }) => {
	if (!posts) return null;
	return (
		<div className="blog-posts container">
			{posts.map((post) => (
				<PostSummary post={post} key={post.node.id} id={post.node.id} />
			))}
		</div>
	);
};
