import express, { type Application } from 'express'
import { fileURLToPath } from 'node:url'
import compression from 'compression'
import { join } from 'node:path'
import { readFileSync } from 'node:fs'

export default async function bindFrontend(
  app: Application,
  options: {
    base: string
    ssr: boolean
  },
) {
  const public_path = fileURLToPath(new URL('public', import.meta.url))
  const template = readFileSync(join(public_path, 'index.html'), 'utf-8')
  const manifest = JSON.parse(readFileSync(join(public_path, '.vite/ssr-manifest.json'), 'utf-8'))
  const include = new Function('specifier', 'return import(specifier)')
  const { render } = await include('./ssr/main.server.js')

  app.use(compression())
  app.use(express.static(public_path, { extensions: ['js', 'css', 'ico'], index: false }))
  if (options.ssr) {
    app.use('*all', async (req, res) => {
      const url = req.originalUrl.replace(options.base, '')
      const rendered = await render(url, manifest)
      const html = template
        .replace(`<!--app-head-->`, rendered.head ?? '')
        .replace(`<!--app-html-->`, rendered.html ?? '')

      res.status(rendered.status).set({ 'Content-Type': 'text/html' }).send(html)
    })
  } else {
    app.use('*all', async (req, res) => {
      res.status(200).set({ 'Content-Type': 'text/html' }).send(template)
    })
  }
}
