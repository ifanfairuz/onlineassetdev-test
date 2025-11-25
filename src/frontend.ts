import express, { type Application } from 'express'
import { fileURLToPath } from 'node:url'
import compression from 'compression'
import { join } from 'node:path'
import { readFileSync } from 'node:fs'

const include = new Function('specifier', 'return import(specifier)')
const base_path = fileURLToPath(new URL(import.meta.url))
const public_path = join(base_path, 'public')

export default async function bindFrontend(
  app: Application,
  options: {
    base: string
    ssr: boolean
  },
) {
  const template = readFileSync(join(public_path, 'index.html'), 'utf-8')
  const manifest = JSON.parse(readFileSync(join(public_path, '.vite/ssr-manifest.json'), 'utf-8'))
  const { render } = await include(join(base_path, 'ssr/main.server.js'))

  app.use(compression())
  app.use(express.static(public_path, { extensions: ['js', 'css', 'ico'], index: false }))

  if (options.ssr) {
    app.use('*all', async (req, res, next) => {
      try {
        const url = req.originalUrl.replace(options.base, '')
        const rendered = await render(url, manifest)
        const html = template
          .replace(`<!--app-head-->`, rendered.head ?? '')
          .replace(`<!--app-body-->`, rendered.body ?? '')

        res.status(rendered.status).set({ 'Content-Type': 'text/html' }).send(html)
      } catch (e: unknown) {
        if (e instanceof Error) {
          return next(e)
        }

        next(new Error('Internal Server Error', { cause: e }))
      }
    })
  } else {
    app.use('*all', async (req, res) => {
      const html = template.replace(`<!--app-head-->`, '').replace(`<!--app-html-->`, '')
      res.status(200).set({ 'Content-Type': 'text/html' }).send(html)
    })
  }
}
