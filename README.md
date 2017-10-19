Requires node and gulp. If you don't have them, here's a good way to get them (Linux)

Node: http://yoember.com/nodejs/the-best-way-to-install-node-js/

Gulp: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

When you have node and gulp, install the project using `npm install`. After that, use `gulp build` to build dist files. If you are working on the files, use just `gulp`, and this will watch for file changes and will run build when you save changes.

You will also need to serve the files to the browser. An easy way to do this is running `php -S localhost:8000` inside the project folder (in a different terminal than `gulp`). Then you can direct your browser to http://localhost:8000/ to see the demo.

