import './styles/main.css';
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import logoimg from './assets/logo-nlw-esports.png';
import { GameBanner } from './components/GameBanner';
import { GameController } from 'phosphor-react';
import { Banner } from './components/Banner';
import { Input } from './components/Form/Estilo';
import { Check } from 'phosphor-react';


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    ads: number;
  }


}

function App() {
  const [games, setGames] = useState<Game[]>([])


  useEffect(() => {
    fetch('http://localhost:3333/games').then(response => response.json())
      .then(data => {
        setGames(data)

      })

  }, [])


  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center m-5">
      <img src={logoimg} alt="" />

      <div className="animate-text bg-gradient-to-r from-indigo-500 via-purple-500 to-yellow-500 bg-clip-text text-5xl text-transparent m-12 font-black">Seu duo está aqui</div>


      <div className='grid grid-cols-6 gap-8 mt-6 mx-auto'>
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
            />
          )
        })}

      </div>
      <Dialog.Root>
        <Banner />
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />

          <Dialog.Content className='fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>

            <Dialog.Title className='text-3xl  font-black'>Publique um anúncio</Dialog.Title>

              <form className='mt-8 flex flex-col gap-4'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="game" className='font-semibold'>Qual o game?</label>
                  <Input id="game" placeholder='Selecione o game que deseja jogar'/>
 
                </div>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="name">Seu nome (ou nickname)</label>
                  <Input id="name" placeholder='Como te chamam dentro do jogo' />
                </div>
                <div className='grid grid-cols-2 gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor="yearsPlaying">Joga quantos ano?</label>
                    <Input id="yearsPlaying" type="number" placeholder='tudo bem ser zero' />
                  </div>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='discord'>Qual é seu discord?</label>
                    <Input id="discord" type="text" placeholder='User#0000' />
                  </div>
                </div>


                <div className='flex gap-6'>
                  <div className='flex flex-col gap-2'>
                 <label htmlFor="weekdays">Dia em que joga</label>
                 <div className='grid grid-cols-7 gap-2'>
                  <button title='Domingo'className='w-6 h-6 rounded bg-zinc-900  gap-3'>D</button>
                  <button title='Segunda' className='w-6 h-6 rounded bg-zinc-900 hover:bg-zinc-800 gap-3'>S</button>
                  <button title='Terça' className='w-6 h-6 rounded bg-zinc-900 hover:bg-zinc-800 gap-3'>T</button>
                  <button title='Quarta' className='w-6 h-6 rounded bg-zinc-900 hover:bg-zinc-800 gap-3'>Q</button>
                  <button title='Quinta' className='w-6 h-6 rounded bg-zinc-900 hover:bg-zinc-800 gap-3'>Q</button>
                  <button title='Sexta' className='w-6 h-6 rounded bg-zinc-900 hover:bg-zinc-800 gap-3'>S</button>
                  <button title='Sabádo' className='w-6 h-6 rounded bg-zinc-900 hover:bg-zinc-800 gap-3'>S</button>
                   
                 </div>
                  </div>
                  <div className='flex-gap-2 gap-2 '>
                  <label htmlFor="hourStart">Quando costuma jogar?</label>
                  <div className='grid  grid-cols-2 gap-2'>
                    <Input id="hourStart" type="time" placeholder='De' />
                    <Input id="hourEnd" type="time" placeholder='até' />
                  
                  </div>
                  </div>
                  </div>
                <div className='mt-2 flex gap-2 text-sm'>
                  <Checkbox.Root className='w-6 h-6 p-1 rounded bg-zinc-900 ' >
                    <Checkbox.Indicator>  
                      <Check className='w-4 h-4 text-emerald-400'/>
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  Costuma usar VOIP?
                </div>
                <footer className='mt-4 flex justify-end gap-4'>
                  <Dialog.Close className='bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold'>Cancelar</Dialog.Close>
                  <button type='submit'
                  className='bg-violet-500 hover:bg-violet-600 px-5 h-12 rounded-md font-semibold flex items-center gap-3'>
                    <GameController className='w-6 h-6' />
                    Encontrar Duo</button>
                </footer>
              </form>

          </Dialog.Content>

        </Dialog.Portal>

      </Dialog.Root>

    </div>
  )
}

export default App
