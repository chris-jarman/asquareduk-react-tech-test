---
marp: true
theme: default
class: invert
paginate: true
---

<!-- _footer: Chris Jarman 2024 -->>
<!-- _paginate: false -->

# Code journal

A stream-of-consciouness slide deck

---

## Getting started

OK, so we've forked `https://github.com/asquareduk/react-tech-test.git`
and cloned it to our local machine. Let's see what we're working with:

```bash
$ git log --oneline
```

> ```
> 72c563b (HEAD -> main, origin/main, origin/HEAD) Merge pull request #3 from asquareduk/fix/punk-api
> 678b7e7 Replaced depreciated punk api
> c382784 Init commit
> ```

Pretty short history 😁

---

## What have we learned already?

> `HEAD -> main`

The default branch is called `main`.

> Merge pull request #3

We create merge commits when merging PRs.

> from `asquareduk/fix/punk-api`

Our branch name format is `orgname/type/name`.

> 678b7e7 Replaced depreciated punk api

We don't enforce [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#specification),
but the commit message is succinct and informative. Nice.

---

## Digging a bit deeper

```bash
$ git show HEAD
```

> ```
> commit 72c563b79987b6f224bf0a2f5b5642f429d9994a (HEAD -> main, origin/main, origin/HEAD)
> Merge: c382784 678b7e7
> Author: Nick <nick@asquared.uk>
> Date:   Thu Oct 3 06:52:21 2024 +0100
>
>     Merge pull request #3 from asquareduk/fix/punk-api
>
>     Replaced depreciated punk api>
> ```

Nick merged his PR to main on Thursday morning 🤜

---

Let's see what he changed:

```bash
$ git show --unified=0 HEAD^-1
```

> ```
> commit 678b7e7b87828cb467ba9f2276e67ef5231e4109
> Author: Nick Kuh <nick@asquared.uk>
> Date:   Thu Oct 3 06:51:40 2024 +0100
> ```
>
> ...

The actual change was committed only a minute before the merge.

Hope it was a straightforward change... 😉

---

> ...
>
> ```
> -The API we will use for this (because it's free and doesn't require any authentication) is [Punk API](https://punkapi.com/documentation/v2).
> +The API we will use for this (because it's free and doesn't require any authentication) is [TheCocktailDB API](https://www.thecocktaildb.com/api.php).
> ```

Ah, it's just an update to the README to ensure the brief is still valid 👌

Let's crack on...

---

## Initial setup

No Node.js version specified. Let's ensure we're using the latest LTS:

```bash
$ nvm install --lts
```

Phew, that's better. Right, what does it say to do next?

```bash
$ npm install
$ npm run dev
```

Cool, it's alive. It's the standard Vite JavaScript/React starter app.

---

## Some observations

- An `.nvmrc` file would be nice, to help manage the Node.js runtime version;

- `npm` is slow; with the advent of `corepack` we should probably use `pnpm`;

- JavaScript is error-prone; let's swap it out for TypeScript;

- The repo root _is_ the root directory of the Vite app. I anticipate building
  more than just a Vite app, so we should move it into a subdirectory to help
  with separation of concerns.

---

## Checkpoint 1

- [x] Generate `.nvmrc`
- [x] Use `pnpm`
- [x] Use TypeScript
- [x] Move Vite app to subdirectory

---

## Let's revisit the brief

> This challenge will require you to use Javascript
> ...

😬 Erm, I'm using TypeScript, which transpiles to JavaScript, and is, IMNSHO,
objectively better. I trust my submission won't be rejected on these grounds 🤞

> ...
> and React to build out a couple of pages that display data from an API.

Cool. Obviously we're going to need a router. A data fetching library will be
useful too. I'm going to run with TanStack's offerings for both, as they're
pretty ubiquitous and thoroughly battle-tested.

---

> The API we will use for this (because it's free and doesn't require any authentication) is [TheCocktailDB API](https://www.thecocktaildb.com/api.php).

Oh yeah, an API is already provided for us. This is too easy.

I'd like to demonstrate some full-stack ability, so at the very least I'm going
to proxy this API with a backend of my own...

---

## Backend tech choices

Ah, frameworks.

- Vanilla Node.js? 🍦
  A bit of a pain, and not how we do things in the real world.
- Express? 🐢
  Old, slow, lame.
- Koa? 🤓
  My personal favourite, but I'm not sure the ASquared team have used it before.
- Fastify? 😎
  My second pick after Koa. It's every so slightly faster, but I still prefer
  Koa's super-elegant middleware system.
- ...?

---

- NestJS? ✅
  I know from hearsay that ASquared have used it successfully in the past.
  I dislike worshipping at the altar of OOP, but it's easy to understand.
  Although it's built on Express, we can use the Fastify adapter to speed it up.

---

## Checkpoint B

- [x] Scaffold NestJS backend
- [x] Set up proper dev script

---

## Checkpoint baz

- [x] TDD a crude controller to support `GET /drinks/` and `GET /drinks/:slug`
- [x] Wire up the webapp's home page to request all drinks

OK, so we've validated our approach... to a point...

---

## Snags

The backend just returns minimal hard-coded data at the moment. My first thought
was to proxy TheCocktailDB's API, but that's lame for a number of reasons:

- Their API doesn't actually expose the functionality we want (list _all_ drinks).
  We could work around this via multiple 'creative' calls to various endpoints,
  but that's doing far too much work for a simple task;

- The brief asks us to display data on the list page that is only returned by
  the their "Lookup full cocktails by ID" endpoint. We'd end up iterating over
  our result set and making an API call for each item. This is pretty lame.
  We'd end up with a waterfall of requests, whether we do it on the front end
  or the backend. Plus their API is pretty harshly rate-limited (and yes,
  I discovered this the hard way).

---

## Solution

We're going to scrape the data from TheCocktailDB's API, and store it in our own
database. I'm a big fan of PostgreSQL - it's ACID-compliant, has an excellent
feature set for crafting rich queries, has lovely JSONB support if you just want to
use it as a document store when all that 3NF relational malarkey is overkill,
and it's plenty fast enough.
