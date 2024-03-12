export default defineNitroConfig({
  srcDir: 'server',
  $production: {
    storage: { data: { driver: 'cloudflare-kv-binding', binding: 'url-shortener' } },
  },
})
