import React from 'react'
import { useContextApp } from "./context";
import Modal from "react-modal";

const Game = () => {
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
  } = useContextApp();

  return (
    <div>
         {won && (
          <div className="text-green-600 text-center font-semibold">{won}</div>
        )}

        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <button
            className="bg-pink-500 text-white font-semibold py-2 px-4 rounded hover:bg-pink-600 transition duration-300"
            onClick={resetGame}
          >
            Resetovat hru
          </button>
          <div className="text-lg font-semibold min-h-[30px] text-white">
            {foundOnePair}
          </div>
          <div>
            <span className="font-semibold text-gray-200">
              Počet kliknutí:{" "}
            </span>
            <span className="font-bold text-white">{numberClick}</span>
          </div>
        </div>

        <Modal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded shadow-lg"
          overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50"
        >
          <h2 className="text-lg font-bold text-pink-500 mb-4">Upozornění</h2>
          <p>{modalMessage}</p>
          <button
            className="mt-4 bg-pink-500 text-white font-bold py-2 px-4 rounded hover:bg-pink-600 transition duration-300"
            onClick={() => setIsModalOpen(false)}
          >
            Zavřít
          </button>
        </Modal>

        <div className="grid grid-cols-3 md:grid-cols-4  gap-2 md:gap-4">
        { cards.map((one, index) => {
            // Kontrola zda je karta aktivní pro vykreslení do stránky
            const isCardActive = activeCards.includes(index);
            // páry které už byly nalezeny
            const found = foundPairs.includes(one.title);

            return (
              <div
                key={index}
                className="flex justify-center items-center border cursor-pointer  rounded-lg overflow-hidden"
              >
                <img
                  // obrázek podle toho zda je kliknutý nebo už nalezený
                  src={isCardActive || found ? one.image : one.blackImage}
                  // zakázání klikání než dojde k prověření
                  onClick={isClickable ? () => clickCard(one, index) : null}
                  className={`object-cover bg-gray-200 ${
                    isCardActive ||
                    (found && " border-8  bg-gray-600 border-pink-600")
                  }`}
                  alt={one.title}
                />
              </div>
            );
          })}
        </div>
    </div>
  )
}

export default Game
