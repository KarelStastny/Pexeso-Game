import { useState, React, useEffect, createContext, useContext } from "react";
import { animals } from "./data";
import { shuffle } from "lodash";

const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [cards, setCards] = useState([]);
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
      }, 1000);
    }
  };

  //Porovnání zda jsou karty stejné
  useEffect(() => {
    if (firstCard && secondCard) {
      if (firstCard.title === secondCard.title) {
        setFoundPairs([...foundPairs, firstCard.title]);

        setfoundOnePair("Úspěšně jste našli 1 pár.");
      } else {
        setfoundOnePair("Pár se neshoduje, zkuste to znova.");
      }

      // Reset první a druhé karty
      setFirstCard("");
      setSecondCard("");
    }
  }, [firstCard, secondCard]);

  // Zjištění vítězství
  useEffect(() => {
    if (foundPairs.length == cards.length / 2 && foundOnePair.length > 1) {
      setWon("Vyhráli jste - chcete hru opakovat");
      setfoundOnePair("Našli jste všechny páry gratuluji.");
    }
  }, [foundPairs, cards]);

  const showModal = (message) => {
    setModalMessage(message);
    setIsModalOpen(true);
  };

  // Reset hry vynulování všeho
  const resetGame = () => {
    setCards([]);
    setActiveCards([]);
    setFirstCard("");
    setSecondCard("");
    setFoundPairs([]);
    setNumberClick(0);
    setWon("");
    setIsClickable(true);
    setfoundOnePair("");
  };

  return (
    <AppContext.Provider
      value={{
        won,
        resetGame,
        foundOnePair,
        numberClick,
        isModalOpen,
        setIsModalOpen,
        modalMessage,
        setIsModalOpen,
        cards,
        activeCards,
        foundPairs,
        isClickable,
        clickCard,
        setCards,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useContextApp = () => {
  return useContext(AppContext);
};
