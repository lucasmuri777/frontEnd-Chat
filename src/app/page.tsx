'use client'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useUser } from '@/contexts/UserContext'
import dynamic from 'next/dynamic'
 
const LoginHome = dynamic(() => import('@/components/LoginHome'), { ssr: false })

export default function Home() {
  const router = useRouter()
  const userCtx = useUser()

  useEffect(()=>{
    if(userCtx?.user){
        router.push('/home')
    }
})
  return (
      <LoginHome />
  )
}
