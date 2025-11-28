import Button from './Button'

const Confirm = ({ title, onConfirm, onCancel }) => {
    return (
        <div
      className="flex flex-col bg-slate-900 px-5 items-start lg:items-start justify-between rounded-xl border border-border w-full md:min-w-80 max-w-120 py-2 lg:py-6 gap-3 lg:gap-2"
    >
        <span className='text-text-primary text-xl text-start w-full'>Removing <b>{title}</b></span>
        <p className='text-text-secondary text-start w-full'>Are you sure?</p>
      <div className="flex items-center justify-between w-full mx-auto mt-2">
        <Button style="light" type="button" className="!w-fit !m-0" onClick={() => onCancel()}>
          Cancel
        </Button>
        <Button style="dark" type="submit" className="!w-fit !m-0" onClick={() => onConfirm()}>
          Confirm
        </Button>
      </div>
    </div>
    )
}

export default Confirm