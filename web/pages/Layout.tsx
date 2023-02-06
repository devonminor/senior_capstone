import NavBar from '../components/NavBar'

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <div className="row">
        <div className="column1">
          <NavBar></NavBar>
        </div>
        <div className="column2">
          <main>{children}</main>
        </div>
      </div>  
    </>
  )
}