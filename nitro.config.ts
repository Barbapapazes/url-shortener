export default defineNitroConfig({
  srcDir: 'server',
  storage: { db: { driver: 'cloudflare-kv-binding', binding: 'url-shortener' } },
  devStorage: { db: { driver: 'fs', base: '.nitro/data/db' } },
})
