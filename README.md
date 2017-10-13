# The JavaScript Anti-Framework (or The Cathedral and The Pyramid): 

With so many JavaScript frameworks available, which one do you choose? Angular 2 and React are by far the most popular, but both of these frameworks come with a lot of things you may not need. These frameworks usually assume you're building a SPA (Single Page App), and if you are, they both do a great job. However, using these frameworks will also mean a substantial amount of code your users will need to download. On mobile, this can be a concern for performance, especially with Angular 2, which is quite large. There are techniques to trim down the build size, but then again, what if you could avoid all that code in the first place?

If you're not building a SPA, then you may find yourself going against the grain of the typical JS framework. You'll also be using only a relatively small subset of their features. I'd like to offer you an alternative: The JavaScript Anti-Framework. We'll use ES6 JS with modules and classes, we'll use SCSS, and we'll bring it all together using Gulp. We'll be using a few JS libraries, but for the most part, this will be done in plain ES6 JS. If you're working on a traditional non SPA site, this can be a great option for adding some client side code to a page, without all the bells and whistles (and the ceremony, looking at you Angular 2...) of a full-blown JS framework.

Consider the following basic example of a carousel (thanks Slick JS). It's driven by some dynamic data source, because after all, this is really the point of using a JS framework in the first place. Get the code at https://github.com/snellcode/js-anti-framework/, and see a demo at https://snellcode.github.io/js-anti-framework/

What we have here are the bare bones of a framework. We have an html view (index.html, including a <script> template), we have an ES6 controller class (src/components/users-carousel/users-carousel.es6), there are SCSS styles (src/components/users-carousel/users-carousel.scss), and the code is organized by components. Using components as a top level structure is a great way to organize your code, so that each component will target it's specific goal, and contain all the relevant code in one place. They can be as simple or complex as you need. For example, if you find one of your components is more complex, you can add a more files and/or folders into that component, including whatever you need. This is in line with the emerging standard of Web Components, which encourages re-usable elements that bundle all their required code into a stand-alone package.

Let's take a closer look at our component controller code (src/components/users-carousel/users-carousel.es6). We can see in the main.es6 file (src/main.es6) that we get a new instance of the controller for each instance of `.users-carousel` rendered in our html. So when you refer to `this`, you are just referring to that one instance. This will allow you to have several of the same components on one page. Looking at the constructor, we can see it initializes `this.users` as an empty list, defines our template html, and finally runs `this.update()`. There are a few extra properties included to deal with filtering the users by group (allUsers, groups, activeGroup).

In this basic 'anti-framework', we have to do everything ourselves. There is no automatic data binding like in real frameworks. Instead, we simply call `this.update()` any time our state/model changes. When we update, we teardown any JS events, and fully re-render the view with the updated data. This one-way data flow is typical of React Flux/Redux, and many other frameworks are adopting it as well. The idea is that when you change your state (in this case `this.users`, or `this.activeGroup`), you then completely re-render the view that is consuming that data. This may seem counter intuitive and inefficient, however as your app becomes more complex, this approach really does scale up in a manageable way. The cost of re-rending is actually smaller than you may think, especially in modern devices and browsers.

Clearly there are a lot of improvements we could make, as this example is very basic. In a real world usage, we would have several templates, one for each portion of the view. We would have a larger tree of state data, and our update logic would become more complex. We can manage this complexity by using Flux/Redux style reducers to enforce transactional state changes in a centralized way. At a certain point, we may consider using a real framework if it does become too complex. But then again, if we target our components specifically and narrowly for their purpose, we can end up with a bunch of simple components that work together to make the whole.

At the end of the day, the framework you choose (or in this case, don't choose) doesn't make as much difference as how you use it. You can make something with pieces that fit together elegantly, like a cathedral. Or you can make a big mess of code that is only patchable by lumping more on top, like a pyramid. We can learn from emerging best practices like Web Components, one-way dataflow and transactional state management. We can use code that other very smart people wrote, and accept the unavoidable additional file size baggage. Or, if we find a simpler approach gives us what we need, we can adopt "The JavaScript Anti-Framework", and go our own way.

***

# Technical Notes

Requires node and gulp. If you don't have them, here's a good way to get them (Linux)

Node: http://yoember.com/nodejs/the-best-way-to-install-node-js/

Gulp: https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md

When you have node and gulp, install the project using `npm install`. After that, use `gulp build` to build dist files. If you are working on the files, use just `gulp`, and this will watch for file changes and will run build when you save changes.

You will also need to serve the files to the browser. An easy way to do this is running `php -S localhost:8000` inside the project folder (in a different terminal than `gulp`). Then you can direct your browser to http://localhost:8000/ to see the demo.

