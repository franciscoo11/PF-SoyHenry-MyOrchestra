import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

const Signin = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  
  setTimeout(() => status, 9000)
  if ( status === 'loading' ){
    setTimeout(() => <div>Cargandoo.......</div>,2000);
  }

  if (session) {
    router.push('/orquestas')
  }


  
  if ( session ){
    <div>HOLA {session?.user?.name}</div>
  }
  if (!session) {
    return (
      <>
        <div>
          Signed with Google <br />
          <button onClick={() => signIn("google")}>Sign in</button>
        </div>
        <div>
          Signed with Login <br />
          <button onClick={() => signIn() }>Sign in</button>
        </div>
      </>
    )
  }
};

export default Signin;