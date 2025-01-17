'use client'
import CardDisplayTable, { FormDataEntry } from '@components/mtg-card/card-display/table'
import useApiData from '@utils/backend/use-api-data'
import { ResponseCardInCollection } from '@utils/backend/schemas'
import { useParams } from 'next/navigation'
import ImportCards from '@components/mtg-card/import-cards'

export default function PoolPage() {
  const params = useParams()
  const { poolId } = params

  const api = useApiData({
    initialRequests: [
      { endpoint: `/pool/${poolId}/cards`, id: 'pool', method: 'GET' },
    ],
  })

  return (
    <div>
      <h1>Pool ID: {poolId}</h1>
      <CardDisplayTable
        data={api.data['pool'] as ResponseCardInCollection[] | null}
        type={'Pool'}
        api={api}
        request_on_submit={{
          endpoint: `/pool/${poolId}/cards`,
          id: 'delete-pool',
          method: 'DELETE',
        }}
        transformFormData={(d) => d.map(entry => entry.scryfall_id)}
      />
      <ImportCards
        api={api}
        existing_data_id={'pool'}
        request_on_submit={{
          endpoint: `/pool/${poolId}/cards`,
          id: 'post-pool',
          method: 'POST',
        }}
        text_type={'name'}
        transformRequestData={(d) => d.map(entry => entry.name)}
      />
    </div>
  )
}
