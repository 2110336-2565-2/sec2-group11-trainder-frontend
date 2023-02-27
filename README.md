# sec2-group11-trainder-frontend
This is a [Next.js](https://nextjs.org/) project. The UI library used is [Tailwind](https://tailwindcss.com/) and [Headless UI](https://headlessui.com/). This repo use [yarn](https://yarnpkg.com/) as the package manager.

## Development

### Environment Setup
After cloning the repos for the first time:

1. Set up the Google Maps API key by [Enable Google Maps Places API](https://developers.google.com/maps/documentation/javascript/places#enable_apis).
2. [Get an API key](https://developers.google.com/maps/documentation/javascript/get-api-key).
3. Create a file name `.env.local`
```makefile
NEXT_PUBLIC_API_URL=<API_URL>
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<GOOGLE_MAPS_API_KEY>
```
4. `yarn install` to install all of the required library

### Running the development server
1. `yarn dev`
2. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

To learn more about the maps library:

- This [use-places-autocomplete](https://github.com/wellyshen/use-places-autocomplete) GitHub repository, which provides more examples and information on how to use the library
