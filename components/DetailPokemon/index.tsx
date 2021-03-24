import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { Transition } from 'react-transition-group'
import { useForm } from 'react-hook-form'

import { getListMyPokemon } from 'api/getMyPokemons'

import CloseIcon from 'assets/svg/close'

type Props = {
  datas: any,
  inProp: boolean,
  onClose: () => void,
  tipe: string
}

type Inputs = {
  nickname: string
}

type newData = {
  id: number
  name: string
  nickname: string,
  isDelete: boolean
}

const DURATION = 240

const detailDefaultStyle = {
  transition: `bottom ${DURATION}ms ease-in-out, opacity ${DURATION * 2}ms ease-in-out`,
  opacity: 0,
  bottom: '-95%'
}

const detailTransitionStyles = {
  unmounted: { bottom: '-95%', opacity: 0 },
  entering: { bottom: 0, opacity: 1 },
  entered: { bottom: 0, opacity: 1 },
  exiting: { bottom: '-95%', opacity: 0 },
  exited: { bottom: '-95%', opacity: 0 }
}

const overlayDefaultStyle = {
  transition: `bottom ${DURATION}ms ease-in-out, opacity ${DURATION * 2}ms ease-in-out`,
  opacity: 0,
  display: 'none'
}

const overlayTransitionStyles = {
  unmounted: { bottom: '-180px', opacity: 0 },
  entering: { display: 'block', opacity: .85 },
  entered: { display: 'block', opacity: .85 },
  exiting: { bottom: '-180px', opacity: 0 },
  exited: { bottom: '-180px', opacity: 0 }
}


