import { ImageCaption, Quote, Text } from '../components/slices';
import { Link, graphql } from 'gatsby';

import Layout from '../components/Layout';
import React from 'react';
import { RichText } from 'prismic-reactjs';
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
						<div key={index} className="homepage-slice-wrapper">
							<Text slice={slice} />
						</div>
					);

				case 'quote':
					return (
						<div key={index} className="homepage-slice-wrapper">
							<Quote slice={slice} />
						</div>
					);

				case 'image_with_caption':
					return (
						<div key={index} className="homepage-slice-wrapper">
							<ImageCaption slice={slice} />
						</div>
					);

				default:
			}
		})();
		return res;
	});

// Display the title, date, and content of the Post
const PostBody = ({ blogPost }) => {
	return (
		<div className="post">
			<div className="max-w-4xl px-10 py-6 bg-white rounded-lg shadow-md">
				<div className="flex justify-between items-center">
					<div className="back">
						<Link to="/">&#8592; back to homepage</Link>
					</div>
					<span className="font-light text-gray-600">
						<time>{blogPost.date}</time>
					</span>
				</div>
				<div className="mt-2">
					<span className="text-2xl text-gray-700 font-bold hover:underline">
						<h1>
							{RichText.asText(blogPost.title.raw).length !== 0
								? RichText.asText(blogPost.title.raw)
								: 'Untitled'}
						</h1>
					</span>
					<PostSlices slices={blogPost.body} />
				</div>
			</div>
		</div>
	);
};

export const Post = ({ data }) => {
	if (!data) return null;
	const post = data.prismicPost.data;

	return (
		<Layout>
			<PostBody blogPost={post} />
		</Layout>
	);
};

export default withPreview(Post);
