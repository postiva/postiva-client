---
title: "Documentation"
description: "description"
layout: "default"
aside: false
---

# Documentation

Explore the capabilities of @postiva/client for seamless content management within your application.

---

::list
  - Quick setup to integrate `@postiva/client`
  - Fetch content effortlessly
  - Implement result pagination for effective data handling
  - Utilize secure API key for authentication
::

[Check Release Notes](https://github.com/postiva/client/blob/main/CHANGELOG.md)

## What is Postiva Client?

Postiva Client is a robust library designed for developers to easily manage and fetch content within their applications. It provides a straightforward API to interact with the Postiva platform, ensuring your content is always up-to-date and accessible.

## Setup

To start using `@postiva/client` in your project, follow these steps:

::code-group
<!-- prettier-ignore -->
```bash [Npm]
npm install @postiva/js
```
<!-- prettier-ignore -->
```bash [Yarn]
yarn add @postiva/js
```
<!-- prettier-ignore -->
```bash [Pnpm]
pnpm add @postiva/js
```
::

Next, initialize the Postiva Client in your application by providing your workspace ID and API key:

<!-- prettier-ignore -->
```javascript[libs/postiva.ts]
const { PostivaClient } = require('@postiva/client');

const client = new PostivaClient('yourWorkspaceId', 'yourApiKey');
```

## Usage

Here's a simple example to fetch content using the Postiva Client:

### Fetch the contents

<!-- prettier-ignore -->
```javascript[pages/index.tsx]
async function fetchContents() {
  try {
    const contents = await client.getContents();
    console.log(contents);
  } catch (error) {
    console.error('Error fetching contents:', error);
  }
}

fetchContents();
```

### Fetch the content detail

<!-- prettier-ignore -->
```javascript[pages/index.tsx]
async function getContentById(contentId) {
  try {
    const contents = await client.getContentById(contentId);
    console.log(contents);
  } catch (error) {
    console.error('Error fetching content:', error);
  }
}

fetchContentById("<contentId>");
```

## Advanced Features

Postiva Client also supports advanced features such as:

- Content pagination for managing large datasets
- Secure authentication using API keys
- Custom queries to fetch content based on specific criteria

Refer to the Postiva [Postiva Client API documentation](https://github.com/postiva/client/blob/main/CHANGELOG.md) for more details on these features.

## Contributing

Contributions to the Postiva Client are welcome! If you have ideas for improvements or have found a bug, please open an issue or submit a pull request on our [GitHub repository](https://github.com/postiva/client) .

### Properties

#### workspaceId

- Type: `workspaceId`
- `required`

Your unique workspace identifier provided by Postiva.

<!-- prettier-ignore -->
```typescript[libs/postiva.ts]
const client = new PostivaClient('yourWorkspaceId');
```

#### apiKey

- Type: `string`
- Default: `false`

A secure key used for API authentication.

<!-- prettier-ignore -->
```typescript[libs/postiva.ts]
const client = new PostivaClient('yourWorkspaceId', 'apiKey');
```

## Contributing

You're welcome to contribute to this module!

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `yarn dev` or `npm run dev`

## License

[MIT License](https://github.com/postiva/postiva-js/blob/main/LICENSE)