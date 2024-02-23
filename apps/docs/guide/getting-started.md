# Getting Started

From initializing your project to making your first API call with `@postiva/client`, get everything up and running in just a few minutes.

## Play online

Currently, there is no online playground available for `@postiva/client`. To get started, you'll need to set up a project locally.

## Create a new project

1. Initialize a new Node.js project and navigate into your project directory:

    ```bash
    mkdir my-blog-project && cd my-blog-project
    npm init -y
    ```

2. Install `@postiva/client` as a dependency in your project:

    ```bash
    npm install @postiva/client
    ```

3. Create a new JavaScript file to start working with `@postiva/client`, for example `index.js`:

    ```javascript
    // index.js
    const { PostivaClient } = require('@postiva/client');

    // Initialize your Postiva client here
    ```

4. Now, you're ready to use `@postiva/client` to make API calls. Here's a simple example to get you started:

    ```javascript
    const client = new PostivaClient('yourWorkspaceId', 'yourApiKey');

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

5. To run your script and see the API call in action, use the following command:

    ```bash
    node index.js
    ```