import CommonForm from '@/components/common/form'
import { registerFormControls } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { registerUser } from '@/slice/AuthSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'



const initialState = {
  username: '',
  email: '',
  password: '',
}

const Register = () => {
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {toast} = useToast()

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      console.log(data)
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        })
        navigate('/auth/login')
      }else{
         toast({
           title: data?.payload,
           variant: 'destructive'
         })
      }
    })
  }


  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create Account</h1>
        <p className='mt-1'>
          Already have an account
          <Link className='font-medium ml-2 text-primary hover:underline' to="/auth/login">Login</Link>
        </p>
      </div>
      <CommonForm

        formControls={registerFormControls}
        Buttontext={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />

    </div>
  )
}

export default Register