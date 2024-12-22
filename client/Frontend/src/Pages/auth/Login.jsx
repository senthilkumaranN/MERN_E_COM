import CommonForm from '@/components/common/form'
import { registerLoginFrom } from '@/config'
import { useToast } from '@/hooks/use-toast'
import { LoginUser } from '@/slice/AuthSlice'
import  { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'

const initialState ={
  email:'',
  password: '',
}

const Login = () => {
  const [formData,setFormData] = useState(initialState)
  const dispatch = useDispatch()
  const {toast} = useToast()
  function onSubmit(event){
    event.preventDefault()
    dispatch(LoginUser(formData)).then((data)=>{
      if(data?.payload?.success){
        toast({
           title: data?.payload?.message
        })
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
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign In to your account</h1>
        <p className='mt-1'>
          Don't have an account
          <Link className='font-medium ml-2 text-primary hover:underline'to="/auth/register">Register</Link> 
        </p>
      </div>
      <CommonForm
       
       formControls={registerLoginFrom}
       Buttontext={'Sign In'}
       formData={formData}
       setFormData={setFormData}
       onSubmit={onSubmit}
       />

    </div>
  )
   
}

export default Login