import Nav from 'react-bootstrap/Nav';

export default function NavBar() {
  return (
    <>
    <div className="nav">
      <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" background-color="#800000">
          <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">My Courses</a>
          <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Settings</a>
      </div>
    </div>
    </>
  )
}