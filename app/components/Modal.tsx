import { modalState } from "@/atoms/modalAtom"
import MuiModal from "@mui/material/Modal"
import { useRecoilState } from "recoil"
import { XMarkIcon } from "@heroicons/react/20/solid"

const Modal = () => {
    const [showModal, setShowModal] = useRecoilState(modalState)

    const handleClose = () => setShowModal(false)

    return (
        <MuiModal open={showModal} onClose={handleClose}>
            <>
                <button
                    onClick={handleClose}
                    className="btn-modal absolute top-5 right-5 !z-40 w-9 h-9 border-none bg-[#181818] hover:bg-[#181818]"
                >
                    <XMarkIcon className="w-6 h-6" />
                </button>
            </>
        </MuiModal>
    )
}

export default Modal