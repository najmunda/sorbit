import { Form, redirect, useNavigate, useOutletContext } from "react-router-dom";
import { deleteCard } from "../../db";

export async function action({ params }) {
  await deleteCard(params.cardId)
  return redirect('/cards');
}

export default function CardDelete() {

  const navigate = useNavigate();

  const [handleDialogClose] = useOutletContext();

  function handleBackButton() {
    handleDialogClose();
    navigate('/cards');
  }

  return (
    <Form method="delete" className="p-3 h-fit flex flex-col justify-evenly items-center gap-2">
      <p className="text-center">Apakah anda yakin menghapus kartu ini? Jadwal kartu akan ikut terhapus!</p>
      <div className="pt-2 w-full flex justify-between items-center">
        <button type="button" onClick={handleBackButton} className="px-2">Close</button>
        <button type="submit" className="px-2">Delete</button>
      </div>
    </Form>
  );
}