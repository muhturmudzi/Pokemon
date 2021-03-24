import React, { useState } from 'react'
import classnames from 'classnames'

import DeleteModalMyPokemon from 'components/DeleteModalMyPokemon'

import InfoIcon from 'assets/svg/information'
import TrashIcon from 'assets/svg/trash'

type Props = {
  name: string,
  nickname: string,
  id: number,
  isDelete: boolean,
  callBack: (id: number, nickname: string) => void
}

type newData = {
  id: number
  name: string
  nickname: string,
  isDelete: boolean
}

const TaskCard: React.FC<Props> = ({ name, nickname, id, callBack, isDelete }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const handleRemoveTodo = (type: 'delete' | 'cancel') => {
    if (type === 'delete') {
      const hasil = localStorage.getItem('MyPokemons')
      let arr: newData[] = hasil? JSON.parse(hasil) : []
      arr.forEach((item) => {
        if (item.nickname === nickname) {
          item.isDelete = true
        }
      })
      localStorage.setItem('MyPokemons', JSON.stringify(arr))
      setShowDeleteModal(false)
      // masih bugs setelah delete tidak panggil array lg
    }

    if (type === 'cancel') {
      setShowDeleteModal(false)
    }
  }

  const capitalize = (item: string) => {
    return item.charAt(0).toUpperCase() + item.slice(1)
  }

  const linkImage = (id: number) => {
    if (id) {
      return `https://pokeres.bastionbot.org/images/pokemon/${id}.png`
    }
  }

  const containerClass = classnames('flex justify-center items-center relative rounded shadow-lg p-3 mb-2', {
    'bg-white': isDelete === false,
    'bg-gray-300 bg-opacity-10': isDelete === true
  })

  const nameClass = classnames('flex-1 text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal truncate text-darkPurple', {
    'line-through': isDelete === true
  })

  const nickClass = classnames('flex-1 text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal truncate text-green-600', {
    'line-through': isDelete === true
  })
  return (
    <div className={containerClass}>
      <img className="w-10 h-10 rounded-full mr-4" src={linkImage(id)} alt="Pokemon"></img>
      <p className={nameClass}>
        {capitalize(name)}
      </p>
      
      <p className={nickClass}>
        {capitalize(nickname)}
      </p>

      {isDelete? (
        <p className="flex text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal truncate text-red-600">
          Removed
        </p>
      ): (
        <div className="flex text-darkPurple">
          <span className="w-5 h-5 text-darkPurple">
            <InfoIcon onClick={() => callBack(id, nickname)}/>
          </span>
          <span className="w-5 h-5 ml-2 text-red-600">
            <TrashIcon onClick={() => setShowDeleteModal(true)} />
          </span>
        </div>
      )}

      <DeleteModalMyPokemon
        inProp={showDeleteModal}
        onDelete={() => handleRemoveTodo('delete')}
        onCancel={() => handleRemoveTodo('cancel')}
      />
    </div>
  )
}

export default TaskCard