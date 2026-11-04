import { createServer } from 'vite'

const server = await createServer({
  server: { middlewareMode: true, hmr: false },
  appType: 'custom',
})
try {
  const { checkPages } = await server.ssrLoadModule('/tests/render-pages.tsx')
  await checkPages()
} finally {
  await server.close()
}
