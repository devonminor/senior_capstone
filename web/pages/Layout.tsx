import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import NavBar from '/pages/NavBar'


export default function Layout({ children }) {
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