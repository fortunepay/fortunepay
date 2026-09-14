import { ImageSlideProps } from "@/types/public/userTypes";
import { positionStyles } from "@/constant/public/UserInterfaceConts";

export default function ImageSlide({ image, state }: ImageSlideProps) {
    return (
        <div
            className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ease-out ${positionStyles[state.pos]}`}
            style={{ transform: `translateX(${state.offset}px)` }}
        >
            <img
                src={image.src}
                alt={image.alt}
                className="h-[115%] max-w-full object-contain"
                draggable={false}
            />
        </div>
    );
}