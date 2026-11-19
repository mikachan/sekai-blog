# Sekai

The block theme for [blog.sekai.co.uk](https://blog.sekai.co.uk/): a boxed, table-style layout over one of your own photos.

## Deploying

The repo root is the theme folder. Pushes to `main` deploy it to `wp-content/themes/sekai` on Pressable, so work on a branch and merge when it's ready to go live.

Deploys only change theme files. Posts, settings and anything else in the database stay as they are.

## Working locally

The local copy of the site runs in [WordPress Studio](https://developer.wordpress.com/studio/). Copy the theme into the Studio site to try changes:

```sh
rsync -a --exclude .git --exclude README.md --exclude .gitignore ./ ~/Studio/blogsekaicouk/wp-content/themes/sekai/
```

To refresh the local content from the live site, pull just the database with `studio pull --remote-site blog.sekai.co.uk --options=sqls`. Avoid pushing the database back to live; it replaces everything there, including anything that has changed since the last pull.

## Site Editor changes

Make template and template part changes in these files rather than in the Site Editor. An edit saved in the Site Editor is stored in the database and takes precedence over the file here, so later changes to the file won't show up.

If that happens, copy anything worth keeping into the file, then reset the template or part in the Site Editor (Patterns → Template Parts, or Templates, then Reset).

## Looks

The theme comes with three looks, each a photo with a palette to match: Hawthorn (the default, in `theme.json`), Rail switch and Windmill gears (in `styles/`). Pick one under Appearance → Editor → Styles.

The footer credits the background photo and links to its post. The bundled photos are matched to their posts by slug in `functions.php`. A photo uploaded in the Styles panel links to the post it was attached to.
