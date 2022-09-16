import { Requester } from '@chainlink/ea-bootstrap'
import { Config } from '@chainlink/ea-bootstrap'

export const NAME = 'UNIVERSAL'

export const DEFAULT_ENDPOINT = 'executejs'

export const makeConfig = (prefix?: string): Config => {
  const config = Requester.getDefaultConfig(prefix)
  config.defaultEndpoint = DEFAULT_ENDPOINT
  return config
}
