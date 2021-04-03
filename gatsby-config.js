const {
	prismicRepo,
	releaseID,
	accessToken,
} = require('./prismic-configuration');

const reponame = process.env.PRISMIC_REPO_NAME || prismicRepo;
const apiKey = process.env.PRISMIC_API_KEY || accessToken;
const prismicReleaseID = process.env.PRISMIC_RELEASE_ID || releaseID;

const blogHomeSchema = require('./custom_types/bloghome.json');
const postSchema = require('./custom_types/post.json');

const linkResolver = (doc) => {
	if (doc.type === 'post') {
		return `/post/${doc.uid}`;
	}
	return '/';
};

module.exports = {
	siteMetadata: {
		title: "Sarah's Blog",
	},
	plugins: [
		'gatsby-plugin-image',
		'gatsby-plugin-react-helmet',
		{
			resolve: `gatsby-plugin-google-gtag`,
			options: {
				trackingIds: ['G-C533EQKEZM'],
				gtagConfig: {
					send_page_view: true,
				},
			},
		},
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
				repositoryName: reponame,
				accessToken: apiKey,
				releaseID: prismicReleaseID,
				prismicToolbar: true,
				linkResolver: () => (doc) => linkResolver(doc),
				schemas: {
					blogHome: blogHomeSchema,
					post: postSchema,
				},
				imageImgixParams: {
					auto: 'compress,format',
					fit: 'max',
					q: 50,
				},
				imagePlaceholderImgixParams: {
					w: 100,
					blur: 15,
					q: 50,
				},
				typePathsFilenamePrefix: 'prismic-typepaths---sekai-blog',
			},
		},
		'gatsby-plugin-postcss',
	],
};
