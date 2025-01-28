import {useId, forwardRef} from 'react'

const Select = ({
  label,
  options = [],
  className = ' ',
  ...props
}, ref) => {


  const id = useId();

  return (
    <div className='w-full'>
      {label && <label htmlFor={id}>{label}</label>}

      <select
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        ref={ref}
      >
        {
          options?.map((option) => (
            <option key={option} value={option}>
              {options}
            </option>
            
          ))
        }
      </select>
    </div>
  )
}

export default forwardRef(Select)
