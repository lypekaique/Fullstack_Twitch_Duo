/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html',
  ],
  theme: {
    extend:
    
    {
      backgroundImage: {
        galaxy: "url('/background-galaxy.png')",
        game1: "url('/teemo.gif')" , 
        'game-gradient':'linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)',
        'nlw-gradient' :'linear-gradient(89.86deg, #9572FC 27.08%, #43E7AD 33.94%, #E1D55D 48.57%)',
        },
      
      animation: {
            text:'text 5s ease infinite',
        },
        keyframes: {
            text: {
                '0%, 100%': {
                   'background-size':'200% 200%',
                    'background-position': 'left center'
                },
                '50%': {
                   'background-size':'200% 200%',
                    'background-position': 'right center'
                  
                },
            },
        }
    },
  },
  plugins: [],
}
