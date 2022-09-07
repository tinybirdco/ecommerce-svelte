import jsonURL from 'json-url'

const codec = jsonURL('lzma')

export const decompressLZMA = async function (lzma) {
  return await codec
    .decompress(lzma)
    .then(res => res)
    .catch(e => ({
      error: e.toString()
    }))
}

export const compressJSON = async function (json) {
  return await codec
    .compress(json)
    .then(hash => hash)
    .catch(e => ({ error: e.toString() }))
}