import type { FC } from 'react'
import type { AxiosResponse } from '~/axios'
import type UserDto from '@/interfaces/UserDto'
import { useEffect, useState } from 'react'
import { Table, Modal, Button } from 'react-bootstrap'
import apiService from '@/service/api-service'

type ModalProps = {
  show: boolean
  onHide: () => void
  user?: UserDto
}

const ModalComponent: FC<ModalProps> = ({ show, onHide, user }) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Row Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>{JSON.stringify(user)}</Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

const Dashboard: FC = () => {
  const [data, setData] = useState<string>('')
  const [selectedUser, setSelectedUser] = useState<UserDto | undefined>(undefined)

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

  const handleClose = () => {
    setSelectedUser(undefined)
  }

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
