

const Button = ({
    type = 'text',
    btnText = "Click me",
    className = ' ',
    btnColor = 'bg-blue-500',
    textColor = 'text-white',
    ...props

}) => {
  return (
      <button className={` px-4 py-2 rounded-lg ${className} ${btnColor} ${textColor}`}> 
          {btnText}
      </button>
  )
}

export default Button
