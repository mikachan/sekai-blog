import GatsbyLink from '../GatsbyLink';
import React from 'react';
import { RichText } from 'prismic-reactjs';

export default ({ slice }) => (
	<div className="post-text">
		<div>
			<RichText
				render={slice.primary.text.raw || []}
				serializeHyperlink={GatsbyLink}
			/>
		</div>
	</div>
);
