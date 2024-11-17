export default function (plop) {
  const transformName = (str) => {
    return str.toLowerCase().replace(/ /g, '-')
  }

  // create your generators here
  plop.setGenerator('example', {
    description: 'new example in repo',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Example name: ',
      },
      {
        type: 'list',
        name: 'exampleScopeFolder',
        message: 'Scope (Example folder): ',
        choices: [{ name: 'Examples', value: 'examples' }],
      },
    ],
    actions: (data) => {
      const plopExampleName = transformName(data.name)
      const plopPath = `${data.exampleScopeFolder}/${plopExampleName}`

      const filesToAlwaysCopyOver = [
        'README.md',
        'test.js',
        '.gitignore',
        'package.json',
        'src/http/post-api-github-webhooks/app.js',
        'src/http/post-api-github-webhooks/index.js',
        'src/http/post-api-github-webhooks/package.json',
        'app.yml',
        'app.arc',
        'public/index.html',
        'public/index.js',
      ]
      const actions = []

      // Copy over basic files
      filesToAlwaysCopyOver.forEach((file) => {
        actions.push({
          type: 'add',
          path: `{{exampleScopeFolder}}/${plopExampleName}/${file}`,
          templateFile: `plop-templates/example/${file}`,
        })
      })

      // modify app/layout.tsx
      actions.push({
        type: 'modify',
        path: `{{exampleScopeFolder}}/${plopExampleName}/app/layout.tsx`,
        pattern: /(-- PLOP PATH HERE --)/gi,
        template: `${plopPath}`,
      })
      actions.push({
        type: 'modify',
        path: `{{exampleScopeFolder}}/${plopExampleName}/app/layout.tsx`,
        pattern: /(-- PLOP TITLE HERE --)/gi,
        template: `${data.name}`,
      })

      return [
        ...actions,
        // README.md
        {
          type: 'modify',
          path: `{{exampleScopeFolder}}/${plopExampleName}/README.md`,
          pattern: /(-- PLOP TITLE HERE --)/gi,
          template: `${data.name}`,
        },
        {
          type: 'modify',
          path: `{{exampleScopeFolder}}/${plopExampleName}/README.md`,
          pattern: /(-- PLOP EXAMPLE NAME HERE --)/gi,
          template: `${plopExampleName}`,
        },
        {
          type: 'modify',
          path: `{{exampleScopeFolder}}/${plopExampleName}/README.md`,
          pattern: /(-- PLOP PATH HERE --)/gi,
          template: `${plopPath}`,
        },
        // package.json
        {
          type: 'modify',
          path: `{{exampleScopeFolder}}/${plopExampleName}/package.json`,
          pattern: /(-- PLOP EXAMPLE NAME HERE --)/gi,
          template: `${plopExampleName}`,
        },
        {
          type: 'modify',
          path: `{{exampleScopeFolder}}/${plopExampleName}/app/page.tsx`,
          pattern: /(-- PLOP TITLE HERE --)/gi,
          template: `${data.name}`,
        },
      ]
    },
  })
}
