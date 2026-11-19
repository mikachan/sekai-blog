# WordPress block theme for blog.sekai.co.uk

The block theme for [blog.sekai.co.uk](https://blog.sekai.co.uk/): a boxed, table-style layout, like we used back in the early 2000s.

## Deploying

Any pushes deploy the theme to the live site on Pressable.

The theme lives in `wp-content/themes/sekai`, the same path it has on the server. Pressable syncs the `wp-content/themes` folder.

## Site Editor changes

Make template and template part changes in these files rather than in the Site Editor. An edit saved in the Site Editor is stored in the database and takes precedence over the file here, so later changes to the file won't show up.

If that happens, copy anything worth keeping into the file, then reset the template or part in the Site Editor (Patterns → Template Parts, or Templates, then Reset).
