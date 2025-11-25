/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
  	extend: {
  		colors: {
  			// Premium Color Palette
  			'deep-blue': '#002C5F',
  			'trine-purple': '#7E57C2',
  			'trine-pink': '#EC4899',
  			'trine-orange': '#F78B1F',
  			'trine-green': '#22C55E',
  			'trine-yellow': '#FACC15',
  			'trine-skyblue': '#38BDF8',
  			'trine-darkred': '#B91C1C',
  			'trine-black': '#0A0A0A',
  			'trine-white': '#ffffff',
  			// Shadcn Theme Colors
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		backgroundImage: {
  			'gradient-orange-blue': 'linear-gradient(135deg, #F78B1F 0%, #002C5F 100%)',
  			'gradient-deepblue-purple': 'linear-gradient(135deg, #002C5F 0%, #7E57C2 100%)',
  			'gradient-purple-pink': 'linear-gradient(135deg, #7E57C2 0%, #EC4899 100%)',
  			'gradient-green-yellow': 'linear-gradient(135deg, #22C55E 0%, #FACC15 100%)',
  			'gradient-pink-skyblue': 'linear-gradient(135deg, #EC4899 0%, #38BDF8 100%)',
  			'gradient-skyblue-purple': 'linear-gradient(135deg, #38BDF8 0%, #7E57C2 100%)',
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)',
  			xl: '22px',
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};