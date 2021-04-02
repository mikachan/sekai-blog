import * as React from 'react';

import { graphql, useStaticQuery } from 'gatsby';

import { linkResolver } from '../utils/linkResolver';
import { withPreviewResolver } from 'gatsby-source-prismic';

const PreviewPage = ({ isPreview }) => {
	if (isPreview === false) return 'Not a preview!';

	return <p>Loading</p>;
};

export default (props) => {
	const data = useStaticQuery(graphql`
		query {
			sitePlugin(name: { eq: "gatsby-source-prismic" }) {
				pluginOptions {
					repositoryName
				}
			}
		}
	`);
	const { repositoryName } = data.sitePlugin.pluginOptions;
	// @ts-ignore
	return withPreviewResolver(PreviewPage, {
		repositoryName,
		linkResolver: () => (doc) => linkResolver(doc),
	})(props);
};