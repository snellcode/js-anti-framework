# js-anti-framework

Requires node and gulp. If you don't have them, here's a good way to get them (Linux)

Node: http://yoember.com/nodejs/the-best-way-to-install-node-js/

Gulp: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

When you have node and gulp, install the project using `npm install`. After that, use `gulp build` to build dist files. If you are working on the files, use just `gulp`, and this will watch for file changes and will run build when you save changes.

# The JavaScript Anti-Framework

With so many JavaScript frameworks available, which one do you choose? Angular 2 and React are by far the most popular, but both of these come with a lot of things you may not need. These frameworks usually assume you are building a SPA (Single Page App), and if you are, then they are a good option. Using these frameworks will also mean a substatial amount of code your users will need to download. On mobile, this can be a concern for performance, especially with Angular 2 which is quite large.

If you're not building a SPA, then you may find yourself going against the grain of the typical JS framework. You also will only be using a subset of their features. I'd like to offer you an alternative. Call it the anti-framework. We'll use ES6 with modules and classes, we'll use SCSS, and we'll bring it all together using Gulp. If you're working on a traditional non SPA site, this could be a great option to drop in client side components any place you need them.

Consider this example code: https://github.com/snellcode/js-anti-framework/

What we have here are the bare bones of a framework. We have a view (index.html), we have a controller (src/js/modules/example-component.es6), there are styles (src/css), and everything is split up into modules. Modules (or components) are a great way to organize your code, so that each module will target it's specific goal. They can be as simple or complex as you need. For example, if you find one of your modules is more complex, you can add a folder for that module, and then include whatever files you need.

Let's take a closer look at our component controller code (src/js/modules/example-component.es6). We can see in the main.es6 file that we get a new instance of the controller for each instance of '.example-component' rendered in our html. So when you refer to `this`, you are just referring to that one instance. This will allow you to have several of the same component on one page. Looking at the constructor, we can see it initializes `this.users` as an empty list, defines our template html, and finally runs `this.update()`. 

In this basic 'anti-framework', we have to do everything ourself. There is no automatic data binding like in real frameworks. Instead, we simply call `this.update()` any time our state/model changes. When we update, we teardown any js events, and fully re-render the view with the updated data. This one way data flow is typical of React/Redux, and many other frameworks are adopting it as well. The point is that when you change your state (in this case `this.users`), you then completely re-render the view that is consuming that data.

Clearly there are a lot of improvments we could make, and this example is very basic. In a real world usage, we would have several templates, one for each portion of the view. We would have a larger tree of state data, and our update logic would become more complex. At a certain point, we may just consider using a real framework if it does become too chaotic. But then again, if we target our components specifically and narrowly for their purpose, we can end up with a bunch of simple componenets that work together to make the whole.

At the end of the day, the framework you choose (or in this case, don't choose) doesn't make as much difference as how you use it. You can make something with pieces that fit together elegantly, like a cathedral. Or you can make a big mess of code that is only patchable by lumping more on top, like a pyramid. We can learn from emerging best practices like one way dataflow and transactional state management. We can use code that other very smart people wrote, and accept the unavoidable additional file size baggage. Or, if we find a simpler approach gives us what we need, we can adopt the anti-framework option, and go our own way.