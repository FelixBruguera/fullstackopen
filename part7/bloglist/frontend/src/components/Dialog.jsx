const Dialog = ({ reference, children }) => {
    return (
        <dialog ref={reference} className="m-auto w-full md:w-fit backdrop:backdrop-blur-xs backdrop:bg-black/30 bg-transparent">
            <div className="w-full md:w-fit flex items-center justify-center">{children}</div>
        </dialog>
    )
}

export default Dialog