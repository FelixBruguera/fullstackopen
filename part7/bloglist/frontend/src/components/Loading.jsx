import { LoaderCircle } from 'lucide-react'

const Loading = () => {
    return (
        <div className="m-auto">
            <LoaderCircle size={50} className='animate-spin text-text-primary'/>
        </div>
    )
}

export default Loading