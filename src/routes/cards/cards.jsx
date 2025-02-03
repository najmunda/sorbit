import { Form, Link, Outlet, useLoaderData, useLocation } from "react-router-dom";
import { CopyX, Info, Pickaxe, Search, SquarePen, Table, Trash2 } from "lucide-react";
import { getCards } from "../../db";
import Header from "../../components/Header";
import Toast from "../../components/Toast";
import { formatDate } from "../../utils";

export async function loader() {
  const cardsData = await getCards();
  return cardsData.rows.map(row => row.doc);
}

export default function Cards() {

  const cardsData = useLoaderData();
  const location = useLocation();

  console.log(cardsData);

  return (
    <>
      <Header>
        {cardsData.length != 0 ?
          <>
            <button className="h-fit"><Table size={20} /></button>
            <button className="h-fit"><Search size={20} /></button>
          </> : <></>
        }
      </Header>
      <main className={`flex-1 p-2 flex flex-col gap-2 ${cardsData.length == 0 && 'justify-center items-center text-neutral-400'}`}>
        {cardsData.length != 0 ?
          cardsData.map(card => (
            <div key={card._id} data-key={card._id} className="group p-2 grid grid-cols-2 grid-rows-2 items-center gap-1 bg-white border rounded-lg">
              <p className="text-xl font-bold leading-tight text-nowrap truncate gap-2">{card.target}</p>
              <p className="text-xs font-light text-nowrap truncate col-span-2">{card.sentence}</p>
              <div className="col-span-2 hidden justify-evenly text-xs group-hover:flex">
                <Link className="flex gap-1" to={`${card._id}`}><Info size={15} />Info</Link>
                <Form action={`${card._id}/edit`} className="flex items-center"><button className="flex gap-1"><SquarePen size={15} />Edit</button></Form>
                <Form method="post" action={`${card._id}/delete`} className="flex items-center"><button type="submit" className="flex gap-1"><Trash2 size={15} /> Delete</button></Form>
              </div>
            </div>
          ))
          :
          <>
            <CopyX size={80} />
            <p className="text-center text-sm">There is no card added. Go to <Pickaxe size={18} className="inline" /> "Mine" to mining sentence and add some card.</p>
          </>
        }
        <Outlet />
        {location.state && <Toast message={location.state.message} />}
      </main>
    </>
  )
}