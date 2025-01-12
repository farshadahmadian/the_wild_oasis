import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";
// import CabinTable from "./CabinTable";

function AddCabin() {
  return (
    <Modal>
      <Modal.Open modalNameToOpen="cabin-form">
        <Button>Add new cabin</Button>
      </Modal.Open>

      <Modal.ModalWindow modalNameToOpen="cabin-form">
        {/* 
            in Modal-v1, CreateCabinForm component received the optional prop "onCloseModal function value",
            and inside the "CreateCabinForm" component if this prop was not undefined, the style of the "Form"
            component would be defined with $type="modal". Now that <CreateCabinForm /> is being passed as the 
            children prop of "Modal.ModalWindow" (instead of being rendered statically as a <CreateCabinForm />
            instance inside the parent component) the "onCloseModal" prop can be passed to its "cloned component"
            and then render the cloned component inside the parent component
          */}
        <CreateCabinForm cabinToEdit={null} />
      </Modal.ModalWindow>

      {/* <Modal.Open modalNameToOpen="table">
          <Button>Cabins table</Button>
        </Modal.Open>

        <Modal.ModalWindow modalNameToOpen="table">
          <CabinTable />
        </Modal.ModalWindow> */}
    </Modal>
  );
}

export default AddCabin;

// Modal-v1
/* function AddCabin() {
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

export default AddCabin; */
