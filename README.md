# redditLight :alien:

redditLight is an application to dive deeper into React and Redux. The application will allow users to view and search posts and comments provided by the [Reddit](https://www.reddit.com) API.

This project is the second result of the Codecademy Full-Stack course. Only the basic structure for the project was given, but not the code or the design itself.

## Future features :sparkles:

- Users can use the application on any device (desktop to mobile)
- Users can use the application on any modern browser
- Users can access your application at a URL
- Users see an initial view of the data when first visiting the app
- Users can search the data using terms
- Users can filter the data based on categories that are predefined
- Users are shown a detailed view (modal or new page/route) when they select an item
- Users are delighted with a cohesive design system
- Users are delighted with animations and transitions

## Build with :construction:

This project is build with React in Vite. 

### Redux

This project uses Redux Toolkit and [React Loading Skeleton](https://www.npmjs.com/package/react-loading-skeleton)

### react-loading-skeleton

### react-reddit-video

This project uses the [video.js](https://videojs.com) framework together with a (modified) script called [react-reddit-video](https://www.npmjs.com/package/react-reddit-video) written by [scripton](https://www.npmjs.com/~scripton) to play Reddit videos. 

Code of react-reddit-video script is modified so that "RedditVideo" can use "appendContainer" props to insert the videoplayer of video.js into a specified container. 

Also inserted a funktionality into RedditVideo to play videos when they are intersecting the viewport and stop them otherwise. Adjustable with props:
* playWhenIntersecting => true or false
* threshold => Number between 0 and 1  

## Infos :information_source:

[My portfolio: hausersebastian.de](www.hausersebastian.de)
