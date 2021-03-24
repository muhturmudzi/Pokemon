import React, { useState } from 'react'
import classnames from 'classnames'
import { useMutation, useQueryCache } from 'react-query'

import { updateTodo } from 'api/updateTodo'
import { deleteTodo } from 'api/deleteTodo'

import DeleteModal from 'components/DeleteModal'

import ChecklistIcon from 'assets/svg/checklist'
import TrashIcon from 'assets/svg/trash'
import ClockIcon from 'assets/svg/clock'

type Props = {
  taskId: string,
  title: string,
  status: 'completed' | 'uncompleted'
}

const TaskCard: React.FC<Props> = ({ taskId, title, status }) => {
  const cache = useQueryCache()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const [checkTodo, { isLoading }] = useMutation(updateTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos')
    }
  })

  const [removeTodo] = useMutation(deleteTodo, {
    onSuccess: () => {
      cache.invalidateQueries('todos')
    }
  })

  const handleRemoveTodo = (type: 'delete' | 'cancel') => {
    if (type === 'delete') {
      removeTodo(taskId)
      setShowDeleteModal(false)
    }

    if (type === 'cancel') {
      setShowDeleteModal(false)
    }
  }

  const containerClass = classnames('flex justify-center items-center relative rounded shadow-lg p-4 mb-2', {
    'bg-white text-darkPurple': status === 'uncompleted',
    'bg-gray-300 bg-opacity-50': status === 'completed'
  })

  const titleClass = classnames('flex-1 text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal truncate', {
    'line-through': status === 'completed'
  })

  const checkListClass = classnames('w-5 h-5 ml-4', {
    'text-green-400': status === 'completed',
    'text-green-600': status === 'uncompleted'
  })

  return (
    <div className={containerClass}>
      <p className={titleClass}>
        {title}
      </p>

      <div className="flex text-darkPurple">
        <span>
          {isLoading? (
            <ClockIcon />
          ): (
            <ChecklistIcon className={checkListClass} onClick={() => checkTodo(taskId)} />
          )}
        </span>
        <span className="w-5 h-5 ml-4 text-red-600">
          <TrashIcon onClick={() => setShowDeleteModal(true)} />
        </span>
      </div>

      <DeleteModal
        inProp={showDeleteModal}
        taskStatus={status}
        onDelete={() => handleRemoveTodo('delete')}
        onCancel={() => handleRemoveTodo('cancel')}
      />
    </div>
  )
}

export default TaskCard