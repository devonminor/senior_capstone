import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  function handleClick() {
    router.push("/courses/")
  }

  return (
    <>
    <div className="nav">
      <div className="nav flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical" background-color="#800000">
          <a className="nav-link active" id="v-pills-home-tab" data-toggle="pill" href="/courses" role="tab" aria-controls="v-pills-home" aria-selected="true" onClick={handleClick}>My Courses</a>
          <a className="nav-link" id="v-pills-settings-tab" data-toggle="pill" href="/courses" role="tab" aria-controls="v-pills-settings" aria-selected="false" onClick={handleClick}>Settings</a>
      </div>
    </div>
    </>
  )
}