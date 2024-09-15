import React from 'react'

const page = ({ params }: { params: { id: string } }) => {
  return (
    <div>profile of {params.id}</div>
  )
}

export default page