<?php
/**
 * Title: Post list
 * Slug: sekai/post-list
 * Inserter: no
 * Description: Dates and titles of the posts in the current query, with pagination.
 *
 * @package Sekai
 */
?>
<!-- wp:query {"queryId":1,"query":{"inherit":true},"className":"sekai-list h-feed"} -->
<div class="wp-block-query sekai-list h-feed"><!-- wp:post-template -->
<!-- wp:group {"className":"sekai-list-item h-entry","layout":{"type":"flex","flexWrap":"nowrap","verticalAlignment":"top"},"style":{"spacing":{"blockGap":"0.75rem"}}} -->
<div class="wp-block-group sekai-list-item h-entry"><!-- wp:post-date {"format":"Y-m-d","className":"sekai-date","textColor":"muted"} /-->

<!-- wp:post-title {"level":0,"isLink":true,"className":"p-name","style":{"typography":{"fontSize":"inherit","fontWeight":"400"}},"fontFamily":"body"} /--></div>
<!-- /wp:group -->
<!-- /wp:post-template -->

<!-- wp:query-pagination {"paginationArrow":"arrow","layout":{"type":"flex","justifyContent":"space-between"}} -->
<!-- wp:query-pagination-previous {"label":"newer"} /-->

<!-- wp:query-pagination-next {"label":"older"} /-->
<!-- /wp:query-pagination -->

<!-- wp:query-no-results -->
<!-- wp:paragraph -->
<p><?php echo esc_html__( 'Nothing here yet.', 'sekai' ); ?></p>
<!-- /wp:paragraph -->
<!-- /wp:query-no-results --></div>
<!-- /wp:query -->