const DetailPokemon: React.FC<Props> = ({ datas, inProp, onClose, tipe }) => {
  const { register, handleSubmit, errors, reset } = useForm<Inputs>()

  const [showFormAdd, setShowFormAdd] = useState(false)
  const [showFormEdit, setShowFormEdit] = useState(false)
  const [labelCatch, setLabelCatch] = useState('')

  let history = useHistory()
  const onAdd = async (data: Inputs): Promise<void> => {
    try {
      const hasil = localStorage.getItem('MyPokemons')
      let arr: newData[] = hasil? JSON.parse(hasil) : []
      const newData = {
        id: datas.id,
        name: datas.name,
        nickname: data.nickname,
        isDelete: false
      }
      arr.push(newData)
      localStorage.setItem('MyPokemons', JSON.stringify(arr))
      reset()
      history.push('/my-pokemon')

    } catch (error) {
      throw new Error(error)
    }
  }

  const onEdit = async (data: Inputs): Promise<void> => {
    const myPokemon = await getListMyPokemon()
    myPokemon.results.forEach(item => {
      if (item.nickname === datas.nickname) {
        item.nickname = data.nickname
      }
    })
    localStorage.setItem('MyPokemons', JSON.stringify(myPokemon.results))
    reset()
    onClose()
  }

  const linkImage = (id: number) => {
    if (id) {
      return `https://pokeres.bastionbot.org/images/pokemon/${id}.png`
    }
  }

  const capitalize = (item: string) => {
    if (item) {
      return item.charAt(0).toUpperCase() + item.slice(1)
    }
  }

  const catchIt = () => {
    const isShow = Math.round(Math.random())
    console.log('hasil generate catch', isShow)
    if (isShow === 1) setShowFormAdd(true)
    if (isShow === 0) setLabelCatch('Again')
  }
  
  const handleClose = () => {
    setShowFormAdd(false)
    setShowFormEdit(false)
    setLabelCatch('')
    onClose()
  }

  const placeholderStyle = classnames('text-darkPurple flex-1 bg-transparent outline-none', {
    'placeholder-red-400': errors.nickname
  })

  const inputStyle = classnames('flex justify-center items-center bg-gray-200 mt-2 px-4 py-2 rounded-lg box-border', {
    'bg-red-200': errors.nickname
  })

  return (
    <Transition in={inProp} timeout={DURATION}>
      {(state) => (
        <>
          <div
            onClick={handleClose}
            style={{
              ...overlayDefaultStyle,
              ...overlayTransitionStyles[state]
            }}
            className="fixed z-10 left-0 top-0 bottom-0 right-0 bg-black"
          />

          <div
            style={{
              ...detailDefaultStyle,
              ...detailTransitionStyles[state]
            }}
            className="fixed flex flex-col z-10 inset-x-0 rounded-t-lg p-4 h-almostFull bg-white">
            <div className="p-3">  
              <div className="max-w-md rounded overflow-hidden shadow-lg">
                <img className="w-2/4 mr-auto ml-auto" src={linkImage(datas?.id)} alt="Mountain" />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2">{capitalize(datas?.name)}</div>
                  {datas?.nickname && tipe === 'myDetail' &&
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                      Nickname: {capitalize(datas.nickname)}
                    </span>
                  }
                  <div className="font-medium text-base">Moves</div>
                  <div className="pt-2 pb-1">
                    {datas?.moves.map((move: any) => {
                      return (
                        <span key={move.move.name} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          {capitalize(move.move.name)}
                        </span>
                      )
                    })}
                  </div>
                  <div className="font-medium text-base">Types</div>
                  <div className="pt-2 pb-1">
                    {datas?.types.map((type: any) => {
                      return (
                        <span key={type.type.name} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          {capitalize(type.type.name)}
                        </span>
                      )
                    })}
                  </div>
                  <div className="font-medium text-base">Abilities</div>
                  <div className="pt-2 pb-1">
                    {datas?.abilities.map((ability: any) => {
                      return (
                        <span key={ability.ability.name} className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                          {capitalize(ability.ability.name)}
                        </span>
                      )
                    })}
                  </div>
                  <div className="font-medium text-base">Others</div>
                  <div className="pt-2 pb-1">
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Height {datas?.height}</span>
                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Weight {datas?.weight}</span>
                  </div>
                </div> 
              </div>
            </div>
            
            {showFormAdd && tipe === 'detail' && 
              <form
                onSubmit={handleSubmit(onAdd)}
                className={inputStyle}>
                <input
                  ref={register({
                    required: {
                      value: true,
                      message: 'Nickname is required!'
                    },
                    minLength: {
                      value: 2,
                      message: 'Minimum characters is 2!'
                    },
                    maxLength: {
                      value: 8,
                      message: 'No more than 8 characters!'
                    }
                  })}
                  name="nickname"
                  autoComplete="off"
                  placeholder={errors.nickname ? '...Oops' : `Input pokemon's nickname`}
                  className={placeholderStyle} />
                
                {errors.nickname ? (
                  <button
                    onClick={() => reset()}
                    className="bg-transparent text-md font-bold text-darkPurple outline-none ml-1"
                  >
                    Reset
                  </button>
                ): (
                  <input
                    type="submit"
                    value="Add"
                    className="bg-transparent text-md font-bold text-darkPurple outline-none ml-1" />
                )}
              </form>
            }
            {!showFormAdd && tipe === 'detail' &&
              <button
                onClick={catchIt}
                className="bg-purple-700 hover:bg-purple-900 text-white font-bold mt-2 py-2 px-4 rounded">
                Catch it {labelCatch}
              </button>
            }

            {showFormEdit && tipe === 'myDetail' &&
              <form
                onSubmit={handleSubmit(onEdit)}
                className={inputStyle}>
                <input
                  ref={register({
                    required: {
                      value: true,
                      message: 'Nickname is required!'
                    },
                    minLength: {
                      value: 2,
                      message: 'Minimum characters is 2!'
                    },
                    maxLength: {
                      value: 8,
                      message: 'No more than 8 characters!'
                    }
                  })}
                  name="nickname"
                  autoComplete="off"
                  placeholder={errors.nickname ? '...Oops' : `Input pokemon's nickname`}
                  className={placeholderStyle} />
                
                {errors.nickname ? (
                  <button
                    onClick={() => reset()}
                    className="bg-transparent text-md font-bold text-darkPurple outline-none ml-1"
                  >
                    Reset
                  </button>
                ): (
                  <input
                    type="submit"
                    value="Change"
                    className="bg-transparent text-md font-bold text-darkPurple outline-none ml-1" />
                )}
              </form>
            }
            {!showFormEdit && tipe === 'myDetail' &&
              <button
                onClick={() => setShowFormEdit(true)}
                className="bg-purple-700 hover:bg-purple-900 text-white font-bold mt-2 py-2 px-4 rounded">
                Edit Nickname
              </button>
            }
            {errors.nickname && (
              <span className="text-xs text-red-500 font-semibold tracking-wide mt-2 pl-2">{errors?.nickname?.message}</span>
            )}

            <span
              onClick={handleClose}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{
                bottom: '10px',
                left: '50%'
              }}>
              <CloseIcon />
            </span>
          </div>
        </>  
      )}
    </Transition>
  )
}

export default DetailPokemon