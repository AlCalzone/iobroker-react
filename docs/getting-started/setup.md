# Setup

Using React libraries is a bit tricky, so some rules must be followed when using this:

1. All frontend libraries must be `devDependencies` of the application.  
   Use a bundler like [`esbuild`](https://esbuild.github.io/), or (if you like to wait a lot) [`parcel`](https://parceljs.org/) or [`webpack`](https://webpack.js.org/). If you're using [`@iobroker/adapter-dev`](https://github.com/ioBroker/adapter-dev/) in your project, you're already set up.

1. **Do not** install `@iobroker/adapter-react` as a dependency of your project.  
   If you need to import a component from that library, change your imports from `"@iobroker/adapter-react/Components/...` to `"iobroker-react/adapter-react/Components/...`.  
   This makes sure that there is only one copy installed which is compatible with this library.

1. **Do not** install `@iobroker/socket-client` as a dependency of your project.  
   If you need to use the library, import from `"iobroker-react/socket-client"` instead. This makes sure that a single connection is used throughout the entire application.

1. Install the required versions of `react` and `@material-ui/core` as `devDependencies` in your project. Check out the `peerDependencies` section in [`package.json`](https://github.com/AlCalzone/iobroker-react/blob/master/package.json) to see which versions are required. Make sure that you're using a `react-dom` version that's compatible with the `react` version in use.
