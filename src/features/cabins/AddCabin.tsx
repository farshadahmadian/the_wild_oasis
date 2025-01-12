import { useState } from "react";
import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setIsModalOpen(prevState => !prevState);
        }}
      >
        Add new cabin
      </Button>
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <CreateCabinForm
            cabinToEdit={null}
            onCloseModal={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}

export default AddCabin;
