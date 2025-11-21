import type { Application } from 'express'
import { readFileSync } from 'fs'
import { createServer } from 'vite'

export default async function bindFrontend(
  app: Application,
  options: {
    base: string
    ssr: boolean
  },
) {
  console.log('Configuring Frontend for development')

  const template = await readFileSync('./index.html', 'utf-8')
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base: options.base,
  })
  const { render } = await vite.ssrLoadModule('./src/frontend/main.server.ts')

  app.use(vite.middlewares)
  if (options.ssr) {
    app.use('*all', async (req, res, next) => {
      const url = req.originalUrl.replace(options.base, '')
      try {
        const index = await vite.transformIndexHtml(url, template)
        const rendered = await render(url)
        const html = index
          .replace(`<!--app-head-->`, rendered.head ?? '')
          .replace(`<!--app-html-->`, rendered.html ?? '')

        res.status(rendered.status).set({ 'Content-Type': 'text/html' }).send(html)
      } catch (e: unknown) {
        if (e instanceof Error) {
          vite.ssrFixStacktrace(e)
          return next(e)
        }

        next(new Error('Internal Server Error', { cause: e }))
      }
    })
  } else {
    app.use('*all', async (req, res) => {
      res.status(200).set({ 'Content-Type': 'text/html' }).send(template)
    })
  }
}
