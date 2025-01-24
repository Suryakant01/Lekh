import {useId, forwardRef} from 'react'

const Select = ({
  label,
  options = [],
  className = ' ',
  ...props
}, ref) => {


  const id = useId();

  return (
    <div>
      {label && <label htmlFor={id}>{label}</label>}

      <select
        id={id}
        className={`${className}`}
        ref={ref}
      >
        {
          options?.map((val) => (
            <option key={val} value={val}>
              {options}
            </option>
            
          ))
        }
      </select>
    </div>
  )
}

export default forwardRef(Select)
