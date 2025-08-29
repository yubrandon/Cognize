const CarouselCard = ({card, flipped, setFlippped}) => {
    const handleFlip = () => {
        setFlippped(!flipped);
    }
    return (
        <div onClick={handleFlip} className="flex flex-row justify-center items-center w-full h-full bg-neutral-50 px-8 rounded-lg">
            <h1 className="text-3xl font-semibold">
            {
                flipped ? card.definition : card.term
            }
            </h1>
        </div>
    )
}

export default CarouselCard;