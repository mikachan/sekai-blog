module.exports = {
	siteMetadata: {
		title: 'blog.sekai.co.uk',
	},
	plugins: [
		'gatsby-plugin-image',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-sitemap',
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				icon: 'src/images/charizard.png',
			},
		},
		'gatsby-plugin-sharp',
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: './src/images/',
			},
			__key: 'images',
		},
		{
			resolve: 'gatsby-source-prismic',
			options: {
				repositoryName: 'sekaicouk',
				accessToken:
					'MC5YbmU5X2hJQUFDa0FqLTVs.WBEJZ--_ve-_vTtB77-977-9aO-_ve-_ve-_vVfvv73vv706aFxjUe-_ve-_ve-_vWE677-977-977-977-977-9',

				// Set a link resolver function used to process links in your content.
				// Fields with rich text formatting or links to internal content use this
				// function to generate the correct link URL.
				// The document node, field key (i.e. API ID), and field value are
				// provided to the function, as seen below. This allows you to use
				// different link resolver logic for each field if necessary.
				// See: https://prismic.io/docs/javascript/query-the-api/link-resolving
				linkResolver: ({ node, key, value }) => (doc) => {
					// Your link resolver
				},

				// Set a list of links to fetch and be made available in your link
				// resolver function.
				// See: https://prismic.io/docs/javascript/query-the-api/fetch-linked-document-fields
				fetchLinks: [
					// Your list of links
				],

				// Set an HTML serializer function used to process formatted content.
				// Fields with rich text formatting use this function to generate the
				// correct HTML.
				// The document node, field key (i.e. API ID), and field value are
				// provided to the function, as seen below. This allows you to use
				// different HTML serializer logic for each field if necessary.
				// See: https://prismic.io/docs/nodejs/beyond-the-api/html-serializer
				htmlSerializer: ({ node, key, value }) => (
					type,
					element,
					content,
					children
				) => {
					// Your HTML serializer
				},

				// Provide an object of Prismic custom type JSON schemas to load into
				// Gatsby. This is required.
				schemas: {
					// Your custom types mapped to schemas
				},

				// Set a default language when fetching documents. The default value is
				// '*' which will fetch all languages.
				// See: https://prismic.io/docs/javascript/query-the-api/query-by-language
				lang: '*',

				// Set a function to determine if images are downloaded locally and made
				// available for gatsby-transformer-sharp for use with gatsby-image.
				// The document node, field key (i.e. API ID), and field value are
				// provided to the function, as seen below. This allows you to use
				// different logic for each field if necessary.
				// This defaults to always return false.
				shouldDownloadImage: ({ node, key, value }) => {
					// Return true to download the image or false to skip.
				},

				// Provide a default set of Imgix image transformations applied to
				// Imgix-backed gatsby-image fields. These options will override the
				// defaults set by Prismic.
				// See: https://docs.imgix.com/apis/url
				imageImgixParams: {
					auto: 'compress,format',
					fit: 'max',
					q: 50,
				},

				// Provide a default set of Imgix image transformations applied to
				// the placeholder images of Imgix-backed gatsby-image fields. These
				// parameters will be applied over those provided in the above
				// `imageImgixParams` option.
				// See: https://docs.imgix.com/apis/url
				imagePlaceholderImgixParams: {
					w: 100,
					blur: 15,
					q: 50,
				},

				// Set the prefix for the filename where type paths for your schemas are
				// stored. The filename will include the MD5 hash of your schemas after
				// the prefix.
				// This defaults to 'prismic-typepaths---${repositoryName}'.
				typePathsFilenamePrefix:
					'prismic-typepaths---gatsby-source-prismic-test-site',
			},
		},
		'gatsby-plugin-postcss',
	],
};
