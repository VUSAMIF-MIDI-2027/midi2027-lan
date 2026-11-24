const sponsor1 = `${import.meta.env.BASE_URL}logos/sponsor-1.webp`
const sponsor3 = `${import.meta.env.BASE_URL}logos/sponsor-3.webp`
const sponsor4 = `${import.meta.env.BASE_URL}logos/sponsor-4.webp`
const sponsor5 = `${import.meta.env.BASE_URL}logos/sponsor-5.webp`
const sponsorGaidelis = `${import.meta.env.BASE_URL}logos/sponsor-new-gaidelis.webp`

export const partners: { src: string; alt: string; colorBg?: boolean }[] = [
    { src: sponsor3, alt: 'Pepsi' },
    { src: sponsor1, alt: 'Brite' },
    { src: sponsorGaidelis, alt: 'Gaidelis', colorBg: true },
    { src: sponsor4, alt: 'TopPC' },
    { src: sponsor5, alt: 'RPC.LT' },
  ]
