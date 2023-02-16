import logo from "../public/Poll_Anywhere_logo.png"
import Image from 'next/image'

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <nav className="navbar sticky-top bg-light">
        <div className="navbar">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">
              <Image className="PAlogo" src={logo} alt="Bootstrap"/>
            </a>
          </div>
        </div>
      </nav>
      <div>
        <main>{children}</main>
      </div>
    </div>
    
  )
}