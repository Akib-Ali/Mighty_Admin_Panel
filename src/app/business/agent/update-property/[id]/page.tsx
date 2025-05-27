"use client"
import UpdatePropertyForm from "@/app/business/common/propertyManagement/UpdateProperty"
import { useParams } from 'next/navigation'

const UpdateProperty = () => {
    const params = useParams()
    const id = params.id // 

    return (
        <>
            <UpdatePropertyForm id={id}/>
        </>
    )


}


export default UpdateProperty