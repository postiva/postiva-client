# @postiva/client

[![npm version](https://badge.fury.io/js/%40postiva%2Fclient.svg)](https://badge.fury.io/js/%40postiva%2Fclient)
[![GitHub license](https://img.shields.io/github/license/postiva/client)](https://github.com/postiva/client/blob/main/LICENSE)

## Introduction

Welcome to `@postiva/client` – a robust library designed for developers to easily manage and fetch content within their applications. This library provides a straightforward API to interact with the Postiva platform, ensuring your content is always up-to-date and accessible.

## Features

- **Effortless Content Management**: Seamlessly fetch and manage content within your application.
- **Pagination Support**: Handle large datasets effectively with built-in pagination support.
- **Secure Authentication**: Utilize secure API keys for authentication to ensure data integrity.
- **Custom Queries**: Fetch content based on specific criteria using custom queries.
- **REST API Support**: Integrate your blog seamlessly into any tech stack with REST API support.

## Installation

You can install `@postiva/client` via npm, yarn, or pnpm:

```bash
npm install @postiva/client
```

## Usage

To start using `@postiva/client` in your project, initialize the client by providing your workspace ID and API key:

```js
const { createClient } = require('@postiva/client');

// Initialize Postiva Client
const client = createClient('yourWorkspaceId', 'yourApiKey');
```

For detailed usage examples and API documentation, refer to the [documentation](https://docs.postiva.app/)

## Contributing

Contributions to `@postiva/client` are welcome! If you have ideas for improvements, found a bug, or want to contribute new features, please check out our contribution guidelines and code of conduct before opening an issue or submitting a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Support
For support or inquiries, please contact us at help@postiva.app.