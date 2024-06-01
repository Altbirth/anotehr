import React from 'react'
import Header from '@/components/header'
import { ReactNode} from 'react';
import '../app/globals.css';

interface MainProps {
  children: ReactNode;
}


const Main = ({children}: MainProps) => {
    return (
      <main className="flex min-h-screen flex-col items-center">
        <Header></Header>
        <br />
        <br />
        <div className="w-full flex min-h-96 items-center">
          {children}
        </div>
      </main>
    );
  };
  
export default Main