# T3 Clone

## Get Started

1. Make sure you are added into the google cloud project as a contribiter, if you are not added contact me@umernaeem.com.

2. Install the `gcloud` gcp cli tool.

3. Authenticate the cli with your gcp account.

```bash
gcloud auth login
```

4. access the secret content (containing environmnet variables) and save it to a file like `.env`

```bash
# this will print the content on the terminal
gcloud secrets versions access latest --secret=t3clone-production-envvars --project=mental-wellness-lums

# this will save it to `.env` file
gcloud secrets versions access latest --secret=t3clone-production-envvars --project=mental-wellness-lums > .env
```

5. Ensure Node version 22 (v20 should also work fine), and Install the dependencies for `/app` project.

6. Install `pnpm` if you havent

```bash
npm i -g pnpm
```

install packages

```bash
cd app
pnpm i
```

## Tech Stack Guide

- Hono (hono.dev) [to be added later on]
- Drizzle ORM (https://orm.drizzle.team/docs)
- What is OpenAPI standard?
- Know you Web standards
- stoker (https://github.com/w3cj/stoker)

## Directory Structure

- `/app`: Full stack Astro App
- `/infra`: Infrastructure as Code using Pulumi

## Contributuing Guide

### Consistent Formatting

According to this [Article](https://graphite.dev/guides/how-to-resolve-merge-conflicts-in-git#best-practices-for-handling-merge-conflicts) Most of the Merge conflicts arise from inconsistent formatting styles.

For this specific project, `.vscode` and `dprint.json` are setup and the purpose of this is to have consistent formatting across different environment for all contributers. For example, Dprint Formatter settings in this project does not allow semicolons at end of lines for `js/ts` files and add trailing commas. These changes take should take effect `On File Save`. However, if they dont you need to configure Dprint Formatter correctly on your system. For this project, I assume you are using vscode so `.vscode` defaults should work but if you use any other editor you should configure Dprint Formatter with it as well. It is your responsibility to configure your local dev environment correctly work with the formatting Guidelines for this project. See `dprint.json`.

#### Install Dprint formatter

Install using one of the methods below.

Shell (Mac, Linux, WSL):

```bash
curl -fsSL https://dprint.dev/install.sh | sh
```

Windows Installer
Powershell (Windows):

```bash
iwr https://dprint.dev/install.ps1 -useb | iex
```

Scoop (Windows):

```bash
scoop install dprint
```

Homebrew (Mac):

```bash
brew install dprint
```

## Working with Database Guide

### Define Models

Define models in `./src/models/<modename>.ts` and link it in `./src/models/index.ts`

### Push Changes to Database

Push Changes to database by running the command `pnpm db:push`. this will show you the SQL DDL Statements it is going to run and how it is going to affect the schema. **Make Sure to Review Them Thoughly before proceeding as it can contain data-loss statements**

### Database Studio

You can run a database studio by running the command `pnpm db:studio`

<!-- ## Manage Releases

You can Manage Releases/Rollouts in the Google Cloud Deployment Manager for Continuous Deployment. Link to [Pipeline](link to be added) -->
