import { useEffect, useRef, useState } from "react";
import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { ArrowLeft, Save } from "lucide-react";
import { editCard, getCard } from "../../db";
import TextArea from "../../components/TextArea";

export async function action({ request, params }) {
  const cardsForm = await request.formData();
  const cardsData = Object.fromEntries(cardsForm);
  await editCard(params.cardId, cardsData);
  return redirect('/cards');
}

export async function loader({ params }) {
  const card = await getCard(params.cardId);
  return card;
}

export default function CardEdit() {

  const card = useLoaderData();
  const navigate = useNavigate();

  const [sentence, setSentence] = useState(card.sentence);
  const [target, setTarget] = useState(card.target);
  const [def, setDef] = useState(card.def);

  function handleSentenceChange(e) {
    setSentence(e.currentTarget.value);
  }

  function handleSentenceSelect(e) {
    const substring = e.currentTarget.value.substring(e.target.selectionStart, e.target.selectionEnd);
    if (substring != "") {
      setTarget(substring);
      setDef("");
    }
  }

  function handleDefChange(e) {
    setDef(e.currentTarget.value);
  }

  const dialogRef = useRef();
  useEffect(() => {
    dialogRef.current.showModal();
  }, []);

  function handleBackdropClick(e) {
    if (e.target == dialogRef.current) {
      navigate('/cards');
    };
  }

  function handleBackButton() {
    navigate('/cards');
  }

  function handleEscDown(e) {
    if (e.key == "Escape") {
      navigate('/cards');
    };
  }

  return (
    <dialog ref={dialogRef} onClick={handleBackdropClick} onKeyDown={handleEscDown} className="w-full bottom-0 border rounded-lg">
      <Form method="post" action="" className="p-3 h-fit flex flex-col justify-evenly items-center gap-2">
        <TextArea
          type="text"
          name="sentence"
          id="sentence"
          value={sentence}
          onChange={handleSentenceChange}
          onSelect={handleSentenceSelect}
          className="w-full border rounded p-2"
          placeholder="Put sentence here..."
        ></TextArea>
        <input
          type="text"
          name="target"
          id="target"
          value={target}
          className="w-full font-lg border rounded p-2"
          placeholder="Highlight words from sentence..."
          readOnly
        />
        <TextArea
          type="text"
          name="def"
          id="def"
          value={def}
          onChange={handleDefChange}
          className="w-full border rounded p-2"
          placeholder="Add def from dictionary..."
        ></TextArea>
        <div className="pt-2 w-full flex justify-between items-center">
          <button type="button" onClick={handleBackButton} className="px-2">Close</button>
          <button type="submit" className="px-2">Save</button>
        </div>
      </Form>
    </dialog>
  )
}