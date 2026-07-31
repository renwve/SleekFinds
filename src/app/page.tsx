import Navbar from "@/components/navbar"; 
import Hero from "@/components/hero"; 
import Filters from "@/components/filters"; 
import ProductGrid from "@/components/productgrid"; 
import Newsletter from "@/components/newsletter"; 
import Footer from "@/components/footer"; 

export default function Home() { 
  return (
  <main className="min-h-screen bg-background text-foreground"> 
  <Navbar /> 
  
  <Hero /> 
  
  <section className="mx-auto flex max-w-7xl gap-10 px-8 py-10"> 
    
  <Filters />
  <ProductGrid /> 
  </section> 
  <Newsletter /> 
  <Footer /> 
  </main> 
  ); 
}