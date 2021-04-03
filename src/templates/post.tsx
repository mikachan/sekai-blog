import { Date, RichText } from 'prismic-reactjs';
import { ImageCaption, Quote, Text } from '../components/slices';
import { Link, graphql } from 'gatsby';

import { Helmet } from 'react-helmet';
import Layout from '../components/Layout';
import React from 'react';
import { formatDate } from '../utils/formatDate';
import { withPreview } from 'gatsby-source-prismic';

export const query = graphql`
	query BlogPostQuery($uid: String) {
		prismicPost(uid: { eq: $uid }) {
			id
			uid
			lang
			type
			url
			dataRaw
			data {
				date
				title {
					raw
				}
				body {
					... on PrismicPostBodyText {
						slice_label
						slice_type
						primary {
							text {
								raw
							}
						}
					}
					... on PrismicPostBodyQuote {
						slice_label
						slice_type
						primary {
							quote {
								raw
							}
						}
					}
					... on PrismicPostBodyImageWithCaption {
						id
						slice_label
						slice_type
						primary {
							image {
								alt
								url
							}
							caption {
								raw
							}
						}
					}
				}
			}
		}
	}
`;

// Sort and display the different slice options
const PostSlices = ({ slices }) =>
	slices.map((slice, index) => {
		const res = (() => {
			switch (slice.slice_type) {
				case 'text':
					return (
						<div key={index} className="slice">
							<Text slice={slice} />
						</div>
					);

				case 'quote':
					return (
						<div key={index} className="slice">
							<Quote slice={slice} />
						</div>
					);

				case 'image_with_caption':
					return (
						<div key={index} className="slice">
							<ImageCaption slice={slice} />
						</div>
					);

				default:
			}
		})();
		return res;
	});

// Display the title, date, and content of the Post
const PostBody = ({ blogPost, blogTitle }) => {
	let postDate: Date | string = Date(blogPost.date);
	postDate = formatDate(postDate);

	return (
		<div className="post">
			<div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
				<div className="flex justify-between items-center">
					<div className="back text-sm text-gray-500 hover:underline">
						<Link to="/">&#8592; Back to Homepage</Link>
					</div>
					<span className="font-light text-gray-600">
						<time>{postDate}</time>
					</span>
				</div>
				<div className="mt-2">
					<h1 className="text-2xl text-gray-700 font-bold">
						{blogTitle}
					</h1>
					<PostSlices slices={blogPost.body} />
				</div>
			</div>
		</div>
	);
};

export const Post = ({ data }) => {
	if (!data) return null;
	const post = data.prismicPost.data;
	const postTitle =
		RichText.asText(post.title.raw).length !== 0
			? RichText.asText(post.title.raw)
			: 'Untitled';

	return (
		<Layout>
			<Helmet>
				<title>{postTitle}</title>
			</Helmet>
			<PostBody blogPost={post} blogTitle={postTitle} />
		</Layout>
	);
};

export default withPreview(Post);
