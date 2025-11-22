import type { Application } from 'express'
import { readFileSync } from 'fs'
import { createServer, ViteDevServer } from 'vite'

export default async function bindFrontend(
  app: Application,
  options: {
    base: string
    ssr: boolean
  },
) {
  console.log('Configuring Frontend for development')

  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base: options.base,
  })

  app.use(vite.middlewares)
  if (options.ssr) {
    app.use('*all', async (req, res, next) => {
      const url = req.originalUrl.replace(options.base, '')
      try {
        const { render } = await vite.ssrLoadModule('./src/frontend/main.server.ts')
        const { status, html } = await renderHtml(vite, url, render)

        res.status(status).set({ 'Content-Type': 'text/html' }).send(html)
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
      const url = req.originalUrl.replace(options.base, '')
      const { status, html } = await renderHtml(vite, url)
      res.status(status).set({ 'Content-Type': 'text/html' }).send(html)
    })
  }
}

async function renderHtml(
  vite: ViteDevServer,
  url: string,
  render?: (url: string) => Promise<{ body: string; head: string; status: number }>,
) {
  const template = await readFileSync('./index.html', 'utf-8')
  const index = await vite.transformIndexHtml(url, template)

  let html = index
  let status = 200
  if (render) {
    const rendered = await render(url)
    status = rendered.status
    html = html
      .replace(`<!--app-head-->`, rendered.head ?? '')
      .replace(`<!--app-body-->`, rendered.body ?? '')
  } else {
    html = html.replace(`<!--app-head-->`, '').replace(`<!--app-html-->`, '')
  }

  return { html, status }
}
