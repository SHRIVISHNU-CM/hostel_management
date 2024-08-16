import axios from 'axios'
import React, { useEffect, useState } from 'react'

function AdminContact() {
    const [contact, Setcontact] = useState([])
    useEffect(() => {
        axios.get("http://localhost:3001/admin/allContactus")
            .then((res) => {
                console.log(res.data.message)
                Setcontact(res.data.message)
            })
    }, [])
    return (
        <>
            <div className='flex justify-center items-center'>
                <div className='card w-min bg-base-200 border border-purple-300'>
                    <div className='card-body'>

                        <table className=' w-full border border-separate'>
                            <thead>
                                <tr className='bg-purple-600 text-white'>
                                    <th className='py-3 px-5  text-sm font-semibold'>Name</th>
                                    <th className='py-3 px-5  text-sm font-semibold'>Phone</th>
                                    <th className='py-3 px-5  text-sm font-semibold'>Email</th>
                                    <th className='py-3 px-5  text-sm font-semibold'>College</th>
                                    <th className='py-3 px-5  text-sm font-semibold'>Location</th>

                                </tr>
                            </thead>
                            {
                                contact.map((el, i) => {
                                    return (
                                        <tbody key={i} className='border-b bg-white  border-gray-200 hover:bg-gray-100 transition'>
                                            <tr className=''>
                                                <td className='py-3 px-5 text-sm'>{el.name}</td>
                                                <td className='py-3 px-5 text-sm'>{el.phone}</td>
                                                <td className='py-3 px-5 text-sm'>{el.email}</td>
                                                <td className='py-3 px-5 text-sm'>{el.college}</td>
                                                <td className='py-3 px-5 text-sm'>{el.hometown}</td>

                                            </tr>
                                        </tbody>
                                    )
                                })
                            }


                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminContact
