import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";
import { getCabins } from "../../services/apiCabins";
import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";

const Table = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;

  /* @media screen and (max-width: 730px) {
    font-size: 1.2rem;
  } */
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 2fr 0.6fr 1fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  text-align: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;

  @media screen and (max-width: 730px) {
    /* column-gap: 0; */
    /* padding: 0; */
    /* font-size: 1.2rem;
    grid-template-columns: 2fr 0.6fr 1fr 1fr 1fr 1fr; */
  }

  @media screen and (max-width: 550px) {
    /* grid-template-columns: 1fr 0.6fr 1fr 1fr 1fr 1fr; */
    padding: 1.2rem 1.2rem;
    font-size: 1.2rem;
    gap: 1.2rem;
  }
`;

const Capacity = styled.div`
  /* @media screen and (max-width: 550px) {
    display: none;
  } */
`;

function CabinTable() {
  const {
    isPending,
    data: cabins,
    error,
  } = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });

  if (isPending) return <Spinner />;

  if (error) return null;

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <div>Cabin</div>
        <Capacity>Capacity</Capacity>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </TableHeader>
      {cabins?.map(cabin => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
    </Table>
  );
}

export default CabinTable;
