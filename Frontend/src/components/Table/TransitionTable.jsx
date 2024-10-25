import React from 'react'
import { DropdownMenuDemo } from '../dropdown'
import FreeSoloCreateOption from '../search'
import StickyHeadTable from '../table'

const TransitionTable = () => {
  return (
    <div>
       <div className='flex justify-between p-2'> <DropdownMenuDemo/>
    <FreeSoloCreateOption/>
    </div>
    <StickyHeadTable/>
    </div>
  )
}

export default TransitionTable