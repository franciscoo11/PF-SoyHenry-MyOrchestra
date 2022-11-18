import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";
import Cookies  from 'universal-cookie'
const Signin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const cookies = new Cookies()
  cookies.set("user_loging",session,{path:"/"})
  
  setTimeout(() => status, 9000)
  if ( status === 'loading' ){
    setTimeout(() => <div>Cargandoo.......</div>,2000);
  }

  // if (session) {
  //   router.push('/orquestas')
  // }

  const handleloging=async()=>{
    await signIn("google")
    
  }

  const handlelogin=async()=>{
    await signIn()
    
  }
  
  // console.log(cookies.get("sesionlogin"));
  
// console.log(session?.user);

  const handlesingout=()=>{
    signOut()
    cookies.remove("user_loging")
  }

  if(cookies.get("user_loging")=="null"){
    return (
      <div>
        <h2>usuario no logueado loguin plis</h2>
        <div>
          Signed with Google <br />
          <button onClick={handleloging}>Sign in</button>
        </div>

        <div>
          Signed with Login <br />
          <button onClick={handlelogin}>Sign in</button>
        </div>
      </div>
      
      
    )
  }

    return (
      <>
       
       <h2>usuario loguedo deslogueate plis</h2>
        <div>
          Signed with Login <br />
          <button onClick={handlesingout }>signOut</button>
        </div>
      </>
    )
  
};

export default Signin;