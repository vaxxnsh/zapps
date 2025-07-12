"use client";
import Link from 'next/link';
import React, { ReactNode } from 'react'

const LinkButton = ({children, href} : {
    children : ReactNode
    href : string
}) => {
  return (
    <Link className='px-2 py-4 cursor-pointer' href={href}>
        {children}
    </Link>
  )
}

export default LinkButton