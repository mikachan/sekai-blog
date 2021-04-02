import BlogPosts from '../components/BlogPosts';
import Layout from '../components/Layout';
import React from 'react';
import { graphql } from 'gatsby';
import { withPreview } from 'gatsby-source-prismic';

export const query = graphql`
	query MyQuery {
		allPrismicPost(sort: { fields: data___date, order: DESC }) {
			edges {
				node {
					url
					id
					uid
					type
					data {
						title {
							raw
						}
						date
						body {
							... on PrismicPostBodyText {
								id
								slice_label
								slice_type
								primary {
									text {
										raw
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

export const Homepage = ({ data }) => {
	if (!data) return null;
	const posts = data.allPrismicPost.edges;

	return (
		<Layout>
			<BlogPosts posts={posts} />
		</Layout>
	);
};

export default withPreview(Homepage);
