import { StaticQuery, graphql } from 'gatsby';

import Footer from './Footer';
import Header from './Header';
import { Helmet } from 'react-helmet';
import Pagination from './Pagination';
import React from 'react';
import Sidebar from './Sidebar';

export default (props) => (
	<StaticQuery
		query={graphql`
			query SiteQuery {
				site {
					siteMetadata {
						title
						description
					}
				}
			}
		`}
		// eslint-disable-next-line react/jsx-props-no-spreading
		render={(data) => <Layout data={data} {...props} />}
	/>
);

const Layout = ({ data, children }) => {
	const { title, description } = data.site.siteMetadata;

	return (
		<>
			<Helmet>
				<meta charSet="utf-8" />
				<title>{title}</title>
				<meta name="description" content={description} />
			</Helmet>
			<div className="bg-gray-100 overflow-x-hidden">
				<section>
					<Header title={title} />
					<main className="px-6 py-8">
						<div className="flex justify-between container mx-auto">
							<div className="-mx-8 w-4/12 hidden lg:block">
								<Sidebar />
							</div>
							<div className="w-full lg:w-8/12">
								{children}
								{/* <Pagination /> */}
							</div>
						</div>
					</main>
					<Footer />
				</section>
			</div>
		</>
	);
};
