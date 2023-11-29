import React, { useEffect, useState } from "react";
import { data } from "./data";
import { shuffle } from "lodash";
import Modal from "react-modal";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [cards, setCards] = useState(shuffle([...data, ...data]));
  const [firstCard, setFirstCard] = useState("");
  const [secondCard, setSecondCard] = useState("");
  const [activeCards, setActiveCards] = useState([]);
  const [foundPairs, setFoundPairs] = useState([]);
  const [won, setWon] = useState("");
  const [numberClick, setNumberClick] = useState(0);
  const [isClickable, setIsClickable] = useState(true);
  const [foundOnePair, setfoundOnePair] = useState("");

  const clickCard = (one, index) => {
    // chyby v klikání

    if (activeCards.includes(index)) {
      showModal("Na tuto kartu jste teď klikly vyberte prosím jinou.");
      return;
    }

    if (foundPairs.includes(one.title)) {
      showModal(
        "Zde už jste pár našli, pokračujte prosím v ostatních kartách."
      );
      return;
    }

    // Zvýšení kliknutí
    setNumberClick(numberClick + 1);

    // Vyčištění odpovědi
    setfoundOnePair("");

    // Aktualizace polí
    const updatedActiveCards = [...activeCards, index];
    setActiveCards(updatedActiveCards);

    // pole je prázdné natavení první karty
    if (activeCards.length === 0) {
      setFirstCard(one);
      // POle obsahuje 1 kartu dáme mu 2
    } else if (activeCards.length === 1) {
      setSecondCard(one);
      setIsClickable(false); // zakázání klikání

      // časovač pro otočení karty a vyprázdnění políček
      setTimeout(() => {
        setActiveCards([]);
        setFirstCard("");
        setSecondCard("");
        setIsClickable(true);
      }, 300);
    }
  };

  //Porovnání zda jsou karty stejné
  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.title === secondCard.title) {
        setFoundPairs([...foundPairs, firstCard.title]);

        setfoundOnePair("Úspěšně jste našli 1 pár");
      } else {
        setfoundOnePair("Pár se neshoduje, zkuste to znova");
      }

      // Reset první a druhé karty
      setFirstCard("");
      setSecondCard("");
    }
  }, [firstCard, secondCard]);

  // Zjištění vítězství
  useEffect(() => {
    if (foundPairs.length == cards.length / 2) {
      setWon("Vyhráli jste - chcete hru opakovat");
      setfoundOnePair("Našli jste všechny páry gratuluji.")
    }
  }, [foundPairs, cards]);

  const showModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  // Reset hry vynulování všeho
  const resetGame = () => {
    setCards(shuffle([...data, ...data]));
    setActiveCards([]);
    setFirstCard("");
    setSecondCard("");
    setFoundPairs([]);
    setNumberClick(0);
    setWon("");
    setIsClickable(true);
  };

  


  return (
    <section className="max-w-[800px] mx-auto bg-gray-100 p-4">
      <h1 className="text-orange-500 text-2xl md:text-3xl font-bold text-center my-4">Pexeso hra</h1>
      {won && <div className="text-green-600 text-center font-semibold">Vyhráli jste</div>}
  
      <div className="flex flex-wrap justify-between items-center mb-4">
        <button className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded hover:bg-yellow-600 transition duration-300" onClick={resetGame}>Resetovat hru</button>
        <div className="text-lg font-semibold">{foundOnePair}</div>
        <div>
          <span className="font-semibold">Počet kliknutí: </span>
          <span className="font-bold">{numberClick}</span>
        </div>
      </div>
  
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50"
      >
        <h2 className="text-lg font-bold text-orange-500 mb-4">Upozornění</h2>
        <p>{modalMessage}</p>
        <button 
          className="mt-4 bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600 transition duration-300" 
          onClick={() => setIsModalOpen(false)}
        >
          Zavřít
        </button>
      </Modal>
  
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {cards.map((one, index) => {
           // Kontrola zda je karta aktivní pro vykreslení do stránky
           const isCardActive = activeCards.includes(index);
           // páry které už byly nalezeny
           const found = foundPairs.includes(one.title);
  
          return (
            <div key={index} className="flex justify-center items-center border border-gray-300 rounded-lg overflow-hidden">
              <img
               // obrázek podle toho zda je kliknutý nebo už nalezený
                src={isCardActive || found ? one.image : one.blackImage}
                  // zakázání klikání než dojde k prověření
                onClick={isClickable ? () => clickCard(one, index) : null}
                className={`object-cover ${!isCardActive && 'hover:scale-105 transition-transform duration-300'}`}
                alt={one.title}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default App;
