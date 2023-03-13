import { CryptoPriceEndpoint } from '@chainlink/external-adapter-framework/adapter'
import { HttpTransport } from '@chainlink/external-adapter-framework/transports'
import {
  buildBatchedRequestBody,
  constructEntry,
  CryptoEndpointTypes,
  inputParameters,
} from '../crypto-utils'
import overrides from '../config/overrides.json'

const httpTransport = new HttpTransport<CryptoEndpointTypes>({
  prepareRequests: (params, config) => {
    return buildBatchedRequestBody(params, config)
  },
  parseResponse: (params, res) => {
    return constructEntry(params, res.data, 'price')
  },
})

export const endpoint = new CryptoPriceEndpoint<CryptoEndpointTypes>({
  name: 'crypto',
  aliases: ['price'],
  transport: httpTransport,
  inputParameters: inputParameters,
  overrides: overrides.coinmarketcap,
})