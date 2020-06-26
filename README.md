# nuxtlwb

> lwb nuxt iteration one

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).

# Useful commands for GCP
There is a Git repository on GCP paid $1 per user e.g. ```git remote add google ssh://<email>@source.developers.google.com:2022/p/<project>/r/lwb-nuxt```
```gcloud init```
## AppEngine
```gcloud app deploy app.yml``` deploys to app engine where you have logged in launching the console, you can't have a Dockerfile in the project location because it interferes with gcloud command, so here I renamed it by postfix X
## Google Run
```gcloud builds submit --tag gcr.io/<project>/lwbnuxt:1.0.0 .``` here you need the Dockerfile
```gcloud run deploy --image=gcr.io/<project>/lwbnuxt:1.0.0 --platform managed --port 3000``` run submitted image in Google Run
