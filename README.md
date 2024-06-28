# redditLight :alien:

redditLight is an application that allows users to view and search posts and comments provided by the [Reddit](https://www.reddit.com) json API. Users can view posts and read comments, but cannot write their own comments/create new posts or upvote or downvote them. 

This application is a project with which I am diving deeper into React and Redux. Its the second result of the Codecademy Full-Stack course. Only the basic structure for the project was given, but not the code or the design itself.

## Features :sparkles:

- Users can use the application on any device (desktop to mobile)
- Users can use the application on any modern browser
- Users can access the application at a URL
- Users see an initial view of the data when first visiting the app
- Users can search the data using terms
- Users can filter the data based on categories that are predefined
- Users are shown a detailed view (modal or new page/route) when they select an item
- Users are delighted with a cohesive design system
- Users are delighted with animations and transitions

## Build with :construction:

This project is build with React in Vite. 

### Redux

This project uses Redux Toolkit together with localstorage.

### react-loading-skeleton

[React Loading Skeleton](https://www.npmjs.com/package/react-loading-skeleton) to display loading animations.

### react-reddit-video

This project uses the [video.js](https://videojs.com) framework together with a (modified) script called [react-reddit-video](https://www.npmjs.com/package/react-reddit-video) written by [scripton](https://www.npmjs.com/~scripton) to play Reddit videos. 

Code of react-reddit-video script is modified so that "RedditVideo" can use "appendContainer" props to insert the videoplayer of video.js into a specified container. 

Also inserted a funktionality into RedditVideo to play videos when they are intersecting the viewport and stop them otherwise. Adjustable with props:
* playWhenIntersecting => true or false
* threshold => Number between 0 and 1 

### Minidenticons

[Minidenticons](https://www.npmjs.com/package/minidenticons/v/2.0.0#minidenticons) are used to create profile pictures for commentators of posts because the Reddit json API does not provide a link with users profilepics.

### react-showdown

[react-showdown](https://www.npmjs.com/package/react-showdown) is used to render markdown of text-posts and comments as React components.

## Infos :information_source:

[My portfolio: hausersebastian.de](www.hausersebastian.de)

## License
Copyright 2024 Sebastian Hauser

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.