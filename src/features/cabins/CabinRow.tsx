import styled from "styled-components";
import { CabinType } from "./types";
import { formatCurrency } from "../../utils/helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apiCabins";
import { QUERY_KEYS } from "../../types";

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
  const { id, name, maxCapacity, regularPrice, discount, image } = cabin;
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    // mutationFn: (id: number) => deleteCabin(id),
    mutationFn: deleteCabin,

    // the callback function to be called if the delete query was successful
    onSuccess: () => {
      /*
        react query will refetch the data when a data (queryKey) in cache is invalid.
        without using invalidateQueries(), after clicking on the "delete" button,
        react query will not refetch the data, until the browser tab changes.
        invalidateQueries() makes react query to refetch the data without changing
        the tab (the same as the "invalidate" button in react query extension does)
      */
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.CABINS],
      });
      alert("Cabin successfully deleted");
    },
    onError: error => alert(error.message),
  });

  function handleDeleteRow(id: number) {
    mutate(id);
  }

  return (
    <TableRow role="row">
      <Img src={image} alt={`cabin ${name}`} />
      <Cabin>{name}</Cabin>
      <Capacity>{maxCapacity}</Capacity>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <button disabled={isPending} onClick={handleDeleteRow.bind(null, id)}>
        delete
      </button>
    </TableRow>
  );
}

export default CabinRow;
