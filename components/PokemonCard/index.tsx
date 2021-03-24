import React from 'react'
import classnames from 'classnames'

import InfoIcon from 'assets/svg/information'

type Props = {
  name: string,
  owned: number,
  url: string,
  callBack: (url: string) => void
}

const TaskCard: React.FC<Props> = ({ name, owned, url, callBack }) => {

  const ownedClass = classnames('flex-1 text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal', {
    'text-red-600': owned === 0,
    'text-green-600': owned !== 0
  })

  const capitalize = (item: string) => {
    return item.charAt(0).toUpperCase() + item.slice(1)
  }

  const linkImage = (url: string) => {
    if (url) {
      const data = url.split('/')
      return `https://pokeres.bastionbot.org/images/pokemon/${data[6]}.png`
    }
  }

  return (
    <div className="flex justify-center items-center relative rounded shadow-lg p-3 mb-2 bg-white text-darkPurple">
      <img className="w-10 h-10 rounded-full mr-4" src={linkImage(url)} alt="Pokemon"></img>
      <p className="flex-1 text-sm subpixel-antialiased tracking-wide font-bold whitespace-normal truncate">
        {capitalize(name)}
      </p>

      <p className={ownedClass}>
        {owned !== 0? owned : 'Not'} Owned
      </p>

      <div className="flex text-darkPurple">
        <InfoIcon onClick={() => callBack(url)}/>
      </div>
    </div>
  )
}

export default TaskCard