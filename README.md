# db message display

There's a separate server that runs a self-bot discord client,
that parses user messages from my discord server - uploads them to supabase.
This repo is handling the presentational side of that project - displaying them for a particular user, though it would work just fine for any other user. User avatar is hardcoded so that'd needed to be changed if I were to support multiple.

Nuxt3 + Tailwind + Prisma + Supabase

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

.env expects the following keys

```
<!-- for supabase setup -->
SUPABASE_URL
SUPABASE_KEY
DATABASE_URL

<!-- for seo/meta -->
NUXT_PUBLIC_TITLE
NUXT_PUBLIC_DESCRIPTION
NUXT_PUBLIC_OG_IMAGE
```

You might need to do this if `yarn prisma db pull` & `yarn prisma generate` doesn't work
https://github.com/prisma/prisma/issues/4752#issuecomment-812569741

## Setup

Make sure to install the dependencies:

```bash
yarn install
```

Start the development server on http://localhost:3000

```bash
yarn dev
```

## Production

Build the application for production:

```bash
yarn build
```

Locally preview production build:

```bash
yarn preview
```

Nuxt deployment documentation

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

TODO:

- [x] Pagination
- [ ] SSG/Server Side Rendering
- [ ] Pulling images from our own database
- [x] Message filtering
- [ ] Sorting
