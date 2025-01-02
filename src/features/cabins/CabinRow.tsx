import styled from "styled-components";
import { CabinType } from "./types";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./hooks/useDeleteCabin";
import { HiMiniSquare2Stack, HiPencil, HiTrash } from "react-icons/hi2";
import useCreateCabin from "./hooks/useCreateCabin";

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 0.6fr 1fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  text-align: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  @media screen and (max-width: 700px) {
    grid-template-columns: 2fr 0.6fr 1fr 1fr 1fr;
  }

  @media screen and (max-width: 550px) {
    padding: 1.2rem 1.2rem;
    font-size: 1.2rem;
    gap: 1.2rem;
  }

  @media screen and (max-width: 420px) {
    font-size: 1rem;
  }
`;

const Img = styled.img`
  display: block;
  width: 100%;
  /* height: 100%; */
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  /* transform: scale(1.5) translateX(-7px); */
`;

const Cabin = styled.div`
  /* font-size: 1.6rem; */
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";

  @media screen and (max-width: 730px) {
    /* font-size: 1.2rem; */
  }
`;

const Capacity = styled.div`
  @media screen and (max-width: 700px) {
    display: none;
  }
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

type CabinRowPropsType = {
  cabin: CabinType;
};

function CabinRow({ cabin }: CabinRowPropsType) {
  const [showEditForm, setShowEditForm] = useState(false);
  const { isDeleting, mutateDeletingCabin } = useDeleteCabin();
  const { id, name, maxCapacity, regularPrice, discount, image, description } =
    cabin;
  const { isCreating, mutateCreating } = useCreateCabin();

  function handleDeleteRow(id: number) {
    mutateDeletingCabin(id);
  }

  function handleEditRow() {
    setShowEditForm(prevState => !prevState);
  }

  function handleDuplicateCabin() {
    mutateCreating({
      name,
      maxCapacity,
      discount,
      image,
      regularPrice,
      description,
    });
  }

  return (
    <>
      <TableRow role="row">
        <Img src={image} alt={`cabin ${name}`} />
        <Cabin>{name}</Cabin>
        <Capacity>{maxCapacity}</Capacity>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}
        <div>
          <button disabled={isCreating} onClick={handleDuplicateCabin}>
            <HiMiniSquare2Stack />
          </button>
          <button onClick={handleEditRow}>
            <HiPencil />
          </button>
          <button
            disabled={isDeleting}
            onClick={handleDeleteRow.bind(null, id)}
          >
            <HiTrash />
          </button>
        </div>
      </TableRow>
      {showEditForm && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
