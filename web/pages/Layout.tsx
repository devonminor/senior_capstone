import logo from "../public/Poll_Anywhere_logo.png"
import gear from "../public/gear-wide-connected.svg"
import Image from 'next/image'
import React, { Dispatch } from 'react';
import parse_course_id from "../components/parse_course_id";
import { useRouter } from "next/router";

interface LayoutProps {
  children: React.ReactNode;
  course_id: any;
}

export default function Layout({ children, course_id }: LayoutProps) {
  var course_name = "";
  const router = useRouter();
  
  if (router.route == "/courses") {
    course_name = "My Courses";
  }
  else if (parse_course_id(course_id).length > 0) {
    course_name = parse_course_id(course_id);
  }
  
  return (
    <div>
      <nav className="navbar navbarCustom navbar-expand-fluid sticky-top bg-light">
        <div className="container-fluid navContainer">
          <div className="row navRow">
            <div className="col navLeft">
              <a className="navbar-brand" href="/">
                <Image className="PAlogo" src={logo} alt="Bootstrap"/>
              </a>
            </div>
            <div className="col navCenter">
                <h1 className="courseText">{course_name}</h1>
              </div>
            <div className="col">
              <div className="navRight">
                <a href="/settings">
                  <Image className="gearIcon" src={gear} alt="Bootstrap"/>
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div>
        <main>{children}</main>
      </div>
    </div>
    
  )
}


