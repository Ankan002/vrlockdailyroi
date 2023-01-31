import React from 'react'

const MyButton = ({ text, handler }) => {
  return (
    <div onClick={handler}>
      <h6 style={{ fontWeight: "bold", color: "black", zIndex: 1, position: "absolute", top: "89%", left: "50%", transform: `translate(-50%, -50%)` }}>{text ? text : "No Name"}</h6>
      <img style={{ width: 80, height: 50, position: "absolute", bottom: 10, marginLeft: -40 }} src='/btn-Image.png' />
    </div>
  )
}

export default MyButton