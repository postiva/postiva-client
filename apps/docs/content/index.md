---
title: "Documentation - Postiva.app"
description: "Craft and deploy your blog swiftly, seamlessly embedding it into any tech stack with REST API support, making your blogging journey effortless and efficient."
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
```bash [npm]
npm install @postiva/client
```
<!-- prettier-ignore -->
```bash [yarn]
yarn add @postiva/client
```
<!-- prettier-ignore -->
```bash [pnpm]
pnpm add @postiva/client
```
::

Next, initialize the Postiva Client in your application by providing your workspace ID and API key:

::code-group
<!-- prettier-ignore -->
```javascript[libs/postiva.js]
const { createClient } = require('@postiva/client');

export const client = createClient('yourWorkspaceId', 'yourApiKey');
```
```typescript[libs/postiva.ts]
import { createClient } from '@postiva/client'

export const client = createClient('yourWorkspaceId', 'yourApiKey');
```
::

## Usage

Here's a simple example to fetch content using the Postiva Client:

### Fetch the contents

::code-group
<!-- prettier-ignore -->
```javascript[getContents]
async function getContents() {
  try {
    const contents = await client.getContents();
    console.log(contents);
  } catch (error) {
    console.error('Error fetching contents:', error);
  }
}

getContentsWithQuery();
```
<!-- prettier-ignore -->
```javascript[getContentsWithQuery]
import { GetContentsType, ContentStatusEnum } from '@postiva/client'

async function getContentsWithQuery({ query, type=ContentStatusEnum.published, category }: GetContentsType) {
  try {
    const contents = await client.getContents({ query, type, category });
    console.log(contents);
  } catch (error) {
    console.error('Error fetching contents:', error);
  }
}

getContentsWithQuery();
```
<!-- prettier-ignore -->
```javascript[getContentsWithPagination]
import { GetContentsType } from '@postiva/client'

async function getContentsWithPagination({ page, size }: IPaginatinoOptions) {
  try {
    const contents = await client.getContents().pagination({ page, size })
    console.log(contents);
  } catch (error) {
    console.error('Error fetching contents:', error);
  }
}

getContentsWithPagination();
```
::

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

## Contributing

You're welcome to contribute to this module!

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `yarn dev` or `npm run dev`

## License

[MIT License](https://github.com/postiva/postiva-js/blob/main/LICENSE)