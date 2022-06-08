const Modal = () => {
  return <>
    <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity"></div>

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <div className="relative bg-secondary rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-lg sm:w-full">
            <div className="bg-secondary px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="grid grid-row-1 gap-4">
                <input
                  className="w-full p-2 bg-primary rounded-md  border border-accent focus:border-white text-white"
                  placeholder="Service Provider"
                  type="text"
                />
                <input
                  className="w-full p-2 bg-primary rounded-md  border border-accent focus:border-white text-white"
                  placeholder="Plan Subscription"
                  type="text"
                />
                <input
                  className="w-full p-2 bg-primary rounded-md  border border-accent focus:border-white text-white"
                  placeholder="Subscription Cost"
                  type="text"
                />
                <input
                  className="w-full p-2 bg-primary rounded-md  border border-accent focus:border-white text-white"
                  placeholder="Billing Terms"
                  type="text"
                />
              </div>
            </div>
            <div className="bg-secondary px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm">Deactivate</button>
              <button type="button" className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
}

export default Modal