import React from 'react'
import { useContextApp } from "./context";

const GameSettings = () => {
    const {
        won,
        resetGame,
        foundOnePair,
        numberClick,
        isModalOpen,
        modalMessage,
        setIsModalOpen,
        cards,
        activeCards,
        foundPairs,
        isClickable,
        clickCard,
        setCards,
      } = useContextApp();
  return (
    <div>
      <h2>VYberte si styl obrázků a spuste hru</h2>
      <div>
        <button>Zvířata</button>
        <button>Barvy</button>
        <button>Čísla</button>
      </div>
    </div>
  )
}

export default GameSettings
