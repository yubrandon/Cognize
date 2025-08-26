const CarouselCard = ({card}) =>
{
    return (
        <div>
            <p>{card.term}</p>
            <p>{card.definition}</p>
        </div>
    )
}

export default CarouselCard;