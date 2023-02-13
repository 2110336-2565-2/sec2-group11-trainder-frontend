# sec2-group11-trainder-frontend
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.
## Package requirement
- use-places-autocomplete

This package is distributed via [npm](https://www.npmjs.com/package/use-places-autocomplete).

Installation
```sh
$ yarn add use-places-autocomplete
```
## Setup APIs

To use this hook, there're two things we need to do:

1. [Enable Google Maps Places API](https://developers.google.com/maps/documentation/javascript/places#enable_apis).
2. [Get an API key](https://developers.google.com/maps/documentation/javascript/get-api-key).
3. You can put your Google Maps API key in a file named .env.local in the root of your project, and set the value of NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to your API key. Here's an example:
```makefile
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<API_KEY>
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

This [use-places-autocomplete](https://github.com/wellyshen/use-places-autocomplete) GitHub repository, which provides more examples and information on how to use the library

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
