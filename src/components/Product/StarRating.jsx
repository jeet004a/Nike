import {
    IoStarSharp, IoStarHalfSharp, IoStarOutline,
} from 'react-icons/io5'

const StarRating = ({ rating, count }) => {
    const stars = []
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) stars.push('full')
        else if (rating >= i - 0.5) stars.push('half')
        else stars.push('empty')
    }
    return (
        <div className="flex items-center gap-1.5">
            <div className="flex gap-0.5">
                {stars.map((type, i) => (
                    type === 'full' ? <IoStarSharp key={i} className="text-black text-sm" />
                        : type === 'half' ? <IoStarHalfSharp key={i} className="text-black text-sm" />
                            : <IoStarOutline key={i} className="text-gray-300 text-sm" />
                ))}
            </div>
            <span className="text-sm text-gray-500">({count?.toLocaleString()})</span>
        </div>
    )
}

export default StarRating