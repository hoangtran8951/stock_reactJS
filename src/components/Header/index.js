import React from 'react'
import Search from '../Search'
import DashboardControl from '../DashboardControl'
import ThemeIcon from "../ThemeIcon"

const Header = ({name}) => {
  return (
    <>
      <div className='xl:px-32'>
        <h1 className='text-5xl'>{name}</h1>
        <Search/>
      </div>
      <DashboardControl/>
      {/* <ThemeIcon/> */}
    </>
  )
}

export default Header
