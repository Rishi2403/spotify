"use client";
import { signIn ,signOut,useSession } from 'next-auth/react';
import { use } from 'react';

export function Appbar(){
    const session=useSession();
    return <div>
        <div className="flex justify-between">
            <div>
                Spotifyx
            </div>
            <div>
                {session.data?.user && <button className="m-2 p-2 bg-blue-400" onClick={() => signOut()}>LogOut</button>}
                {!session.data?.user && <button className="m-2 p-2 bg-blue-400" onClick={() => signIn()}>SignIn</button>}
                {/* <button className="m-2 p-2 bg-blue-400" onClick={() => signIn('google')}>SignIn</button> */}
            </div>
        </div>
    </div>
}