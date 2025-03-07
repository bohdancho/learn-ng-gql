import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: 'http://localhost:5245/graphql',
  documents: ['src/**/*.{ts,graphql}'],
  generates: {
    './src/__generated__/': {
      preset: 'client',

      presetConfig: {
        gqlTagName: 'gql',
      },
      config: {
        skipTypename: true,
        useTypeImports: true,
      },
    },
  },
}

export default config
