export default defineEventHandler(async () => {
  return html`<!DOCTYPE html>
    <html
      lang="en"
      class="height-full"
      data-color-mode="auto"
      data-light-theme="light"
      data-dark-theme="dark"
    >
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Welcome to Octotask</title>
        <link rel="icon" href="/octotask-head.png" />
        <link rel="stylesheet" href="/primer.css" />
      </head>
      <body class="height-full bg-gray-light">
        <div
          class="d-flex flex-column flex-justify-center flex-items-center text-center height-full"
        >
          <img src="/robot.svg" alt="Octotask Logo" width="150" class="mb-6" />
          <h1>Welcome to your Octotask App</h1>

          <div class="mt-4">
            <div class="d-flex flex-justify-center mt-2">
              <a
                href="https://octotask.github.io/docs/"
                class="btn btn-outline mr-2"
                >Documentation</a
              >
              <a
                href="https://github.com/octotask/octotask/discussions"
                class="btn btn-outline"
                >Discuss on GitHub</a
              >
            </div>
          </div>
        </div>
      </body>
    </html>`
})
