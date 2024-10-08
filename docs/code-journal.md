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

We don't enforce [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/#specification), but the commit message is succinct and informative.

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

The actual change was committed only a minute before the merge. Hope it was a straightforward change... 😉

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

- The repo root _is_ the root directory of the Vite app. I anticipate building more than just a Vite app, so we should move it into a subdirectory to help with separation of concerns.

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

😬 Erm, I'm using TypeScript, which transpiles to JavaScript, and is objectively better.
I trust my submission won't be rejected on these grounds 🤞

> ...
> and React to build out a couple of pages that display data from an API.

Cool. Obviously we're going to need a router. A data fetching library will be useful too. I'm going to run with TanStack's offerings for both, as they're pretty ubiquitous.
