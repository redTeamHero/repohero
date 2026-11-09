# RepoHero

A GitHub repository learning app for beginners and experienced programmers.

## Features
- Public GitHub repository import, pinned to a commit.
- Source explorer with original line numbers and links.
- Five learning stages and adjustable starting level.
- Browser-local, self-reported progress.
- OpenAI Responses API tutor grounded in sampled source excerpts.
- Offline built-in example for exploring the interface.

## Build and test
Node.js 22 or later. No package installation needed.

```
node --test
node build.mjs
```

`dist/server/index.js` is a Cloudflare Worker ES module. It embeds the HTML UI.

## Runtime environment
Set `OPENAI_API_KEY` securely in the hosting environment, never in source or the browser.
Optional `OPENAI_MODEL` defaults to `gpt-4.1-mini`.
The key must have permission and API billing for the configured model.
Without a key, imports, practice prompts, source browsing and progress work;
generated lessons and question answering report that setup is pending.

## Limits
Public repositories only. GitHub's unauthenticated rate limits apply.
Loads at most 16 relevant source files, each at most 45 KB and excerpted to
16,000 characters. The AI context is bounded to 125,000 characters.
This is a starter learning app: it does not execute untrusted code, grade exercises,
index entire repositories, or sync progress across devices. Follow-up questions
are independent requests rather than persistent multi-turn conversations.
Before public launch add authentication, per-user quotas, and abuse controls
to protect your OpenAI API budget.

## Run locally

Install Node.js 22 or later, then:

```sh
git clone https://github.com/redTeamHero/repohero.git
cd repohero
node --test
node build.mjs
npx wrangler dev
```

Open the local URL Wrangler prints. To enable the tutor locally, create an
ignored `.dev.vars` file containing `OPENAI_API_KEY=your-key`. Never commit it.
Without a key, you can still import repositories, browse source, use the
built-in example, follow practice prompts, and track progress.

## Deploy to your Cloudflare account

```sh
npx wrangler login
npx wrangler secret put OPENAI_API_KEY
npx wrangler deploy
```

Wrangler will ask for the secret securely. A GitHub repository stores the source;
it does not run this server. GitHub Pages alone cannot host the OpenAI tutor.
