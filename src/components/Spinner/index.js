import React from 'react'
import {ClipLoader} from "react-spinners"
import './styles.css'

const Spinner = ({isLoading = true}) => {
  return (
    <div id="loading-spinner">
        <ClipLoader
            color='#36d7b7'
            Loading= {isLoading}
            size={35}
            aria-label='loading spinner'
        />
    </div>
  )
}

export default Spinner