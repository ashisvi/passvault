"use client";
import React from 'react';
import {useSession,signIn,signOut} from 'next-auth/react';
import {UserCard} from './userCard';
export default function LoginComponent(){
    const {data:session} = useSession();

    if(session){
        return(
        <>
            <button onClick={() => signOut()} type="button" className="btn btn-primary">Sign Out Of Google</button>
            <UserCard user={session?.user}/>
        </>
        )    
    }else {
        return (
            <>
                <button onClick={() => signIn()} type="button" className="btn btn-primary">Sign In With Google</button>
            </>
        )
    }
}