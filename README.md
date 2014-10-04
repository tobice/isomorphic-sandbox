#isomorphic-sandbox

_You can find this application live on [heroku](http://isomorphic-sandbox.herokuapp.com)._

A simple isomorphic web application based on 
[React.js](http://facebook.github.io/react/) and 
[Flux architecture](http://facebook.github.io/flux/docs/overview.html). 
Created for testing and experimental purposes (the code is a little messy). 

The application is built mostly on these two awesome isomorphic tutorials:
[isomorphic-tutorial](https://github.com/spikebrehm/isomorphic-tutorial) and
Yahoo's [flux-examples](https://github.com/yahoo/flux-examples). It contains 
all necessary components for running full isomorphic web application 
(isomorphic routing, isomorphic api access, isomorphic form validation etc).

## React.js and server-side rendering

The most challenging part is to get server-side rendering working. The 
problem is that function `React.renderComponentToString()`, which is essential
for rendering React components on server-side, is synchronous. That means 
that as the component hierarchy is being rendered, it is impossible to load 
any asynchronous data (like for example list of posts from the database). 
See more at [StackOverflow]
(http://stackoverflow.com/questions/25983001/strategies-for-server-side-rendering-of-asynchronously-initialized-react-js-comp)
and in this [GitHub discussion](https://github.com/facebook/react/issues/1739).

Apparently, there is no universal pattern to get around this so I tried two 
different approaches in my app (both are included in the code).

### Typical Controller from MVC

The easiest solution is to prefetch all necessary data before the rendering 
starts. This approach is used by the majority of isomorphic tutorials around.
The obvious problem is that this works only for small applications. In more 
complex applications it typically happens that different urls require 
different data to be prefetched. So it is necessary to connect prefetching to
routing.

I solved this by introducing simple Controllers. If you have ever worked with 
some typical server-side MVC frameworks, it will feel familiar. 

	var controller = new Controller({
	
		page: function (page) {
			this.view = 'page';
			this.data = {
				page: page,
				title: page.capitalize(),
				content: loremIpsum({
					count: 2,
					units: 'paragraphs',
					paragraphLowerBound: 3,
					format: 'html'
				})
			};
			this.done();
		}
	});
 
This definition is eventually converted into route for url `/page/:page`. You 
select a view (which is an alias for React component) and prepare data which 
will be passed to the view. This can be completely asynchronous. When you are
finished, just call `this.done()`.

There are probably similar and much more advanced solutions around. It's 
basically just an extra layer over Yahoo's [routr](https://github.com/yahoo/routr)
so it's completely isomorphic. Just make sure to use [fetchr](https://github.com/yahoo/fetchr)
to load any data.

### [React-async](https://github.com/andreypopp/react-async)

React-async allows you to load any kind of component's initial state 
asynchronously directly in the component itself.
So even though `React.renderComponentToString()` is synchronous, 
it behaves sort of asynchronously. Read more about how it works at 
React-async's homepage.

The problem is that this is achieved by using a special Node plugin 
[Fibers](https://github.com/laverdet/node-fibers) which means that this is
basically a _hack_ that may not always work. It would be much better if 
similar approach was supported directly by React itself. But it is not.

One more thing to mention. This application slightly modifies react-async's 
default behaviour. Originally, react-async extracts each component's state as 
they are being rendered and when it's finished, it adds gathered states as 
JSON to the page HTML markup which is then sent to the client. That is 
however not necessary. Because of the Flux architecture, 
most of the state data is moved to Flux Stores. So react-async is used only 
to invoke actions responsible for populating stores and when this is finished, 
initialized stores are _dehydrated_ and sent to client as JSON with the rest 
of the markup.

## Install and setup

Clone this repo and then run:

	npm install
	grunt server
 

