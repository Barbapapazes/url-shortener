export default defineNitroConfig({
  srcDir: 'server',
  $production: {
    storage: { db: { driver: 'cloudflare-kv-binding', binding: 'url-shortener' } },
  },
})
