export default defineNitroConfig({
  srcDir: 'server',
  storage: { data: { driver: 'cloudflare-kv-binding', binding: 'url-shortener' } },
  devStorage: { data: { driver: 'fs', base: './data/kv' } },
})
