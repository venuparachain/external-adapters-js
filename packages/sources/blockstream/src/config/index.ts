import { Requester } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/ea-bootstrap'

export const NAME = 'BLOCKSTREAM'

export const DEFAULT_ENDPOINT = 'difficulty'
export const DEFAULT_API_ENDPOINT = 'https://blockstream.info/api'

export const makeConfig = (prefix?: string): Config => {
  const config = Requester.getDefaultConfig(prefix)
  config.api = {
    ...config.api,
    baseURL: config.api.baseURL || DEFAULT_API_ENDPOINT,
  }
  config.defaultEndpoint = DEFAULT_ENDPOINT
  return config
}
