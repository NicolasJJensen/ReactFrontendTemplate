import React, { useState, useReducer, useEffect, useRef } from 'react'

export default function MultiPartForm(props) {
  const [currentPage, setCurrentPage] = useState(0)
  const [formValues, setFormValues] = useReducer((state, newState) => ({...state, ...newState}), {})
  const formRef = useRef(null)

  const handleChange = (e) => {
    const name = e.currentTarget.name
    const type = e.currentTarget.type
    let newValue = e.target.value

    if(type === 'checkbox') {
      newValue = e.currentTarget.checked
    }

    if(type === 'file') {
      newValue = e.currentTarget.files
    }

    if(e.srcElement.type === 'select-multiple') {
      newValue = Array.from(e.srcElement.selectedOptions).map(option => option.value)
    }

    setFormValues({ [name]: { value: newValue, type: type } })
  }

  const setupElement = (el) => {
    const name = el.name
    const type = el.type
    // add event listener to handle input changing
    el.removeEventListener('input', handleChange)
    el.addEventListener('input', handleChange)

    // add radio value to formData only if checked
    // otherwise make sure formData has been initialized
    if(type === 'radio') {
      el.checked = formValues[name]?.value === el?.value
      formValues[name] || setFormValues({[name]: { value: null, type: type } })
      if(!el.checked) return

      setFormValues({ [name]: { value: el.value, type: type } })
    }

    // add checkbox value to formData
    else if(type === 'checkbox') {
      el.checked = formValues[name]?.value || ''
      setFormValues({ [name]: { value: el.checked, type: type } })
    }

    // add select to formData if it's an array of 
    else if(type === 'select-multiple') {
      let value = Array.from(el.selectedOptions).map(option => option.value)
      el.value = formValues[name]?.value || ''
      setFormValues({ [name]: { value: value, type: type } })
    }

    // add files to form data
    else if(type === 'file') {
      el.files = formValues[name]?.value
      setFormValues({ [name]: { value: el.files, type: type } })
    }

    // add value of input to formData
    else {
      el.value = formValues[name]?.value || ''
      setFormValues({ [name]: { value: el.value, type: type } })
    }
  }

  const handlePageChange = (e) => {
    setCurrentPage(currentPage => currentPage - 1)
  }

  const setupButton = (el) => {
    if(el.type === 'reset') {
      el.removeEventListener('click', handlePageChange)
      el.addEventListener('click', handlePageChange)
    }
  }

  // Setup inital state and add onChange handlers
  useEffect(() => {
    Array.from(formRef.current.getElementsByTagName('input')).forEach(setupElement)
    Array.from(formRef.current.getElementsByTagName('textArea')).forEach(setupElement)
    Array.from(formRef.current.getElementsByTagName('select')).forEach(setupElement)
    Array.from(formRef.current.getElementsByTagName('button')).forEach(setupButton)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const getFormData = () => {
    let formData = new FormData()

    Object.keys(formValues).forEach(key => {
      if(formValues[key].type === 'file') {
        for(let file of formValues[key].value) {
          formData.append(key, file)
        }
      } else {
        formData.append(key, formValues[key].value)
      }
    })

    props.onSubmit(formData)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(React.Children.count(props.children) <= page + 1) {
      submit()
    }

    setCurrentPage(currentPage => currentPage + 1)
  }

  return (
    <form className={props.className} ref={formRef} onSubmit={onSubmit}>
      {React.Children.toArray(props.children)[currentPage]}
      {React.Children.count(props.children) <= currentPage && (
        <img className='loading' src='loading GIF' alt='loadingGIF' />
      )}
    </form>
  )
}
