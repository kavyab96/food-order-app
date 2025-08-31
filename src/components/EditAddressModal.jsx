import React, { useState, useEffect } from "react";

const EditAddressModal = ({ show, onClose, user, onSave }) => {
    const [address, setAddress] = useState("");


    // preload existing address when modal opens
    useEffect(() => {
        if (user?.address) {
            setAddress(user.address)
        }
    }, [user,show])

      if (!show) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
                <h2 className="text-lg font-bold mb-4">Edit Address</h2>
                <form action="">

                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full border p-2 rounded-lg mb-4"
                        rows="3"
                        required
                        maxLength="100"
                        title="Address should not exceed 100 characters."
                        placeholder="Enter your address"
                    />

                    <div className="flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="px-3 py-1 bg-gray-300 rounded-lg"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onSave(address)}
                            className="px-3 py-1 bg-green-500 text-white rounded-lg"
                        >
                            Save
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default EditAddressModal