import Banner from './Banner'
import Footer from './Footer'
import Header from './Header'
import News from './News'
import Values from './Values'
import WhatWeDo from './WhatWeDo'
import Work from './Work'

const Homepage = () => {
  return (
    <>
    <div className='text-light p-4 border border-black m-4'>
      <Header/>
    <Banner/>
    <WhatWeDo/>
    <Work/>
    <Values/>
    <News title="Latest News"/>
    <Footer/>
    </div>
    
    </>
  )
}

export default Homepage