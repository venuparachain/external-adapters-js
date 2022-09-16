import { Requester, Validator } from '@chainlink/ea-bootstrap'
import { Config, ExecuteWithConfig, InputParameters } from '@chainlink/ea-bootstrap'

export const supportedEndpoints = ['executejs']

export const description =
  'Query the global market cap from [Coingecko](https://api.coingecko.com/api/v3/global)'

export type TInputParameters = { payload: string; query: string; requester: string }
export const inputParameters: InputParameters<TInputParameters> = {
  payload: {
    description: 'Source code',
    required: true,
    type: 'string',
  },
  query: {
    description: 'HTTP query',
    required: false,
    type: 'string',
  },
  requester: {
    description: 'Sender address',
    required: false,
    type: 'string',
  },
}

export interface ResponseSchema {
  data: {
    active_cryptocurrencies: number
    upcoming_icos: number
    ongoing_icos: number
    ended_icos: number
    markets: number
    total_market_cap: Record<string, number>
    total_volume: Record<string, number>
    market_cap_percentage: Record<string, number>
    market_cap_change_percentage_24h_usd: number
    updated_at: number
  }
}
export interface AgeResponse {
  name: string
  age: number
  count: number
}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParameters)

  const jobRunID = validator.validated.id
  const payload = validator.validated.data.payload
  const execResult = Number(payload) + 1

  /*
  const url = validator.validated.data.query
  const options = {
    ...config.api,
    url,
  }
  const response = await Requester.request<AgeResponse>(options)
  const jsonData = JSON.stringify(response.data)
  console.log('json data: ' + jsonData)

  const source = payload + ` run(['` + jsonData + `']);`
  console.log('full code: ' + source)

  const requester = validator.validated.data.requester
  const allowed = '0xca5487225e0d8400ec5977b3bdc045982a22c13e'
  if (requester == allowed) {
    //const {VM} = require('vm2'); const vm = new VM({}); execResult = vm.run(source);
    execResult = source.length
  }*/

  const res = {
    jobRunID,
    result: execResult,
    statusCode: 200,
    data: {
      result: execResult,
    },
  }

  return Requester.success(jobRunID, res, config.verbose)
}
