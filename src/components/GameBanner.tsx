interface GameBannerProps {
    bannerUrl: string;
    title: string;
    adsCount: number; 
}



export function GameBanner(props: GameBannerProps) {
    return (
        <a href="" className=' mt-12 relative rounded-lg overflow-hidden scale-100 hover:scale-110 easse-in duration-300 '>
            <img src= {props.bannerUrl} alt="" />
            <div className='w-full pt-16 pb-4 px-4 bg-game-gradient absolute bottom-0 left-0 right-0   '>
                <strong className='font-bold text-white block'>{props.title}</strong>
                <span className='text-zinc-300 text-sm block'>{props.adsCount} Anúncio(s)</span>
            </div>
        </a>
    )
}