# VEHICLE SEARCH TEST

## Setup

Make sure to install dependencies:

```bash
# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash

# yarn
yarn preview

# bun
bun run preview
```

## QUERY PARAMETERS

page: number
results_per_page: number
advert_classification: New | Used | All (default)

--------------

data structure of api call
{
  data: [array of vehicle data],
  meta: {
    "current_page": number,
    "last_page": number,
    "per_page": number,
    "total": number,
    "all_total": number,
    "total_new_vehicles": number,
    "total_used_vehicles": number,
    "offer_vehicles": number
  }
}