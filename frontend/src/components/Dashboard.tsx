import type { FC } from 'react'
import type { AxiosResponse } from '~/axios'
import { useEffect, useState } from 'react'
import apiService from '@/service/api-service'

const Dashboard: FC = () => {
  const [data, setData] = useState<string>('')

  useEffect(() => {
    apiService
      .getAxiosInstance()
      .get('/')
      .then((response: AxiosResponse) => {
        console.info('Backend root response:', response.data)
        setData(response.data)
      })
      .catch((error: unknown) => {
        console.error('Failed to fetch backend data:', error)
      })
  }, [])

  return (
    <div className="min-vh-45 mh-45 mw-50 ml-4">
      <div className="card">
        <div className="card-header">API Response</div>
        <div className="card-body">
          <pre>{data}</pre>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
