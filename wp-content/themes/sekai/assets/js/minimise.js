/*
 * Minimise button for the box, like a desktop window: the box tucks away
 * into a tab at the bottom of the screen so the background photo shows,
 * and the tab brings it back.
 *
 * Added by script rather than in the template, since the button does
 * nothing without it.
 */
( () => {
	const box = document.querySelector( '.sekai-box' );
	const bar = box?.querySelector( '.sekai-title-bar' );
	if ( ! bar ) {
		return;
	}

	const pixel = ( rects ) =>
		`<svg viewBox="0 0 8 8" width="12" height="12" aria-hidden="true" focusable="false" shape-rendering="crispEdges" fill="currentColor">${ rects }</svg>`;

	const minimise = document.createElement( 'button' );
	minimise.type = 'button';
	minimise.className = 'sekai-minimise';
	minimise.title = 'minimise';
	minimise.setAttribute( 'aria-label', 'Minimise, to see the background photo' );
	minimise.innerHTML = pixel( '<rect x="1" y="6" width="6" height="2"/>' );
	bar.append( minimise );

	const name = bar.querySelector( '.wp-block-site-title' )?.textContent.trim() || document.title;
	const restore = document.createElement( 'button' );
	restore.type = 'button';
	restore.className = 'sekai-restore';
	restore.title = 'restore';
	restore.setAttribute( 'aria-label', `Restore ${ name }` );
	restore.innerHTML = pixel( '<rect x="0" y="0" width="8" height="2"/><rect x="0" y="2" width="1" height="6"/><rect x="7" y="2" width="1" height="6"/><rect x="1" y="7" width="6" height="1"/>' );
	restore.append( name );
	document.body.append( restore );

	const setMinimised = ( minimised ) => {
		document.documentElement.classList.toggle( 'sekai-minimised', minimised );
		box.classList.toggle( 'is-restored', ! minimised );
		( minimised ? restore : minimise ).focus();
	};

	minimise.addEventListener( 'click', () => setMinimised( true ) );
	restore.addEventListener( 'click', () => setMinimised( false ) );
} )();
