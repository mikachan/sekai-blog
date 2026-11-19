# WordPress block theme for blog.sekai.co.uk

[![blog.sekai.co.uk](https://img.shields.io/website?url=https%3A%2F%2Fblog.sekai.co.uk)](https://blog.sekai.co.uk/)

The block theme for [blog.sekai.co.uk](https://blog.sekai.co.uk/): a boxed, table-style layout, like we used back in the early 2000s.

## Deploying

Any pushes deploy the theme to the live site on Pressable.

## Site Editor changes

Make template and template part changes in these files rather than in the Site Editor. An edit saved in the Site Editor is stored in the database and takes precedence over the file here, so later changes to the file won't show up.

If that happens, copy anything worth keeping into the file, then reset the template or part in the Site Editor (Patterns → Template Parts, or Templates, then Reset).

## Looks

The theme comes with three looks, each a photo with a palette to match: Hawthorn (the default, in `theme.json`), Rail switch and Windmill gears (in `styles/`). Pick one under Appearance → Editor → Styles.

The footer credits the background photo and links to its post. The bundled photos are matched to their posts by slug in `functions.php`. A photo uploaded in the Styles panel links to the post it was attached to.
