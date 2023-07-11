import fs from 'node:fs/promises'
import path from 'node:path'

async function readFiles (directory, extensions = []) {
  const files = await fs.readdir(directory)

  for (const file of files) {
    const pathFile = path.join(directory, file)

    if ((await fs.stat(pathFile)).isFile()) {
      const extension = path.extname(pathFile)
      extensions.push(extension)
    }

    if ((await fs.stat(pathFile)).isDirectory()) {
      await readFiles(pathFile, extensions)
    }
  }
}

async function getExtensions (directory) {
  const extensions = []
  await readFiles(directory, extensions)

  const resultado = extensions.reduce((objeto, extension) => {
    const extensionExist = Object.prototype.hasOwnProperty.call(objeto, extension)
    if (extensionExist) {
      objeto[extension].quantity++
    } else {
      objeto[extension] = {
        extension,
        quantity: 1
      }
    }
    return objeto
  }, {})

  return Object.values(resultado)
}

export const extensions = await getExtensions(process.cwd())
