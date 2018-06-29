# Siphonr

Siphonr is small API for gathering and processing data from Twitter. It utilizes express, passportjs, and the twitter library.

## Stack

StoryTool is built with Node, Express, React (Router), and MongoDB.

## Installation

```bash
npm install && cd client && npm install
```

Add a .env file with the following, substituting (...) with your relevant information.

```text
TWITTER_CONSUMER_KEY="..."
TWITTER_CONSUMER_SECRET="..."
TWITTER_ACCESS_TOKEN_KEY="..."
TWITTER_ACCESS_TOKEN_SECRET="..."
TWITTER_CALLBACK_URL="http://localhost:3000/twitter/callback"
JWT_SECRET="..."
EXPRESS_SESSION_SECRET="..."
PORT=3001
```

## Usage

### Development

Run `npm start` to start the server in development mode. This will start the express server as well as the client, opening it in your default browser.

Files in the server directory are watched for changes, and changes to the client are auto reloaded in most cases.

### Building

To build client files either run `npm run build-client` or from the parent directory, **OR** first `cd client` then `npm run build`. This will delete the current `dist` directory if one exists and create a new one with the necessary bundled files (currently `bundle.js`, `index.html`, and `favicon.ico`).

### Serving

The built client must be served through express-- To do that, run `npm run serve` in the main directory.

### Deployment

This project is _currently_ set up to be deployed on heroku.

## API Reference

Coming Soon

## License

Licensed under GNU General Public License
