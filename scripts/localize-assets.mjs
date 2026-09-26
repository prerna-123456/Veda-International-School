import { mkdir, writeFile } from 'node:fs/promises'
import { A } from '../src/assets.js'

const dir = new URL('../public/figma/', import.meta.url)
await mkdir(dir, { recursive: true })
const local = {}
for (const [name, url] of Object.entries(A)) {
  const ext = url.match(/\.(png|jpe?g|webp|svg)(?:$|\?)/i)?.[1] || 'png'
  const res = await fetch(url)
  if (!res.ok) throw new Error(`${name}: ${res.status} ${res.statusText}`)
  const file = `${name}.${ext}`
  await writeFile(new URL(file, dir), Buffer.from(await res.arrayBuffer()))
  local[name] = `/figma/${file}`
  console.log(`Saved ${file}`)
}
const js = `export const A = ${JSON.stringify(local, null, 2)}\n`
await writeFile(new URL('../src/assets.js', import.meta.url), js)
console.log('All Figma assets are now local and src/assets.js has been updated.')
