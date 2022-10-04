import path from 'path'

export default {
  root: path.resolve(__dirname, 'src'),
  build: {
    outDir: path.resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: path.resolve(__dirname, 'src/index.html'),
        auth: path.resolve(__dirname, 'src/pages/auth/registro.html'),
        admin: path.resolve(__dirname, 'src/pages/admin/admin.html'),
        citas: path.resolve(__dirname, 'src/pages/citas/citas.html')
      }
    }
  }
}