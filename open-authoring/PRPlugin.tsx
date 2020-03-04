import React, { useState } from 'react'
import {
  ActionButton,
  Modal,
  ModalPopup,
  ModalHeader,
  ModalBody,
} from 'tinacms'
import PrIconSvg from '../public/svg/pr-icon.svg'
import { PRModal } from './PRModal'

interface PullRequestButtonOptions {
  baseRepoFullName: string
  forkRepoFullName: string
  accessToken: string
}

export const PRPlugin = (
  baseRepoFullName: string,
  forkRepoFullName: string,
  accessToken: string
) => ({
  __type: 'toolbar:git',
  name: 'create-pr',
  component: () => {
    return (
      <PullRequestButton
        baseRepoFullName={baseRepoFullName}
        forkRepoFullName={forkRepoFullName}
        accessToken={accessToken}
      />
    )
  },
})

function PullRequestButton({
  baseRepoFullName,
  forkRepoFullName,
  accessToken,
}: PullRequestButtonOptions) {
  const [opened, setOpened] = useState(false)
  const close = () => setOpened(false)
  return (
    <>
      <ActionButton onClick={() => setOpened(p => !p)}>
        <PrIconSvg />
        Pull Request
      </ActionButton>
      {opened && (
        <Modal>
          <ModalPopup>
            <ModalHeader close={close}>Pull Request</ModalHeader>
            <ModalBody>
              <PRModal
                baseRepoFullName={baseRepoFullName}
                forkRepoFullName={forkRepoFullName}
                accessToken={accessToken}
              />
            </ModalBody>
          </ModalPopup>
        </Modal>
      )}
    </>
  )
}
