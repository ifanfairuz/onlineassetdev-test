import { renderToString, type SSRContext } from 'vue/server-renderer'
import { createApp } from './main'
import type { RouteLocationRaw } from 'vue-router'

export async function render(url: RouteLocationRaw, manifest?: Record<string, string[]>) {
  const { app, router } = createApp()

  try {
    let status = 200
    await router.push(url)
    await router.isReady()

    if (router.currentRoute.value.name?.toString() === 'NotFound') {
      status = 404
    }

    // passing SSR context object which will be available via useSSRContext()
    // @vitejs/plugin-vue injects code into a component's setup() that registers
    // itself on ctx.modules. After the render, ctx.modules would contain all the
    const ctx: SSRContext = {}
    const body = await renderToString(app, ctx)
    const head = manifest ? renderPreloadLinks(ctx.modules, manifest) : ''

    return { body, status, head }
  } catch (e: unknown) {
    if (e instanceof Error) {
      throw e
    }

    throw new Error('Internal Server Error')
  }
}

function renderPreloadLinks(modules: string[], manifest: Record<string, string[]>) {
  let links = ''
  const seen = new Set()
  modules.forEach((id) => {
    const files = manifest[id]
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file)
          const filename = file.split('/').pop() ?? ''
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile)
              seen.add(depFile)
            }
          }
          links += renderPreloadLink(file)
        }
      })
    }
  })
  return links
}

function renderPreloadLink(file: string) {
  if (file.endsWith('.js')) {
    return `<link rel="modulepreload" crossorigin href="${file}">`
  } else if (file.endsWith('.css')) {
    return `<link rel="stylesheet" href="${file}">`
  } else if (file.endsWith('.woff')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  } else if (file.endsWith('.woff2')) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  } else if (file.endsWith('.gif')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`
  } else if (file.endsWith('.jpg') || file.endsWith('.jpeg')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`
  } else if (file.endsWith('.png')) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`
  } else {
    // TODO
    return ''
  }
}
